import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { DeleteRequestsService } from './deleteRequests.service'

@Controller('requests')
export class DeleteRequestsController {
  constructor(private deleteRequestsService: DeleteRequestsService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') requestId: string) {
    await this.deleteRequestsService.deleteOne(requestId)
  }
}
