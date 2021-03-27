import { AddProperty } from '@/domain/usecases/add-property'
import { badRequest, serverError, noContent } from '../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../protocols'

export class AddPropertyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProperty: AddProperty
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      await this.addProperty.add({
        ...httpRequest.body,
        date: new Date()
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
