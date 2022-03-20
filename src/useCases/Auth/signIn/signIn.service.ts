import { Injectable, UnauthorizedException } from '@nestjs/common'
import { SignInDto } from './signIn.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { HashService } from 'src/providers/hash.service'

@Injectable()
export class SignInService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private hashService: HashService) {}

  async execute({ username, password }: SignInDto) {
    const user = await this.usersRepository.findOne({ username })
    if (!user) throw new UnauthorizedException({ message: 'Invalid username or password' })

    if (!(await this.hashService.verify(password, user.password)))
      throw new UnauthorizedException({ message: 'Invalid username or password' })

    return user
  }
}
