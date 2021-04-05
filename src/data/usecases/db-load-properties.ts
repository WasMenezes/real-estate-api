import { PropertyModel, PropertyResidentialCommercialModel } from '@/domain/models/property-model'
import { LoadProperties } from '@/domain/usecases/load-properties'
import { LoadPropertiesRepository } from '../protocols/db/property/load-properties-repository'

export class DbLoadProperties implements LoadProperties {
  constructor (
    private readonly loadPropertiesRepository: LoadPropertiesRepository
  ) { }

  async load (filter: LoadProperties.PropertyFilter): Promise<Array<PropertyModel | PropertyResidentialCommercialModel>> {
    const properties = await this.loadPropertiesRepository.loadByFilter(filter)
    return properties
  }
}
