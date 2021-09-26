import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Equipment } from 'src/entities/equipment.entity'
import { CreateEquipementsService } from './createEquipments/createEquipements.service'
import { CreateEquipmentsController } from './createEquipments/createEquipments.controller'
import { GetEquipmentsController } from './getEquipments/getEquipments.controller'
import { GetEquipmentsService } from './getEquipments/getEquipments.service'

@Module({
  imports: [TypeOrmModule.forFeature([Equipment])],
  controllers: [CreateEquipmentsController, GetEquipmentsController],
  providers: [CreateEquipementsService, GetEquipmentsService]
})
export class EquipmentsModule {}
