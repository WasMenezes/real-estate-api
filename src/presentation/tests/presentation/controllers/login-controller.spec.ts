import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { LoginController } from '@/presentation/controllers/login-controller'

const makeSut = (): LoginController => {
  return new LoginController()
}
describe('Login Controller', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = makeSut()
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
    const sut = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
})
