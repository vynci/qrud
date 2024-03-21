import { QrudAuthContext } from "../types";
import { db } from "../database/knex";
import { createContextPayload } from "../helpers/helper";

export const createItem = async <SchemaType>(
  table: string,
  payload: SchemaType,
  schema: any,
  database: string,
  authContext?: QrudAuthContext<SchemaType>
) => {
  const knex = db(database);
  let result: any;

  const authContextPayload = createContextPayload(authContext);

  if (payload instanceof Array) {
    let items: any = [];

    payload.forEach((item) => {
      items.push(schema.parse({ ...item, ...authContextPayload }));
    });

    await knex(table).insert(items);

    result = items;
  } else {
    const item = schema.parse({ ...payload, ...authContextPayload });

    await knex(table).insert(item);

    result = item;
  }

  return result;
};
