import { Body, Controller, Param, Put } from '@nestjs/common'
import { EditUsersDto } from './editUsers.dto'
import { EditUsersService } from './editUsers.service'

@Controller('users')
export class EditUsersController {
  constructor(private editUsersService: EditUsersService) {}

  @Put(':id')
  async editOne(@Param('id') userId: string, @Body() data: EditUsersDto) {
    await this.editUsersService.editOne(userId, data)

    return {}
  }
}
