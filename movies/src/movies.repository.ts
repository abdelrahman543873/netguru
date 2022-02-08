import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddMovieInput } from "./inputs/add-movie.input";
import { Movie, MovieDocument } from "./schema/movies.schema";
import { BaseRepository } from "../shared/generics/repository.abstract";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { BaseHttpException } from "../shared/exceptions/base-http-exception";
@Injectable()
export class MoviesRepository extends BaseRepository<Movie> {
  constructor(
    @InjectModel(Movie.name)
    private movieSchema: Model<MovieDocument>,
    private httpService: HttpService
  ) {
    super(movieSchema);
  }

  async addMovie(input: AddMovieInput, userId: number) {
    let movieDetails;
    try {
      movieDetails = (
        await firstValueFrom(
          this.httpService.get(
            `${process.env.OMD_API}?apiKey=${process.env.OMD_API_KEY}&t=${input.Title}`
          )
        )
      ).data;
    } catch (error) {
      throw new BaseHttpException("EN", 400, error.message);
    }
    return await this.movieSchema.create({
      userId,
      InputTitle: input.Title,
      Title: movieDetails.Title,
      Released: movieDetails.Released,
      Genre: movieDetails.Genre,
      Director: movieDetails.Director,
    });
  }

  async checkUserMoviesCountDuringMonth(userId: number) {
    const currentDate = new Date();
    const earlierMonthDate = new Date();
    earlierMonthDate.setMonth(earlierMonthDate.getMonth() - 1);
    return await this.movieSchema
      .find({
        userId,
        created_at: {
          $gte: currentDate.toISOString(),
          $lt: earlierMonthDate.toISOString(),
        },
      })
      .count();
  }

  async getMovies(userId: number) {
    return await this.movieSchema.find({ userId });
  }
}
