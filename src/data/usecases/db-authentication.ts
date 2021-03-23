import { Authentication } from '@/domain/usecases'
import { HashComparer } from '../protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) { }

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (account) {
      await this.hashComparer.compare(authenticationParams.password, account.password)
    }
    return null
  }
}
