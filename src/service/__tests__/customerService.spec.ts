const customer = {
  id: "123ID",
  customerId: "123CustID",
  name: "Marvin",
  created: new Date(),
  createdBy: "admin",
  lastUpdated: new Date(),
  lastUpdatedBy: "admin",
};

const account = {
  id: "123ID",
  customerId: "123CustID",
  balance: 100,
  currency: "PHP",
  created: new Date(),
  createdBy: "admin",
  lastUpdated: new Date(),
  lastUpdatedBy: "admin",
};

const CUSTOMER_NAME = "Marvin";
const CUSTOMER_ID = "123ID";
const BALANCE = 100;

const create = jest.fn().mockReturnValue(customer);
const getCustomerById = jest.fn().mockReturnValue(customer);
const getCustomerByName = jest.fn().mockReturnValue(customer);

jest.mock("@daos/customerRepository", () => ({
  create,
  getCustomerById,
  getCustomerByName,
}));

const createAccount = jest.fn().mockReturnValue(account);

jest.mock("@daos/accountRepository", () => ({
  createAccount,
}));

import { add, getById, getByName } from "../customerService";

describe("Customer service", () => {
  beforeEach(() => {});

  test("add customer creates a new customer and account data", async (done) => {
    await add(CUSTOMER_NAME, BALANCE);

    expect(create).toHaveBeenCalled();
    expect(createAccount).toHaveBeenCalled();

    done();
  });

  test("get by ID returns a customer data", async (done) => {
    await getById(CUSTOMER_ID);

    expect(getCustomerById).toHaveBeenCalled();

    done();
  });

  test("get by name returns a customer data", async (done) => {
    await getByName(CUSTOMER_NAME);

    expect(getCustomerByName).toHaveBeenCalled();

    done();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
