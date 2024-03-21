import {
  QrudContextIdentifiers,
  QrudListFilter,
  QrudAuthContext,
} from "../types";

/**
 * cleanUpIdentifierArray
 *
 * This will remove duplicates on `item.field`
 *
 * @param items
 * @returns
 */
export const cleanUpIdentifierArray = <FilterData>(
  items: Array<QrudContextIdentifiers<FilterData>>
) => {
  const result = items.filter(
    (value, index, self) =>
      index === self.findIndex((t) => value.field === t.field && t.value)
  );

  return result;
};

export const mergeFilterAndAuthContext = <FilterData>(
  filterArray: Array<QrudListFilter<FilterData>>,
  authContextIdentifiers: Array<QrudContextIdentifiers<FilterData>>
) => {
  authContextIdentifiers.forEach((objB) => {
    const indexA = filterArray.findIndex((objA) => objA.field === objB.field);
    if (indexA !== -1) {
      filterArray[indexA] = objB;
    } else {
      filterArray.push(objB);
    }
  });
};

export const createContextPayload = <FilterData>(
  authContext: QrudAuthContext<FilterData>
) => {
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
