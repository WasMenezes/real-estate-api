import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { LogControllerDecorator } from '@/main/decorator/log-controller-decorator'
import { serverError } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (): Promise<HttpResponse> {
      return new Promise(resolve => resolve({ statusCode: 200, body: '' }))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepositoryStub = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {

    }
  }
  return new LogErrorRepositoryStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const logErrorRepositoryStub = makeLogErrorRepositoryStub()
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub
  )
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}
describe('LogControllerDecorator', () => {
  test('should controller call handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest: HttpRequest = {
      body: {
        field: 'any_value'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toBeCalledWith(httpRequest)
  })

  test('should call logError if httpResponse returns statusCode 500', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const serverErrorMock = serverError(new Error())
    jest.spyOn(controllerStub, 'handle').mockImplementationOnce(async () => {
      return new Promise(resolve => resolve(serverErrorMock))
    })
    const logErrorSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    const httpRequest: HttpRequest = {
      body: {
        field: 'any_value'
      }
    }
    await sut.handle(httpRequest)
    expect(logErrorSpy).toBeCalled()
    expect(logErrorSpy).toBeCalledWith(serverErrorMock.body.stack)
  })
})
