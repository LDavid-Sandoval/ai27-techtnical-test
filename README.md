# Technical test AI27

This test is performed by David Sandoval, with github user https://github.com/LDavid-Sandoval

## Installation

It is required to clone the repository from the following link: https://github.com/LDavid-Sandoval/ai27-techtnical-test

Or SSH

```bash
  git clone git@github.com:LDavid-Sandoval/ai27-techtnical-test.git
```

Open the files folder inside Visual Studio Code to be able to install required dependencies

```bash
  npm i
```

## Run

To run the project I ran the following

```bash
  npm start
```

## Dependencies

- Express: Used as a framework for the development of the REST API due to its simplicity and flexibility.
- Mongoose: Used to interact with the MongoDB database and perform CRUD operations.
- Bcrypt: Used to encrypt user passwords and ensure security.
- JWT: Used to generate and verify authentication tokens to protect API routes and resources.
- Axios: Used to make HTTP requests to the Pokémon API (pokeapi) and obtain information from the Pokémon.
- Winston: Used as a logging library to log events and errors in the application.
- Jest: Used as a unit testing framework to guarantee the quality of the code and the proper functioning of the API.

## Environment Variables

The project requires environment variables, which will be set in the CI/CD service provider.

For its operation locally, an .env file with the following data is required

```bash
  MONGODB_USER=''
  MONGODB_PASSWORD=''
  MONGODB_CLUSTER=''
  MONGODB_URI=''
  HASH_PASSWORD=''
  URL_POKE_API='https://pokeapi.co/api/v2/pokemon/'
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## API Reference

The enpoints will be protected by a JWT, which will provide us with a security layer against malicious use.

#### User register

Endpoint that allows to register a user, to be able to use an API

```http
  POST /auth/register
```

| Parameter  | Type     | Description          |
| :--------- | :------- | :------------------- |
| `username` | `string` | username for use API |
| `email`    | `string` | email for use API    |
| `password` | `string` | password for use API |

Body

```json
{
  "username": "your_username",
  "email": "your_email",
  "password": "your_password"
}
```

Response

```json
{
  "message": "User created successfully"
}
```

#### Login

Enpoint that allows user login

```http
  POST /auth/login
```

| Parameter         | Type     | Description                   |
| :---------------- | :------- | :---------------------------- |
| `usernameOrEmail` | `string` | username or email for use API |
| `password`        | `string` | password for use API          |

Body

```json
{
  "usernameOrEmail": "testUser",
  "password": "Test0000"
}
```

Response

```json
{
  "token": "example token",
  "user": {
    "username": "testUserName",
    "email": "test@test.com"
  }
}
```

#### Get Pokemon

Enpoint making a GET request to the PokeAPI to get the data of the specified pokemon and save it in database

```http
  GET /pokemon/:name
```

Headers
| Headers | Description |
| :-------- | :-------------------------------- |
| `Authorization` | **Required**. Bearer {{token}} |

** Token is JWT obtain in login**

Parameters
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `name` | `Parameter` | **Required**. Parameter to be able to search and save a pokemon |

Response

```json
{
  "id": 25,
  "name": "pikachu",
  "moves": ["mega-punch", "pay-day", "thunder-punch", "slam"],
  "types": ["electric"],
  "userID": "64aca0c80407a26f9ebd3dde",
  "_id": "64ad076e50e2ac68fd804b2f",
  "__v": 0
}
```

#### Delete Pokemon by ID

Endpoint that allows you to delete a pokemon by id

```http
  DELETE /pokemon/byId/:id
```

Headers
| Headers | Description |
| :-------- | :-------------------------------- |
| `Authorization` | **Required**. Bearer {{token}} |

** Token is JWT obtain in login**

Parameters
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `id` | `Parameter` | **Required**. Parameter to be able to delete pokemon |

Response

```json
{
  "message": "Pokemon deleted successfully"
}
```

#### Delete Pokemon by Name

Endpoint that allows you to delete a pokemon by name

```http
  DELETE /pokemon/byName/:name
```

Headers
| Headers | Description |
| :-------- | :-------------------------------- |
| `Authorization` | **Required**. Bearer {{token}} |

** Token is JWT obtain in login**

Parameters
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `name` | `Parameter` | **Required**. Parameter to be able to delete pokemon |

Response

```json
{
  "message": "Pokemon deleted successfully"
}
```

#### Delete Pokemon by type

Endpoint that allows you to delete a pokemons by type

```http
  DELETE /pokemon/byType/:type
```

Headers
| Headers | Description |
| :-------- | :-------------------------------- |
| `Authorization` | **Required**. Bearer {{token}} |

** Token is JWT obtain in login**

Parameters
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `type` | `Parameter` | **Required**. Parameter to be able to delete pokemons |

Response

```json
{
  "message": "Pokemons deleted successfully"
}
```

#### Get Pokemon's

Enpoint making a GET Pokemons list for user

```http
  GET /pokemon/
```

Headers
| Headers | Description |
| :-------- | :-------------------------------- |
| `Authorization` | **Required**. Bearer {{token}} |

** Token is JWT obtain in login**

Response

```json
[
  {
    "id": 132,
    "name": "ditto",
    "moves": ["transform"],
    "types": ["normal"]
  },
  {
    "id": 51,
    "name": "dugtrio",
    "moves": ["scratch", "swords-dance", "cut", "sand-attack"],
    "types": ["ground"]
  }
]
```

## Postman Collection

in the path ./postman

there is a collection with all the enpoints to be executed.

## Design pattern

The clean architecture design pattern was selected because you have the following points

- Separation of Responsibilities: Clean Architecture allows for a clear separation of responsibilities between application layers. This makes it easier to maintain and evolve the code as the project grows and requirements change. Each layer has a specific and defined function, which promotes a cleaner and more organized code.

- Framework and library independence: Clean Architecture seeks to minimize the dependency on external frameworks and libraries in the core of the application. This makes the code more self-contained and makes unit testing easier, since mocks or stubs can be used to simulate the behavior of external dependencies.

- Flexibility and adaptability: Clean Architecture's modular structure allows different layers of the application to be modified or replaced without affecting the others. This provides flexibility to add new functionality, change technologies, or migrate to different databases without affecting the rest of the application.

- Testability: Clean Architecture promotes easier and more effective writing of unit tests. By having a clear separation between the layers and the business logic, you can isolate dependencies and test each component individually, which makes it easier to detect errors and ensures a higher level of code quality.

- Maintainability: By following the principles of Clean Architecture, the code is more modular, readable and maintainable. Separation of responsibilities and independence from frameworks make code easier to understand, modify, and maintain over time. This reduces technical debt and improves the sustainability of the project.

## Configuration of the Application by environments

The configuration of the environments will be done through environment variables generated within the architecture of the CI/CD service providers.

The code is ready to be able to read these variables from the provider.

For local use there is an .env file

## Git Flow

The general flow of Gitflow is as follows:

- A develop branch is created from main.
- A release branch is created from the develop.
- Feature branches are created from the develop.
- When a feature branch is terminated, it is merged into the develop branch.
- When the release branch is ready, it is merged into the develop and main branches.
- If a problem is detected in main, a hotfix branch is created from main.
- Once the hotfix branch is finished, it is merged into both develop and main.

## Docker

To run the Docker container, go to the project folder and run the following command

```bash
  docker build -t ai27-technical-test .
```

After the image has been built, you can run your application in a Docker container with the following command:

```bash
  docker run -p 3000:3000 ai27-technical-test
```

## Observability

Rationale for using the Winston library:

- Winston is a widely used and flexible library for logging in Node.js applications. It offers a wide range of configuration and customization options to suit the registration needs of the application.
- It provides different log levels (such as info, warn, and error) that allow you to sort and filter log messages based on their importance.
- With Winston, you can define multiple transports (log destinations) to send log messages to different places, such as the console, files, or third-party services.
- Winston is easy to set up and use and well documented, making it easy to implement in a Node.js application.

As for traceability and monitoring tools, here are two popular options:

- Elastic Stack (Elasticsearch, Logstash, Kibana): The Elastic Stack is a complete solution for collecting, analyzing, and visualizing log data. Elasticsearch is a distributed search and analytics database, Logstash is a log processor, and Kibana is a visualization and analytics interface. You can send your logs to Elasticsearch using a Winston transport and then use Kibana to explore and visualize the log data.

- Splunk: Splunk is a data analytics platform that allows you to collect, analyze, and visualize logs. You can send your logs to Splunk using the appropriate Winston transport, and then use Splunk to perform searches, build dashboards, and generate reports on the log data.
