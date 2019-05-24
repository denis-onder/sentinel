import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import PassportJSConfig from "./config/passport";
import Router from "./Router";

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
  }
  private config() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use("/api", Router);
    PassportJSConfig.init(this.app);
  }
}

const app = new App().app;

export default app;
