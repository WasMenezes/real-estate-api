import { Controller, HttpRequest, HttpResponse, Validation } from '../protocols'

export class AddPropertyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.validation.validate(httpRequest)
    return null
  }
}
