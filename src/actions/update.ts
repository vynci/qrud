import {
  QrudUpdateArgs,
  QrudAuthContext,
  QrudContextIdentifiers,
} from "../types";
import { db } from "../database/knex";

import { cleanUpIdentifierArray } from "../helpers/helper";

export const updateItem = async <FilterData>(
  table: string,
  args: QrudUpdateArgs<FilterData>,
  database: string,
  authContext?: QrudAuthContext<FilterData>
) => {
  const knex = db(database);

  // [1] Setup Conditions
  const argsConditions = args.conditions || [];
  const stageConditions = [];

  const initialCondition: Array<QrudContextIdentifiers<FilterData>> = args.id
    ? [{ field: "id" as keyof FilterData, value: args.id, operator: "=" }]
    : argsConditions;

  if (authContext) stageConditions.push(authContext.identifiers);

  stageConditions.push(initialCondition);

  const conditions = cleanUpIdentifierArray<FilterData>(stageConditions.flat());

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
