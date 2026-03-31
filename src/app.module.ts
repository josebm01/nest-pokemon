import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports:     [
    //* Servidor con archivos estáticos en public
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    //* Referencia a la base de datos
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

    PokemonModule,

    CommonModule,

    SeedModule
  ],
  controllers: [],
  providers:   [],
})
export class AppModule {}
