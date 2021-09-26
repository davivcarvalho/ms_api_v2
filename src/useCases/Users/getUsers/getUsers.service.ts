import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GetUsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async getAll() {
    const [users, count] = await this.usersRepository.findAndCount()

    return { users, count }
  }
}
