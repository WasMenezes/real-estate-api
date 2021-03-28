import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'

export class TwoFieldsRequiredValidation implements Validation {
  constructor (
    private readonly fieldNameVerify: string,
    private readonly fieldNameRequired: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldNameVerify]) {
      if (!input[this.fieldNameRequired]) {
        return new MissingParamError(this.fieldNameRequired)
      }
    }
  }
}
