import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Equipment } from 'src/entities/equipment.entity'
import { TreeRepository } from 'typeorm'

@Injectable()
export class GetEquipmentsService {
  constructor(@InjectRepository(Equipment) private equipmentsRepository: TreeRepository<Equipment>) {}

  getAll() {
    return this.equipmentsRepository.findAndCount()
  }

  getTrees() {
    return this.equipmentsRepository.findTrees()
  }
}
