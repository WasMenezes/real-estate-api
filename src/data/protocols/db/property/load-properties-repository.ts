import { PropertyModel, PropertyResidentialCommercialModel } from '@/domain/models/property-model'
import { LoadProperties } from '@/domain/usecases/load-properties'

export interface LoadPropertiesRepository {
  loadByFilter: (filter: LoadProperties.PropertyFilter) => Promise<Array<PropertyModel | PropertyResidentialCommercialModel>>
}
