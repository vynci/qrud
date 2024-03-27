import { dotCase } from "change-case";
import { DeleteResponse } from "./types";

import {
  QrudGQLInput,
  QrudInput,
  QrudOptions,
  QrudDeleteArgs,
  QrudUpdateArgs,
  QrudListArgs,
  QrudGQLOptions,
} from "./types";

import { createItem } from "./actions/create";
import { getItem } from "./actions/get";
import { listItems } from "./actions/list";
import { updateItem } from "./actions/update";
import { deleteItem } from "./actions/delete";
import { rawItem } from "./actions/raw";
import { countItems } from "./actions/count";

export class Qrud<SchemaType> {
  schema;
  table: string;
  database?: string;
  options?: QrudOptions;

  constructor({ schema, table, database, options }: QrudInput) {
    this.schema = schema;
    this.table = table;
    this.database = database;
    this.options = options;
  }

  async create(payload: SchemaType) {
    return await createItem<SchemaType>(
      this.table,
      payload,
      this.schema,
      this.database
    );
  }

  async get(id: string | number): Promise<SchemaType> {
    return await getItem<SchemaType>(this.table, id, this.database);
  }

  async list(options: QrudListArgs<SchemaType>): Promise<Array<SchemaType>> {
    return await listItems<SchemaType>(this.table, options, this.database);
  }

  async update(args: QrudUpdateArgs<SchemaType>): Promise<SchemaType> {
    return await updateItem<SchemaType>(this.table, args, this.database);
  }

  async delete(args: QrudDeleteArgs<SchemaType>): Promise<DeleteResponse> {
    return await deleteItem<SchemaType>(this.table, args, this.database);
  }

  async count(options: QrudListArgs<SchemaType>): Promise<number> {
    return await countItems<SchemaType>(this.table, options, this.database);
  }

  async raw(sqlQuery: string): Promise<any> {
    return rawItem(sqlQuery, this.database);
  }

  async appsync(input: QrudGQLInput<SchemaType>, gqlOptions?: QrudGQLOptions) {
    const table: string = this.table;
    const database = this.database || "";
    const action = dotCase(input.info.fieldName).split(".")[0];

    let args = input.arguments;
    let authContext = null;
    let result;

    if (gqlOptions?.precrud) input = await gqlOptions.precrud(input);

    if (gqlOptions?.auth) authContext = await gqlOptions.auth(input);

    if (args?.options?.filter) args.options.filter = args.options.filter;

    switch (action) {
      case "get":
        result = await getItem(table, args.id, database, authContext);
        break;
      case "list":
        result = await listItems(table, args.options, database, authContext);
        break;
      case "create":
        result = await createItem(
          table,
          args.payload,
          this.schema,
          database,
          authContext
        );
        break;
      case "update":
        result = await updateItem(table, args, database, authContext);
        break;
      case "delete":
        result = await deleteItem(table, args, database, authContext);
        break;
      case "count":
        result = await countItems(table, args.options, database, authContext);
        break;
      default:
        throw new Error("InvalidGQLAction");
    }

    if (gqlOptions?.postcrud) result = await gqlOptions.postcrud(input, result);

    return result;
  }
}
