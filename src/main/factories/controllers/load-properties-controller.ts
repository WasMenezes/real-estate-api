import { LoadPropertiesController } from '@/presentation/controllers/load-properties-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'
import { makeDbLoadProperties } from '../usecases/db-load-properties-factory'

export const makeLoadPropertiesController = (): Controller => {
  return makeLogControllerDecorator(new LoadPropertiesController(makeDbLoadProperties()))
}
