import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Equipment } from 'src/entities/equipment.entity'
import { Request, RequestStatus } from 'src/entities/request.entity'
import { User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateRequestDto } from './createRequests.dto'

@Injectable()
export class CreateRequestService {
  constructor(
    @InjectRepository(Request) private requestsRepository: Repository<Request>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Equipment) private equipmentsRepository: Repository<Equipment>
  ) {}

  async createOne(data: CreateRequestDto) {
    const [user, equipment] = await Promise.all([
      this.usersRepository.findOneOrFail(data.createdBy),
      this.equipmentsRepository.findOneOrFail(data.equipmentId)
    ])

    const request = this.requestsRepository.create({
      ...data,
      status: RequestStatus.open,
      createdBy: user,
      equipment: equipment
    })

    return this.requestsRepository.save(request)
  }
}
