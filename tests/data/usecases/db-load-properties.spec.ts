import { PropertyModel, PropertyResidentialCommercialModel } from '@/domain/models/property-model'
import { LoadPropertiesRepository } from '../protocols/db/property/load-properties-repository'
import { DbLoadProperties } from '@/data/usecases/db-load-properties'
const makeFakeProperty = (): PropertyModel => ({
  id: 'any_id',
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

const makeLoadPropertiesRepositoryStub = (): LoadPropertiesRepository => {
  class LoadPropertiesRepositoryStub implements LoadPropertiesRepository {
    async loadByFilter (): Promise<Array<PropertyModel | PropertyResidentialCommercialModel>> {
      return [
        makeFakeProperty(),
        makeFakePropertyResidentialCommercialModel()
      ]
    }
  }
  return new LoadPropertiesRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadPropertiesRepositoryStub = makeLoadPropertiesRepositoryStub()
  const sut = new DbLoadProperties(loadPropertiesRepositoryStub)
  return {
    sut,
    loadPropertiesRepositoryStub
  }
}

interface SutTypes {
  sut: DbLoadProperties
  loadPropertiesRepositoryStub: LoadPropertiesRepository
}

describe('DbLoadProperties Usecase', () => {
  test('should call LoadProperties with correct values', async () => {
    const { sut, loadPropertiesRepositoryStub } = makeSut()
    const loadPropertiesRepositorySpy = jest.spyOn(loadPropertiesRepositoryStub, 'loadByFilter')
    const httpRequest = {
      rent: true,
      rentPriceMin: 1,
      rentPriceMax: 1000
    }
    await sut.load(httpRequest)
    expect(loadPropertiesRepositorySpy).toHaveBeenCalledWith(httpRequest)
  })
})
