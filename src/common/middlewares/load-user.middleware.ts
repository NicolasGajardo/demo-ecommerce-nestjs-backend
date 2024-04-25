import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { User } from '../database/models/user';
import { Repository } from 'typeorm';

@Injectable()
export class LoadUserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userEmail = req['user'];

    // Obtener el usuario de la base de datos utilizando el ID
    const user = await this.usersRepository.findOneBy({ email: userEmail });

    // Agregar el usuario al cuerpo del request para que esté disponible en los controladores
    req['user'] = user; // Esto añadirá el usuario al cuerpo del request para que esté disponible en los controladores

    next(); // Llamar a next() para pasar la solicitud al siguiente middleware o controlador
  }
}
