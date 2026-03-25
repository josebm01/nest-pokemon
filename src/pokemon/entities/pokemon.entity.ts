import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//* Decorador para indicar que es un esquema de base de datos
@Schema()
export class Pokemon extends Document {
    @Prop({
        unique: true,
        index: true,
    })    
    name: string;
    
    @Prop({
        unique: true,
        index: true,
    })    
    no:   number;
}

//* exportamos esquema
export const PokemonSchema = SchemaFactory.createForClass( Pokemon )