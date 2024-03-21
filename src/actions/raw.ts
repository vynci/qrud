import { QrudRawArgs } from "../types";

import { db } from "../database/knex";

export const rawItem = async (args: QrudRawArgs, database: string) => {
  const knex = db(database);
  return await knex.raw(args.payload);
};
