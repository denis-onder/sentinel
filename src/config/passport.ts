// tslint:disable:no-console
// tslint:disable:quotemark
// tslint:disable:arrow-parens
// tslint:disable:no-shadowed-variable

// Imports
// tslint:disable-next-line:no-var-requires
const aqlQuery = require("arangojs").aqlQuery;
import dotenv from "dotenv";
import * as express from "express";
import passport from "passport";
import * as passportJWT from "passport-jwt";
import Arango from "../db/Database";

// Initialized config
dotenv.config();
export default class PassportJSConfig {
  public static init(app: express.Application) {
    app.use(passport.initialize());
    passport.use(
      new passportJWT.Strategy(
        {
          jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.SECRET_OR_KEY
        },
        (payload: any, done: any) => {
          const query = aqlQuery`
            FOR user IN users
            FILTER user._key == ${payload.id}
            RETURN user
        `;
          Arango.database
            .query(query)
            .then((cursor: any) => cursor.all())
            .then((keys: any) => {
              if (keys.length > 0) {
                const user = {
                  email: keys[0].email,
                  id: keys[0]._key
                };
                return done(null, user);
              } else {
                return done(null, false);
              }
            })
            .catch((error: any) => console.log(error));
        }
      )
    );
  }
}
