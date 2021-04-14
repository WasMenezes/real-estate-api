import request from 'supertest'
import app from '@/main/config/app'
import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

let propertyCollection: Collection

describe('AddProperty Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    propertyCollection = await MongoHelper.getCollection('property')
    await propertyCollection.deleteMany({})
  })

  describe('GET /properties', () => {
    test('Should return no content if none property are find', async () => {
      await request(app)
        .get('/api/properties')
        .send({})
        .expect(204)
    })
  })
})
