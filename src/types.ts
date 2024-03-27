enum databaseTypeEnum {
  mongodb = "mongodb",
  postgres = "postgres",
}

enum schemaLibrary {
  zod = "zod",
}

export type QrudGQLOptions = {
  auth?: Function;
  precrud?: Function;
  postcrud?: Function;
};

export type QrudOptions = {
  schemaLibrary: schemaLibrary;
  databaseType: databaseTypeEnum;
};

export type QrudInput = {
  schema?;
  table: string;
  resourceName?: string;
  database: string;
  options?: QrudOptions;
};

export type QrudArgs<SchemaType> = {
  id?: string;
  options?: QrudListArgs<SchemaType>;
  payload?: SchemaType;
  key?: string;
};

export type QrudUpdateArgs<FilterData> = {
  id?: string;
  conditions?: Array<QrudContextIdentifiers<FilterData>>;
  payload?: any;
};

export type QrudDeleteArgs<FilterData> = {
  id?: string;
  conditions?: Array<QrudContextIdentifiers<FilterData>>;
};

export type QrudListArgs<FilterData> = {
  filter?: Array<QrudListFilter<FilterData>>;
  search?: QrudListSearch;
  limit?: number;
  offset?: number;
  order?: Array<QrudListSort<FilterData>>;
};

export type QrudListSort<FilterData> = {
  column: keyof FilterData;
  order: QrudListOrderOptions;
};

export type QrudListFilter<FilterData> = {
  field: keyof FilterData;
  value:
    | string
    | number
    | QrudListFilterBetween
    | Array<string | number>
    | boolean
    | null;
  operator?: QrudListFilterOperatorOptions;
};

export type QrudListFilterBetween = {
  from: string | number;
  to: string | number;
};

export type QrudListOrderOptions = "asc" | "desc";

export type QrudListFilterOperatorOptions =
  | "between"
  | "in"
  | "inArray"
  | "notIn"
  | "<>"
  | "<"
  | ">"
  | ">="
  | "<="
  | "!="
  | "=";

export type QrudListSearch = {
  fields: Array<string>;
  value: string;
};

export type QrudAuthContext<FilterData> = {
  identifiers: Array<QrudContextIdentifiers<FilterData>>;
};

export type QrudContextIdentifiers<FilterData> = QrudListFilter<FilterData>;

export type QrudGQLInput<SchemaType> = {
  info: QrudGQLInfoInput;
  arguments: QrudArgs<SchemaType>;
};

export type QrudGQLInfoInput = {
  fieldName: string;
};

export type DeleteResponse = {
  id?: string;
};
