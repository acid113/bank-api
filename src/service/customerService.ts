import {
  create,
  getById as getCustomerById,
  getByName as getCustomerByName,
} from "@daos/customerRepository";
import { createAccount as createAccount } from "@daos/accountRepository";

import { Customer } from "@typedef/customer";

export const add = async (name: string, balance = 0): Promise<Customer> => {
  try {
    const customer = await create(name);
    await createAccount(customer.id, balance);

    return customer;
  } catch (e) {
    throw new Error(`Error creating new customer account for ${name}`);
  }
};

export const getById = async (customerId: string): Promise<Customer> => {
  try {
    return await getCustomerById(customerId);
  } catch (e) {
    throw new Error(`Error getting customer data for ${customerId}`);
  }
};

export const getByName = async (name: string): Promise<Customer> => {
  try {
    return await getCustomerByName(name);
  } catch (e) {
    throw new Error(`Error getting customer data for ${name}`);
  }
};
