import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {INestApplication, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
    cors: {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true
    }
  });
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  await app.listen(3000);
}
bootstrap().then((r: any)=> console.log("server is running"));
