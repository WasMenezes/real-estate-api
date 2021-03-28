import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => resolve('encrypted_value'))
  },

  async verify (): Promise<string> {
    return new Promise(resolve => resolve('decrypted_value'))
  }
}))

const secret = 'any_secret'
const makeSut = (): JwtAdapter => {
  return new JwtAdapter(secret)
}

describe('Jwt Adapter', () => {
  describe('encrypt()', () => {
    test('Should JwtAdapter calls encrypt with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_value')
      expect(signSpy).toBeCalledWith({ id: 'any_value' }, secret)
    })

    test('Should JwtAdapter throws if encrypt throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.encrypt('any_value')
      await expect(promise).rejects.toThrow()
    })

    test('Should JwtAdapter return hashed value when encrypt succeeds', async () => {
      const sut = makeSut()
      const httpResponse = await sut.encrypt('any_value')
      expect(httpResponse).toBe('encrypted_value')
    })
  })

  describe('decrypt()', () => {
    test('Should JwtAdapter calls decrypt with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('cipher_text')
      expect(verifySpy).toBeCalledWith('cipher_text', secret)
    })

    test('Should JwtAdapter throws if decrypt throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.decrypt('cipher_text')
      await expect(promise).rejects.toThrow()
    })

    test('Should JwtAdapter return hashed value when decrypt succeeds', async () => {
      const sut = makeSut()
      const httpResponse = await sut.decrypt('cipher_text')
      expect(httpResponse).toBe('decrypted_value')
    })
  })
})
