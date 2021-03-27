import { PropertyResidentialCommercialModel, PropertyModel } from '../models/property-model'

export interface AddProperty {
  add: (property: PropertyResidentialCommercialModel | PropertyModel) => Promise<PropertyResidentialCommercialModel | PropertyModel>
}
