import { Authentication, HttpResponse, HttpRequest, Controller, EmailValidator } from './login-protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { badRequest, serverError, unauthorizedError, ok } from '@/presentation/helpers/http-helper'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication

  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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
      const authenticationModel = await this.authentication.auth(httpRequest.body)
      if (!authenticationModel) {
        return unauthorizedError()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
