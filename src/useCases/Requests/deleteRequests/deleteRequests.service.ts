import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'src/entities/request.entity'
import { Repository } from 'typeorm'

@Injectable()
export class DeleteRequestsService {
  constructor(@InjectRepository(Request) private requestsRepository: Repository<Request>) {}

  async deleteOne(requestId: string) {
    const request = await this.requestsRepository.findOneOrFail(requestId, { relations: ['order'] })

    await this.requestsRepository.softRemove(request)
  }
}
