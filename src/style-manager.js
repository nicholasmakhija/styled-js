import { staticClassName, toSingleLine } from './utils';
import { styleParser } from './style-parser';
import { sheetCache, styleCache } from './registries';
import { createSheet } from './style-sheet';
export const unfold = (key, cacheCreator) => (accumulator) => {
    const hasRendered = styleCache.has(key);
    const { baseClassName, computables, globals = [], rules } = styleCache.add(key, cacheCreator);
    if (!hasRendered) {
        const sheetCreator = () => createSheet(baseClassName);
        const sheet = sheetCache.add(baseClassName, sheetCreator);
        sheet.inject(key, [...rules, ...globals]);
    }
    return computables.length ? accumulator(key) : [];
};
export const collectClassNames = (props) => {
    const collector = (parentKey) => styleCache.get(parentKey).computables.reduce((collected, current) => {
        if (!current.predicate(props)) {
            return collected;
        }
        const styleRules = current.yield(props);
        const generatedClassName = current.identity(styleRules);
        const compositeKey = `${generatedClassName} (${parentKey})`;
        const createCache = () => styleParser(styleCache.get(parentKey).baseClassName, generatedClassName)(styleRules);
        return [
            ...collected,
            generatedClassName,
            ...unfold(compositeKey, createCache)(collector)
        ];
    }, []);
    return collector;
};
export const styleManager = (rules, css) => {
    const baseClassName = staticClassName(rules);
    const createCache = () => ({
        ...styleParser(baseClassName)(rules),
        ...(css.length && { globals: css.map(toSingleLine) })
    });
    return (props) => [
        baseClassName,
        ...unfold(baseClassName, createCache)(collectClassNames(props))
    ];
};
