import { PropertyModel, PropertyResidentialCommercialModel } from '@/domain/models/property-model'
import { LoadProperties } from '@/domain/usecases/load-properties'
import { LoadPropertiesController } from '@/presentation/controllers/load-properties-controller'

const makeFakePropertyResidentialCommercialModel = (): PropertyResidentialCommercialModel => ({
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
  steamRoom: true,
  type: {
    id: 1,
    description: 'any_description'
  }
})

const makeLoadPropertiesStub = (): LoadProperties => {
  class LoadPropertiesStub implements LoadProperties {
    async load (): Promise<PropertyModel[] | PropertyResidentialCommercialModel[]> {
      return new Promise(resolve => resolve([
        makeFakePropertyResidentialCommercialModel(),
        makeFakePropertyResidentialCommercialModel(),
        makeFakePropertyResidentialCommercialModel()
      ]))
    }
  }
  return new LoadPropertiesStub()
}

interface SutTypes {
  sut: LoadPropertiesController
  loadPropertiesStub: LoadProperties
}

const makeSut = (): SutTypes => {
  const loadPropertiesStub = makeLoadPropertiesStub()
  const sut = new LoadPropertiesController(loadPropertiesStub)
  return {
    sut,
    loadPropertiesStub
  }
}

describe('LoadPropertiesController', () => {
  test('should call loadPropertiesStub with correct values', async () => {
    const { sut, loadPropertiesStub } = makeSut()
    const loadPropertiesSpy = jest.spyOn(loadPropertiesStub, 'load')
    const httpRequest = {
      body: {
        title: 'any_title'
      }
    }
    await sut.handle(httpRequest)
    expect(loadPropertiesSpy).toBeCalledWith(httpRequest.body)
  })
})
