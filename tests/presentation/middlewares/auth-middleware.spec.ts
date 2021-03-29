import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'

class LoadAccountByTokenStub implements LoadAccountByToken {
  async load (): Promise<LoadAccountByToken.Result> {
    return new Promise(resolve => resolve({ id: 'any_id' }))
  }
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = new LoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)
  return {
    sut,
    loadAccountByTokenStub
  }
}

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByTokenStub
}

describe('AuthMiddleware', () => {
  const role = 'any_role'
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadAccountByTokenSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const httpRequest = {
      accessToken: 'any_token',
      role
    }
    await sut.handle(httpRequest)
    expect(loadAccountByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should return forbidden if not found account', async () => {
    const { sut, loadAccountByTokenStub } = makeSut(role)
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(() => {
      return null
    })
    const httpRequest = {
      accessToken: 'any_token',
      role
    }
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut(role)
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(async () => {
      throw new Error()
    })
    const httpRequest = {
      accessToken: 'any_token',
      role
    }
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      accessToken: 'any_token',
      role
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ accountId: 'any_id' }))
  })
})
