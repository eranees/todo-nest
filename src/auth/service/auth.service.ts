import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Injectable()
export class AuthService {
  private users = [
    { id: 1, email: 'user1@example.com', password: 'password1' },
    { id: 2, email: 'user2@example.com', password: 'password2' },
  ];

  signup(createAuthDto: CreateAuthDto) {
    const newUser = { id: this.users.length + 1, ...createAuthDto };
    return newUser;
  }

  signin(email: string, password: string) {
    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updateAuthDto };
    return this.users[userIndex];
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const removedUser = this.users.splice(userIndex, 1);
    return removedUser[0];
  }

  forgotPassword(email: string) {
    return `Password reset instructions sent to ${email}`;
  }

  resetPassword(token: string, updateAuthDto: UpdateAuthDto) {
    const user = this.users[0];
    return user;
  }
}
