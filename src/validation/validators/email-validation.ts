import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidatorAdapter: EmailValidatorAdapter
  ) { }

  validate (input: any): Error {
    const isValid = this.emailValidatorAdapter.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
