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
  options?: QrudListArgs;
  payload?: any;
  key?: string;
}

export interface QrudUpdateArgs {
  id?: string;
  conditions?: Array<QrudContextIdentifiers>;
  payload?: any;
}

export interface QrudDeleteArgs {
  id?: string;
  conditions?: Array<QrudContextIdentifiers>;
}

export interface QrudListArgs {
  filter?: string;
  limit?: number;
  offset?: number;
  order?: string;
}

export interface QrudAuthContext {
  identifiers: Array<QrudContextIdentifiers>;
}

export interface QrudContextIdentifiers {
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
