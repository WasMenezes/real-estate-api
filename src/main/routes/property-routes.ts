import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddPropertyController } from '../factories/controllers/add-property-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/properties', adminAuth, adaptRoute(makeAddPropertyController()))
}
