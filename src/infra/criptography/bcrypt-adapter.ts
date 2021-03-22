import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashComparer {
  constructor (
    private readonly salt: number
  ) { }

  async compare (plaitext: string, digest: string): Promise<boolean> {
    return await bcrypt.compare(plaitext, digest)
  }
}
