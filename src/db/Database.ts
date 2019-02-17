// tslint:disable:member-ordering
// tslint:disable-next-line:no-var-requires
const aqlQuery = require("arangojs").aqlQuery;
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import IUserLogin from "../interfaces/IUserLogin";
import IUserRegister from "../interfaces/IUserRegister";
import IVaultKey from "../interfaces/IVaultKey";

class Database {
  public import = require("arangojs").Database;
  public database = new this.import(process.env.DB_URL);
  public userCollection = this.database.collection("users");
  public vaultCollection = this.database.collection("vaults");
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
              this.userCollection
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
  public createVault(req: Request, res: Response) {
    const vault: IVaultKey = {
      key: req.body.key,
      master: req.user.id
    };
    bcrypt.hash(vault.key, 10, (err, encrypted) => {
      if (err) {
        throw err;
      } else {
        vault.key = encrypted;
        this.vaultCollection
          .save(vault)
          .then((meta: any) => {
            // tslint:disable-next-line
            console.log(`Vault created: ${meta._rev}`);
            res.json(vault);
          })
          .catch((error: any) => {
            // tslint:disable-next-line
            console.log(`Failed to create a vault: ${error}`);
            res.send("Forbidden.");
          });
      }
    });
  }
}

const Arango = new Database();

export default Arango;
