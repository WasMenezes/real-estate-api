import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeLoginValidation = (): ValidationComposite => {
  const validations = []
  for (const fieldName of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(fieldName))
  }
  const emailAdapter = new EmailValidatorAdapter()
  validations.push(new EmailValidation('email', emailAdapter))

  return new ValidationComposite(validations)
}
