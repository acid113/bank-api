export interface Account {
  id: string;
  customerId: string;
  currency: string;
  balance: number;
  created: Date;
  createdBy: string;
  lastUpdated: Date;
  lastUpdatedBy: string;
}

export interface AccountTransferHistory {
  id: string;
  accountId: string;
  sourceCustomerId: string;
  sourceAccountId: string;
  recipientCustomerId: string;
  recipientAccountId: string;
  amount: number;
  transferDate: Date;
  transferredBy: string;
}

export interface BalanceHistory {
  id: string;
  accountId: string;
  accountTransferHistoryId: string;
  oldBalance: number;
  newBalance: number;
}
