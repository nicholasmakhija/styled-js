import { isBrowser } from './utils';
import { STYLED_ATTRIBUTE_NAME } from './constants';
const createRegistry = (registryType, valueCreator) => {
    const scope = isBrowser ? window : global;
    const name = `__STYLED_${registryType}_REGISTER`;
    const hasRegistry = name in scope;
    if (!hasRegistry) {
        Object.defineProperty(scope, name, {
            value: Object.freeze(valueCreator())
        });
    }
    return scope[name];
};
export const createMethods = (dataStore) => ({
    add: (key, valueCreator) => dataStore.get(key) || dataStore.set(key, {
        ...valueCreator(),
        toString: () => key
    }).get(key),
    get: (key) => dataStore.get(key),
    has: (key) => dataStore.has(key),
    __getDataStore: () => new Map(dataStore)
});
const cacheRegistry = () => createMethods(new Map());
const sheetRegistry = () => {
    const dataStore = new Map();
    const toStyleString = ([id, sheet]) => `<style ${STYLED_ATTRIBUTE_NAME}="${id}">${sheet.css()}</style>`;
    return {
        ...createMethods(dataStore),
        getStyles: () => [...dataStore].map(toStyleString).join('')
    };
};
const propsRegistry = () => ({
    ...createMethods(new Map()),
    names: new Set()
});
export const styleCache = createRegistry('CACHE', cacheRegistry);
export const sheetCache = createRegistry('SHEET', sheetRegistry);
export const propsCache = createRegistry('PROPS', propsRegistry);
export const { getStyles } = sheetCache;
