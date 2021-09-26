import { IsEnum, IsNumber, IsOptional, IsString, Length } from 'class-validator'
import { RequestStatus } from 'src/entities/request.entity'

export class EditRequestsDto {
  @IsString()
  @Length(5, 100)
  @IsOptional()
  description?: string

  @IsNumber()
  @IsOptional()
  equipmentId?: number

  @IsNumber()
  @IsOptional()
  priority?: number

  @IsEnum(RequestStatus)
  @IsOptional()
  status?: RequestStatus
}
