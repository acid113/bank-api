const addAccount = jest.fn();
const getAccountForCustomer = jest.fn();
const getAccountsForCustomer = jest.fn();
const getTransferHistoryForAccount = jest.fn();
const getBalanceHistoryForAccount = jest.fn();
const transferMoney = jest.fn();

jest.mock("@service/accountService", () => ({
  addAccount,
  getAccountForCustomer,
  getAccountsForCustomer,
  getTransferHistoryForAccount,
  getBalanceHistoryForAccount,
  transferMoney,
}));

import { Request, Response } from "express";
import {
  add,
  get,
  getAll,
  transfer,
  transferHistory,
  balanceHistory,
} from "../account";

describe("Customer routes", () => {
  beforeEach(() => {});

  test("POST / adds a new account", async (done) => {
    const req = {
      body: {
        customerId: "123ID",
        balance: 100,
      },
    } as Request;

    const res = ({
      json: jest.fn(),
    } as unknown) as Response;

    await add(req, res);
    expect(addAccount).toHaveBeenCalled();

    done();
  });

  test("GET /:accountId gets an account", async (done) => {
    const req = ({
      body: {
        customerId: "123ID",
      },
      params: {
        accountId: "321ID",
      },
    } as unknown) as Request;

    const res = ({
      json: jest.fn(),
    } as unknown) as Response;

    await get(req, res);
    expect(getAccountForCustomer).toHaveBeenCalled();
    done();
  });

  test("GET /all gets all accounts of a customer", async (done) => {
    const req = {
      body: {
        customerId: "123ID",
      },
    } as Request;

    const res = ({
      json: jest.fn(),
    } as unknown) as Response;

    await getAll(req, res);
    expect(getAccountsForCustomer).toHaveBeenCalled();
    done();
  });

  test("POST /transfer transfers funds from one account to another", async (done) => {
    const req = {
      body: {
        sourceCustomerId: "123ID",
        sourceAccountId: "123AccID",
        recipientCustomerId: "246ID",
        recipientAccountId: "246AccID",
        amount: 100,
      },
    } as Request;

    const res = ({
      json: jest.fn(),
    } as unknown) as Response;

    await transfer(req, res);
    expect(transferMoney).toHaveBeenCalled();
    done();
  });

  test("GET /transferHistory/:accountId gets transfer history for a specific account", async (done) => {
    const req = ({
      body: {
        customerId: "123ID",
      },
      params: {
        accountId: "321ID",
      },
    } as unknown) as Request;

    const res = ({
      json: jest.fn(),
    } as unknown) as Response;

    await transferHistory(req, res);
    expect(getTransferHistoryForAccount).toHaveBeenCalled();
    done();
  });

  test("GET /balanceHistory/:accountId gets balance history for a specific account", async (done) => {
    const req = ({
      body: {
        customerId: "123ID",
      },
      params: {
        accountId: "321ID",
      },
    } as unknown) as Request;

    const res = ({
      json: jest.fn(),
    } as unknown) as Response;

    await balanceHistory(req, res);
    expect(getBalanceHistoryForAccount).toHaveBeenCalled();
    done();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
