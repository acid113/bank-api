import {
  createAccount,
  getAccount,
  getAllAccounts,
  getBalanceHistory,
  getTransferHistory,
  transferFunds,
} from "@daos/accountRepository";

import {
  Account,
  AccountTransferHistory,
  BalanceHistory,
} from "@typedef/account";

export const MIN_INITIAL_DEPOSIT = 10;
const MIN_TRANSFER_AMOUNT = 1;

export const addAccount = async (
  customerId: string,
  balance: number
): Promise<Account> => {
  try {
    if (balance < 0) {
      throw Error("Balance required to create an account");
    }

    return await createAccount(customerId, balance);
  } catch (e) {
    throw new Error(`Error creating new account for customer ${customerId}`);
  }
};

export const getAccountForCustomer = async (
  customerId: string,
  accountId: string
): Promise<Account> => {
  try {
    return await getAccount(customerId, accountId);
  } catch (e) {
    throw new Error(`Error getting an account for customer ${customerId}`);
  }
};

export const getAccountsForCustomer = async (
  customerId: string
): Promise<Account[]> => {
  try {
    return await getAllAccounts(customerId);
  } catch (e) {
    throw new Error(`Error getting accounts for customer ${customerId}`);
  }
};

export const transferMoney = async (
  sourceCustomerId: string,
  sourceAccountId: string,
  recipientCustomerId: string,
  recipientAccountId: string,
  amount: number
): Promise<string> => {
  try {
    if (amount < MIN_TRANSFER_AMOUNT) {
      throw new Error("Minimum transfer amount not reached");
    }

    const sourceAccount = getAccount(sourceCustomerId, sourceAccountId);
    if (!sourceAccount) {
      throw new Error(
        `Source account not found for customer ${sourceCustomerId}`
      );
    }

    const recipientAccount = getAccount(
      recipientCustomerId,
      recipientAccountId
    );
    if (!recipientAccount) {
      throw new Error(
        `Recipient account not found for customer ${recipientCustomerId}`
      );
    }

    const transactionId = await transferFunds(
      sourceCustomerId,
      sourceAccountId,
      recipientCustomerId,
      recipientAccountId,
      amount
    );

    return transactionId;
  } catch (e) {
    throw new Error(
      `Error encountered transferring funds from customer ${sourceCustomerId} to customer ${recipientCustomerId}`
    );
  }
};

export const getTransferHistoryForAccount = async (
  customerId: string,
  accountId: string
): Promise<AccountTransferHistory[]> => {
  try {
    const account = getAccount(customerId, accountId);
    if (!account) {
      throw new Error(`Account not found for customer ${customerId}`);
    }

    return await getTransferHistory(accountId);
  } catch (e) {
    throw new Error(
      `Error getting transfer history for customer ${customerId} on account ${accountId}`
    );
  }
};

export const getBalanceHistoryForAccount = async (
  customerId: string,
  accountId: string
): Promise<BalanceHistory[]> => {
  try {
    const account = getAccount(customerId, accountId);
    if (!account) {
      throw new Error(`Account not found for customer ${customerId}`);
    }

    return await getBalanceHistory(accountId);
  } catch (e) {
    throw new Error(`Error getting balances for customer ${customerId}`);
  }
};
