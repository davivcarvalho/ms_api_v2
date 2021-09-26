import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Equipment } from 'src/entities/equipment.entity'
import { TreeRepository } from 'typeorm'
import { CreateEquipmentsDto } from './createEquipments.dto'

@Injectable()
export class CreateEquipementsService {
  constructor(@InjectRepository(Equipment) private equipmentsRepository: TreeRepository<Equipment>) {}

  async createOne(data: CreateEquipmentsDto) {
    let parent: Equipment | null = null
    if (data.parentId) parent = await this.equipmentsRepository.findOneOrFail(data.parentId)

    const equipment = this.equipmentsRepository.create({ ...data, parent })

    // return this.equipmentsRepository.findTrees()

    return this.equipmentsRepository.save(equipment)
  }
}
