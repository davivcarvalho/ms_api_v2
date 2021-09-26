import { IsNumber, IsString, Length } from 'class-validator'

export class CreateRequestDto {
  @IsString()
  @Length(5)
  title: string

  @IsString()
  @Length(5)
  description: string

  @IsNumber()
  equipmentId: number

  @IsNumber()
  priority: number

  @IsNumber()
  createdBy: number
}
