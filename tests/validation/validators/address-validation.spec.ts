import { MissingParamError } from '@/presentation/errors'
import { AddressValidation } from '@/validation/validators/address-validation'

const makeSut = (): AddressValidation => { return new AddressValidation('address', ['fieldAdressName']) }

describe('Address Validation', () => {
  test('should return a MissingParamError if validate fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      address: {
        fieldAdressName: null
      }
    })
    expect(error).toEqual(new MissingParamError('fieldAdressName'))
  })

  test('should return null if validate succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ address: { fieldAdressName: 'any_value' } })
    expect(error).toBeFalsy()
  })
})
