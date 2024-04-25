import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './common/middlewares/error-exception.filter';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ErrorExceptionFilter(httpAdapterHost));

  await app.listen(3000);
}
bootstrap();
