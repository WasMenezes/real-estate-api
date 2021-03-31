import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { Decrypter } from '../protocols/criptography'
import { LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }

    if (token) {
      await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    }
    return new Promise(resolve => resolve({ id: token }))
  }
}
