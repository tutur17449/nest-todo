import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  pseudo: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
