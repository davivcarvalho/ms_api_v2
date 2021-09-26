import { IsEmail, IsEnum, IsString } from 'class-validator'
import { Role } from 'src/entities/user.entity'

export class SignUpDto {
  @IsString()
  idToken: string

  @IsEmail()
  email: string

  @IsString()
  @IsEnum(Role)
  role: Role
}
