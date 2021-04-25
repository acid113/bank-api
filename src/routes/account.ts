import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { APIResponse } from "@typedef/apiResponse";

import {
  addAccount,
  getAccountForCustomer,
  getAccountsForCustomer,
  getTransferHistoryForAccount,
  getBalanceHistoryForAccount,
  transferMoney,
} from "@service/accountService";
import {
  Account,
  AccountTransferHistory,
  BalanceHistory,
} from "@typedef/account";

export const router = Router();

export const add = async (
  req: Request,
  res: Response
): Promise<Response<APIResponse<Account>>> => {
  const { customerId, balance } = req.body;

  try {
    let response: APIResponse<Account> = {
      code: "0",
      message: `Success creating account for customer ${customerId}`,
    };

    if (!customerId || !balance) {
      response = {
        code: "2",
        message: `Missing required param(s): Need customerId (was ${customerId}) and balance (was ${balance})`,
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const data = await addAccount(customerId, balance);
    response.data = data;

    return res.status(StatusCodes.OK).json(response);
  } catch (e) {
    const response: APIResponse<Error> = {
      code: "1",
      message: "Error encountered creating new account",
      data: e,
    };

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

export const get = async (
  req: Request,
  res: Response
): Promise<Response<APIResponse<Account>>> => {
  const { customerId } = req.body;
  const accountId = req.params.accountId;

  try {
    let response: APIResponse<Account> = {
      code: "0",
      message: `Success getting account for customer ${customerId}`,
    };

    if (!customerId || !accountId) {
      response = {
        code: "2",
        message: `Missing required param(s): Need customerId (was ${customerId}) and accountId (was ${accountId})`,
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const account = await getAccountForCustomer(customerId, accountId);
    response.data = account;

    return res.status(StatusCodes.OK).json(response);
  } catch (e) {
    const response: APIResponse<Error> = {
      code: "1",
      message: "Error encountered getting an account",
      data: e,
    };

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response<APIResponse<Account[]>>> => {
  const { customerId } = req.body;

  try {
    let response: APIResponse<Account[]> = {
      code: "0",
      message: `Success getting account for customer ${customerId}`,
    };

    if (!customerId) {
      response = {
        code: "2",
        message: `Missing required param(s): Need customerId (was ${customerId})`,
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const accounts = await getAccountsForCustomer(customerId);
    response.data = accounts;

    return res.status(StatusCodes.OK).json(response);
  } catch (e) {
    const response: APIResponse<Error> = {
      code: "1",
      message: "Error encountered getting an account",
      data: e,
    };

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

export const transfer = async (
  req: Request,
  res: Response
): Promise<Response<APIResponse<string>>> => {
  const {
    sourceCustomerId,
    sourceAccountId,
    recipientCustomerId,
    recipientAccountId,
    amount,
  } = req.body;

  try {
    let response: APIResponse<string> = {
      code: "0",
      message: `Success transferring funds from customer ${sourceCustomerId} to customer ${recipientCustomerId}`,
    };

    if (
      !sourceCustomerId ||
      !sourceAccountId ||
      !recipientCustomerId ||
      !recipientCustomerId ||
      !amount
    ) {
      response = {
        code: "2",
        message: `Missing required param(s): Need sourceCustomerId (was ${sourceCustomerId})
        , sourceAccountId (was ${sourceAccountId})
        , recipientCustomerId (was ${recipientCustomerId})
        , recipientAccountId (was ${recipientAccountId})
        , amount (was ${amount})
        `,
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const transactionId = await transferMoney(
      sourceCustomerId,
      sourceAccountId,
      recipientCustomerId,
      recipientAccountId,
      amount
    );
    response.data = transactionId;

    return res.status(StatusCodes.OK).json(response);
  } catch (e) {
    const response: APIResponse<Error> = {
      code: "1",
      message: `Error transferring funds from customer ${sourceCustomerId} to customer ${recipientCustomerId}`,
      data: e,
    };

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

export const transferHistory = async (
  req: Request,
  res: Response
): Promise<Response<APIResponse<AccountTransferHistory[]>>> => {
  const { customerId } = req.body;
  const accountId = req.params.accountId;

  try {
    let response: APIResponse<AccountTransferHistory[]> = {
      code: "0",
      message: `Success getting transfer history for customer ${customerId} for account ${accountId}`,
    };

    if (!customerId || !accountId) {
      response = {
        code: "2",
        message: `Missing required param(s): Need customerId (was ${customerId}) and accountId (was ${accountId})`,
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const accounts = await getTransferHistoryForAccount(customerId, accountId);
    response.data = accounts;

    return res.status(StatusCodes.OK).json(response);
  } catch (e) {
    const response: APIResponse<Error> = {
      code: "1",
      message: `Error getting transfer history for customer ${customerId} with account ${accountId}`,
      data: e,
    };

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

export const balanceHistory = async (
  req: Request,
  res: Response
): Promise<Response<APIResponse<BalanceHistory[]>>> => {
  const { customerId } = req.body;
  const accountId = req.params.accountId;

  try {
    let response: APIResponse<BalanceHistory[]> = {
      code: "0",
      message: `Success getting balance history for customer ${customerId} for account ${accountId}`,
    };

    if (!customerId || !accountId) {
      response = {
        code: "2",
        message: `Missing required param(s): Need customerId (was ${customerId}) and accountId (was ${accountId})`,
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const accounts = await getBalanceHistoryForAccount(customerId, accountId);
    response.data = accounts;

    return res.status(StatusCodes.OK).json(response);
  } catch (e) {
    const response: APIResponse<Error> = {
      code: "1",
      message: `Error getting balance history for customer ${customerId} with account ${accountId}`,
      data: e,
    };

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

router.post("/", add);
router.get("/:accountId", get);
router.get("/all", getAll);
router.post("/transfer", transfer);
router.get("/transferHistory/:accountId", transferHistory);
router.get("/balanceHistory/:accountId", balanceHistory);

export default router;
