import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type MovieDocument = Movie & Document;

@Schema({ versionKey: false, timestamps: true })
export class Movie {
  @Prop()
  InputTitle: string;

  @Prop()
  Title: string;

  @Prop()
  Released: Date;

  @Prop()
  Genre: string;

  @Prop()
  Director: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
