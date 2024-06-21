import { ApiProperty } from '@nestjs/swagger';
import { GenderTypes } from 'src/utils/general.enums';
import { IsEmail, IsEnum, MinLength } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ example: 'johndoe1@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1 879-929-009' })
  phoneNumber: string;

  @ApiProperty({ example: 'johndoe@123' })
  @MinLength(6)
  password: string;

  @ApiProperty({ name: 'gender', example: 'MALE' })
  @IsEnum(GenderTypes)
  gender?: GenderTypes | null;

  avatar?: string | null;
}
