import {
  QrudDeleteArgs,
  QrudAuthContext,
  QrudContextIdentifiers,
} from "../types";
import { db } from "../database/knex";

import { cleanUpIdentifierArray } from "../helpers/helper";

export const deleteItem = async <FilterData>(
  table: string,
  args: QrudDeleteArgs<FilterData>,
  database: string,
  authContext?: QrudAuthContext<FilterData>
) => {
  return new Promise(async (resolve, reject) => {
    const knex = db(database);

    // [1] Setup Conditions
    const tmpConditions = [];

    const initialCondition: Array<QrudContextIdentifiers<FilterData>> = args.id
      ? [{ field: "id" as keyof FilterData, value: args.id, operator: "=" }]
      : args.conditions;

    if (authContext) tmpConditions.push(authContext.identifiers);

    tmpConditions.push(initialCondition);

    const conditions = cleanUpIdentifierArray<FilterData>(tmpConditions.flat());

    // [2] Build the where statement
    const knexWhere = knex(table).where((builder: any) => {
      for (let step = 0; step < conditions.length; step++) {
        builder.where(
          conditions[step].field,
          conditions[step].operator || "=",
          conditions[step].value
        );
      }
    });

    // [4] Check if item actually exists
    const itemToDelete = await knexWhere.first();

    // [5] Perform Delete
    if (itemToDelete) {
      await knexWhere.del();
      resolve({ id: itemToDelete.id });
    } else reject("ItemDoesNotExist");
  });
};
