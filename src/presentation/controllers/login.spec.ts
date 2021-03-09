import { LoginController } from './login'

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
})
