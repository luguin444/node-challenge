# Node.js Challenge

## Project Overview:

This project comprises a backend application designed for the Node.js challenge. It encompasses two distinct servers:

1. User-Facing API: This component manages requests from registered users, facilitating the retrieval of quote information.

2. Internal Stock Service: Responsible for querying external APIs to gather the requested quote data

## Main Technologies

- Node (version 16.14.0);
- Express;
- Prisma;
- Postgres;
- Jest e Supertest;
- Joi;
- JWT.

## How to run in development with containers?

To run this project in development, follow the steps below:

1. Ensure that docker and docker-compose are installed on your machine: Download here:

- docker-compose: https://docs.docker.com/compose/install/
- docker: https://www.docker.com/get-started/

To check, run: `docker -v` and `docker-compose -v`

2. Clone the repository: `git clone <repository_url>`

3. Create the `.env file` based on the `.env.example` for each server ( api-server, and stock-server ).

4. Navigate to the project directory "node-challenge" and run the following command to build and start the containers.

`docker-compose up -d --build`

5. This will start with both servers and the PostgreSQL database. You can verify this by running:

`docker ps`

6. A user, password, and JWT are automatically created for you to facilitate testing the API. To retrieve them, use:

`docker-compose logs`

7. Manual tests can be conducted using the Postman software or OpenAPI/Swagger at `localhost:3001/docs` with the generated JWT. At the root of the project, there is a collection named `node-challenge.postman_collection.json` that can be loaded into the tool.

## Documentation

Please check in: `localhost:3001/docs`

## How to run in development in the machine?

1. Ensure that nodejs 16 and postgres are installed on your machine

To check, run: `node -v` and `postgres --version`

2. Open to terminal tabs:

- The first in the directory: `cd node-challenge/api-service`
- The second: `cd node-challenge/stock-service`

3. Both terminals run `npm i`

4. Create the `.env file` based on the `.env.example` for each server, api-server, and stock-server. Use the "RUN IN MACHINE" variables

5. Create your development and test databases in your Postgres:
   -Development: `CREATE DATABASE development_node_challenge;`
   -Test: `CREATE DATABASE test_node_challenge;`

6. Both terminals run `npm run start`

## How to run the tests?

1. To be able to run the tests, you'll need to create another `.env.test` file based on the `.env.example.test` file for both the api-service and stock-service servers.

2. Run in "node-challenge" directory:

`docker-compose -f docker-compose.test.yml build`

3. Run in the same directory "node-challenge":

`docker-compose -f docker-compose.test.yml up`

The tests will be printed

PS: If you want to run the test without containers, you can do it by `npm run test`. Just make sure:

- Your postgres has the ` test_node_challenge` database.
- Both `.env.test` are filled with the correct variables from `.env.example.test`
