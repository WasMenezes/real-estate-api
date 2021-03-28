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
})
