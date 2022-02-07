import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddMovieInput } from "./inputs/add-movie.input";
import { Movie, MovieDocument } from "./schema/movies.schema";
import { BaseRepository } from "../shared/generics/repository.abstract";

@Injectable()
export class MoviesRepository extends BaseRepository<Movie> {
  constructor(
    @InjectModel(Movie.name)
    private movieSchema: Model<MovieDocument>
  ) {
    super(movieSchema);
  }

  async addMovie(input: AddMovieInput) {
    return await this.movieSchema.create(input);
  }
}
