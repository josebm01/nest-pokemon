import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* prefijo global
  app.setGlobalPrefix('api/v1');

  //* Configuración global de pipes para validación y transformación de datos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza un error si se reciben propiedades no definidas
      transform: true, // Transforma los datos al tipo definido en el DTO
      transformOptions: {
        enableImplicitConversion: true, // Permite la conversión implícita de tipos (e.g., string a number)
      }
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
