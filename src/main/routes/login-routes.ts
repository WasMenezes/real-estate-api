import { Router } from 'express'
export default (router: Router): void => {
  router.post('/login', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
