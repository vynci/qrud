import { QrudAuthContext } from "../types";
import { db } from "../database/knex";

export const getItem = async (
  table: string,
  argsId: any,
  database: string,
  authContext?: QrudAuthContext
) => {
  const knex = db(database);

  let field = "id";
  let value = argsId;
  let operator = "=";

  if (authContext?.identifiers?.length) {
    field = authContext?.identifiers[0]?.field;
    value = authContext?.identifiers[0]?.value;
  }

  return await knex(table).where(field, operator, value).first();
};
