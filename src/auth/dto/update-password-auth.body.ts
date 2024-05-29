import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordAuthBody {
  @IsNotEmpty()
  old_password: string;

  @IsNotEmpty()
  new_password: string;
}
