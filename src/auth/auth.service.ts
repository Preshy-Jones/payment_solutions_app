import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { USER_ROLES } from 'src/common/types/roles.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const data = await this.userService.findByEmail(email);
      if (!data) {
        return null;
      }
      const { user, role } = data;

      if (user && (await bcrypt.compare(password, user.password))) {
        return {
          user,
          role,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // async validatePin(id: number, pin: string) {
  //   try {
  //     const user = await this.userService.findCustomerForJwt(id);

  //     if (user && (await bcrypt.compare(pin, user.pin))) {
  //       return user;
  //     }
  //     return null;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async loginUser(data: any) {
    try {
      const { user, role } = data;
      const payload = {
        email: user.email,
        sub: user.id,
        role,
      };

      if (role !== USER_ROLES.CUSTOMER) {
        throw new HttpException(
          'This is not a user account',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return {
        message: 'Login successful',
        data: {
          user,
          token: this.jwtService.sign(payload),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async loginAdmin(data: any) {
    try {
      const { user, role } = data;
      const payload = {
        email: user.email,
        sub: user.id,
        role,
      };

      if (role !== USER_ROLES.ADMIN) {
        throw new HttpException(
          'This is not an Admin Account',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return {
        message: 'Login successful',
        data: {
          user,
          token: this.jwtService.sign(payload),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async createTransactionPin(password: string, pin: number, email: string) {
    try {
      const user = await this.validateUser(email, password);

      if (!user) {
        throw new HttpException('invalid password', HttpStatus.BAD_REQUEST);
      }

      await this.userService.setPin(email, pin);

      return {
        message: 'Pin Set successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
