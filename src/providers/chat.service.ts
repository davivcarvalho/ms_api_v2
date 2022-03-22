import { ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'

export class ChatService {}

export const ChatServiceProvider = {
  provide: ChatService,
  useFactory: (configService: ConfigService) => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: configService.get('CHAT_SERVICE_HOST')
      }
    })
  },
  inject: [ConfigService]
}

// @MessagePattern('createUser')
// @MessagePattern('updateUser')
// @MessagePattern('removeUser')
