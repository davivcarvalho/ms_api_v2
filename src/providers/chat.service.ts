import { Injectable } from '@nestjs/common'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'

@Injectable()
export class ChatService {
  private client: ClientProxy

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'chat',
          brokers: ['loved-whippet-8108-us1-kafka.upstash.io:9092'],
          sasl: {
            mechanism: 'scram-sha-256',
            username: 'bG92ZWQtd2hpcHBldC04MTA4JGQK_qaqHQVnpXOD02ItKZfS41tGoWrbMp0Pv4k',
            password: '5IVOSoz6lDU9zf9TNXBmqmxmgGkDIxPesCGC-JANU8LtWamG1fmuLN3o3gEos3RNniklwg=='
          },
          ssl: true
        },
        consumer: {
          groupId: 'chat-consumer'
        }
      }
    })
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
