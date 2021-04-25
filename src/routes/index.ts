import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

import CustomerRouter from "./customer";
import AccountRouter from "./account";

// Init router and path
const router = Router();
router.use("/customer", CustomerRouter);
router.use("/account", AccountRouter);

router.get("/", (req: Request, res: Response) => {
  try {
    const date = new Date();
    return res.status(StatusCodes.OK).json({ message: `Success: ${date}` });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error" });
  }
});

// Add sub-routes

// Export the base-router
export default router;
