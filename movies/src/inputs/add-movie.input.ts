import { IsNotEmpty, IsString, Validate } from "class-validator";
import { TokenPayload } from "../../shared/interfaces/token.interface";
import { BasicSub } from "../../shared/validators/basic-subscription.validator";
export class AddMovieInput {
  @IsString()
  @IsNotEmpty()
  Title: string;

  @Validate(BasicSub)
  currentUser: TokenPayload;
}
