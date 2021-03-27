import { AddressModel } from './address-model'

export interface PropertyResidentialCommercialModel extends PropertyModel {
  registeredHousePlan: boolean
  propertyAge?: number
  suites?: number
  bathrooms?: number
  rooms?: number
  garage?: number
  garageCovered?: number
  airConditioner: boolean
  bar: boolean
  library: boolean
  barbecueGrill: boolean
  americanKitchen: boolean
  fittedKitchen: boolean
  pantry: boolean
  edicule: boolean
  office: boolean
  bathtub: boolean
  fireplace: boolean
  lavatory: boolean
  gurnished: boolean
  pool: boolean
  steamRoom: boolean
}

export type PropertyModel = {
  title: string
  description: string
  rent: boolean
  rentPrice: number
  sale: boolean
  salePrice: number
  adress: AddressModel
  currentTributePaid: boolean
  tributeBelongsOwner: boolean
  tribute: number
  condominium: number
  areaTotal: number
  areaUtil: number
  deed: boolean
  type: PropertyTypeModel
  createdAt: Date
  updated: Date
}

type PropertyTypeModel = {
  id: number
  description: string
}
