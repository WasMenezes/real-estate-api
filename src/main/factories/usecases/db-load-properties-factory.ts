import { DbLoadProperties } from '@/data/usecases/db-load-properties'
import { PropertyMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadProperties = (): DbLoadProperties => {
  const loadPropertiesRepository = new PropertyMongoRepository()
  return new DbLoadProperties(loadPropertiesRepository)
}
