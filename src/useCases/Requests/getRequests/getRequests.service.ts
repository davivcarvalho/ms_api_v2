import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { isArray } from 'lodash'
import { Request } from 'src/entities/request.entity'
import { Repository } from 'typeorm'
import { GetRequestsDto } from './getRequests.dto'

@Injectable()
export class GetRequestsService {
  constructor(@InjectRepository(Request) private requestsRepository: Repository<Request>) {}

  async getAll() {
    const [requests, count] = await this.requestsRepository.findAndCount({
      relations: ['equipment'],
      order: { createdAt: -1, priority: 1 }
    })

    return { requests, count }
  }

  async getByFilter(query: GetRequestsDto) {
    const { status: statusQuery, createdBy: createdByQuery } = query

    const queryBuilder = this.requestsRepository.createQueryBuilder('request')

    if (statusQuery)
      queryBuilder.andWhere('request.status IN (:...status)', {
        status: isArray(statusQuery) ? statusQuery : [statusQuery]
      })
    if (createdByQuery) queryBuilder.andWhere({ createdBy: { id: createdByQuery } })

    queryBuilder
      .select(['request.id', 'request.createdAt', 'request.title', 'request.description', 'equipment.name', 'order.id'])
      .orderBy({ priority: 'ASC' })
      .addOrderBy('request.createdAt', 'DESC')
      .leftJoin('request.equipment', 'equipment')
      .leftJoin('request.order', 'order')

    const [requests, count] = await queryBuilder.getManyAndCount()

    return { requests, count }
  }

  getOne(id: string) {
    return this.requestsRepository.findOneOrFail({
      where: { id },
      relations: ['equipment', 'createdBy']
    })
  }
}
