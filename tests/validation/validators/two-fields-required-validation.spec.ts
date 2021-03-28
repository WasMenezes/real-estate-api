import { MissingParamError } from '@/presentation/errors'
import { TwoFieldsRequiredValidation } from '@/validation/validators/two-fields-required-validation'

const makeSut = (): TwoFieldsRequiredValidation => { return new TwoFieldsRequiredValidation('fieldNameVerify', 'fieldNameRequired') }

describe('TwoFieldsRequired Validation', () => {
  test('should return a MissingParamError if validate fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      fieldNameVerify: true,
      fieldNameRequired: null
    })
    expect(error).toEqual(new MissingParamError('fieldNameRequired'))
  })

  test('should return null if validate succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      fieldNameVerify: true,
      fieldNameRequired: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
