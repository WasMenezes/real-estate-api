import { Decrypter, Encrypter } from '@/data/protocols/criptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (plaintext: string): Promise<string> {
    return await jwt.sign({ id: plaintext }, this.secret)
  }

  async decrypt (cipherText: string): Promise<string> {
    return await jwt.verify(cipherText, this.secret) as any
  }
}
