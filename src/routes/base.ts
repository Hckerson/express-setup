import express, { Router } from "express";
import authRoute from "./auth";
import userRoute from "./user";

class BaseRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use(authRoute);
    this.router.use(userRoute);
  }

  getRouter() {
    return this.router;
  }
}

export default new BaseRoutes().getRouter();
