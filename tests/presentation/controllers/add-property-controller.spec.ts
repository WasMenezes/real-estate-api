import { PropertyResidentialCommercialModel } from '@/domain/models/property-model'
import { HttpRequest, Validation } from '../protocols'
import { AddPropertyController } from '@/presentation/controllers/add-property-controller'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helper'
import { AddProperty } from '@/domain/usecases/add-property'
import MockDate from 'mockdate'

const makeFakePropertyResidentialCommercialModel = (): PropertyResidentialCommercialModel => ({
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

const makeAddProperty = (): AddProperty => {
  class AddProperty {
    async add (): Promise<void> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new AddProperty()
}

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
  addPropertyStub: AddProperty
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addPropertyStub = makeAddProperty()
  const sut = new AddPropertyController(validationStub, addPropertyStub)
  return {
    sut,
    validationStub,
    addPropertyStub
  }
}

describe('AddProperty Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  describe('validate', () => {
    test('should call Validation with correct values', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest: HttpRequest = { body: makeFakePropertyResidentialCommercialModel() }
      await sut.handle(httpRequest)
      expect(validateSpy).toBeCalledWith(httpRequest.body)
    })

    test('Should return a badRequest if Validation fails', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
        return new Error()
      })
      const httpRequest: HttpRequest = {
        body: makeFakePropertyResidentialCommercialModel()
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Should throw if Validate throws', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
        throw new Error()
      })
      const httpRequest: HttpRequest = {
        body: makeFakePropertyResidentialCommercialModel()
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })

  describe('add', () => {
    test('Should call add with correct values', async () => {
      const { sut, addPropertyStub } = makeSut()
      const addSpy = jest.spyOn(addPropertyStub, 'add')
      const httpRequest: HttpRequest = {
        body: makeFakePropertyResidentialCommercialModel()
      }
      await sut.handle(httpRequest)
      expect(addSpy).toBeCalledWith({ ...httpRequest.body, date: new Date() })
    })

    test('Should throw if add throws', async () => {
      const { sut, addPropertyStub } = makeSut()
      jest.spyOn(addPropertyStub, 'add').mockImplementationOnce(() => {
        throw new Error()
      })
      const httpRequest: HttpRequest = {
        body: makeFakePropertyResidentialCommercialModel()
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return no content if succeeds', async () => {
      const { sut } = makeSut()
      const httpRequest: HttpRequest = {
        body: makeFakePropertyResidentialCommercialModel()
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(noContent())
    })
  })
})
