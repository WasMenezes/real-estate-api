import { AddressModel } from '../models/address-model'
import { PropertyModel, PropertyResidentialCommercialModel } from '../models/property-model'

export interface LoadProperties {
  load: (filter?: LoadProperties.PropertyFilter) => Promise<Array<PropertyModel | PropertyResidentialCommercialModel>>
}

export namespace LoadProperties {
  export type PropertyFilter = {
    rent?: boolean
    rentPriceMin?: number
    rentPriceMax?: number
    sale?: boolean
    salePriceMin?: number
    salePriceMax?: number
    address?: AddressModel
    currentTributePaid?: boolean
    tributeBelongsOwner?: boolean
    tribute?: number
    condominium?: number
    areaTotal?: number
    areaUtil?: number
    deed?: boolean
    type?: number
    registeredHousePlan?: boolean
    propertyAge?: number
    suites?: number
    bathrooms?: number
    rooms?: number
    garage?: number
    garageCovered?: number
    airConditioner?: boolean
    bar?: boolean
    library?: boolean
    barbecueGrill?: boolean
    americanKitchen?: boolean
    fittedKitchen?: boolean
    pantry?: boolean
    edicule?: boolean
    office?: boolean
    bathtub?: boolean
    fireplace?: boolean
    lavatory?: boolean
    gurnished?: boolean
    pool?: boolean
    steamRoom?: boolean
  }
}
