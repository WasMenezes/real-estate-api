import { PropertyMongoRepository } from '@/infra/db/mongodb/property-mongo-repository'
import { AddPropertyController } from '@/presentation/controllers/add-property-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'
import { makeAddPropertyValidation } from './add-property-validation-factory'

export const makeAddPropertyController = (): Controller => {
  const addProperty = new PropertyMongoRepository()
  return makeLogControllerDecorator(new AddPropertyController(makeAddPropertyValidation(), addProperty))
}
