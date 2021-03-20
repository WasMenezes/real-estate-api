import request from 'supertest'
import app from '@/main/config/app'

describe('Login Routes', () => {
  test('Should return an account name and accessToken on success', async () => {
    await request(app)
      .post('/api/login')
      .send({
        name: 'any_name',
        accessToken: 'access_token'
      })
      .expect(200)
  })
})
