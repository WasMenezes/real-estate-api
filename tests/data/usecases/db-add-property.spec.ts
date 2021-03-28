import { AddPropertyRepository } from '../protocols/db/property/add-property-repository'
import { DbAddProperty } from '@/data/usecases/db-add-property'
import MockDate from 'mockdate'
import { PropertyModel, PropertyResidentialCommercialModel } from '@/domain/models/property-model'

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

const makeAddPropertyRepository = (): AddPropertyRepository => {
  class AddPropertyRepositoryStub implements AddPropertyRepository {
    async add (): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddPropertyRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addPropertyRepositoryStub = makeAddPropertyRepository()
  const sut = new DbAddProperty(addPropertyRepositoryStub)
  return {
    sut,
    addPropertyRepositoryStub
  }
}

interface SutTypes {
  sut: DbAddProperty
  addPropertyRepositoryStub: AddPropertyRepository
}

describe('DbAddProperty Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call AddPropertyRepository with correct values', async () => {
    const { addPropertyRepositoryStub, sut } = makeSut()
    const addSpy = jest.spyOn(addPropertyRepositoryStub, 'add')
    const surveyData = makeFakePropertyResidentialCommercialModel()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if AddAccpountRepository throws', async () => {
    const { sut, addPropertyRepositoryStub } = makeSut()
    jest.spyOn(addPropertyRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakePropertyResidentialCommercialModel())
    await expect(promise).rejects.toThrow()
  })
})
