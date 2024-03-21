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
  schema?;
  table?: string;
  resourceName?: string;
  database?: string;
  options?: QrudOptions;
}

export interface QrudArgs<SchemaType> {
  id?: string;
  options?: QrudListArgs<SchemaType>;
  payload?: any;
  key?: string;
}

export interface QrudRawArgs {
  payload: string;
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

export interface QrudListArgs<FilterData> {
  filter?: FilterData;
  search?: QrudListSearch;
  limit?: number;
  offset?: number;
  order?: string;
}

export interface QrudListSearch {
  fields: Array<string>;
  value: string;
}

export interface QrudAuthContext {
  identifiers: Array<QrudContextIdentifiers>;
}

export interface QrudContextIdentifiers {
  value: string;
  field: string;
  operator?: string;
}

export interface QrudGQLInput<SchemaType> {
  info: QrudGQLInfoInput;
  arguments: QrudArgs<SchemaType>;
}

export interface QrudGQLInfoInput {
  fieldName: string;
}
