import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

const makeFakeValidator = (): Validation => {
  class FakeValidator implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new FakeValidator()
}

interface SutTypes {
  sut: ValidationComposite
  fakeValidators: Validation[]
}

const makeSut = (): SutTypes => {
  const fakeValidators = [
    makeFakeValidator(),
    makeFakeValidator()
  ]
  const sut = new ValidationComposite(fakeValidators)
  return {
    sut,
    fakeValidators
  }
}

describe('Validation Composite', () => {
  test('should call validate with correct values', () => {
    const { sut, fakeValidators } = makeSut()
    const validateSpy = jest.spyOn(fakeValidators[0], 'validate')
    sut.validate('any_input')
    expect(validateSpy).toBeCalledWith('any_input')
  })

  test('should return null if succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate('any_input')
    expect(error).toBeFalsy()
  })

  test('should return the first error if more then one validation fails', () => {
    const { sut, fakeValidators } = makeSut()
    jest.spyOn(fakeValidators[0], 'validate').mockImplementationOnce(() => {
      return new Error()
    })

    jest.spyOn(fakeValidators[1], 'validate').mockImplementationOnce(() => {
      return new MissingParamError('any_param')
    })
    const error = sut.validate('any_input')
    expect(error).toStrictEqual(new Error())
  })
})
