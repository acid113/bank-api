/** Refresh Routes Mocks */

const CustomerRouter = jest.fn();
const AccountRouter = jest.fn();

jest.mock("../routes/customer", () =>
  CustomerRouter.mockImplementation((req, res) => res.json({ status: "OK" }))
);
jest.mock("../routes/account", () =>
  AccountRouter.mockImplementation((req, res) => res.json({ status: "OK" }))
);

import { StatusCodes } from "http-status-codes";
import app from "../server";
import request from "supertest";

describe("for Customers and Accoumts base routes", () => {
  test("USE /customer", async (done) => {
    const res = await request(app).get("/api/customer");
    expect(res.status).toEqual(StatusCodes.OK);
    expect(res.body).toEqual({ status: "OK" });
    done();
  });

  test("USE /account", async (done) => {
    const res = await request(app).get("/api/account/all");
    expect(res.status).toEqual(StatusCodes.OK);
    expect(res.body).toEqual({ status: "OK" });
    done();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
