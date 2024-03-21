import { QrudListArgs, QrudAuthContext } from "../types";
import { listItems } from "./list";
import { rawItem } from "./raw";

export const countItems = async <FilterData>(
  table: string,
  argsOptions: QrudListArgs<FilterData>,
  database: string,
  authContext?: QrudAuthContext
) => {
  const sqlQuery = await listItems(
    table,
    argsOptions,
    database,
    authContext,
    true
  );

  const result = await rawItem(sqlQuery.replace("*", "count(*)"), database);

  return result.records[0].count;
};
