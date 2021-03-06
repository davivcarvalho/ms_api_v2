import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HealthCheckModule } from './providers/health.provider'
import { AuthModule } from './useCases/Auth/auth.module'
import { EquipmentsModule } from './useCases/Equipments/equipments.module'
import { OrdersModule } from './useCases/Orders/orders.module'
import { RequestsModule } from './useCases/Requests/requests.module'
import { UsersModule } from './useCases/Users/users.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_SCHEMA'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    RequestsModule,
    EquipmentsModule,
    OrdersModule,
    UsersModule,
    HealthCheckModule
  ]
})
export class AppModule {}
