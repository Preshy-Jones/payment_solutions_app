import { ViewEntity, ViewColumn, Connection } from 'typeorm';

@ViewEntity({
  expression:
    'SELECT  type, amount, balance, remarks, email, userid, createddate, updateddate FROM airtime_activity UNION SELECT type, amount, balance, remarks, email, userid, createddate, updateddate FROM electricity_bill_activity UNION SELECT type, amount, balance, remarks, email, userid, createddate, updateddate FROM tv_subscription_activity UNION SELECT type, amount, balance, remarks, email, userid, createddate, updateddate FROM mobile_data_activity',
})

// UNION SELECT type, amount, balance, remarks, email, receiveuserid AS userid, createddate, updateddate FROM receive_transfer UNION SELECT type, amount, balance, remarks, email, senduserid AS userid, createddate, updateddate FROM send_transfer
export class Activity {
  @ViewColumn()
  type: string;

  @ViewColumn()
  amount: string;

  @ViewColumn()
  balance: string;

  @ViewColumn()
  remarks: string;

  @ViewColumn()
  email: string;

  @ViewColumn()
  userid: string;

  @ViewColumn()
  createddate: Date;

  @ViewColumn()
  updateddate: Date;
}
