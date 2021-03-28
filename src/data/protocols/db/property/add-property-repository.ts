import { AddProperty } from '@/domain/usecases/add-property'

export interface AddPropertyRepository {
  add: (data: AddPropertyRepository.Params) => Promise<void>
}

export namespace AddPropertyRepository {
  export type Params = AddProperty.Params
}
