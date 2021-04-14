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

  async loadByFilter (filter?: LoadProperties.PropertyFilter): Promise<Array<PropertyModel | PropertyResidentialCommercialModel>> {
    const propertyCollection = await MongoHelper.getCollection('property')
    const query: any = Object.keys(filter).length > 0 ? { $and: [] } : filter

    if (filter) {
      const filterFields = [
        'rent',
        'sale',
        'currentTributePaid',
        'tributeBelongsOwner',
        'deed',
        'registeredHousePlan',
        'airConditioner',
        'bar',
        'library',
        'barbecueGrill',
        'americanKitchen',
        'fittedKitchen',
        'pantry',
        'edicule',
        'office',
        'bathtub',
        'fireplace',
        'lavatory',
        'gurnished',
        'pool',
        'steamRoom',
        'tribute',
        'condominium',
        'areaTotal',
        'areaUtil',
        'bathrooms',
        'rooms',
        'garage',
        'garageCovered'
      ]

      for (const field of filterFields) {
        if (filter[field] != null) { query.$and.push({ [field]: filter[field] }) }
      }
      if (filter.rentPriceMin) { query.$and.push({ rentPrice: { $gt: filter.rentPriceMin } }) }
      if (filter.rentPriceMax) { query.$and.push({ rentPrice: { $lt: filter.rentPriceMax } }) }
      if (filter.salePriceMin) { query.$and.push({ salePrice: { $gt: filter.salePriceMin } }) }
      if (filter.salePriceMax) { query.$and.push({ salePrice: { $lt: filter.salePriceMax } }) }
    }
    const properties = await propertyCollection.find(query).toArray()
    return properties && MongoHelper.mapCollection(properties)
  }
}
