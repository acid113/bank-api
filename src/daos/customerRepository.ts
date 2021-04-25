/* eslint-disable require-await */
import { Customer } from "@typedef/customer";

import { v4 as uuidv4 } from "uuid";

export const create = async (name: string): Promise<Customer> => {
  const customer: Customer = {
    name,
    id: uuidv4(),
    created: new Date(),
    createdBy: "admin",
    lastUpdated: new Date(),
    lastUpdatedBy: "admin",
  };

  //TODO: save customer

  return customer;
};

export const getById = async (customerId: string): Promise<Customer> => {
  const customer: Customer = {
    id: customerId,
    name: "Marvin",
    created: new Date(),
    createdBy: "admin",
    lastUpdated: new Date(),
    lastUpdatedBy: "admin",
  };

  return customer;
};

export const getByName = async (name: string): Promise<Customer> => {
  const customer: Customer = {
    id: "1",
    name: name,
    created: new Date(),
    createdBy: "admin",
    lastUpdated: new Date(),
    lastUpdatedBy: "admin",
  };

  return customer;
};
