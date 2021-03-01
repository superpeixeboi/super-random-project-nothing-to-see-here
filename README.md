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

## Best matched restaurants
### Introduction
This assessment is designed to test your thinking process and coding skills when facing a real industry problem. We're looking for code that is clean, readable, testable, robust, performant, and maintainable. The estimated time you will spend on this assessment is ~3-4 hours.

Since this assessment includes a searching function, we kindly ask you to avoid out of box search engines such as ElasticSearch. Instead, you should write the searching logic by yourself. Other than that, please feel free to use any languages or frameworks you are familiar with. We are focusing on your idea and your code quality, hence will not make judgments on what technologies you choose. All the data you will need in this assessment will be provided to you as **.csv** files.

We will only assess you based on the requirements listed below, but feel free to add extra features beyond these requirements. If you continue to our interview panel stage, we will ask you questions about your implementation.

When you are done, please return the task by email, or via Github. We expect to receive your response within 3 days after you received this assessment.

*Note: We expect you to do this assessment by yourself without other people's help. We ask you to keep this assessment private and not to share it with others. All data provided are fake and used only for this assessment.*

### Find the best-matched restaurants
You have data about local restaurants located near your company, which you can find in the **restaurants.csv** file. You would like to develop a basic search function that allows your colleagues to search those restaurants to help them find where they would like to have lunch. The search is based on five criteria: **Restaurant Name, Customer Rating(1 star ~ 5 stars), Distance(1 mile ~ 10 miles), Price(how much one person will spend on average, $10 ~ $50), Cuisine(Chinese, American, Thai, etc.).** The requirements are listed below.

1. The function should allow users to provide up to five parameters based on the criteria listed above. *You can assume each parameter can contain only one value.*
2. If parameter values are invalid, return an error message.
3. The function should return up to five matches based on the provided criteria. If no matches are found, return an empty list. If less than 5 matches are found, return them all. If more than 5 matches are found, return the best 5 matches. The returned results should be sorted according to the rules explained below. Every record in the search results should at least contain the restaurant name.
4. “Best match” is defined as below:
   - A Restaurant Name match is defined as an exact or partial String match with what users provided. For example, “Mcd” would match “Mcdonald’s”.
   - A Customer Rating match is defined as a Customer Rating equal to or more than what users have asked for. For example, “3” would match all the 3 stars restaurants plus all the 4 stars and 5 stars restaurants.
   - A Distance match is defined as a Distance equal to or less than what users have asked for. For example, “2” would match any distance that is equal to or less than 2 miles from your company.
   - A Price match is defined as a Price equal to or less than what users have asked for. For example, “15” would match any price that is equal to or less than $15 per person.
   - A Cuisine match is defined as an exact or partial String match with what users provided. For example, “Chi” would match “Chinese”. You can find all the possible Cuisines in the **cuisines.csv** file. *You can assume each restaurant offers only one cuisine.*
   - The five parameters are holding an “AND” relationship. For example, if users provide Name = “Mcdonald’s” and Distance = 2, you should find all “Mcdonald’s” within 2 miles.
   - When multiple matches are found, you should sort them as described below.
     - Sort the restaurants by Distance first.
     - After the above process, if two matches are still equal, then the restaurant with a higher customer rating wins.
     - After the above process, if two matches are still equal, then the restaurant with a lower price wins.
     - After the above process, if two matches are still equal, then you can randomly decide the order.
     - Example: if the input is Customer Rating = 3 and Price = 15. Mcdonald’s is 4 stars with an average spend = $10, and it is 1 mile away. And KFC is 3 stars with an average spend = $8, and it is 1 mile away. Then we should consider Mcdonald’s as a better match than KFC. (They both matches the search criteria -> we compare distance -> we get a tie -> we then compare customer rating -> Mcdonald’s wins)
5. The final submitted work should include a README file. No UI is required in this assessment, but you may implement one if you would like. **The steps to run and test your program should be clearly introduced in the README file.** If you have made any additional **Assumptions** besides what we have listed above while working on this assessment, please document them so that we can better understand your solution.
