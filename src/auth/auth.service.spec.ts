import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { mockedConfigService } from 'src/utils/mocks/config.service';
import { mockedJwtService } from 'src/utils/mocks/jwt.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import Wallet from 'src/wallet/entities/wallet.entity';
import { WalletService } from 'src/wallet/wallet.service';

const { userData } = userMocks;
jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let walletService: WalletService;
  const walletRepository = {};
  let bcryptCompare;
  let mockFindOne: jest.Mock;

  beforeEach(async () => {
    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    mockFindOne = jest.fn().mockResolvedValue(userData);

    const userRepository = {
      findOne: mockFindOne,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        WalletService,
        { provide: ConfigService, useValue: mockedConfigService },
        { provide: JwtService, useValue: mockedJwtService },
        { provide: getRepositoryToken(User), useValue: userRepository },
        { provide: getRepositoryToken(Wallet), useValue: walletRepository },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    walletService = module.get<WalletService>(WalletService);
  });

  describe('validate user', () => {
    it('should find user by email', async () => {
      const findByEmailSpy = jest.spyOn(userService, 'getByEmail');
      await authService.validateUser(userData.email, userData.password);
      expect(findByEmailSpy).toHaveBeenCalledTimes(1);
      expect(findByEmailSpy).toBeCalledWith(userData.email);
    });
    describe('When the email is found in the database', () => {
      describe('When the password is valid', () => {
        it('should validate password and return user', async () => {
          const user = await authService.validateUser(
            userData.email,
            userData.password,
          );
          expect(user).toBe(userData);
        });

        describe('when the password is not valid', () => {
          beforeEach(() => {
            bcryptCompare.mockReturnValue(false);
          });
          it('it should return null', async () => {
            const user = await authService.validateUser(
              userData.email,
              userData.password,
            );
            expect(user).toBeNull();
          });
        });
      });
      describe('when the email is not found in the database', () => {
        beforeEach(() => {
          mockFindOne.mockResolvedValue(undefined);
        });
        it('should throw an error', async () => {
          const user = await authService.validateUser(
            userData.email,
            userData.password,
          );
          expect(user).toBeNull();
        });
      });
    });
  });
});
