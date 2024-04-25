import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordAuthBody {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;
}
