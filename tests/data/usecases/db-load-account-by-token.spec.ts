import { Decrypter } from '../protocols/criptography'
import { LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'
import { DbLoadAccountByToken } from '@/data/usecases/db-load-account-by-token'

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (): Promise<string> {
      return new Promise(resolve => resolve('descrypted_value'))
    }
  }

  return new DecrypterStub()
}

const makeLoadAccountByTokenRepositoryStub = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositorStub implements LoadAccountByTokenRepository {
    async loadByToken (): Promise<LoadAccountByTokenRepository.Result> {
      return new Promise(resolve => resolve({ id: 'any_id' }))
    }
  }
  return new LoadAccountByTokenRepositorStub()
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepositoryStub()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

describe('DbLoadAccountByToken Usecase', () => {
  describe('decrypter', () => {
    test('should call decrypter with correct values', async () => {
      const { sut, decrypterStub } = makeSut()
      const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
      await sut.load('any_token')
      expect(decrypterSpy).toHaveBeenCalledWith('any_token')
    })
  })
})
