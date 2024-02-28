# Qrud (pre-alpha)

An opinionated CRUD library made for serverless functions. Aiming to accelerate development by furnishing pre-built methods essential for constructing a robust CRUD API. The ambition is to streamline the development process, empowering developers to focus more on business logic rather than repetitive tasks.

## Development

`$ npm i qrud`

## Use case (AWS Lambda and Appsync GraphQL Sample)

```js
import { Qrud } from "qrud";
import { Todo } from "../../schema/todo";

export const handler = async (event) => {
  try {
    const api = new Qrud({
      schema: Todo,
      table: "todo",
      database: process.env.SQL_DATABASE,
    });

    return await api.gql(event);
  } catch (error) {
    throw new Error(error);
  }
};
```

## Initiate environment variables

`$ export QRUD_SECRET_ARN={AWS SECRET ARN HERE}`

`$ export QRUD_RESOURCE_ARN={AWS RDS CLUSTER ARN}`

`$ export QRUD_REGION={AWS RDS CLUSTER ARN}`

## Unit test

`$ npx jest -- tests/simple.test.ts`
