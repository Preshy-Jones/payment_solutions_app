import { SetMetadata } from '@nestjs/common';
import { UserActions, USER_ACTIONS } from 'src/common/types/permissions.type';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Withdrawal } from 'src/transactions/entities/withdrawal.entity';
import { SendTransfer } from 'src/transfers/entities/send-transfer.entity';
import { TransferRequest } from 'src/transfers/entities/transfer-requests.entity';
import { Transfer } from 'src/transfers/entities/transfer.entity';
import { Customer } from 'src/user/entities/customer.entity';
import { Subjects } from './ability.factory';

const { READ, CREATE, EDIT, DELETE, MANAGE } = USER_ACTIONS;

export interface RequiredRule {
  action: UserActions;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);

/**
 *
 * user
 */

export class ReadUserPermission implements RequiredRule {
  action = READ;
  subject = Customer;
}

export class CreateUserPermission implements RequiredRule {
  action = CREATE;
  subject = Customer;
}

export class EditUserPermission implements RequiredRule {
  action = EDIT;
  subject = Customer;
}

export class DeleteUserPermission implements RequiredRule {
  action = DELETE;
  subject = Customer;
}

/**
 *
 * Send Transfer
 */

export class ReadSendTransferPermission implements RequiredRule {
  action = READ;
  subject = SendTransfer;
}

export class CreateSendTransferPermission implements RequiredRule {
  action = CREATE;
  subject = SendTransfer;
}

export class EditSendTransferPermission implements RequiredRule {
  action = EDIT;
  subject = SendTransfer;
}

export class DeleteSendTransferPermission implements RequiredRule {
  action = DELETE;
  subject = SendTransfer;
}

/**
 *
 * receive Transfer
 */

export class ReadReceiveTransferPermission implements RequiredRule {
  action = READ;
  subject = TransferRequest;
}

export class CreateReceiveTransferPermission implements RequiredRule {
  action = CREATE;
  subject = TransferRequest;
}

export class EditReceiveTransferPermission implements RequiredRule {
  action = EDIT;
  subject = TransferRequest;
}

export class DeleteReceiveTransferPermission implements RequiredRule {
  action = DELETE;
  subject = TransferRequest;
}

/**
 *
 * request Transfer
 */

export class ReadTransferRequestPermission implements RequiredRule {
  action = READ;
  subject = TransferRequest;
}

export class CreateTransferRequestPermission implements RequiredRule {
  action = CREATE;
  subject = TransferRequest;
}

export class EditTransferRequestPermission implements RequiredRule {
  action = EDIT;
  subject = TransferRequest;
}

export class DeleteTransferRequestPermission implements RequiredRule {
  action = DELETE;
  subject = TransferRequest;
}

/**
 *
 * Withdrawal
 */

export class ReadWithdrawalPermission implements RequiredRule {
  action = READ;
  subject = Withdrawal;
}

export class CreateWithdrawalPermission implements RequiredRule {
  action = CREATE;
  subject = Withdrawal;
}

export class EditWithdrawalPermission implements RequiredRule {
  action = EDIT;
  subject = Withdrawal;
}

export class DeleteWithdrawalPermission implements RequiredRule {
  action = DELETE;
  subject = Withdrawal;
}
