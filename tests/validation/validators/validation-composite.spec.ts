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
  const fakeValidators = [makeFakeValidator()]
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
})
