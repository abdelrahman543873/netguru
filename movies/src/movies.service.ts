import { Injectable } from "@nestjs/common";
import { AddMovieInput } from "./inputs/add-movie.input";
import { MoviesRepository } from "./movies.repository";

@Injectable()
export class MoviesService {
  constructor(private moviesRepository: MoviesRepository) {}

  async addMovie(input: AddMovieInput) {
    return await this.moviesRepository.addMovie(input);
  }
}
