import express from 'express';
import { Auth_Controller } from '../controllers/AuthController';
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
        this.router.post('/register', (req: express.Request, res: express.Response) => {
            Auth_Controller.register(req, res);
        });
        this.router.post('/login', (req: express.Request, res: express.Response) => {
            Auth_Controller.login(req, res);
        });
    }
}

export const Routes = new Router().router;
