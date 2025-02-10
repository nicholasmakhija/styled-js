import { createAnySelector, style } from './helper.style';
import styled from './libs/react';
describe('helper.style', () => {
    describe('not', () => {
        it('should create not selector for single value', () => {
            const test = style.not(style.lastChild);
            const result = ':not(:last-child)';
            expect(test).toEqual(result);
        });
        it('should create not selector for given selector list', () => {
            const test = style.not('strong', '.bold');
            const result = ':not(strong,.bold)';
            expect(test).toEqual(result);
        });
        it('should create empty not selector', () => {
            const test = style.not();
            const result = ':not()';
            expect(test).toEqual(result);
        });
    });
    describe('attribute method', () => {
        it('should have "attribute" method', () => {
            expect(style).toHaveProperty('attribute');
        });
        it('should create selector using attribute name', () => {
            const test = style.attribute('title').toString();
            const result = '[title]';
            expect(test).toEqual(result);
        });
        it('should create attribute selector prefixed with given value', () => {
            const test = style.attribute('href').startsWith('http');
            const result = '[href^="http"]';
            expect(test).toEqual(result);
        });
        it('should create attribute selector list from given values', () => {
            const test = style.attribute('href').startsWith('http', 'https');
            const result = '[href^="http"]||[href^="https"]';
            expect(test).toEqual(result);
        });
    });
    describe('data method', () => {
        it('should have "data" method', () => {
            expect(style).toHaveProperty('data');
        });
        it('should create data attribute selector(s)', () => {
            const tests = [{
                    attribute: 'testId',
                    result: '[data-test-id]'
                },
                {
                    attribute: 'attribute',
                    result: '[data-attribute]'
                }];
            tests.forEach(({ attribute, result }) => {
                const test = style.data(attribute).toString();
                expect(test).toEqual(result);
            });
        });
        it('should create data attribute selector to match exact value', () => {
            const test = style.data('testId').equals('UniqueIdentifier');
            const result = '[data-test-id="UniqueIdentifier"]';
            expect(test).toEqual(result);
        });
    });
    describe('combinators', () => {
        it('should have combinators methods "and" and "or"', () => {
            expect(style).toHaveProperty('and');
            expect(style).toHaveProperty('or');
        });
        it('should return combinators selector with given values', () => {
            const test = style.or(style.before, style.after);
            const result = '::before||::after';
            expect(test).toEqual(result);
        });
        it('should build pseudo class selectors using OR with nested AND', () => {
            const test = style.or(style.hover, style.or(style.visited, style.active, style.not(style.onlyChild)), style.and(style.not(style.disabled), style.or(style.hover, style.not('.isActive', '.isDisabled'))));
            const item1 = ':hover';
            const item2 = ':visited'
                + '||'
                + ':active'
                + '||'
                + ':not(:only-child)';
            const item3 = ':not(:disabled):hover'
                + '||'
                + ':not(:disabled):not(.isActive,.isDisabled)';
            const result = item1
                + '||'
                + item2
                + '||'
                + item3;
            expect(test).toEqual(result);
        });
        it('should build pseudo class selectors using AND with nested OR', () => {
            const test = style.and(style.hover, style.or(style.visited, style.active, style.not(style.onlyChild)), style.and(style.not(style.disabled), style.not('.disabled')));
            const result = ':hover:visited:not(:disabled):not(.disabled)'
                + '||'
                + ':hover:active:not(:disabled):not(.disabled)'
                + '||'
                + ':hover:not(:only-child):not(:disabled):not(.disabled)';
            expect(test).toEqual(result);
        });
        it('should build attribute (starts with many) AND (ends with) selectors', () => {
            const test = style.and(style.attribute('href').startsWith('http', 'https'), style.attribute('href').endsWith('jpeg'));
            const result = '[href^="http"][href$="jpeg"]||[href^="https"][href$="jpeg"]';
            expect(test).toEqual(result);
        });
        it('should build attribute (starts with many) AND (ends with many) selectors', () => {
            const test = style.and(style.attribute('href').startsWith('http', 'https'), style.attribute('href').endsWith('jpg', 'png'));
            const result = '[href^="http"][href$="jpg"]'
                + '||'
                + '[href^="https"][href$="jpg"]'
                + '||'
                + '[href^="http"][href$="png"]'
                + '||'
                + '[href^="https"][href$="png"]';
            expect(test).toEqual(result);
        });
        it('should build attribute (starts with many) AND (contains many) AND (ends with many) selectors', () => {
            const test = style.and(style.attribute('href').startsWith('http', 'https'), style.attribute('href').containsAny('images', 'source'), style.attribute('href').endsWith('jpeg', 'png'));
            const result = '[href^="http"][href*="images"][href$="jpeg"]'
                + '||'
                + '[href^="https"][href*="images"][href$="jpeg"]'
                + '||'
                + '[href^="http"][href*="source"][href$="jpeg"]'
                + '||'
                + '[href^="https"][href*="source"][href$="jpeg"]'
                + '||'
                + '[href^="http"][href*="images"][href$="png"]'
                + '||'
                + '[href^="https"][href*="images"][href$="png"]'
                + '||'
                + '[href^="http"][href*="source"][href$="png"]'
                + '||'
                + '[href^="https"][href*="source"][href$="png"]';
            expect(test).toEqual(result);
        });
        it('should generate unrealistic complex selector', () => {
            const test = style.or(style.and(style.firstChild, style.nthLastChild(4)), style.and(style.firstChild, style.nthLastChild(4), style.selector('~ td')));
            const result = ':first-child:nth-last-child(4)'
                + '||'
                + ':first-child:nth-last-child(4) ~ td';
            expect(test).toEqual(result);
        });
    });
    describe('selector method', () => {
        it('should have "selector" method', () => {
            expect(style).toHaveProperty('selector');
        });
        it('should return descendant combinator(s)', () => {
            const test = [{
                    test: style.selector('p'),
                    result: ' p'
                }, {
                    test: style.selector('h2', 'h3', 'h4', 'p'),
                    result: ' h2' + '||' + ' h3' + '||' + ' h4' + '||' + ' p'
                }, {
                    test: style.selector(styled.div()),
                    result: ' .e-1olbxps'
                }, {
                    test: style.selector(`${styled.div()}`, 'button'),
                    result: ' .e-1olbxps' + '||' + ' button'
                }];
            test.forEach(({ test, result }) => {
                expect(test).toEqual(result);
            });
        });
    });
});
describe('style utils', () => {
    describe('createAnySelector', () => {
        it('should execute given mapper and join given items', () => {
            const list = [
                ':hover',
                ':active',
                ':focus'
            ];
            const mapper = (item) => '.selector:not(:disabled)' + item;
            const test = createAnySelector(mapper)(...list);
            const result = '.selector:not(:disabled):hover'
                + '||'
                + '.selector:not(:disabled):active'
                + '||'
                + '.selector:not(:disabled):focus';
            expect(test).toEqual(result);
        });
        it('should return an empty string when give list has no length', () => {
            const list = [];
            const mapper = (item) => '.selector:not(:disabled)' + item;
            const test = createAnySelector(mapper)(...list);
            const result = '';
            expect(test).toEqual(result);
        });
    });
});
