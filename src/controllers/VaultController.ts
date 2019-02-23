// tslint:disable:object-literal-sort-keys
// tslint:disable-next-line:no-var-requires
const aqlQuery = require("arangojs").aqlQuery;
import { Request, Response } from "express";
import Arango from "../db/Database";

export class VaultController {
  public createVault(req: Request, res: Response) {
    const query = aqlQuery`
        FOR vault IN vaults
        FILTER vault.master == ${req.user.id}
        RETURN vault.master
    `;
    Arango.database
      .query(query)
      .then((cursor: any) => cursor.all())
      .then((keys: any) => {
        if (keys.length === 0) {
          // Create a vault
          Arango.createVault(req, res);
        } else {
          res.status(401).send("This user already has a vault.");
        }
      });
  }
  public openVault(req: Request, res: Response) {
    const query = aqlQuery`
        FOR vault IN vaults
        FILTER vault.master == ${req.user.id}
        RETURN vault
    `;
    Arango.database
      .query(query)
      .then((cursor: any) => cursor.all())
      .then((keys: any) => {
        if (keys.length > 0) {
          Arango.openVault(req, res, keys[0]);
        } else {
          res.status(404).send("You do not have a vault.");
        }
      });
  }
  public addField(req: Request, res: Response) {
    const query = aqlQuery`
        FOR vault IN vaults
        FILTER vault.master == ${req.user.id}
        RETURN vault
    `;
    Arango.database
      .query(query)
      .then((cursor: any) => cursor.all())
      .then((keys: any) => {
        if (keys.length > 0) {
          const newField = {
            name: req.body.name,
            password: req.body.password
          };
          const vault = keys[0];
          Arango.addField(req, res, newField, vault);
        } else {
          res.status(404).send("You do not have a vault.");
        }
      });
  }
}

// tslint:disable-next-line:variable-name
export const Vault_Controller = new VaultController();
