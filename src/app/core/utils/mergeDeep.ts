import { environment } from '../../../environments/environment';

type RecursiveRecord = Record<number | string | symbol, unknown>;

function isObject(obj: unknown): obj is RecursiveRecord {
  return Boolean(obj && typeof obj === 'object');
}

export function mergeDeep<T extends RecursiveRecord = RecursiveRecord>(
  prevKey: string | RecursiveRecord,
  ...objects: RecursiveRecord[]
): T {
  if (typeof prevKey !== 'string') {
    objects.unshift(prevKey);
    prevKey = '';
  }

  if (objects.length === 0) {
    return {} as T;
  }

  return objects.reduce((prev, obj) => {
    for (const key of Object.keys(obj)) {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(key + '.', pVal, oVal);
      } else {
        if (!environment.isProduction && pVal !== undefined) {
          console.warn(`Key "${prevKey + key}" has conflicting values:`, {
            previousValue: pVal,
            newValue: oVal,
          });
        }
        prev[key] = oVal;
      }
    }

    return prev;
  }, {}) as T;
}
