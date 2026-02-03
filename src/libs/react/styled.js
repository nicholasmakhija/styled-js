import React from 'react';
import { dotPrefix, elementClassName, expand, joinWithSpace, isString, mergeStyles } from '../../utils';
import { skipTransient } from '../../props';
import { styleManager } from '../../style-manager';
import { HTML_TAGS as htmlTagNames } from '../../constants';
export const accumulateData = (list, initialData) => list.reduce(([styles, propTypes], current) => {
    const item = current || {};
    const pickedStyles = item.styles || item;
    const pickedPropTypes = item.propTypes || {};
    return [
        mergeStyles(styles, pickedStyles),
        { ...propTypes, ...pickedPropTypes }
    ];
}, initialData);
const factoryMeta = {
    plainStyles: [],
    propTypes: {},
    hasRef: false
};
const styledFactory = (name, extendableThing, accumulatedValues = factoryMeta) => (styleRules = {}) => {
    const classIdentity = elementClassName({
        name,
        ...styleRules
    });
    const setProp = (name, value) => ({
        ...accumulatedValues,
        [name]: value
    });
    const enhance = (original) => expand(original, {
        propTypes: accumulatedValues.propTypes,
        styles: styleRules,
        toString: () => dotPrefix(classIdentity),
        extend: (...items) => {
            const [mergedStyles, mergedPropTypes] = accumulateData(items, [
                styleRules,
                accumulatedValues.propTypes
            ]);
            return styledFactory(name, extendableThing, setProp('propTypes', mergedPropTypes))(mergedStyles);
        },
        withCSS: (...styles) => {
            return styledFactory(name, extendableThing, setProp('plainStyles', styles))(styleRules);
        },
        withProps: (givenPropTypes) => {
            const combinedPropTypes = {
                ...accumulatedValues.propTypes,
                ...givenPropTypes
            };
            return styledFactory(name, extendableThing, setProp('propTypes', combinedPropTypes))(styleRules);
        },
        withRef: () => {
            return styledFactory(name, extendableThing, setProp('hasRef', true))(styleRules);
        }
    });
    if (!extendableThing) {
        return enhance((WrappedComponent) => styledFactory(name, expand(styledElement(WrappedComponent), {
            propTypes: accumulatedValues.propTypes
        }), accumulatedValues)(styleRules));
    }
    return enhance(extendableThing({
        classIdentity,
        displayName: `styled.${name}`,
        styleRules,
        plainStyles: accumulatedValues.plainStyles,
        hasRef: accumulatedValues.hasRef
    }));
};
const styledElement = (innerElement) => ({ classIdentity, displayName, styleRules, plainStyles, hasRef }) => {
    const getClassNames = styleManager(styleRules, plainStyles);
    const Component = ({ children, className = '', ...props }, ref) => {
        const propsToForward = isString(innerElement)
            ? skipTransient(props)
            : props;
        const classNamesToForward = joinWithSpace(classIdentity, ...getClassNames(props), className);
        return React.createElement(innerElement, {
            ...propsToForward,
            ...(hasRef && { ref }),
            className: classNamesToForward
        }, children);
    };
    Component.displayName = displayName;
    return hasRef ? React.forwardRef(Component) : Component;
};
export const styled = htmlTagNames.reduce((api, tag) => ({
    ...api,
    [tag]: styledFactory(tag, styledElement(tag))
}), { generic: styledFactory('generic') });
