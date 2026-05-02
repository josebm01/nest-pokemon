import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports:     [

    //* Variables de entorno
    ConfigModule.forRoot({
      load: [ EnvConfiguration ], // Carga de configuración personalizada
      validationSchema: JoiValidationSchema, // Validación de variables de entorno con Joi
    }),

    //* Servidor con archivos estáticos en public
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    //* Referencia a la base de datos
    MongooseModule.forRoot(process.env.MONGO_DB!),

    PokemonModule,

    CommonModule,

    SeedModule
  ],
  controllers: [],
  providers:   [],
})
export class AppModule {}
