import { Body, Controller, Post } from '@nestjs/common'
import { SignUpDto } from './signUp.dto'
import { SignUpService } from './signUp.service'

@Controller('auth/signup')
export class SignUpController {
  constructor(private signUpService: SignUpService) {}

  @Post()
  async signUp(@Body() data: SignUpDto) {
    const user = await this.signUpService.execute(data)

    return { user }
  }
}
