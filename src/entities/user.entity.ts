import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Request } from './request.entity'

export enum Role {
  mainteiner = 'maintainer',
  operator = 'operator',
  admin = 'admin'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string

  @Index({ unique: true })
  @Column()
  email: string

  @Column()
  name: string

  @Column()
  avatar: string

  @Column({ nullable: true })
  expoPushToken: string

  @Column()
  role: Role

  @OneToMany(() => Request, request => request.createdBy)
  requests: Request[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
