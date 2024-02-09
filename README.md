# qrud - an opinionated crud framework for serverless functions

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
