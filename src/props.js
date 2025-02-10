import { isFalse, isNil } from './utils';
import { propsCache } from './registries';
import { PROPERTY } from './constants';
export const existsAndNotFalse = (props) => (name) => (!isNil(props[name])
    &&
        !isFalse(props[name]));
export const doNotExist = (props) => (name) => isNil(props[name]);
export const createDescriptor = (matcher, names) => {
    const validator = {
        [PROPERTY.ALL]: (props) => names.every(existsAndNotFalse(props)),
        [PROPERTY.ANY]: (props) => names.some(existsAndNotFalse(props)),
        [PROPERTY.NOT]: (props) => names.every(doNotExist(props)),
        [PROPERTY.ONLY]: (props) => existsAndNotFalse(props)(names[0])
    };
    names.forEach((name) => propsCache.names.add(name));
    return {
        keys: names,
        predicate: validator[matcher]
    };
};
export const createPropSelector = (matcher) => (...names) => propsCache.add(`props.${matcher}(${names})`, () => createDescriptor(matcher, names)).toString();
export const skipTransient = (props, store = propsCache.names) => Object.entries(props).reduce((result, [key, value]) => ({
    ...result,
    ...(!store.has(key) && { [key]: value })
}), {});
