import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Equipment } from './equipment.entity'
import { Order } from './order.entity'
import { User } from './user.entity'

export enum RequestStatus {
  open = 'open',
  inProgress = 'inProgress',
  done = 'done'
}

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @ManyToOne(() => Equipment, equipment => equipment.requests)
  equipment: Equipment

  @Column()
  priority: number

  @Column()
  status: RequestStatus

  @OneToOne(() => Order, order => order.request, { onUpdate: 'CASCADE', onDelete: 'CASCADE', cascade: ['soft-remove'] })
  order: Order

  @ManyToOne(() => User, user => user.requests)
  createdBy: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
