import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { Decrypter } from '../protocols/criptography'
import { LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    const id = await this.decrypter.decrypt(accessToken)
    return new Promise(resolve => resolve({ id }))
  }
}
