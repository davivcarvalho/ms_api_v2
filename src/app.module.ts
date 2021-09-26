import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './useCases/Auth/auth.module'
import { EquipmentsModule } from './useCases/Equipments/equipments.module'
import { OrdersModule } from './useCases/Orders/orders.module'
import { RequestsModule } from './useCases/Requests/requests.module'
import { UsersModule } from './useCases/Users/users.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'api',
      autoLoadEntities: true,
      synchronize: true
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    AuthModule,
    RequestsModule,
    EquipmentsModule,
    OrdersModule,
    UsersModule
  ]
})
export class AppModule {}
