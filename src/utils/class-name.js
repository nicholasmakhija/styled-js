import { isFunction } from './predicate';
export const { stringify } = JSON;
const toHash = (value) => {
    let hash = 0 ^ 0x811c9dc5;
    for (let i = 0; i < value.length; i++) {
        hash ^= value.charCodeAt(i);
        hash = (hash * 0x01000193) >>> 0;
    }
    return hash;
};
export const hasher = (data) => {
    const stringified = stringify(data, (key, value) => isFunction(value) ? `[Function ${key}]` : value);
    return toHash(stringified).toString(36);
};
export const generateClassName = (id) => (...data) => `${id}-${hasher(data)}`;
export const elementClassName = generateClassName('e');
export const staticClassName = generateClassName('s');
export const dynamicClassName = generateClassName('d');
export const computedClassName = generateClassName('c');
