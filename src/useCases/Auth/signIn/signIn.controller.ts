import { Body, Controller, Post } from '@nestjs/common'
import { SignInDto } from './signIn.dto'
import { SignInService } from './signIn.service'

@Controller('auth/signin')
export class SignInController {
  constructor(private signInService: SignInService) {}

  @Post()
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.signInService.execute(signInDto)

    return { user }
  }
}
