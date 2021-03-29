import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoginController } from '../factories/controllers/login-controller-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/login', auth, adaptRoute(makeLoginController()))
}
