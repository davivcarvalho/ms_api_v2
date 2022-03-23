import { HttpException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { ChatService } from 'src/providers/chat.service'
import { HashService } from 'src/providers/hash.service'
import { Repository } from 'typeorm'
import { SignUpDto } from './signUp.dto'

@Injectable()
export class SignUpService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private chatService: ChatService,
    private hashService: HashService
  ) {}

  async execute(data: SignUpDto) {
    await this.checkIfHasUser(data.username)

    const user = this.usersRepository.create({
      username: data.username,
      name: data.name,
      role: data.role,
      avatar: `https://ui-avatars.com/api/?background=random&name=${data.name.replace(' ', '+')}`,
      password: await this.hashService.encrypt(data.password)
    })
    await this.usersRepository.save(user)

    this.chatService.userCreated({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      username: user.username
    })

    return user
  }

  async checkIfHasUser(username: string) {
    const user = await this.usersRepository.findOne({ username })

    if (user) throw new HttpException('User already exists!', 500)
  }
}
