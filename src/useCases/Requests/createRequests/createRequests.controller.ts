import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { CreateRequestDto } from './createRequests.dto'
import { CreateRequestService } from './createRequests.service'

@Controller('requests')
export class CreateRequestsController {
  constructor(private createRequestsService: CreateRequestService) {}

  @Post()
  async createOne(@Body() data: CreateRequestDto) {
    try {
      const request = await this.createRequestsService.createOne(data)

      return { request }
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
}
