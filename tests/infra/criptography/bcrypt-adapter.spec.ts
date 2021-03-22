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

    test('should return fail when compare fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
      const isValid = await sut.compare('any_text', 'any_hash')
      expect(isValid).toBe(false)
    })

    test('should throw if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockRejectedValueOnce(new Error())
      const promise = sut.compare('any_text', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
  })
})
