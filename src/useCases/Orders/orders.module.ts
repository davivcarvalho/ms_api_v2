import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from 'src/entities/order.entity'
import { Request } from 'src/entities/request.entity'
import { User } from 'src/entities/user.entity'
import { CreateOrdersController } from './createOrders/createOrders.controller'
import { CreateOrdersService } from './createOrders/createOrders.service'
import { GetOrdersController } from './getOrders/getOrders.controller'
import { GetOrdersService } from './getOrders/getOrders.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Request])],
  controllers: [CreateOrdersController, GetOrdersController],
  providers: [CreateOrdersService, GetOrdersService]
})
export class OrdersModule {}
