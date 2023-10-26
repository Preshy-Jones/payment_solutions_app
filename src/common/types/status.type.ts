export enum TRANSACTION_STATUS {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
  QUEUED = 'QUEUED',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_AUTH = 'PENDING_AUTH',
  REVERSED = 'REVERSED',
  PENDING_REQUERY = 'PENDING_REQUERY',
}

export type TransactionStatus = TRANSACTION_STATUS;

export enum TRANSFER_REQUEST_STATUS {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export type TransferRequestStatus = TRANSFER_REQUEST_STATUS;

export enum KYC_STATUS {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export type KycStatus = KYC_STATUS;
