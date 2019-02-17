import express from "express";
import { Auth_Controller } from "../controllers/AuthController";
import { Test_Controller } from "../controllers/TestController";
import { Vault_Controller } from "../controllers/VaultController";
// tslint:disable-next-line:no-var-requires
const passport = require("passport");

class Router {
  public router: express.Router = express.Router();
  constructor() {
    this.config();
  }
  private config(): void {
    this.router.get("/test", (req: express.Request, res: express.Response) => {
      Test_Controller.test(req, res);
    });
    this.router.post(
      "/register",
      (req: express.Request, res: express.Response) => {
        Auth_Controller.register(req, res);
      }
    );
    this.router.post(
      "/login",
      (req: express.Request, res: express.Response) => {
        Auth_Controller.login(req, res);
      }
    );
    this.router.get(
      "/current",
      passport.authenticate("jwt", { session: false }),
      (req: express.Request, res: express.Response) => {
        Auth_Controller.current(req, res);
      }
    );
    this.router.post(
      "/vault/create",
      passport.authenticate("jwt", { session: false }),
      (req: express.Request, res: express.Response) => {
        Vault_Controller.createVault(req, res);
      }
    );
  }
}

export const Routes = new Router().router;
