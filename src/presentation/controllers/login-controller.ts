import { Authentication } from '@/domain/usecases'
import { badRequest, serverError, unauthorizedError, ok } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest.body)
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
