import {
  QrudUpdateArgs,
  QrudAuthContext,
  QrudContextIdentifiers,
} from "../types";
import { db } from "../database/knex";

import { cleanUpIdentifierArray } from "../helpers/helper";

export const updateItem = async (
  table: string,
  args: QrudUpdateArgs,
  database: string,
  authContext?: QrudAuthContext
) => {
  const knex = db(database);

  // [1] Setup Conditions
  const tmpConditions = [];

  const initialCondition: Array<QrudContextIdentifiers> = args.id
    ? [{ field: "id", value: args.id, operator: "=" }]
    : args.conditions;

  if (authContext) tmpConditions.push(authContext.identifiers);

  tmpConditions.push(initialCondition);

  const conditions = cleanUpIdentifierArray(tmpConditions.flat());

  // [2] Perform the update
  await knex(table)
    .where((builder: any) => {
      for (let step = 0; step < conditions.length; step++) {
        builder.where(
          conditions[step].field,
          conditions[step].operator || "=",
          conditions[step].value
        );
      }
    })
    .update({
      ...args.payload,
      updated_at: new Date().toISOString(),
    });

  // [4] Return based on the built where condition earlier
  const result = await knex(table)
    .where((builder: any) => {
      for (let step = 0; step < conditions.length; step++) {
        builder.where(
          conditions[step].field,
          conditions[step].operator || "=",
          conditions[step].value
        );
      }
    })
    .first();

  return result;
};
