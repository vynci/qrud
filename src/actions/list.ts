import { QrudAuthContext, QrudListArgs, QrudListFilterBetween } from "../types";
import { db } from "../database/knex";
import { mergeFilterAndAuthContext } from "../helpers/helper";

export const listItems = async <FilterData>(
  table: string,
  argsOptions: QrudListArgs<FilterData>,
  database: string,
  authContext?: QrudAuthContext<FilterData>,
  isCount: boolean = false
) => {
  const search = argsOptions?.search || { fields: [], value: "" };
  const order = JSON.parse(argsOptions?.order || "[]");

  let filter = argsOptions?.filter || [];

  if (authContext?.identifiers?.length)
    mergeFilterAndAuthContext(filter, authContext.identifiers);

  const knex = db(database);

  const query = knex(table);

  query
    .where((builder: any) => {
      for (let step = 0; step < filter.length; step++) {
        if (filter[step].operator) {
          if (filter[step].operator === "between") {
            const betweenFilter = filter[step].value as QrudListFilterBetween;

            builder.whereBetween(filter[step].field, [
              betweenFilter.from,
              betweenFilter.to,
            ]);
          } else if (filter[step].operator === "in") {
            builder.whereIn(filter[step].field, filter[step].value);
          } else if (filter[step].operator === "inArray") {
            const arrayFilter = filter[step].value as Array<string | number>;

            builder.whereRaw(
              `${filter[step].field as string} && '{${arrayFilter.join(",")}}'`
            );
          } else if (filter[step].operator === "notIn") {
            builder.whereNotIn(filter[step].field, filter[step].value);
          } else {
            if (filter[step].value !== null) {
              builder.where(
                filter[step].field,
                filter[step].operator,
                filter[step].value
              );
            } else {
              if (
                filter[step].operator === "<>" ||
                filter[step].operator === "!="
              )
                builder.whereNotNull(filter[step].field);
              else builder.whereNull(filter[step].field);
            }
          }
        } else builder.where(filter[step].field, filter[step].value);
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
