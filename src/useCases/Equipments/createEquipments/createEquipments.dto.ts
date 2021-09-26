import { IsOptional, IsString } from 'class-validator'

export class CreateEquipmentsDto {
  @IsString()
  name: string

  @IsString()
  shortName: string

  @IsString()
  description: string

  @IsString()
  @IsOptional()
  parentId: string
}
