import { Controller, Get } from '@nestjs/common'
import { GetUsersService } from './getUsers.service'

@Controller('users')
export class GetUsersController {
  constructor(private getUsersService: GetUsersService) {}

  @Get()
  getUsers() {
    const result = this.getUsersService.getAll()

    return result
  }
}
