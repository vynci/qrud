import { db } from "../database/knex";

export const rawItem = async (sqlQuery: string, database: string) => {
  const knex = db(database);
  return await knex.raw(sqlQuery);
};
