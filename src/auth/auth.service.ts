import {
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
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { UpdatePasswordAuthBody } from './dto/update-password-auth.body';
import { AccessToken } from './interface/access-token.interface';
import {
  EMPTY,
  Observable,
  from,
  map,
  of,
  switchMap,
  throwIfEmpty,
} from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private readonly usersRepository: Repository<UserModel>,
    private readonly jwtService: JwtService,
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
  ) {}

  login(body: AuthBody): Observable<AccessToken> {
    const { email, password } = body;
    return from(this.usersRepository.findOneBy({ email: email })).pipe(
      map((user) => user.comparePasswords(password)),
      switchMap((isAuth) => (isAuth ? of(isAuth) : EMPTY)),
      throwIfEmpty(
        () => new UnauthorizedException(`email or password is not matched`),
      ),
      map(() => ({ access_token: this.jwtService.sign({ email: email }) })),
    );
  }

  register(body: AuthBody): Observable<void> {
    const { email } = body;

    return from(
      this.usersRepository.findOneBy({
        email: email,
      }),
    ).pipe(
      switchMap((persistedUser) => (persistedUser ? of(persistedUser) : EMPTY)),
      throwIfEmpty(() => new UnauthorizedException(`email is already in use!`)),
      switchMap(() => {
        const { password } = body;
        const newUser: UserModel = new UserModel();
        newUser.email = email;
        newUser.password = password;

        return from(this.usersRepository.insert(newUser));
      }),
      switchMap(() => EMPTY),
    );
  }

  updatePassword(body: UpdatePasswordAuthBody): Observable<void> {
    const { oldPassword } = body;

    return from(
      this.usersRepository.findOneBy({ email: this.req.user.email }),
    ).pipe(
      switchMap((persistedUser) =>
        of(persistedUser.comparePasswords(oldPassword)).pipe(
          switchMap((isMatched) => (isMatched ? of(isMatched) : EMPTY)),
          throwIfEmpty(() => new UnauthorizedException()),
          map(() => persistedUser),
        ),
      ),
      switchMap((persistedUser) => {
        const { newPassword } = body;
        persistedUser.email = this.req.user.email;
        persistedUser.password = newPassword;

        return from(
          this.usersRepository.update(persistedUser.email, persistedUser),
        );
      }),
      switchMap(() => EMPTY),
    );
  }
}
