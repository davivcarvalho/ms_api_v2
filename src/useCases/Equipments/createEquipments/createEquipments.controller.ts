import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { CreateEquipementsService } from './createEquipements.service'
import { CreateEquipmentsDto } from './createEquipments.dto'

@Controller('equipments')
export class CreateEquipmentsController {
  constructor(private createEquipmentsService: CreateEquipementsService) {}

  @Post()
  async handle(@Body() data: CreateEquipmentsDto) {
    try {
      const equipment = await this.createEquipmentsService.createOne(data)

      return { equipment }
    } catch (error) {
      throw new HttpException(error?.message, 500)
    }
  }
}
