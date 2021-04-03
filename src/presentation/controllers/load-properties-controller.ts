import { LoadProperties } from '@/domain/usecases/load-properties'
import { noContent, ok, serverError } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Controller } from '../protocols/controller'

export class LoadPropertiesController implements Controller {
  constructor (private readonly loadProperties: LoadProperties) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const properties = await this.loadProperties.load(httpRequest.body)
      return properties?.length ? ok(properties) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
