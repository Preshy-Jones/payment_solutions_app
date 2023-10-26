export enum Services {
  FLUTTERWAVE = 'flutterwave',
  TWILIO = 'twilio',
  PAYSTACK = 'paystack',
  VTPASS = 'vtpass',
  MONNIFY = 'monnify',
}

export type ServicesType = keyof Record<Services, string>;

export enum BANK_SERVICES {
  MONNIFY = 'monnify',
  PAYSTACK = 'paystack',
  FLUTTERWAVE = 'flutterwave',
}

export type BankServices = BANK_SERVICES;
