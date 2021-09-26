import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn
} from 'typeorm'
import { Request } from './request.entity'

@Entity()
@Tree('closure-table', {
  closureTableName: 'equipment_closure'
})
export class Equipment {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  shortName: string

  @Column()
  description: string

  @OneToMany(() => Request, request => request.equipment)
  requests: Request[]

  @TreeParent()
  parent?: Equipment

  @TreeChildren()
  children: Equipment[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
