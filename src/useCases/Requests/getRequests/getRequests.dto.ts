import { IsOptional, IsString } from 'class-validator'

export class GetRequestsDto {
  @IsOptional()
  status?: string[] | string

  @IsOptional()
  @IsString()
  createdBy?: string
}
