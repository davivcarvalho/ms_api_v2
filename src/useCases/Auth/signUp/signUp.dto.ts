import { IsEmail, IsEnum, IsString } from 'class-validator'
import { Role } from 'src/entities/user.entity'

export class SignUpDto {
  @IsString()
  username: string

  @IsString()
  name: string

  @IsString()
  password: string

  @IsString()
  @IsEnum(Role)
  role: Role
}
