import { Injectable } from '@nestjs/common'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'

@Injectable()
export class ChatService {
  private client: ClientProxy

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: process.env.REDIS_URL,
        retryAttempts: 10,
        retryDelay: 5
      }
    })
  }

  async onApplicationBootstrap() {
    await this.client.connect()
  }

  public userCreated(data: any) {
    return this.client.emit('user_created', data)
  }

  public userUpdated(data: any) {
    return this.client.emit('user_updated', data)
  }
}

// @MessagePattern('createUser')
// @MessagePattern('updateUser')
// @MessagePattern('removeUser')
