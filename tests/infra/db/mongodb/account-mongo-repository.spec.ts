import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

import { Collection } from 'mongodb'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

class FakeAccount {
  name: string
  email: string
  password: string
}

const makeFakeAccount = (): FakeAccount => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

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
      await accountCollection.insertOne(makeFakeAccount())
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
      const res = await accountCollection.insertOne(makeFakeAccount())
      const fakeAccount = res.ops[0]
      await sut.updateAccessToken(fakeAccount._id, 'any_token')
      const account = await accountCollection.findOne({ email: 'any_email@mail.com' })
      expect(account).toBeTruthy()
      expect(account.accessToken).toEqual('any_token')
    })
  })

  describe('loadByToken()', () => {
    test('should return an account on loadByToken without Role', async () => {
      await accountCollection.insertOne({ accessToken: 'any_token', ...makeFakeAccount() })
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('should return an account on loadByToken with admin Role', async () => {
      await accountCollection.insertOne({ accessToken: 'any_token', ...makeFakeAccount(), role: 'admin' })
      const sut = makeSut()
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })
  })
})
