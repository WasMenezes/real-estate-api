import { LoadProperties } from '@/domain/usecases/load-properties'
import { ok } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Controller } from '../protocols/controller'

export class LoadPropertiesController implements Controller {
  constructor (private readonly loadProperties: LoadProperties) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const properties = await this.loadProperties.load(httpRequest.body)
    return ok(properties)
  }
}
