import { IsEmail, IsString } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class CreateUserDto{
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value.trim())
  email: string

  @IsString()
  @Transform(({ value }: TransformFnParams) => value.trim())
  password: string
}