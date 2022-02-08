import { TokenPayload } from "./../shared/interfaces/token.interface";
import { MoviesService } from "./movies.service";
import { Controller } from "@nestjs/common";
import { MessagePattern, Transport } from "@nestjs/microservices";
import { AddMovieInput } from "./inputs/add-movie.input";

@Controller("MOVIES")
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @MessagePattern("add-movie", Transport.TCP)
  async addMovie(input: AddMovieInput) {
    return await this.moviesService.addMovie(input);
  }

  @MessagePattern("get-movies", Transport.TCP)
  async getMovies(input: TokenPayload) {
    return await this.moviesService.getMovies(input);
  }
}
