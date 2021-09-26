import { HttpException, Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { InjectRepository } from '@nestjs/typeorm'
import { Request, RequestStatus } from 'src/entities/request.entity'
import { OrderCreatedEvent } from 'src/useCases/Orders/createOrders/createOrders.event'
import { Repository } from 'typeorm'
import { EditRequestsDto } from './editRequests.dto'

@Injectable()
export class EditRequestsService {
  constructor(@InjectRepository(Request) private requestsRepository: Repository<Request>) {}

  async editOne(requestId: string, data: EditRequestsDto) {
    const updateQuery = {} as {
      description?: string
      equipment?: { id: string }
      priority?: number
      status?: RequestStatus
    }

    if (data.equipmentId) updateQuery.equipment = { id: data.equipmentId.toString() }
    if (data.description) updateQuery.description = data.description
    if (data.priority) updateQuery.priority = data.priority
    if (data.status) updateQuery.status = data.status

    if (Object.keys(updateQuery).length === 0)
      throw new HttpException('At least one atribute is required to update!', 500)

    const { affected } = await this.requestsRepository.update({ id: requestId }, updateQuery)

    if (!affected) throw new HttpException('Uptade action not been performed!', 500)
  }

  @OnEvent('order.created')
  async setStatusToProgress(event: OrderCreatedEvent) {
    const order = event.order

    order.request.status = RequestStatus.inProgress

    await this.requestsRepository.save(order.request)
  }
}
