import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  mobileNumber!: string;

  @IsString()
  countryCode!: string;
}
