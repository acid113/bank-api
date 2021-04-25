import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { APIResponse } from "@typedef/apiResponse";

import { add as createCustomer, getByName } from "@service/customerService";
import { addAccount, MIN_INITIAL_DEPOSIT } from "@service/accountService";
import { Customer } from "@typedef/customer";
import { Account } from "@typedef/account";

export const router = Router();

export interface NewCustomer {
  customer: Customer;
  account: Account;
}

export const addCustomer = async (
  req: Request,
  res: Response
): Promise<Response<APIResponse<NewCustomer>>> => {
  const { name, balance } = req.body;

  try {
    let response: APIResponse<NewCustomer> = {
      code: "0",
      message: `Success creating account for customer ${name}`,
    };

    if (!name || !balance) {
      response = {
        code: "2",
        message: `Missing required param(s): Need name (was ${name}) and balance (was ${balance})`,
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (balance < MIN_INITIAL_DEPOSIT) {
      response = {
        code: "3",
        message: `Initial deposit amounting to at least ${MIN_INITIAL_DEPOSIT} is required`,
      };

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const customer = await createCustomer(name);
    const account = await addAccount(customer.id, balance);
    response.data = {
      customer,
      account,
    };

    return res.status(StatusCodes.OK).json(response);
  } catch (e) {
    const response: APIResponse<Error> = {
      code: "1",
      message: "Error encountered",
      data: e,
    };

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

export const getCustomerByName = async (
  req: Request,
  res: Response
): Promise<Response<APIResponse<Customer>>> => {
  const { name } = req.body;

  try {
    let response: APIResponse<Customer> = {
      code: "0",
      message: `Success getting customer details for customer ${name}`,
    };

    if (!name) {
      response = {
        code: "2",
        message: `Missing required param(s): Need name (was ${name})`,
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    response.data = await getByName(name);
    return res.status(StatusCodes.OK).json(response);
  } catch (e) {
    const response: APIResponse<Error> = {
      code: "1",
      message: "Error encountered ",
      data: e,
    };

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

router.get("/", getCustomerByName);
router.post("/", addCustomer);

export default router;
