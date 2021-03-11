import { Authentication } from '@/domain/usecases/authentication'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http-helper'
import { HttpResponse, HttpRequest, Controller, EmailValidator } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication

  ) { }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.body.email) {
        return badRequest(new MissingParamError('email'))
      }

      if (!httpRequest.body.password) {
        return badRequest(new MissingParamError('password'))
      }

      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const acessToken = this.authentication.auth(httpRequest.body)
    } catch (error) {
      return serverError()
    }
  }
}
