import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { MoviesController } from "./movies.controller";
import { Movie, MovieSchema } from "./schema/movies.schema";
import { DataBaseModule } from "../shared/database/database.module";
import { MoviesService } from "./movies.service";
import { MoviesRepository } from "./movies.repository";
import { HttpModule } from "@nestjs/axios";
import { BasicSub } from "../shared/validators/basic-subscription.validator";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseModule,
    HttpModule.register({}),
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [MoviesController],
  providers: [MoviesRepository, MoviesService, BasicSub],
})
export class MoviesModule {}
