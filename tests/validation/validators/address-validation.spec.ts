import { MissingParamError } from '@/presentation/errors'
import { AddressValidation } from '@/validation/validators/address-validation'

const makeSut = (): AddressValidation => { return new AddressValidation('address', ['fieldAdressName']) }

describe('Address Validation', () => {
  test('should call return a MissingParamError if validations fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      address: {
        fieldAdressName: null
      }
    })
    expect(error).toEqual(new MissingParamError('fieldAdressName'))
  })
})
