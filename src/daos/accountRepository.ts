/* eslint-disable require-await */
import {
  Account,
  AccountTransferHistory,
  BalanceHistory,
} from "@typedef/account";

import { v4 as uuidv4 } from "uuid";

export const createAccount = async (
  customerId: string,
  balance: number
): Promise<Account> => {
  if (!balance) {
    throw Error("Amount required to create a new account");
  }
  const account: Account = {
    customerId,
    balance,
    id: uuidv4(),
    currency: "PHP",
    created: new Date(),
    createdBy: "admin",
    lastUpdated: new Date(),
    lastUpdatedBy: "admin",
  };

  // TODO: save account;

  return account;
};

export const getAccount = async (
  customerId: string,
  accountId: string
): Promise<Account> => {
  const account: Account = {
    customerId,
    balance: 100,
    id: uuidv4(),
    currency: "PHP",
    created: new Date(),
    createdBy: "admin",
    lastUpdated: new Date(),
    lastUpdatedBy: "admin",
  };

  return account;
};

export const getAllAccounts = async (
  customerId: string
): Promise<Account[]> => {
  const accounts: Account[] = [];
  const account: Account = {
    customerId,
    balance: 100,
    id: uuidv4(),
    currency: "PHP",
    created: new Date(),
    createdBy: "admin",
    lastUpdated: new Date(),
    lastUpdatedBy: "admin",
  };

  accounts.push(account);

  return accounts;
};

export const getBalanceHistory = async (
  accountId: string
): Promise<BalanceHistory[]> => {
  const history: BalanceHistory[] = [];

  const balance: BalanceHistory = {
    accountId,
    id: "1",
    accountTransferHistoryId: "1",
    oldBalance: 0,
    newBalance: 1,
  };

  history.push(balance);

  return history;
};

export const getTransferHistory = async (
  accountId: string
): Promise<AccountTransferHistory[]> => {
  const accountTransferHistory: AccountTransferHistory[] = [];

  const account: AccountTransferHistory = {
    accountId,
    id: "1",
    amount: 1,
    sourceAccountId: "123",
    sourceCustomerId: "123",
    recipientAccountId: "321",
    recipientCustomerId: "321",
    transferDate: new Date(),
    transferredBy: "admin",
  };

  accountTransferHistory.push(account);

  return accountTransferHistory;
};

export const transferFunds = async (
  sourceCustomerId: string,
  sourceAccountId: string,
  recipientCustomerId: string,
  recipientAccountId: string,
  amount: number
): Promise<string> => {
  /*
  - add AccountTransferHistory
  - add BalanceHistory
  - return AccountTransferHistory.ID
  */
  return "123TransactionID";
};
