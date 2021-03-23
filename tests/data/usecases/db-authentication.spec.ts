import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'
import { DbAuthentication } from '@/data/usecases/db-authentication'
import { HashComparer } from '../protocols/criptography/hash-comparer'

const makeFakeAccount = (): LoadAccountByEmailRepository.Result => ({
  id: 'any_id',
  name: 'any_name',
  password: 'hashed_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeHashComparerRepository = (): HashComparer => {
  class HashComparerRepositorytub implements HashComparer {
    async compare (plaitext: string, digest: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }

  return new HashComparerRepositorytub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparerRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub
  }
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
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
})
