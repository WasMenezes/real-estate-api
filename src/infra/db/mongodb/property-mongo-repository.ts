import { AddPropertyRepository } from '@/data/protocols/db/property/add-property-repository'
import { LoadPropertiesRepository } from '@/data/protocols/db/property/load-properties-repository'
import { PropertyModel, PropertyResidentialCommercialModel } from '@/domain/models/property-model'
import { LoadProperties } from '@/domain/usecases/load-properties'
import { MongoHelper } from '@/infra/db/mongodb'

export class PropertyMongoRepository implements AddPropertyRepository, LoadPropertiesRepository {
  async add (data: AddPropertyRepository.Params): Promise<void> {
    const propertyCollection = await MongoHelper.getCollection('property')
    await propertyCollection.insertOne(data)
  }

  async loadByFilter (filter: LoadProperties.PropertyFilter): Promise<Array<PropertyModel | PropertyResidentialCommercialModel>> {
    const propertyCollection = await MongoHelper.getCollection('property')
    const query = filter ? { $and: [] } : {}

    if (filter.rent != null) { query.$and.push({ rent: filter.rent }) }
    if (filter.rentPriceMin) { query.$and.push({ rentPrice: { $gt: filter.rentPriceMin } }) }
    if (filter.rentPriceMax) { query.$and.push({ rentPrice: { $lt: filter.rentPriceMax } }) }
    if (filter.sale != null) { query.$and.push({ sale: filter.sale }) }
    if (filter.salePriceMin) { query.$and.push({ salePrice: { $gt: filter.salePriceMin } }) }
    if (filter.salePriceMax) { query.$and.push({ salePrice: { $lt: filter.salePriceMax } }) }
    if (filter.currentTributePaid != null) { query.$and.push({ currentTributePaid: filter.currentTributePaid }) }
    if (filter.tributeBelongsOwner != null) { query.$and.push({ tributeBelongsOwner: filter.tributeBelongsOwner }) }
    if (filter.tribute) { query.$and.push({ tribute: filter.tribute }) }
    if (filter.condominium) { query.$and.push({ condominium: filter.condominium }) }
    if (filter.areaTotal) { query.$and.push({ areaTotal: { $gt: filter.areaTotal } }) }
    if (filter.areaUtil) { query.$and.push({ areaUtil: { $gt: filter.areaUtil } }) }
    if (filter.deed != null) { query.$and.push({ deed: filter.deed }) }
    if (filter.type) { query.$and.push({ type: filter.type }) }
    if (filter.registeredHousePlan != null) { query.$and.push({ registeredHousePlan: filter.registeredHousePlan }) }
    if (filter.suites) { query.$and.push({ suites: { $gt: filter.suites } }) }
    if (filter.bathrooms) { query.$and.push({ bathrooms: { $gt: filter.bathrooms } }) }
    if (filter.rooms) { query.$and.push({ rooms: { $gt: filter.rooms } }) }
    if (filter.garage) { query.$and.push({ garage: { $gt: filter.garage } }) }
    if (filter.garageCovered) { query.$and.push({ garageCovered: { $gt: filter.garageCovered } }) }
    if (filter.airConditioner != null) { query.$and.push({ airConditioner: filter.airConditioner }) }
    if (filter.bar != null) { query.$and.push({ bar: filter.bar }) }
    if (filter.library != null) { query.$and.push({ library: filter.library }) }
    if (filter.barbecueGrill != null) { query.$and.push({ barbecueGrill: filter.barbecueGrill }) }
    if (filter.americanKitchen != null) { query.$and.push({ americanKitchen: filter.americanKitchen }) }
    if (filter.fittedKitchen != null) { query.$and.push({ fittedKitchen: filter.fittedKitchen }) }
    if (filter.pantry != null) { query.$and.push({ pantry: filter.pantry }) }
    if (filter.edicule != null) { query.$and.push({ edicule: filter.edicule }) }
    if (filter.office != null) { query.$and.push({ office: filter.office }) }
    if (filter.bathtub != null) { query.$and.push({ bathtub: filter.bathtub }) }
    if (filter.fireplace != null) { query.$and.push({ fireplace: filter.fireplace }) }
    if (filter.lavatory != null) { query.$and.push({ lavatory: filter.lavatory }) }
    if (filter.gurnished != null) { query.$and.push({ gurnished: filter.gurnished }) }
    if (filter.pool != null) { query.$and.push({ pool: filter.pool }) }
    if (filter.steamRoom != null) { query.$and.push({ steamRoom: filter.steamRoom }) }
    return await propertyCollection.find(query).toArray()
  }
}
