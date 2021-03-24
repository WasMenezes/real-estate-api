import { HttpRequest, Authentication, Validation } from '@/presentation/controllers/login/login-protocols'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { badRequest, serverError, unauthorizedError } from '@/presentation/helpers/http-helper'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: Authentication.Params): Promise<Authentication.Result> {
      return new Promise(resolve => resolve({
        accessToken: 'any_token',
        name: 'any_name'
      }))
    }
  }
  return new AuthenticationStub()
}

interface SutTypes {
  sut: LoginController
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const authenticationStub = makeAuthenticationStub()
  const sut = new LoginController(validationStub, authenticationStub)
  return {
    sut,
    validationStub,
    authenticationStub
  }
}
describe('Login Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validatehpy = jest.spyOn(validationStub, 'validate')

    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(validatehpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return a badRequest if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      return new Error()
    })

    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authpy = jest.spyOn(authenticationStub, 'auth')

    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(authpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementation(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if Authentication returns null', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const httpRequest: HttpRequest = {
      body: {
        email: 'unauthorized_email@mail.com',
        password: 'any_password'
      }
    }
    const htpResponse = await sut.handle(httpRequest)
    expect(htpResponse).toEqual(unauthorizedError())
  })

  test('Should return authenticationModel if Authentication succeeds', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const htpResponse = await sut.handle(httpRequest)
    expect(htpResponse.body).toEqual({ accessToken: 'any_token', name: 'any_name' })
  })
})
