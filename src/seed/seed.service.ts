import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  // dependencias
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}  

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); //delete * from 

    const { data } = await this.axios.get('https://pokeapi.co/api/v2/pokemon?limit=600');

    //* FORMA 1
    // // insert multiples con promesas
    // const insertPromisesArray: Promise<Pokemon>[] = [];
    
    // data.results.forEach(({ name, url }) => {

    //   const segments = url.split('/');
    //   const no = +segments[segments.length - 2];

    //   // const pokemon = await this.pokemonModel.create({ name, no});
    //   insertPromisesArray.push(
    //     this.pokemonModel.create({name, no})
    //   );
    // });

    // await Promise.all(insertPromisesArray);


    //* FORMA 2
    const pokemonToInsert: {name: string, no: number }[] = [];
    
    data.results.forEach(({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      pokemonToInsert.push({name, no});
    });

    // una sola inserción
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed...';
  }

}
