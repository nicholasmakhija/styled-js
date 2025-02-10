import { addItems, computedClassName, concat, dotPrefix, dynamicClassName, equals, isFunction, isNumber, isNumberOrString, isObjectLiteral, startsWithAny, stringify, toDashed, toSingleLine } from './utils';
import { propsCache } from './registries';
import { CONTAINER, MEDIA, SUPPORTS } from './constants';
const isContent = equals('content');
const isAtRule = startsWithAny(CONTAINER, MEDIA, SUPPORTS);
const isAnySelector = startsWithAny(':', '[', ' ', '>', '~', '+', '.');
const asFunction = (value) => () => value;
export const createDeclaration = (key, value) => {
    const normalizer = isContent(key) || isNumber(value)
        ? stringify
        : toSingleLine;
    return `${toDashed(key)}:${normalizer(value)};`;
};
export const groupStyles = (cssObject) => Object.entries(cssObject).reduce(([root, nested], [key, value]) => [
    isNumberOrString(value)
        ? concat(root, createDeclaration(key, value))
        : root,
    isObjectLiteral(value) || isFunction(value)
        ? { ...nested, [key]: value }
        : nested
], ['', {}]);
const wrapStyles = (reducer) => (rules, keys) => keys.reduceRight(reducer, rules);
export const asRule = (rules, selector) => `${selector}{${rules}}`;
export const asAtRule = wrapStyles(asRule);
export const asObjectLiteral = (rules, prop) => ({
    [prop]: {
        ...rules
    }
});
export const asObjectStyles = wrapStyles(asObjectLiteral);
const generateStyles = (atRules, propsFunction, names) => (props) => {
    const arg = names.length === 1 ? props[names[0]] : props;
    const rendered = propsFunction(arg);
    return isObjectLiteral(rendered)
        ? asObjectStyles(rendered, atRules)
        : {};
};
export const styleParser = (...classNames) => {
    const [baseClassName] = classNames;
    const initialSelectors = [classNames.map(dotPrefix).join('')];
    const walk = (data, selectors, key, atRules) => {
        const isComputed = isFunction(data);
        const isStaticStyles = !propsCache.has(key);
        const descriptor = propsCache.get(key);
        const [declarations, nested] = groupStyles(data);
        const nextAtRules = isAtRule(key) ? [...atRules, key] : atRules;
        const nextSelectors = isAnySelector(key)
            ? addItems(selectors, key)
            : selectors;
        const createRules = () => asAtRule(asRule(declarations, nextSelectors.join()), nextAtRules);
        return Object
            .entries(nested)
            .reduce((collected, [nextKey, nextValue]) => {
            if (!isStaticStyles) {
                return collected;
            }
            const { computables, rules } = walk(nextValue, nextSelectors, nextKey, nextAtRules);
            return {
                baseClassName,
                computables: [...collected.computables, ...computables],
                rules: [...collected.rules, ...rules]
            };
        }, {
            baseClassName,
            computables: isStaticStyles ? [] : [{
                    ...descriptor,
                    identity: isComputed
                        ? computedClassName
                        : asFunction(dynamicClassName(data)),
                    yield: isComputed
                        ? generateStyles(atRules, data, descriptor.keys)
                        : asFunction(data)
                }],
            rules: isStaticStyles && declarations ? [createRules()] : []
        });
    };
    return (stylesObj) => walk(stylesObj, initialSelectors, '', []);
};
