import { HttpException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { ChatService } from 'src/providers/chat.service'
import { Repository } from 'typeorm'
import { EditUsersDto } from './editUsers.dto'

@Injectable()
export class EditUsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private chatService: ChatService) {}

  async editOne(userId: string, data: EditUsersDto) {
    const { affected } = await this.usersRepository.update(userId, data)

    if (!affected) throw new HttpException('Edit action wasnt performed!', 500)

    this.chatService.userUpdated({ id: userId, notificationToken: data.expoPushToken })
  }
}
