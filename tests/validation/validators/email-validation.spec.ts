import { EmailValidator } from '@/presentation/controllers/login/login-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidation } from '@/validation/validators/email-validation'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    emailValidatorStub,
    sut
  }
}

describe('EmailValidation', () => {
  test('should call emailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'valid_email@mail.com' })
    expect(emailValidatorSpy).toBeCalledWith('valid_email@mail.com')
  })

  test('should return null if a valid email is provided', () => {
    const { sut } = makeSut()
    const isValid = sut.validate({ email: 'valid_email@mail.com' })
    expect(isValid).toBeFalsy()
  })

  test('should return InvalidParamError if validate fails', () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'validate').mockImplementationOnce(() => {
      return new InvalidParamError('email')
    })
    const isValid = sut.validate('invalid_email@mail.com')
    expect(isValid).toEqual(new InvalidParamError('email'))
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
