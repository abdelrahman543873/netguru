import { RequestContext } from "./../shared/interfaces/request.interface";
import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AddMovieInput } from "./inputs/add-movie.input";
import { AuthInput } from "./inputs/auth.input";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { AuthGuard } from "../shared/guards/auth.guard";
import { BaseHttpException } from "../shared/exceptions/base-http-exception";
import { REQUEST } from "@nestjs/core";

@Controller()
export class AppController {
  constructor(
    @Inject("MOVIES") private readonly moviesService: ClientProxy,
    private httpService: HttpService,
    @Inject(REQUEST) private readonly request: RequestContext
  ) {}

  @ApiBearerAuth()
  @ApiTags("movies")
  @UseGuards(AuthGuard)
  @Post("movies")
  async addMovie(@Body() input: AddMovieInput) {
    return await this.moviesService.send("add-movie", {
      ...input,
      currentUser: this.request.currentUser,
    });
  }

  @ApiTags("auth")
  @Post("auth")
  async auth(@Body() input: AuthInput): Promise<any> {
    try {
      return (
        await firstValueFrom(
          this.httpService.post("http://app:3000/auth", input)
        )
      ).data;
    } catch (error) {
      throw new BaseHttpException("EN", 400, error.message);
    }
  }
}
