import { IsOptional, IsString } from 'class-validator'

export class EditUsersDto {
  @IsOptional()
  @IsString()
  expoPushToken?: string
}
