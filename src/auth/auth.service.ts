import {
  ConflictException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/common/database/models/user.model';
import { Repository } from 'typeorm';
import { AuthBody } from './dto/auth.body';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { ExpressRequest } from 'src/common/utils/interfaces';
import { UpdatePasswordAuthBody } from './dto/update-password-auth.body';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private readonly usersRepository: Repository<UserModel>,
    private readonly jwtService: JwtService,
    @Inject(REQUEST) private readonly req: ExpressRequest,
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

  async register(body: AuthBody): Promise<void> {
    const { email } = body;
    const persistedUser = await this.usersRepository.findOneBy({});

    if (persistedUser) {
      throw new ConflictException('email is already in use');
    }

    const { password } = body;
    const newUser: UserModel = new UserModel();
    newUser.email = email;
    newUser.password = password;

    await this.usersRepository.insert(newUser);
  }

  async updatePassword(body: UpdatePasswordAuthBody): Promise<void> {
    const email = this.req.user.email;
    const persistedUser = await this.usersRepository.findOneBy({ email });

    const { oldPassword } = body;
    const isMatched = persistedUser.comparePasswords(oldPassword);

    if (!isMatched) {
      throw new UnauthorizedException();
    }

    const { newPassword } = body;
    persistedUser.email = email;
    persistedUser.password = newPassword;

    await this.usersRepository.update(persistedUser.email, persistedUser);
  }
}
