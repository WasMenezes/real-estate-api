import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { DbAuthentication } from '@/data/usecases/db-authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
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

  const loadAccountByEmailRepository: LoadAccountByEmailRepository = new AccountMongoRepository()
  const hashComparer: HashComparer = new BcryptAdapter(12)
  const encrypter: Encrypter = new BcryptAdapter(12)
  const updateAccessToken = new AccountMongoRepository()

  const authentication = new DbAuthentication(loadAccountByEmailRepository, hashComparer, encrypter, updateAccessToken)
  return makeLogControllerDecorator(new LoginController(validation, authentication))
}
