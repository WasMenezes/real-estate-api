import { DbLoadAccountByToken } from '@/data/usecases/db-load-account-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): DbLoadAccountByToken => {
  const bcrypter = new JwtAdapter(env.jwtSecret)
  const loadAccountByTokenRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(bcrypter, loadAccountByTokenRepository)
}
