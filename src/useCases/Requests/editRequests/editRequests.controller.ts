import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { EditRequestsDto } from './editRequests.dto'
import { EditRequestsService } from './editRequests.service'

@Controller('requests')
export class EditRequestsController {
  constructor(private editRequestsService: EditRequestsService) {}

  @Put(':id')
  @HttpCode(204)
  async editRequests(@Param('id') requestId: string, @Body() data: EditRequestsDto) {
    await this.editRequestsService.editOne(requestId, data)
  }
}
