import request from 'supertest'
import app from '@/main/config/app'
import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

describe('Login Routes', () => {
  let accountCollection: Collection
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
  test('Should return an account name and accessToken on success', async () => {
    await request(app)
      .post('/api/login')
      .send({
        name: 'any_name',
        accessToken: 'access_token'
      })
      .expect(200)
  })
})
