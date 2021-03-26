import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { Controller } from '@/presentation/protocols'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '../usecases/db-authentication-factory'

export const makeLoginController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()

  const validation = new ValidationComposite([
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new EmailValidation('email', emailValidator)
  ])

  return makeLogControllerDecorator(new LoginController(validation, makeDbAuthentication()))
}
