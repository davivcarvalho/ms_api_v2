import { HttpException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { ChatService } from 'src/providers/chat.service'
import { GoogleOAuthService } from 'src/providers/googleOAuth.service'
import { Repository } from 'typeorm'
import { SignUpDto } from './signUp.dto'

@Injectable()
export class SignUpService {
  constructor(
    private googleOAuthService: GoogleOAuthService,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(ChatService) private chatService: ClientProxy
  ) {}

  async execute(data: SignUpDto) {
    await this.checkIfHasUser(data.email)

    const oAuthResult = await this.googleOAuthService.checkToken(data.idToken)

    if (oAuthResult.email !== data.email) throw new UnauthorizedException('Invalid token')

    const user = this.usersRepository.create({
      email: data.email,
      role: data.role,
      avatar: oAuthResult.picture,
      name: oAuthResult.name
    })

    await this.usersRepository.save(user)

    this.chatService.emit('user_created', {
      id: user.id,
      name: oAuthResult.name,
      avatar: oAuthResult.picture,
      email: data.email
    })

    return user
  }

  async checkIfHasUser(email: string) {
    const user = await this.usersRepository.findOne({ email })

    if (user) throw new HttpException('User already exists!', 500)
  }
}
