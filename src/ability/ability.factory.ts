import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  createAliasResolver,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { UserActions, USER_ACTIONS } from 'src/common/types/permissions.type';
import {
  ADMIN_ROLES,
  USER_LEVELS,
  USER_ROLES,
} from 'src/common/types/roles.type';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Withdrawal } from 'src/transactions/entities/withdrawal.entity';
import { ReceiveTransfer } from 'src/transfers/entities/receive-transfer.entity';
import { SendTransfer } from 'src/transfers/entities/send-transfer.entity';
import { TransferRequest } from 'src/transfers/entities/transfer-requests.entity';
import { Transfer } from 'src/transfers/entities/transfer.entity';
import { Administrator } from 'src/user/entities/administrator.entity';
import { Customer } from 'src/user/entities/customer.entity';
import { User } from 'src/user/entities/user.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';

const { CREATE, MANAGE, EDIT, DELETE, READ } = USER_ACTIONS;

type InferredTypes =
  | typeof Customer
  | typeof SendTransfer
  | typeof ReceiveTransfer
  | typeof TransferRequest
  | typeof Withdrawal
  | typeof Wallet;

export type Subjects = InferSubjects<InferredTypes> | 'all';

export type AppAbility = Ability<[UserActions, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(data: any) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    const { user, role } = data;

    if (role === USER_ROLES.ADMIN) {
      if (user.role === ADMIN_ROLES.ADMIN) {
        can(MANAGE, 'all');
      }

      if (user.role === ADMIN_ROLES.SUPPORT) {
        can(MANAGE, 'all');
      }
    }

    if (role === USER_ROLES.CUSTOMER) {
      if (user.level === USER_LEVELS.ZERO) {
        can([READ, EDIT, DELETE], Customer);
        can(READ, [
          Wallet,
          SendTransfer,
          ReceiveTransfer,
          TransferRequest,
          Withdrawal,
        ]);
        can(CREATE, [
          Wallet,
          SendTransfer,
          ReceiveTransfer,
          TransferRequest,
          Withdrawal,
        ]);
      }

      if (user.level === USER_LEVELS.SUSPENDED) {
        can(READ, [
          Customer,
          Wallet,
          SendTransfer,
          ReceiveTransfer,
          TransferRequest,
          Withdrawal,
        ]);
      }
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
