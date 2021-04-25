const createCustomer = jest.fn();
const addAccount = jest.fn();
const getByName = jest.fn();

jest.mock("@service/customerService", () => ({
  createCustomer,
  getByName,
}));

jest.mock("@service/accountService", () => ({
  addAccount,
}));

import { Request, Response } from "express";
import { addCustomer, getCustomerByName } from "../customer";

describe("Customer routes", () => {
  beforeEach(() => {});

  test("POST / adds a new customer", async (done) => {
    const req = {
      body: {
        name: "Marvin",
        balance: "100",
      },
    } as Request;

    const res = ({
      json: jest.fn(),
    } as unknown) as Response;

    await addCustomer(req, res);
    expect(createCustomer).toHaveBeenCalled();
    expect(addAccount).toHaveBeenCalled();

    done();
  });

  test("POST / adds a new customer", async (done) => {
    const req = {
      body: {
        name: "Marvin",
      },
    } as Request;

    const res = ({
      json: jest.fn(),
    } as unknown) as Response;

    await getCustomerByName(req, res);
    expect(getByName).toHaveBeenCalled();

    done();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
