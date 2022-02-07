import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AddMovieInput } from "./inputs/add-movie.input";

@Controller()
export class AppController {
  constructor(@Inject("MOVIES") private readonly moviesService: ClientProxy) {}

  @ApiBearerAuth()
  @ApiTags("movies")
  @Post("movies")
  async addMovie(@Body() input: AddMovieInput) {
    return await this.moviesService.send("add-movie", input);
  }
}
