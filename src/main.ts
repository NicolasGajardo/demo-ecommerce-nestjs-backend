import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './common/middlewares/error-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ErrorExceptionFilter(httpAdapterHost));

  await app.listen(3000);
}
bootstrap();
