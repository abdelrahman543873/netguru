import { TokenPayload } from "./../interfaces/token.interface";
import { MoviesRepository } from "./../../src/movies.repository";
import { Injectable } from "@nestjs/common";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@Injectable()
@ValidatorConstraint({ name: "BasicSub", async: true })
export class BasicSub implements ValidatorConstraintInterface {
  constructor(private moviesRepository: MoviesRepository) {}
  async validate(tokenPayload: TokenPayload): Promise<boolean> {
    const userMoviesCount =
      await this.moviesRepository.checkUserMoviesCountDuringMonth(
        tokenPayload.userId
      );
    if (userMoviesCount === 5 && tokenPayload.role === "basic") return false;
    return true;
  }

  defaultMessage() {
    return `you exceeded the usage of your role`;
  }
}
