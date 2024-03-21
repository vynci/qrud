import { QrudContextIdentifiers, QrudAuthContext } from "../types";

/**
 * cleanUpIdentifierArray
 *
 * This will remove duplicates on `item.field`
 *
 * @param items
 * @returns
 */
export const cleanUpIdentifierArray = (
  items: Array<QrudContextIdentifiers>
) => {
  const result = items.filter(
    (value, index, self) =>
      index === self.findIndex((t) => value.field === t.field && t.value)
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
