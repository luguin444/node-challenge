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
- Ubuntu: `sudo snap install docker`. To check, run: `docker -v` and `docker-compose -v`
- Troubleshooting: If you have permissions problems, use `sudo` before the commands.

2. Clone the repository: `git clone <repository_url>`

3. Create the `.env file` based on the `.env.example` for each server ( api-server, and stock-server ).

4. Navigate to the project directory "node-challenge" and run the following command to build and start the containers. `docker-compose up -d --build`

   - Troubleshooting: all ports must be free, otherwise the containers will not start. Maybe you must stop your local postgres before step 4: `sudo service postgresql stop`. You can check the PORT=5432 with `sudo lsof -i :5432`

5. This will start with both servers and the PostgreSQL database. You can verify this by running: `docker ps`

6. A user, password, and JWT are automatically created for you to facilitate testing the API. To retrieve them, use: `docker-compose logs`

7. Manual tests can be conducted using the Postman software or OpenAPI/Swagger

- OpenAPI/Swagger: Open in browser `localhost:3001/docs` and authenticate with the generated JWT.
- Postman: grab a collection named `node-challenge.postman_collection.json` in the root of the project and load into the tool.

## Documentation

Please check in: `localhost:3001/docs` ( server api-server must be running )

## How to run in development in the machine?

1. Ensure that nodejs 16 and Postgres are installed on your machine

To check, run: `node -v` and `postgres --version`

2. Open two terminal tabs:

- The first in the directory: `cd node-challenge/api-service`
- The second in the directory: `cd node-challenge/stock-service`

3. In both terminals run `npm i`

4. Create the `.env file` based on the `.env.example` for each server, api-server, and stock-server. Use the "RUN IN MACHINE" variables

- Troubleshooting: you must use the user, password and port from the postgresql of your machine;

5. Create your development and test databases in your Postgres:

- Development: `CREATE DATABASE development_node_challenge;`
- Test: `CREATE DATABASE test_node_challenge;`

6. Both terminals run `npm run start`.

- Troubleshooting: If the containers are started, there will be conflict of ports. Stop them with: `docker stop <container_id>`

## How to run the tests?

1. To be able to run the tests, you'll need to create another `.env.test` file based on the `.env.example.test` file for both the api-service and stock-service servers.

2. Run in "node-challenge" directory: `docker-compose -f docker-compose.test.yml build`

3. Run in the same directory "node-challenge": `docker-compose -f docker-compose.test.yml up`

The tests will be printed

PS: If you want to run the test without containers, you can do it by `npm run test`. Just make sure:

- Your postgres has the ` test_node_challenge` database.
- Both `.env.test` are filled with the correct variables from `.env.example.test`
