export enum USER_LEVELS {
  ZERO = 'level_0',
  ONE = 'level_1',
  TWO = 'level_2',
  SUSPENDED = 'suspended',
}

export type UserLevels = USER_LEVELS;

export enum ADMIN_ROLES {
  ADMIN = 'admin',
  SUPPORT = 'support',
}

export type AdminRoles = ADMIN_ROLES;

export enum USER_ROLES {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export type UserRoles = USER_ROLES;
