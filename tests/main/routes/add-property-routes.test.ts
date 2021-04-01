import request from 'supertest'
import app from '@/main/config/app'
import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { PropertyModel, PropertyResidentialCommercialModel } from '@/domain/models/property-model'
import env from '@/main/config/env'
import { sign } from 'jsonwebtoken'

const makeFakeProperty = (): PropertyModel => ({
  id: 'any_value',
  title: 'any_title',
  description: 'any_description',
  rent: true,
  rentPrice: 999.99,
  sale: true,
  salePrice: 999999.99,
  address: {
    zipcode: 'any_zipcode',
    street: 'any_street',
    number: 999,
    complement: 'any_complement',
    neighborhood: 'any_neighborhood',
    state: 'any_state',
    city: 'any_city'
  },
  currentTributePaid: true,
  tributeBelongsOwner: true,
  tribute: 999.99,
  condominium: 999.99,
  areaTotal: 999,
  areaUtil: 999,
  deed: true,
  createdAt: new Date(),
  updated: new Date(),
  type: {
    id: 1,
    description: 'any_description'
  }
})

const makeFakePropertyResidentialCommercialModel = (): PropertyResidentialCommercialModel => ({
  ...makeFakeProperty(),
  registeredHousePlan: true,
  propertyAge: 9,
  suites: 9,
  bathrooms: 9,
  rooms: 9,
  garage: 9,
  garageCovered: 2,
  airConditioner: true,
  bar: true,
  library: true,
  barbecueGrill: true,
  americanKitchen: true,
  fittedKitchen: true,
  pantry: true,
  edicule: true,
  office: true,
  bathtub: true,
  fireplace: true,
  lavatory: true,
  gurnished: true,
  pool: true,
  steamRoom: true
})

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Was',
    email: 'wasmenezes@gmail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

let propertyCollection: Collection
let accountCollection: Collection

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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /properties', () => {
    test('Should return 204 if add-property succeeds', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/properties')
        .set('x-access-token', accessToken)
        .send(makeFakeProperty())
        .expect(204)

      await request(app)
        .post('/api/properties')
        .set('x-access-token', accessToken)
        .send(makeFakePropertyResidentialCommercialModel())
        .expect(204)

      const count = await propertyCollection.countDocuments()
      expect(count).toBe(2)
    })

    test('Should return 403 if access token are not provieded', async () => {
      await request(app)
        .post('/api/properties')
        .send(makeFakeProperty())
        .expect(403)
    })

    test('Should return 403 if access token are not provieded', async () => {
      await request(app)
        .post('/api/properties')
        .set('x-access-token', 'invalid_token')
        .send(makeFakeProperty())
        .expect(403)
    })
  })
})
