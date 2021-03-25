import { Hasher, HashComparer } from '@/data/protocols/criptography'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashComparer, Hasher {
  constructor (
    private readonly salt: number
  ) { }

  async hash (plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt)
  }

  async compare (plaitext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaitext, digest)
  }
}
