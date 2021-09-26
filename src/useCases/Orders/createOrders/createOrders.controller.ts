import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common'
import { CreateOrdersDto } from './createOrders.dto'
import { CreateOrdersService } from './createOrders.service'

@Controller('orders')
export class CreateOrdersController {
  constructor(private createOrdersService: CreateOrdersService) {}

  @Post()
  @HttpCode(200)
  async createOrders(@Body() data: CreateOrdersDto, @Res({ passthrough: true }) response) {
    const { order, created } = await this.createOrdersService.createOrFindOne(data)

    if (created) response.status(201)

    return { order }
  }
}
