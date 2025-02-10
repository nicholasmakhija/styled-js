import { addItems, concat, joinToStart, joinWithOr, stringify, toDashed, wrap } from './utils';
import { createPropSelector } from './props';
import { PROPERTY, PSEUDO_CLASSES, PSEUDO_CLASS_FUNCTIONS, PSEUDO_ELEMENTS, PSEUDO_ELEMENT_FUNCTIONS } from './constants';
export const createAnySelector = (mapper) => (...data) => joinWithOr(data.map(mapper));
const combinators = {
    and: (...data) => joinWithOr(data.reduce(addItems, [''])),
    or: (...data) => joinWithOr(data)
};
export const createPseudo = (prefix) => (pseudo, pseudoFunctions) => [...pseudo, ...pseudoFunctions].reduce((result, name) => {
    const pseudoSelector = concat(prefix, toDashed(name));
    const isPseudoFunction = pseudoFunctions.includes(name);
    return {
        ...result,
        [name]: isPseudoFunction
            ? (...values) => concat(pseudoSelector, wrap(values))
            : pseudoSelector
    };
}, {});
const pseudoElements = createPseudo('::')(PSEUDO_ELEMENTS, PSEUDO_ELEMENT_FUNCTIONS);
const pseudoClasses = createPseudo(':')(PSEUDO_CLASSES, PSEUDO_CLASS_FUNCTIONS);
const enclose = (something) => `[${something}]`;
const createAttributeSelector = (original) => {
    const attribute = toDashed(original);
    const withMatcher = (operator) => (value) => enclose(concat(attribute, operator, stringify(value)));
    return {
        equals: createAnySelector(withMatcher('=')),
        contains: createAnySelector(withMatcher('~=')),
        containsAny: createAnySelector(withMatcher('*=')),
        startsWith: createAnySelector(withMatcher('^=')),
        endsWith: createAnySelector(withMatcher('$=')),
        toString: () => enclose(attribute)
    };
};
export const style = {
    ...combinators,
    ...pseudoElements,
    ...pseudoClasses,
    attribute: createAttributeSelector,
    data: (attribute) => createAttributeSelector(`data-${attribute}`),
    selector: createAnySelector(joinToStart(' ')),
    prop: createPropSelector(PROPERTY.ONLY),
    props: {
        [PROPERTY.ALL]: createPropSelector(PROPERTY.ALL),
        [PROPERTY.ANY]: createPropSelector(PROPERTY.ANY),
        [PROPERTY.NOT]: createPropSelector(PROPERTY.NOT)
    }
};
