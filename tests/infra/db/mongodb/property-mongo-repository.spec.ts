import { PropertyMongoRepository } from '@/infra/db/mongodb/property-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

import { Collection } from 'mongodb'
import { PropertyModel, PropertyResidentialCommercialModel } from '@/domain/models/property-model'

const makeSut = (): PropertyMongoRepository => {
  return new PropertyMongoRepository()
}

const makeFakeProperty = (): PropertyModel => ({
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

let propertyCollection: Collection
describe('PropertyMongoRepository', () => {
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

  describe('PropertyMongoRepository', () => {
    test('Should add property on success', async () => {
      const sut = makeSut()
      await sut.add(makeFakePropertyResidentialCommercialModel())
      await sut.add(makeFakeProperty())
      const count = await propertyCollection.countDocuments()
      expect(count).toBe(2)
    })
  })
})
