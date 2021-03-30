import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoginController } from '../factories/controllers/login-controller-factory'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
