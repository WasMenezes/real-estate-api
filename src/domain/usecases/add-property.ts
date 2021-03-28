import { PropertyResidentialCommercialModel, PropertyModel } from '../models/property-model'

export interface AddProperty {
  add: (data: AddProperty.Params) => Promise<void>
}

export namespace AddProperty {
  export type Params = Omit<PropertyModel | PropertyResidentialCommercialModel, 'id'>
}
