const accountOne = {
  id: "123ID",
  customerId: "123CustID",
  balance: 100,
  currency: "PHP",
  created: new Date(),
  createdBy: "admin",
  lastUpdated: new Date(),
  lastUpdatedBy: "admin",
};

const accountTwo = {
  id: "246ID",
  customerId: "246CustID",
  balance: 100,
  currency: "PHP",
  created: new Date(),
  createdBy: "admin",
  lastUpdated: new Date(),
  lastUpdatedBy: "admin",
};

const accounts = [accountOne, accountTwo];

const CUSTOMER_ID = "123ID";
const ACCOUNT_ID = "123AccID";
const BALANCE = 100;

const createAccount = jest.fn().mockReturnValue(accountOne);
const getAccount = jest.fn().mockReturnValue(accountOne);
const getAllAccounts = jest.fn().mockReturnValue(accounts);
const getBalanceHistory = jest.fn();
const getTransferHistory = jest.fn();
const transferFunds = jest.fn();

jest.mock("@daos/accountRepository", () => ({
  createAccount,
  getAccount,
  getAllAccounts,
  getBalanceHistory,
  getTransferHistory,
  transferFunds,
}));

import {
  addAccount,
  getAccountForCustomer,
  getAccountsForCustomer,
  transferMoney,
  getTransferHistoryForAccount,
  getBalanceHistoryForAccount,
} from "../accountService";

describe("Account service", () => {
  beforeEach(() => {});

  test("", async (done) => {
    done();
  });

  test("add an account creates a new account data", async (done) => {
    await addAccount(CUSTOMER_ID, BALANCE);

    expect(createAccount).toHaveBeenCalled();
    done();
  });

  test("getting an account for a specific customer", async (done) => {
    await getAccountForCustomer(CUSTOMER_ID, ACCOUNT_ID);

    expect(getAccount).toHaveBeenCalled();

    done();
  });

  test("getting accounts for a specific customer", async (done) => {
    await getAccountsForCustomer(CUSTOMER_ID);

    expect(getAllAccounts).toHaveBeenCalled();

    done();
  });

  test("transfer money", async (done) => {
    getAccount
      .mockImplementationOnce(() => {
        return { data: accountOne };
      })
      .mockImplementationOnce(() => {
        return { data: accountTwo };
      });
    await transferMoney("123CustID", "123AccId", "246CustID", "246AccId", 100);

    expect(getAccount).toHaveBeenCalledTimes(2);
    expect(transferFunds).toHaveBeenCalled();

    done();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
