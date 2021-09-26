import { Order } from 'src/entities/order.entity'

export class OrderCreatedEvent {
  constructor(public order: Order) {}
}
