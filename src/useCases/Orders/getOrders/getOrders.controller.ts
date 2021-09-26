import { Controller, Get } from '@nestjs/common'
import { GetOrdersService } from './getOrders.service'

@Controller('orders')
export class GetOrdersController {
  constructor(private getOrdersService: GetOrdersService) {}

  @Get()
  getAll() {
    return this.getOrdersService.getAll()
  }
}
