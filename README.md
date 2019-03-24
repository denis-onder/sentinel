# Sentinel

> A password manager built with Express, ArangoDB, React (Next.js) and Typescript.

---

### NPM Scripts:

> These scripts are supposed to be ran from root-level in the file structure.

> NOTE: You are supposed to run the installation script (prep) first before you are able to run the other scripts.

- `npm run prep - Installs both the front-end and the back-end dependencies.`

- `npm start - Starts the Node server.`

- `npm run dev - Starts both the Node and Next.js server at the same time.`

---

### Database Setup:

> Sentinel is running ArangoDB as it's database solution. You are required to install ArangoDB on your system

> Fill in the environmental variables according to the information you are using for your database setup

---

### Environmental Variables:

> Ports and other sensitive/database information are stored within a .env file in the root directory

> NOTE: Create a .env file in the root directory, and add the following properties with your matching values for establishing a connection with your local Arango database

- `SERVER_PORT`
- `SECRET_OR_KEY`
- `DB_URL`
- `DB_NAME`
- `DB_VAULT_COLLECTION`
- `DB_USER_COLLECTION`
- `DB_USER`
- `DB_PASSWORD`

---
