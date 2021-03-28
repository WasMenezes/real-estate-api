import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { AddressValidation } from '@/validation/validators/address-validation'
import { TwoFieldsRequiredValidation } from '@/validation/validators/two-fields-required-validation'

export const makeAddPropertyValidation = (): ValidationComposite => {
  const validations = []
  for (const fieldName of ['title', 'description', 'address', 'currentTributePaid','tributeBelongsOwner', 'tribute', 'condominium','areaTotal', 'areaUtil', 'type']) {
    validations.push(new RequiredFieldValidation(fieldName))
  }
  validations.push(new TwoFieldsRequiredValidation('rent', 'rentPrice'))
  validations.push(new TwoFieldsRequiredValidation('sale', 'salePrice'))
  validations.push(new AddressValidation('address', ['zipcode', 'street', 'number', 'complement', 'neighborhood', 'state', 'city']))
  return new ValidationComposite(validations)
}
