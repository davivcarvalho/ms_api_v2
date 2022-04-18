import { Injectable } from '@nestjs/common'
import { ClientProxy, ClientProxyFactory, CustomClientOptions, Transport } from '@nestjs/microservices'

@Injectable()
export class ChatService {
  private client: ClientProxy

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.KAFKA,
      options: {
        client:
          process.env.NODE_ENV === 'production'
            ? {
                clientId: 'chat',
                brokers: String(process.env.KAFKA_HOST).split(','),
                sasl: {
                  mechanism: process.env.KAFKA_MECHANISM,
                  username: process.env.KAFKA_USERNAME,
                  password: process.env.KAFKA_PASSWORD
                },
                ssl: process.env.KAFKA_SSL
              }
            : {
                clientId: 'chat',
                brokers: String(process.env.KAFKA_HOST).split(',')
              },
        consumer: {
          groupId: 'chat-consumer'
        }
      }
    } as unknown as CustomClientOptions)
  }

  async onApplicationBootstrap() {
    await this.client.connect()
  }

  public userCreated(data: any) {
    this.client.emit('chat.users.created', data)
  }

  public userUpdated(data: any) {
    this.client.emit('chat.users.updated', data)
  }
}
