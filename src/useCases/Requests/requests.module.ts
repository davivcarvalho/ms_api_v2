import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Equipment } from 'src/entities/equipment.entity'
import { Request } from 'src/entities/request.entity'
import { User } from 'src/entities/user.entity'
import { CreateRequestsController } from './createRequests/createRequests.controller'
import { CreateRequestService } from './createRequests/createRequests.service'
import { DeleteRequestsController } from './deleteRequests/deleteRequests.controller'
import { DeleteRequestsService } from './deleteRequests/deleteRequests.service'
import { EditRequestsController } from './editRequests/editRequests.controller'
import { EditRequestsService } from './editRequests/editRequests.service'
import { GetRequestsController } from './getRequests/getRequests.controller'
import { GetRequestsService } from './getRequests/getRequests.service'

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, Request, User])],
  controllers: [CreateRequestsController, GetRequestsController, DeleteRequestsController, EditRequestsController],
  providers: [CreateRequestService, GetRequestsService, DeleteRequestsService, EditRequestsService]
})
export class RequestsModule {}
