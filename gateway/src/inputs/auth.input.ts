import { IsNotEmpty, IsString } from "class-validator";

export class AuthInput {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
