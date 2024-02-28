import { QrudArgs, QrudAuthContext, QrudArgsOptions } from "../types";
import { db } from "../database/knex";
import { createContextPayload } from "../helpers/helper";

export const listItems = async (
  table: string,
  argsOptions: QrudArgsOptions,
  database: string,
  authContext?: QrudAuthContext,
  isCount: boolean = false
) => {
  const order = JSON.parse(argsOptions?.order || "[]");
  const authContextPayload = createContextPayload(authContext);

  let filter = JSON.parse(argsOptions?.filter || "{}");

  filter = { ...filter, ...authContextPayload };

  const knex = db(database);

  const query = knex(table);

  query
    .where((builder: any) => {
      for (const prop in filter) {
        if (filter[prop].operator) {
          if (filter[prop].operator === "between") {
            builder.whereBetween(prop, [
              filter[prop].value.from,
              filter[prop].value.to,
            ]);
          } else if (filter[prop].operator === "in") {
            builder.whereIn(prop, filter[prop].value);
          } else if (filter[prop].operator === "inArray") {
            const arrayFilter = filter[prop].value || [];
            builder.whereRaw(`${prop} && '{${arrayFilter.join(",")}}'`);
          } else if (filter[prop].operator === "notIn") {
            builder.whereNotIn(prop, filter[prop].value);
          } else {
            if (filter[prop].value !== null) {
              if (filter[prop].logic === "or")
                builder.orWhere(
                  prop,
                  filter[prop].operator,
                  filter[prop].value
                );
              else {
                if (filter[prop].format === "json") {
                  builder.whereRaw(
                    `${prop}->>'${filter[prop].value.jkey}' ${filter[prop].operator} ?`,
                    [`${filter[prop].value.jvalue}`]
                  );
                } else
                  builder.where(
                    prop,
                    filter[prop].operator,
                    filter[prop].value
                  );
              }
            } else {
              if (
                filter[prop].operator === "<>" ||
                filter[prop].operator === "!="
              )
                builder.whereNotNull(prop);
              else builder.whereNull(prop);
            }
          }
        } else builder.where(prop, filter[prop]);
      }
    })
    .limit(argsOptions?.limit || null)
    .offset(argsOptions?.offset || null)
    .orderBy(order);

  let result;

  if (isCount) result = query.toString();
  else result = await query;

  return result;
};
