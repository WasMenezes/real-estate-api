import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'

const makeSut = (): RequiredFieldValidation => { return new RequiredFieldValidation('field') }

describe('Required Field Validation', () => {
  test('should call return a MissingParamError if validations fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: null })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('should call return null if validations succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
