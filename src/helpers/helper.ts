import { dotCase } from "change-case";
import { QrudAuthContextIdentifiers, QrudAuthContext } from "../types";

export const fieldToTableName = (fieldName: string) => {
  let nestTable = dotCase(fieldName).split(".");
  nestTable.splice(0, 2);

  return nestTable.join("_");
};

export const whereBuilder = (filter: any, builder: any) => {
  const _builder = builder;
  for (const prop in filter) {
    if (filter[prop].operator) {
      if (filter[prop].operator === "between") {
        _builder.whereBetween(prop, [
          filter[prop].value.from,
          filter[prop].value.to,
        ]);
      } else {
        if (filter[prop].value !== null)
          _builder.where(prop, filter[prop].operator, filter[prop].value);
        else {
          if (filter[prop].operator === "<>" || filter[prop].operator === "!=")
            _builder.whereNotNull(prop);
          else _builder.whereNull(prop);
        }
      }
    } else _builder.where(prop, filter[prop]);
  }

  return _builder;
};

export const cleanUpIdentifierArray = (
  items: Array<QrudAuthContextIdentifiers>
) => {
  const result = items.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.field === t.field && t.value)
  );

  return result;
};

export const createContextPayload = (authContext: QrudAuthContext) => {
  let result: any = {};

  if (authContext?.identifiers?.length)
    for (let step = 0; step < authContext.identifiers.length; step++) {
      if (authContext.identifiers[step].operator)
        result[authContext.identifiers[step].field] = {
          operator: authContext.identifiers[step].operator,
          value: authContext.identifiers[step].value,
        };
      else
        result[authContext.identifiers[step].field] =
          authContext.identifiers[step].value;
    }

  return result;
};
