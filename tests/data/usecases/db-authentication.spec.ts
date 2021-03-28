import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'
import { DbAuthentication } from '@/data/usecases/db-authentication'
import { HashComparer } from '../protocols/criptography/hash-comparer'
import { Encrypter } from '../protocols/criptography/encrypter'
import { UpdateAccessTokenRepository } from '../protocols/db/account/update-access-token-repository'

const makeFakeAccount = (): LoadAccountByEmailRepository.Result => ({
  id: 'any_id',
  name: 'any_name',
  password: 'hashed_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (): Promise<LoadAccountByEmailRepository.Result> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeHashComparerStub = (): HashComparer => {
  class HashComparerRepositorytub implements HashComparer {
    async compare (): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }

  return new HashComparerRepositorytub()
}

const makeEncrypterStub = (): Encrypter => {
  class HashComparerRepositorytub implements Encrypter {
    async encrypt (): Promise<string> {
      return new Promise(resolve => resolve('encrypted_value'))
    }
  }

  return new HashComparerRepositorytub()
}

const makeUpdateAccessTokenStub = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new UpdateAccessTokenRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparerStub()
  const encrypterStub = makeEncrypterStub()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenStub()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

describe('DbAuthentication Usecase', () => {
  describe('LoadAccountByEmailRepository', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut()
      const loadAccountByEmailRepositorySpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      await sut.auth({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(loadAccountByEmailRepositorySpy).toBeCalledWith('any_email@mail.com')
    })

    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut()
      jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(async () => { return new Promise(resolve => resolve(null)) })
      const httpResponse = await sut.auth({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(httpResponse).toEqual(null)
    })

    test('Should throws if LoadAccountByEmailRepository throw', async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut()
      jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(async () => {
        throw new Error()
      })
      const promise = sut.auth({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      await expect(promise).rejects.toThrow()
    })
  })

  describe('HashComparer', () => {
    test('Should call HashComparer with correct values', async () => {
      const { sut, hashComparerStub } = makeSut()
      const compareSpy = jest.spyOn(hashComparerStub, 'compare')
      await sut.auth({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(compareSpy).toBeCalledWith('any_password', makeFakeAccount().password)
    })

    test('Should return null if HashComparer return false', async () => {
      const { sut, hashComparerStub } = makeSut()
      jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(async () => new Promise(resolve => resolve(false)))
      const httpResponse = await sut.auth({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(httpResponse).toBe(null)
    })

    test('Should throw if HashComparer throws', async () => {
      const { sut, hashComparerStub } = makeSut()
      jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.auth({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      await expect(promise).rejects.toThrow()
    })
  })

  describe('Encrypter', () => {
    test('should call encryter with correct values', async () => {
      const { sut, encrypterStub } = makeSut()
      const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
      await sut.auth({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(encryptSpy).toBeCalledWith(makeFakeAccount().id)
    })

    test('should throws if encryter throws', async () => {
      const { sut, encrypterStub } = makeSut()
      jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.auth({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      await expect(promise).rejects.toThrow()
    })
  })

  describe('UpdateAccessTokenStub', () => {
    test('should call updateAccessToken with correct values', async () => {
      const { sut, updateAccessTokenRepositoryStub } = makeSut()
      const updateAccessTokenSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
      await sut.auth({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(updateAccessTokenSpy).toBeCalledWith('any_id', 'encrypted_value')
    })

    test('should throw if updateAccessToken throws', async () => {
      const { sut, updateAccessTokenRepositoryStub } = makeSut()
      jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.auth({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      await expect(promise).rejects.toThrow()
    })
  })

  test('should return Authentication Result if auth succeeds', async () => {
    const { sut } = makeSut()
    const account = await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(account).toEqual({
      name: 'any_name',
      accessToken: 'encrypted_value'
    })
  })
})
