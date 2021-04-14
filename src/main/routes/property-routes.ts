import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddPropertyController } from '../factories/controllers/add-property-controller-factory'
import { makeLoadPropertiesController } from '../factories/controllers/load-properties-controller'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/properties', adminAuth, adaptRoute(makeAddPropertyController()))
  router.get('/properties', adaptRoute(makeLoadPropertiesController()))
}
