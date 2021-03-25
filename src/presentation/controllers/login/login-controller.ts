import { Authentication, HttpResponse, HttpRequest, Controller, Validation } from './login-protocols'
import { badRequest, serverError, unauthorizedError, ok } from '@/presentation/helpers/http-helper'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
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
