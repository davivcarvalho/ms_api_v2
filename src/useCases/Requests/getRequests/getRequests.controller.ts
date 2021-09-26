import { Controller, Get, Param, Query } from '@nestjs/common'
import { GetRequestsService } from './getRequests.service'
import { isEmpty } from 'lodash'
import { GetRequestsDto } from './getRequests.dto'
@Controller('requests')
export class GetRequestsController {
  constructor(private getRequestsService: GetRequestsService) {}

  @Get()
  async getAll(@Query() query: GetRequestsDto) {
    if (!isEmpty(query)) return this.getRequestsService.getByFilter(query)

    return this.getRequestsService.getAll()
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const request = await this.getRequestsService.getOne(id)

    return { request }
  }
}
