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
        if (keys.length <= 0) {
          // Create a vault
          Arango.createVault(req, res);
        } else {
          res.status(401).send("Unauthorized.");
        }
      });
  }
}

// tslint:disable-next-line:variable-name
export const Vault_Controller = new VaultController();
