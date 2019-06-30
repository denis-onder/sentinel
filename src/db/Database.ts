// tslint:disable:member-ordering
// tslint:disable-next-line:no-var-requires
const aqlQuery = require("arangojs").aqlQuery;
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import uuid = require("uuid");
import config from "../config/config";
import IUserLogin from "../interfaces/IUserLogin";
import IUserRegister from "../interfaces/IUserRegister";
import IVault from "../interfaces/IVault";
import IVaultField from "../interfaces/IVaultField";

class Database {
  public import = require("arangojs").Database;
  public database = new this.import(`${config.DB_URL}`);
  public userCollection = this.database.collection(
    `${config.DB_USER_COLLECTION}`
  );
  public vaultCollection = this.database.collection(
    `${config.DB_VAULT_COLLECTION}`
  );
  constructor() {
    this.database.useDatabase(`${config.DB_NAME}`);
    this.database.useBasicAuth(`${config.DB_USER}`, `${config.DB_PASSWORD}`);
  }
  public registerUser(req: Request, res: Response, user: IUserRegister) {
    const query = aqlQuery`
        FOR user IN ${config.DB_USER_COLLECTION}
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
                  res.status(200).json(user);
                })
                .catch((error: any) => {
                  // tslint:disable-next-line
                  console.log(`Failed to insert a document: ${error}`);
                  res.status(401).send("Forbidden.");
                });
            }
          });
        }
      })
      .catch((error: any) => error);
  }
  public loginUser(req: Request, res: Response, user: IUserLogin) {
    const query = aqlQuery`
        FOR user IN ${config.DB_USER_COLLECTION}
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
                config.SECRET_OR_KEY,
                { expiresIn: 86400 },
                (error, token) => {
                  if (error) {
                    throw error;
                  } else {
                    res
                      .status(200)
                      .json({ loggedIn: true, token: `Bearer ${token}` });
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
    const vault: IVault = {
      _key: uuid(),
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
            res.status(200).json(vault);
          })
          .catch((error: any) => {
            // tslint:disable-next-line
            console.log(`Failed to create a vault: ${error}`);
            res.status(401).send("Forbidden.");
          });
      }
    });
  }
  public openVault(req: Request, res: Response, vault: any) {
    const master = vault.key;
    // tslint:disable-next-line:prefer-const
    let openedVault: any = [];
    bcrypt.compare(req.body.key, vault.key, (error, success) => {
      if (!success) {
        res.status(401).send("Invalid password.");
      } else {
        Object.keys(vault).forEach((key: any) => {
          if (
            key !== "_key" &&
            key !== "_id" &&
            key !== "key" &&
            key !== "master" &&
            key !== "_rev"
          ) {
            const value = vault[key];
            const bytes = CryptoJS.AES.decrypt(value, master);
            const entry = {
              [key]: bytes.toString(CryptoJS.enc.Utf8)
            };
            openedVault.push(entry);
          }
        });
        res.status(200).json(openedVault);
      }
    });
  }
  public addField(
    req: Request,
    res: Response,
    newField: IVaultField,
    vault: IVault
  ) {
    const field = {
      name: newField.name,
      password: CryptoJS.AES.encrypt(newField.password, vault.key).toString(),
      serviceName: newField.serviceName
    };
    const query = aqlQuery`
      UPDATE ${vault._key.toString()} WITH { ${field.serviceName}: ${
      field.name
    }, ${field.password} } IN vaults
      RETURN NEW
    `;
    this.database.query(query).then((keys: any) => {
      if (keys) {
        res.json(keys);
      } else {
        res.status(400).send("Bad request.");
      }
    });
  }
}

const Arango = new Database();

export default Arango;
