import { IsNotEmpty, IsString } from "class-validator";

export class AddMovieInput {
  @IsString()
  @IsNotEmpty()
  title: string;
}
