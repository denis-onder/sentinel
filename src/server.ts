// tslint:disable:no-console
import app from "./app";
import config from "./config/config";

// Server
app.listen(config.SERVER_PORT, () =>
  console.log(`Server running: http://localhost:${config.SERVER_PORT}`)
);
