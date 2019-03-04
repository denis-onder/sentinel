import { Request, Response } from 'express';

export class TestController {
  public test(req: Request, res: Response) {
    res.status(200).json(`Test Completed. Status: 200, Timestamp: ${Date.now()}`);
  }
}

// tslint:disable-next-line
export const Test_Controller = new TestController();
