import { IsString } from 'class-validator'

export class CreateOrdersDto {
  @IsString()
  requestId: string

  @IsString()
  createdBy: string
}
