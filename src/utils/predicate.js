export const isBrowser = typeof window !== 'undefined';
export const isTypeOf = (expected) => (value) => typeof value === expected;
export const isBoolean = isTypeOf('boolean');
export const isFunction = isTypeOf('function');
export const isNumber = isTypeOf('number');
export const isString = isTypeOf('string');
export const isObject = isTypeOf('object');
export const equals = (expected) => (value) => value === expected;
export const isTrue = equals(true);
export const isFalse = equals(false);
export const isNull = equals(null);
export const isUndefined = equals(undefined);
export const isEmptyString = equals('');
export const isObjectLiteral = (value) => (isObject(value)
    &&
        !isNull(value)
    &&
        !Array.isArray(value));
export const isNumberOrString = (value) => isString(value) || isNumber(value);
export const isNil = (value) => isNull(value) || isUndefined(value);
