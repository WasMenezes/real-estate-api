import { DbAddProperty } from '@/data/usecases/db-add-property'
import { AddProperty } from '@/domain/usecases/add-property'
import { PropertyMongoRepository } from '@/infra/db/mongodb/property-mongo-repository'

export const makeDbAddProperty = (): AddProperty => {
  const propertyMongoRepository = new PropertyMongoRepository()
  return new DbAddProperty(propertyMongoRepository)
}
