enum databaseTypeEnum {
  mongodb = "mongodb",
  postgres = "postgres",
}

enum schemaLibrary {
  zod = "zod",
}

export interface QrudGQLOptions {
  auth?: Function;
  precrud?: Function;
  postcrud?: Function;
}

export interface QrudOptions {
  schemaLibrary: schemaLibrary;
  databaseType: databaseTypeEnum;
}

export interface QrudInput {
  schema?: any;
  table?: string;
  resourceName?: string;
  database?: string;
  options?: QrudOptions;
}

export interface QrudArgs {
  id?: string;
  options?: QrudArgsOptions;
  payload?: any;
  key?: string;
}

export interface QrudAuthContext {
  identifiers: Array<QrudAuthContextIdentifiers>;
}

export interface QrudAuthContextIdentifiers {
  value: string;
  field: string;
  operator?: string;
}

export interface QrudGQLInput {
  info: QrudGQLInfoInput;
  arguments: QrudArgs;
}

export interface QrudGQLInfoInput {
  fieldName: string;
}

export interface QrudArgsOptions {
  filter?: string;
  limit?: number;
  offset?: number;
  order?: string;
  join?: string;
  joinSelect?: string;
  joinDistinct?: string;
}
