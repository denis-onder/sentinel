# Sentinel

> A password manager built with Express, ArangoDB, React and Typescript.

---

### NPM Scripts:

> These scripts are supposed to be ran from root-level in the file structure.

> NOTE: You are supposed to run the installation scripts first before you are able to run the other scripts.

- `npm run prep - Installs both the front-end and the back-end dependencies.`

- `npm start - Starts the Node server.`

- `npm run dev - Starts both the Node and React server at the same time.`

---

### Environmental Variables:

> Ports and other sensitive/database information are stored within a .env file in the root directory

> NOTE: Create a .env file in the root directory, and add the following properties with your matching values for establishing a connection with your local Arango database

- `SERVER_PORT`
- `SECRET_OR_KEY`
- `DB_URL`
- `DB_NAME`
- `DB_COLLECTION`
- `DB_USER`
- `DB_PASSWORD`

---
