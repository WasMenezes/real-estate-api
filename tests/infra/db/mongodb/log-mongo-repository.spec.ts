import { LogMongoRepository } from '@/infra/db/mongodb/log-mongo-repository'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('Log Mongo Repository', () => {
  test('should call logError with correct values', async () => {
    const sut = makeSut()
    const logErrorSpy = jest.spyOn(sut, 'logError')
    await sut.logError('any_error')
    expect(logErrorSpy).toBeCalledWith('any_error')
  })
})
