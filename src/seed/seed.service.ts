import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  // dependencias
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ){}  

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); //delete * from 

    const data = await this.http.get('https://pokeapi.co/api/v2/pokemon?limit=600') as { results: { name: string; url: string }[] };

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

  }

}
