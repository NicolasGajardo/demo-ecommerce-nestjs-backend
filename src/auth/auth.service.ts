import {
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
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
import { PrismaService } from 'src/common/database/prisma.service';
import * as bcrypt from 'bcryptjs';
import { User as UserModel } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
  ) {}

  login(body: AuthBody): Observable<AccessToken> {
    const { email, password } = body;

    return from(
      this.prisma.user.findUnique({
        where: { email: email },
      }),
    ).pipe(
      switchMap((user) =>
        user && bcrypt.compareSync(password, user.password)
          ? of(user.email)
          : EMPTY,
      ),
      throwIfEmpty(
        () => new UnauthorizedException(`email or password is not matched`),
      ),
      map(() => ({ access_token: this.jwtService.sign({ email: email }) })),
    );
  }

  register(body: AuthBody): Observable<void> {
    const { email } = body;

    return from(
      this.prisma.user.findUnique({
        select: {
          email: true,
        },
        where: {
          email: email,
        },
      }),
    ).pipe(
      switchMap((persistedUser) => {
        if (persistedUser) {
          throw new UnauthorizedException(`email is already in use!`);
        }

        const { email, password } = body;
        const newUser = {
          email: email,
          password: password,
        };

        return from(
          this.prisma
            .$extends({
              name: 'Encrypt user password',
              query: {
                user: {
                  create({ args, query }) {
                    const salt = bcrypt.genSaltSync();
                    args.data.password = bcrypt.hashSync(
                      args.data.password,
                      salt,
                    );

                    return query(args);
                  },
                },
              },
            })
            .user.create({ data: newUser }),
        );
      }),
      switchMap(() => of(null)),
    );
  }

  updatePassword(body: UpdatePasswordAuthBody): Observable<void> {
    return from(
      this.prisma.user.findUnique({ where: { email: this.req.user.email } }),
    ).pipe(
      switchMap((persistedUser) => {
        const { old_password, new_password } = body;
        const userPayload: Partial<UserModel> = {};

        if (bcrypt.compareSync(old_password, persistedUser?.password)) {
          userPayload.password = new_password;
        } else {
          throw new UnauthorizedException(`old password is not matched`);
        }

        return from(
          this.prisma
            .$extends({
              name: 'Encrypt user password',
              query: {
                user: {
                  update({ args, query }) {
                    const salt = bcrypt.genSaltSync();
                    args.data.password = bcrypt.hashSync(
                      args.data.password as string,
                      salt,
                    );

                    return query(args);
                  },
                },
              },
            })
            .user.update({
              where: { email: persistedUser.email },
              data: userPayload,
            }),
        );
      }),
      switchMap(() => of(null)),
    );
  }
}
