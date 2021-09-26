import { Controller, Get } from '@nestjs/common'
import { GetEquipmentsService } from './getEquipments.service'

@Controller('equipments')
export class GetEquipmentsController {
  constructor(private getEquipmentsService: GetEquipmentsService) {}

  @Get()
  async getAll() {
    const [equipments, count] = await this.getEquipmentsService.getAll()

    return { equipments, count }
  }

  @Get('/trees')
  async getTrees() {
    const equipments = await this.getEquipmentsService.getTrees()

    return { equipments }
  }
}
