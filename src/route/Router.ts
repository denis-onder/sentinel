import express from 'express';
import { Test_Controller } from '../controllers/TestController';

class Router {
    public router: express.Router = express.Router();
    constructor() {
        this.config();
    }
    private config(): void {
        this.router.get('/test', (req: express.Request, res: express.Response) => {
          Test_Controller.test(req, res);
        });
    }
}

export const Routes = new Router().router;
