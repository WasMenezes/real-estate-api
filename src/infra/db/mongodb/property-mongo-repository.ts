import { PropertyResidentialCommercialModel, PropertyModel } from '@/domain/models/property-model'
import { AddProperty } from '@/domain/usecases/add-property'
import { MongoHelper } from './mongo-helper'

export class PropertyMongoRepository implements AddProperty {
  async add (property: PropertyResidentialCommercialModel | PropertyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('property')
    await surveyCollection.insertOne(property)
  }
}
