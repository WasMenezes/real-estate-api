import { badRequest, serverError } from '../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../protocols'

export class AddPropertyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
