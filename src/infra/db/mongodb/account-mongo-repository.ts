import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { MongoHelper } from './mongo-helper'

export class AccountMongoRepository implements LoadAccountByEmailRepository {
  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }
}
