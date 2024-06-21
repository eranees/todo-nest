import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { AbstractApiResponse } from 'src/utils/general-response';
import { User } from '../entities/auth.entity';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private usersRepository: Repository<User>) {}
  async signup<T>(
    CreateUserDto: Partial<CreateUserDto>,
  ): Promise<AbstractApiResponse<T>> {
    const dbUser = await this.findOne({
      email: CreateUserDto.email,
    });
    console.log('dbUser: ', dbUser);

    if (dbUser) {
      throw new HttpException(
        {
          status: 400,
          message: 'user already exists',
          error: 'BAD_REQUEST',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new User();
    user.firstName = CreateUserDto.firstName;
    user.lastName = CreateUserDto.lastName;
    user.username = CreateUserDto.username;
    user.email = CreateUserDto.email;
    user.phoneNumber = CreateUserDto.phoneNumber;
    user.password = CreateUserDto.password;
    user.gender = CreateUserDto.gender;
    user.avatar = CreateUserDto.avatar;
    user.createdAt = Math.floor(new Date().getTime() / 1000);
    user.updatedAt = Math.floor(new Date().getTime() / 1000);

    const userData = user.save();

    const registerResponse = {
      userData,
      message: 'Account Created Successfully!',
    } as T;

    const response = AbstractApiResponse.created(registerResponse);
    return response;
  }

  signin(email: string, password: string) {
    return 'signin';
  }

  async findOne(fields: EntityCondition<User>) {
    console.log('fields: ', fields);
    const userData = await this.usersRepository.findOne({
      where: fields,
    });
    console.log('userData in findOne is: ', userData);
    console.log(
      '🚀 ~ file: users.service.ts:84 ~ UsersService ~ findOne ~ userData:',
      userData,
    );
    return userData;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return 'update';
  }

  remove(id: number) {
    return 'delete';
  }

  forgotPassword(email: string) {
    return `Password reset instructions sent to ${email}`;
  }

  resetPassword(token: string, updateAuthDto: UpdateAuthDto) {
    return 'reset pass';
  }
}
