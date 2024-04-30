# Node.js Challenge

## Project Overview:

This project comprises a backend application designed for the Node.js challenge. It encompasses two distinct servers:

1. User-Facing API: This component manages requests from registered users, facilitating the retrieval of quote information.

2. Internal Stock Service: Responsible for querying external APIs to gather the requested quote data.

## Documentation

Please check here:

## Main Technologies

- Node (version 16.14.0);
- Express;
- Prisma;
- Postgres;
- Jest e Supertest;
- Joi;
- JWT.

## How to run in development?

To run this project in development, follow the steps below:

1. Ensure that Docker and Docker Compose are installed on your machine: Download here

2. Clone the repository: git clone <repository_url>

3. Create the `.env file` based on the `.env.example` for each server, api-server, and stock-server.

4. Navigate to the project directory "node-challenge" and run the following command to build and start the containers.

`docker-compose up -d --build`

5. This will start both servers and the PostgreSQL database. You can verify this by running:

`sdocker ps`

6. A user, password, and JWT are automatically created for you to facilitate testing the API. To retrieve them, use:

`docker-compose logs`

7. Manual tests can be conducted using the Postman software. At the root of the project, there is a collection named `postman-collection.json` that can be loaded into the tool.

## How to run the tests?

1. To be able to run the tests, you'll need to create another `.env.test` file based on the `.env.example.test` file for both the api-service and stock-service servers.

2. Run in "node-challenge" directory:

`docker-compose -f docker-compose.test.yml build`

3. Run in "node-challenge" directory:

`docker-compose -f docker-compose.test.yml up`

The tests will be printed
