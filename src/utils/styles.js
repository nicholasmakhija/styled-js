import { isObjectLiteral } from './predicate';
export const mergeStyles = (target, source) => Object.entries(source).reduce((result, [key, value]) => ({
    ...result,
    [key]: isObjectLiteral(value) && key in target
        ? mergeStyles(target[key], value)
        : value
}), { ...target });
