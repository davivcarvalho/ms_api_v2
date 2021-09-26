import { Injectable, UnauthorizedException } from '@nestjs/common'
import { SignInDto } from './signIn.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { GoogleOAuthService } from 'src/providers/googleOAuth.service'

@Injectable()
export class SignInService {
  constructor(
    private googleOAuthService: GoogleOAuthService,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async execute({ idToken, email }: SignInDto) {
    // this.checkEmailDomain(email)

    const oAuthResult = await this.googleOAuthService.checkToken(idToken)

    if (oAuthResult.email !== email) throw new UnauthorizedException('Invalid token')

    const user = await this.usersRepository.findOne({ email })
    if (!user) throw new UnauthorizedException({ message: 'User not found!', signup: true })

    return user
  }

  checkEmailDomain(email: string) {
    if (!/@aperam.com\s*$/.test(email))
      throw new UnauthorizedException('Invalid email domain, only @aperam.com is allowed')
  }
}
