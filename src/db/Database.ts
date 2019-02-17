// tslint:disable:member-ordering
// tslint:disable-next-line:no-var-requires
const aqlQuery = require("arangojs").aqlQuery;
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import IUserLogin from "../interfaces/IUserLogin";
import IUserRegister from "../interfaces/IUserRegister";

class Database {
  public import = require("arangojs").Database;
  public database = new this.import(process.env.DB_URL);
  public collection = this.database.collection("users");
  constructor() {
    this.database.useDatabase("example");
    this.database.useBasicAuth("root", "root");
  }
  public registerUser(req: Request, res: Response, user: IUserRegister) {
    const query = aqlQuery`
        FOR user IN users
        FILTER user.email == ${user.email}
        RETURN user.email
    `;
    this.database
      .query(query)
      .then((cursor: any) => cursor.all())
      .then((keys: any) => {
        if (keys.length > 0) {
          res.status(401).send(`${user.email} is already in use.`);
        } else {
          bcrypt.hash(user.password, 10, (err, encrypted) => {
            if (err) {
              throw err;
            } else {
              user.password = encrypted;
              // Store user into the database
              this.collection
                .save(user)
                .then((meta: any) => {
                  // tslint:disable-next-line
                  console.log(`Document inserted: ${meta._rev}`);
                  res.json(user);
                })
                .catch((error: any) => {
                  // tslint:disable-next-line
                  console.log(`Failed to insert a document: ${error}`);
                  res.send("Forbidden.");
                });
            }
          });
        }
      })
      .catch((error: any) => error);
  }
  public loginUser(req: Request, res: Response, user: IUserLogin) {
    const query = aqlQuery`
        FOR user IN users
        FILTER user.email == ${user.email}
        RETURN user
    `;
    this.database
      .query(query)
      .then((cursor: any) => cursor.all())
      .then((keys: any) => {
        if (keys.length > 0) {
          // tslint:disable-next-line:arrow-parens
          bcrypt.compare(user.password, keys[0].password, (err, success) => {
            if (!success) {
              res.status(401).send("Unauthorized.");
            } else {
              jwt.sign(
                {
                  id: keys[0]._key
                },
                process.env.SECRET_OR_KEY,
                { expiresIn: 86400 },
                (error, token) => {
                  if (error) {
                    throw error;
                  } else {
                    res.status(200).json(`Bearer ${token}`);
                  }
                }
              );
            }
          });
        } else {
          res
            .status(401)
            .send(
              `An account using the email address "${
                user.email
              }" was not found.`
            );
        }
      })
      .catch((error: any) => error);
  }
}

const Arango = new Database();

export default Arango;
