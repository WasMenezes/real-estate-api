import { LogMongoRepository, MongoHelper } from '@/infra/db/mongodb'
import { Collection } from 'mongodb'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

let errorCollection: Collection
describe('Log Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('should call logError with correct values', async () => {
    const sut = makeSut()
    const logErrorSpy = jest.spyOn(sut, 'logError')
    await sut.logError('any_error')
    expect(logErrorSpy).toBeCalledWith('any_error')
  })

  test('should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const errors = await errorCollection.countDocuments()
    expect(errors).toBe(1)
  })
})
