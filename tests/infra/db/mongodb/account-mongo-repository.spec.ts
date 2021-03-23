import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

import { Collection } from 'mongodb'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection
describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('loadByEmail()', () => {
    test('should return an account on loadByEmail sucess', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const account = await sut.loadByEmail('any_email@mail.com')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.password).toBe('any_password')
    })

    test('should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('should update an account with accessToken if updateAccessToken succeeds', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const accountBefore = await accountCollection.findOne({ email: 'any_email@mail.com' })
      await sut.updateAccessToken(accountBefore._id, 'any_token')
      const account = await accountCollection.findOne({ email: 'any_email@mail.com' })
      expect(account.accessToken).toEqual('any_token')
    })
  })
})
