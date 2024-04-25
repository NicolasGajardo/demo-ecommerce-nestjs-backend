import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/database/models/user';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login(email: string, password: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ email: email });

    return await user.comparePasswords(password);
  }

  async register(email: string, password: string): Promise<void> {
    const persistedUser = await this.usersRepository.findOneBy({ email });

    if (persistedUser) {
      throw new Error('email is already in use');
    }

    const newUser: User = new User();
    newUser.email = email;
    newUser.password = password;

    await this.usersRepository.insert(newUser);
  }

  async updatePassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const persistedUser = await this.usersRepository.findOneBy({ email });

    const isMatched = persistedUser.comparePasswords(oldPassword);

    if (!isMatched) {
      throw new Error('las contraseñas no coinciden'); // TODO: mejorar a otro tipo de error
    }

    persistedUser.email = email;
    persistedUser.password = newPassword;

    await this.usersRepository.update(persistedUser.email, persistedUser);
  }
}
