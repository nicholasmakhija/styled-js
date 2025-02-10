import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { dotPrefix, elementClassName, expand, joinWithSpace, isString, mergeStyles } from '../../utils';
import { propsCache } from '../../registries';
import { styleManager } from '../../style-manager';
import { HTML_TAGS as htmlTagNames } from '../../constants';
export const accumulateData = (list, initialData) => list.reduce((collected, current) => {
    const item = current || {};
    const pickedStyles = item.styles || item;
    return mergeStyles(collected, pickedStyles);
}, initialData);
const styledFactory = (name, extendableThing, plainStyles = []) => (styleRules = {}) => {
    const classIdentity = elementClassName({
        name,
        ...styleRules
    });
    const enhance = (original) => expand(original, {
        styles: styleRules,
        toString: () => dotPrefix(classIdentity),
        extend: (...items) => {
            const mergedStyles = accumulateData(items, styleRules);
            return styledFactory(name, extendableThing, plainStyles)(mergedStyles);
        },
        withCSS: (...styles) => {
            return styledFactory(name, extendableThing, styles)(styleRules);
        }
    });
    if (!extendableThing) {
        return enhance((WrappedComponent) => styledFactory(name, styledElement(WrappedComponent), plainStyles)(styleRules));
    }
    return enhance(extendableThing({
        classIdentity,
        displayName: `styled.${name}`,
        styleRules,
        plainStyles
    }));
};
const styledElement = (innerElement) => ({ classIdentity, styleRules, plainStyles }) => {
    const getClassNames = styleManager(styleRules, plainStyles);
    const Component = (props) => {
        const nonStandardKeys = isString(innerElement) ? [...propsCache.names] : [];
        const specialKeys = [...nonStandardKeys, 'class', 'component'];
        const [, propsToForward] = splitProps(props, specialKeys);
        const mergedProps = mergeProps({
            component: innerElement,
            get class() {
                return joinWithSpace(classIdentity, ...getClassNames(props), props.class);
            }
        }, propsToForward);
        return Dynamic(mergedProps);
    };
    return Component;
};
export const styled = htmlTagNames.reduce((api, tag) => ({
    ...api,
    [tag]: styledFactory(tag, styledElement(tag))
}), { generic: styledFactory('generic') });
