// tslint:disable:object-literal-sort-keys
import { Request, Response } from "express";
import uuid from "uuid";
import Arango from "../db/Database";
import IUserLogin from "../interfaces/IUserLogin";
import IUserRegister from "../interfaces/IUserRegister";
import Input_Validator from "../utils/InputValidator";

export class AuthController {
  public register(req: Request, res: Response) {
    const newUser: IUserRegister = {
      _key: uuid(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    };
    const isValid = Input_Validator.register(newUser);
    if (typeof isValid === "object") {
      res.json(isValid);
    } else {
      Arango.registerUser(req, res, newUser);
    }
  }
  public login(req: Request, res: Response) {
    const user: IUserLogin = {
      email: req.body.email,
      password: req.body.password
    };
    const isValid = Input_Validator.login(user);
    if (typeof isValid === "object") {
      res.json(isValid);
    } else {
      Arango.loginUser(req, res, user);
    }
  }
  public current(req: Request, res: Response) {
    const user = {
      id: req.user.id,
      email: req.user.email
    };
    res.json(user);
  }
}

// tslint:disable-next-line
export const Auth_Controller = new AuthController();
