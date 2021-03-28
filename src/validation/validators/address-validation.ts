import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'

export class AddressValidation implements Validation {
  constructor (
    private readonly addressField: string,
    private readonly fieldNames: string[]
  ) {}

  validate (input: any): Error {
    for (const fieldName of this.fieldNames) {
      if (!input[this.addressField][fieldName]) {
        return new MissingParamError(fieldName)
      }
    }
  }
}
