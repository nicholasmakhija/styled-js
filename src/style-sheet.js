import { createElement, isBrowser, isTrue } from './utils';
import { STYLED_ATTRIBUTE_NAME } from './constants';
const getStyleElement = (value, name = STYLED_ATTRIBUTE_NAME) => typeof document === 'undefined' ? undefined : (document.querySelector(`style[${name}=${value}]`)
    ||
        createElement('style')
            .withAttribute(name, value)
            .appendTo(document.head)
            .unwrap());
export const has = (rule, node) => (node.textContent || '').includes(rule);
export const slowInsert = (target) => (rule) => {
    if (!has(rule, target)) {
        const textNode = document.createTextNode(rule);
        target.appendChild(textNode);
    }
};
export const fastInsert = (target, sheet = target.sheet) => (rule) => {
    try {
        if (sheet && !has(rule, target)) {
            const position = sheet.cssRules.length;
            sheet.insertRule(rule, position);
        }
    }
    catch (exception) {
        console.error(`DOMException: Failed to parse "${rule}"`);
    }
};
export const createSheet = (identifier, styleElement = getStyleElement(identifier)) => {
    const dataStore = new Map();
    const isSlowMode = isBrowser && isTrue(window.__STYLED_SLOW_MODE);
    const insertRule = isSlowMode ? slowInsert : fastInsert;
    return {
        inject: (itemKey, rulesList) => {
            if (!dataStore.has(itemKey)) {
                styleElement && rulesList.forEach(insertRule(styleElement));
                dataStore.set(itemKey, rulesList);
            }
        },
        css: () => [...dataStore.values()].flat().join('')
    };
};
