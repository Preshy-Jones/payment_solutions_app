import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { USER_ROLES } from '../types/roles.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private UserService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const { role, sub } = payload;

    if (role === USER_ROLES.CUSTOMER) {
      const user = await this.UserService.findCustomerForJwt(sub);
      if (!user) {
        return null;
      }
      return {
        user,
        role,
      };
    }

    if (role === USER_ROLES.ADMIN) {
      const user = await this.UserService.findAdminForJwt(sub);
      if (!user) {
        return null;
      }
      return {
        user,
        role,
      };
    }
  }
}
