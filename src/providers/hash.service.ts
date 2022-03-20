import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

@Injectable()
export class HashService {
  verify(plainText: string, encriptedText: string) {
    return compare(plainText, encriptedText)
  }

  encrypt(plainText: string) {
    return hash(plainText, 10)
  }
}
