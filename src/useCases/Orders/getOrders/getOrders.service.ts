import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from 'src/entities/order.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GetOrdersService {
  constructor(@InjectRepository(Order) private ordersRepository: Repository<Order>) {}

  async getAll() {
    const [orders, count] = await this.ordersRepository.findAndCount({ relations: ['createdBy', 'request'] })

    return { orders, count }
  }
}
