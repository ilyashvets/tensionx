import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  role: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8, {
    message: 'Password is too short',
  })
  @MaxLength(16, {
    message: 'Password is too long',
  })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(\S{1,16})$/g, {
    message: 'Password must contain at least 1 character and 1 digit',
  })
  password: string
}

export class LoginUserDto {
  @IsEmail()
  email: string

  @MinLength(8)
  @MaxLength(16)
  password: string
}