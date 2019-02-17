import * as dotenv from 'dotenv';
import app from './app';

// Initialize config file
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;

// Server
// tslint:disable-next-line
app.listen(SERVER_PORT, () => console.log(`Server running: http://localhost:${SERVER_PORT}`));
