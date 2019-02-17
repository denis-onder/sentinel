import { Request, Response } from 'express';
import Arango from '../db/Database';

export class TestController {
  public test(req: Request, res: Response) {
    res.send(Arango.checkDatabase());
  }
}

// tslint:disable-next-line
export const Test_Controller = new TestController();
