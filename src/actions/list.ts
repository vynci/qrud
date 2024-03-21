import { QrudAuthContext, QrudListArgs } from "../types";
import { db } from "../database/knex";
import { createContextPayload } from "../helpers/helper";

export const listItems = async <FilterData>(
  table: string,
  argsOptions: QrudListArgs<FilterData>,
  database: string,
  authContext?: QrudAuthContext,
  isCount: boolean = false
) => {
  const search = argsOptions?.search || { fields: [], value: "" };
  const order = JSON.parse(argsOptions?.order || "[]");
  const authContextPayload = createContextPayload(authContext);

  let filter = argsOptions?.filter || {};

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
              builder.where(prop, filter[prop].operator, filter[prop].value);
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
    .andWhere((builder: any) => {
      for (let step = 0; step < search.fields.length; step++) {
        builder.orWhereILike(search.fields[step], search.value);
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
