import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from 'src/entities/order.entity'
import { Request } from 'src/entities/request.entity'
import { User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateOrdersDto } from './createOrders.dto'
import { OrderCreatedEvent } from './createOrders.event'

@Injectable()
export class CreateOrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Request) private requestsRepository: Repository<Request>,
    private eventEmitter: EventEmitter2
  ) {}

  async createOrFindOne(data: CreateOrdersDto) {
    const order = await this.ordersRepository.findOne(
      { request: { id: data.requestId } },
      { relations: ['createdBy', 'request', 'request.equipment', 'request.createdBy'] }
    )
    if (order) return { order, created: false }

    const [user, request] = await Promise.all([
      this.usersRepository.findOneOrFail(data.createdBy),
      this.requestsRepository.findOneOrFail(data.requestId, { relations: ['equipment', 'createdBy'] })
    ])

    const createdOrder = await this.ordersRepository.save(
      this.ordersRepository.create({
        createdBy: user,
        request: request
      })
    )

    this.eventEmitter.emit('order.created', new OrderCreatedEvent(createdOrder))

    return { order: createdOrder, created: true }
  }
}
