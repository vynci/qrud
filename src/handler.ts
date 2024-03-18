import { dotCase } from "change-case";
import {
  QrudGQLInput,
  QrudInput,
  QrudOptions,
  QrudArgs,
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

export class Qrud {
  schema: any;
  table: string;
  database?: string;
  options?: QrudOptions;

  constructor({ schema, table, database, options }: QrudInput) {
    this.schema = schema;
    this.table = table;
    this.database = database;
    this.options = options;
  }

  async create(payload: any) {
    const table: string = this.table;
    const database = this.database || "";

    return await createItem(table, payload, this.schema, database);
  }

  async get(id: string | number) {
    const table: string = this.table;
    const database = this.database || "";

    return await getItem(table, id, database);
  }

  async list(options: QrudListArgs) {
    const table: string = this.table;
    const database = this.database || "";

    return await listItems(table, options, database);
  }

  async update(args: QrudUpdateArgs) {
    const table: string = this.table;
    const database = this.database || "";

    return await updateItem(table, args, database);
  }

  async delete(args: QrudDeleteArgs) {
    const table: string = this.table;
    const database = this.database || "";

    return await deleteItem(table, args, database);
  }

  async count(options: QrudListArgs) {
    const table: string = this.table;
    const database = this.database || "";

    return await countItems(table, options, database);
  }

  async raw(args: QrudArgs) {
    const table: string = this.table;
    const database = this.database || "";

    return rawItem(args, database);
  }

  async gql(input: QrudGQLInput, gqlOptions?: QrudGQLOptions) {
    const table: string = this.table;
    const database = this.database || "";
    const action = dotCase(input.info.fieldName).split(".")[0];
    const args = input.arguments;

    let authContext = null;

    if (gqlOptions?.precrud) input = await gqlOptions.precrud(input);

    if (gqlOptions?.auth) authContext = await gqlOptions.auth(input);

    let result;

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
      case "raw":
        result = await rawItem(args, database);
        break;
      default:
        throw new Error("InvalidGQLAction");
    }

    if (gqlOptions?.postcrud) result = await gqlOptions.postcrud(input, result);

    return result;
  }
}
