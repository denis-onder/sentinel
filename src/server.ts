import app from "./app";
import config from "./config/config";

// Server
// tslint:disable-next-line
app.listen(config.SERVER_PORT, () =>
  console.log(`Server running: http://localhost:${config.SERVER_PORT}`)
);
