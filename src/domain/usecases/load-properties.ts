import { PropertyModel, PropertyResidentialCommercialModel } from '../models/property-model'

export interface LoadProperties {
  load: (filter: any) => Promise<PropertyModel[] | PropertyResidentialCommercialModel[]>
}
