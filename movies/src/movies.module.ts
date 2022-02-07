import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { MoviesController } from "./movies.controller";
import { Movie, MovieSchema } from "./schema/movies.schema";
import { DataBaseModule } from "../shared/database/database.module";
import { MoviesService } from "./movies.service";
import { MoviesRepository } from "./movies.repository";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseModule,
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [MoviesController],
  providers: [MoviesRepository, MoviesService],
})
export class MoviesModule {}
