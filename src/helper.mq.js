import { capitalize, joinToEnd, joinWithSpace as space, safeJoinWith, toDashed, wrap, isNumberOrString } from './utils';
import { MEDIA, MEDIA_TYPES, OTHER_FEATURES, RANGE_FEATURES } from './constants';
const applyPx = joinToEnd('px');
export const createRange = (...prefixes) => (list) => list.reduce((ranges, feature) => [
    ...ranges,
    ...prefixes.map(joinToEnd(capitalize(feature))),
    feature
], []);
const typesAndFeatures = [
    ...MEDIA_TYPES,
    ...OTHER_FEATURES,
    ...createRange('min', 'max')(RANGE_FEATURES)
];
export const and = safeJoinWith(' and ');
export const comma = safeJoinWith(', ');
export const mq = (...mediaTypes) => {
    const types = new Set(mediaTypes);
    const features = new Set();
    const addFeature = (name, value) => features.add(wrap([toDashed(name), value].filter(isNumberOrString).join(':')));
    const api = {
        ...typesAndFeatures.reduce((collected, name) => ({
            ...collected,
            [name]: MEDIA_TYPES.includes(name)
                ? () => types.add(name) && api
                : (value) => addFeature(name, value) && api
        }), {}),
        feature: (name, value) => addFeature(name, value) && api,
        from: (value) => api.minWidth(applyPx(value)),
        to: (value) => api.maxWidth(applyPx(value)),
        toString: () => space(MEDIA, and(comma(...types), ...features))
    };
    return api;
};
