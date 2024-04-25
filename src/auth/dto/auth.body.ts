import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthBody {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
