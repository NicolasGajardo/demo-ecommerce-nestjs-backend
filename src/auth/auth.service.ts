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

  async login(email: string, password: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ email: email });

    return await user.comparePasswords(password);
  }
}
