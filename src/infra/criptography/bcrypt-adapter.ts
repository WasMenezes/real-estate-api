import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashComparer, Encrypter {
  constructor (
    private readonly salt: number
  ) { }

  async encrypt (plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, this.salt)
  }

  async compare (plaitext: string, digest: string): Promise<boolean> {
    return await bcrypt.compare(plaitext, digest)
  }
}
