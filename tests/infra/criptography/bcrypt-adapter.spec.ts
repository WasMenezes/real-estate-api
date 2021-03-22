import bcrypt from 'bcrypt'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async compare (): Promise<boolean> {
    return true
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hashComparer()', () => {
    test('should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_text', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_text', 'any_hash')
    })

    test('should return true when compare succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.compare('any_text', 'any_hash')
      expect(isValid).toBe(true)
    })
  })
})
