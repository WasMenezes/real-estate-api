import { Encrypter } from '@/data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}
  async encrypt (plaintext: string): Promise<string> {
    return await jwt.sign({ id: plaintext }, this.secret)
  }
}
