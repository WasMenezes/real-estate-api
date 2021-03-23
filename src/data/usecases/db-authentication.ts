import { Authentication } from '@/domain/usecases'
import { Encrypter } from '../protocols/criptography/encrypter'
import { HashComparer } from '../protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'
import { UpdateAccessToken } from '../protocols/db/account/update-access-token'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessToken: UpdateAccessToken
  ) { }

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessToken.updateAccessToken(account.id, accessToken)
      }
    }
    return null
  }
}
