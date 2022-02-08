import { Injectable } from "@nestjs/common";
import { AddMovieInput } from "./inputs/add-movie.input";
import { MoviesRepository } from "./movies.repository";
import { TokenPayload } from "./../shared/interfaces/token.interface";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class MoviesService {
  constructor(private moviesRepository: MoviesRepository) {}

  async addMovie(input: AddMovieInput) {
    const userMoviesCount =
      await this.moviesRepository.checkUserMoviesCountDuringMonth(
        input.currentUser.userId
      );
    if (userMoviesCount === 5 && input.currentUser.role === "basic")
      throw new RpcException("you exceeded the usage of your role");
    return await this.moviesRepository.addMovie(
      input,
      input.currentUser.userId
    );
  }

  async getMovies(input: TokenPayload) {
    return await this.moviesRepository.getMovies(input.userId);
  }
}
