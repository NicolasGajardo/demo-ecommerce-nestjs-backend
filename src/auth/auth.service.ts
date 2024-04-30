import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/database/models/user';
import { Repository } from 'typeorm';
import { AuthBody } from './dto/auth.body';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: AuthBody): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findOneBy({ email: body.email });

    const isAuth = await user.comparePasswords(body.password);

    if (!isAuth) {
      throw new UnauthorizedException();
    }

    const payload = { email: body.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string): Promise<void> {
    const persistedUser = await this.usersRepository.findOneBy({ email });

    if (persistedUser) {
      throw new ConflictException('email is already in use');
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
      throw new UnauthorizedException();
    }

    persistedUser.email = email;
    persistedUser.password = newPassword;

    await this.usersRepository.update(persistedUser.email, persistedUser);
  }
}
