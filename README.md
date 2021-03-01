# take-home-assessment
A take home assessment designed for Full-stack or Backend developers

## Implementation

### The language

I selected Typescript, running on top of Node.js, and parsed to Javascript by the ts-node package.

### The architecture

I decided to build this solution as an API, with a postman collection to facilitate testing the requests. The other option that came to mind was an AWS lambda function, but it would require some setup to run on the evaluator's own AWS account, so I decided for the simplest solution.

Http requests are handled by an Express app. A middleware will be used to create a `GET /restaurant` route and handle parameters from the querystring.

### Database solution

The database will run in a docker container described in the docker-compose.yml file. Migration and seeds will be dealt with the typeorm package and cli tool. The same package will be responsible for parsing the querystrings to SQL, with little logic in the app middleware.

Due to the relational nature implied in the data (restaurant has a fk to cuisine), I decided to go with a relational dmbs, and selected postgreSQL.

### Validation

The querystring validation is handled by the Ajv package, that checks the querystring object against a JSON Schema. The idea behind it is that in real life usualy there would be a gateway in front of the app, such as AWS Api Gateway. Simple validations like the ones run here can be performed in the gateway, so that invalid requests don't even get to the backend. The JSON Schema written is (almost) compatible with the one required in the AWS Api Gateway models.

As the query parsers are not aware of the parameter schema, every parameter informed is received as a string. In order to avoid transformation on the received data, the validation schema handles numeric fields as strings with numeric content using regex patterns.

### Tests

Tests are handled with Jest which is not at all my prefered testing tool, since it has a huge dependency tree. But as it is the one I've used in the last few projects, it was a compromise to deliver the tests as soon as posible.

As most of the logic is handled by well tested and very popular packages, all that was left to test was the schema validation. It is done by running the middleware function with a mock request and using jest to stub dependencies like typeorm.

To run tests: `npm test`

### Pre requisites
1) Node 14+ must be installed.
2) Docker must be installed and running.

### Setup

First we need to install dependencies. From the project root run:
```
npm install
```

A postgreSQL docker container is configured and must be run before starting the server:
```
docker-compose up
```

Run the migration files to create the tables:
```
npm run migration
```

Run the seed script to populate the tables:
```
npm run seed
```

Finally the server can be started:
```
npm start
```

### Assumptions

* the search by name can be case insensitive, so `mcd` would also return Mcdonalds.
* the entire restaurant record and its relationship can be returned in the response.
