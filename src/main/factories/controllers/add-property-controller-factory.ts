import { AddPropertyController } from '@/presentation/controllers/add-property-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'
import { makeDbAddProperty } from '../usecases/db-add-property-factory'
import { makeAddPropertyValidation } from './add-property-validation-factory'

export const makeAddPropertyController = (): Controller => {
  return makeLogControllerDecorator(new AddPropertyController(makeAddPropertyValidation(), makeDbAddProperty()))
}
