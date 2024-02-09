import { QrudArgsOptions, QrudAuthContext } from "../types";
import { listItems } from "./list";
import { rawItem } from "./raw";

export const countItems = async (
  table: string,
  argsOptions: QrudArgsOptions,
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

  const result = await rawItem(
    { payload: sqlQuery.replace("*", "count(*)") },
    database
  );

  return result.records[0].count;
};
