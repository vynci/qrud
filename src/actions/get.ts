import { QrudAuthContext } from "../types";
import { db } from "../database/knex";

export const getItem = async <SchemaType>(
  table: string,
  argsId: string | number,
  database: string,
  authContext?: QrudAuthContext<SchemaType>
) => {
  const knex = db(database);

  let field = "id";
  let value = argsId;
  let operator = "=";

  if (authContext?.identifiers?.length) {
    field = authContext?.identifiers[0]?.field as string;
    value = authContext?.identifiers[0]?.value as string | number;
  }

  return await knex(table).where(field, operator, value).first();
};
