import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Request } from './request.entity'
import { User } from './user.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => Request, { onUpdate: 'CASCADE', onDelete: 'CASCADE', cascade: ['soft-remove'] })
  @JoinColumn()
  request: Request

  @ManyToOne(() => User)
  createdBy: User

  @UpdateDateColumn()
  updatedAt: Date

  @CreateDateColumn()
  createdAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
