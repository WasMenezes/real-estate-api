import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { LoginController } from '@/presentation/controllers/login-controller'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { EmailValidator } from '@/presentation/protocols/email-validator'

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
}
const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new LoginController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}
describe('Login Controller', () => {
  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'any_password'
      }
    }
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValid = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    sut.handle(httpRequest)
    expect(isValid).toHaveBeenCalledWith('any_email@mail.com')
  })
})
