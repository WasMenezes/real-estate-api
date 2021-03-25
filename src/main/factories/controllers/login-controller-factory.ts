import { DbAuthentication } from '@/data/usecases/db-authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import env from '@/main/config/env'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { Controller } from '@/presentation/protocols'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()

  const validation = new ValidationComposite([
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new EmailValidation('email', emailValidator)
  ])

  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  const authentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  return makeLogControllerDecorator(new LoginController(validation, authentication))
}
