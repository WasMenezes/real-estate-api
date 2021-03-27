import { PropertyResidentialCommercialModel } from '@/domain/models/property-model'
import { Validation } from '../protocols'
import { AddPropertyController } from '@/presentation/controllers/add-property-controller'

const makeFakePropertyResidentialCommercialModel = (): PropertyResidentialCommercialModel => ({
  title: 'any_title',
  description: 'any_description',
  rent: true,
  rentPrice: 999.99,
  sale: true,
  salePrice: 999999.99,
  adress: {
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

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: AddPropertyController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new AddPropertyController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AddProperty', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = { body: makeFakePropertyResidentialCommercialModel() }
    await sut.handle(httpRequest)
    expect(validateSpy).toBeCalledWith(httpRequest)
  })
})
