import { AddProperty } from '@/domain/usecases/add-property'
import { AddPropertyRepository } from '../protocols/db/property/add-property-repository'

export class DbAddProperty implements AddProperty {
  constructor (
    private readonly addPropertyRepository: AddPropertyRepository
  ) { }

  async add (data: AddProperty.Params): Promise<void> {
    await this.addPropertyRepository.add(data)
  }
}
