import { AddPropertyRepository } from '@/data/protocols/db/property/add-property-repository'
import { MongoHelper } from './mongo-helper'

export class PropertyMongoRepository implements AddPropertyRepository {
  async add (data: AddPropertyRepository.Params): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('property')
    await surveyCollection.insertOne(data)
  }
}
