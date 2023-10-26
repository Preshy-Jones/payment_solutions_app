export enum TRANSACTION {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export type TransactionType = TRANSACTION;

export enum TRANSACTION_MODES {
  BANK_ACCOUNT = 'Bank Account',
}

export type TransactionModes = TRANSACTION_MODES;
