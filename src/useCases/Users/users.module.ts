import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { ChatServiceProvider } from 'src/providers/chat.service'
import { EditUsersController } from './editUsers/editUsers.controller'
import { EditUsersService } from './editUsers/editUsers.service'
import { GetUsersController } from './getUsers/getUsers.controller'
import { GetUsersService } from './getUsers/getUsers.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [EditUsersController, GetUsersController],
  providers: [EditUsersService, GetUsersService, ChatServiceProvider]
})
export class UsersModule {}
