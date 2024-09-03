import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/');
  // Configuración de CORS
  app.enableCors({
    origin: process.env.FRONTEND_PORT, // Permitir solo esta URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Permitir cookies y credenciales

  });

  const configService = new ConfigService();

  app.use(session({
    secret: configService.get<string>('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000, // Configura el tiempo de expiración de la cookie
      httpOnly: true,
    },
  }));

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}

bootstrap();
