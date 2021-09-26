import { IsEmail, IsString } from 'class-validator'

export class SignInDto {
  @IsString()
  idToken: string

  @IsEmail()
  email: string
}
