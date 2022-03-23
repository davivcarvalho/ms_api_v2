import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Equipment } from 'src/entities/equipment.entity'
import { Request } from 'src/entities/request.entity'
import { User } from 'src/entities/user.entity'
import { ChatService } from 'src/providers/chat.service'
import { GoogleOAuthService } from 'src/providers/googleOAuth.service'
import { HashService } from 'src/providers/hash.service'
import { SignInController } from './signIn/signIn.controller'
import { SignInService } from './signIn/signIn.service'
import { SignUpController } from './signUp/signUp.controller'
import { SignUpService } from './signUp/signUp.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Request, Equipment])],
  controllers: [SignInController, SignUpController],
  providers: [SignInService, SignUpService, GoogleOAuthService, ChatService, HashService]
})
export class AuthModule {}
