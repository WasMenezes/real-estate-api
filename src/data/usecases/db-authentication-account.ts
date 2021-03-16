import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    return new Promise(resolve => resolve(null))
  }
}
