import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpResponse, HttpRequest } from '../protocols/http'

export class LoginController {
  handle (httpRequest: HttpRequest): HttpResponse {
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
  }
}
