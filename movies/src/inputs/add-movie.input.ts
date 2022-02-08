import { TokenPayload } from "../../shared/interfaces/token.interface";
export class AddMovieInput {
  Title: string;
  currentUser: TokenPayload;
}
