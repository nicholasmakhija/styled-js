import { joinToEnd, joinToStart, dotPrefix, appendTo, addItems, safeJoinWith, joinWithSpace } from './selectors';
describe('utils.selectors', () => {
    describe('joinToEnd', () => {
        it('should join the given strings', () => {
            expect(joinToEnd(':hover')('.some-class')).toEqual('.some-class:hover');
            expect(joinToEnd('')('.some-class')).toEqual('.some-class');
            expect(joinToEnd(':hover')('')).toEqual(':hover');
        });
    });
    describe('joinToStart', () => {
        it('should join the given strings', () => {
            expect(joinToStart('.some-class')(':hover')).toEqual('.some-class:hover');
            expect(joinToStart('')(':hover')).toEqual(':hover');
            expect(joinToStart('.some-class')('')).toEqual('.some-class');
            expect(joinToStart('data-test-')('id')).toEqual('data-test-id');
        });
    });
    describe('dotPrefix', () => {
        it('should prefix the give string with "."', () => {
            expect(dotPrefix('foo')).toEqual('.foo');
            expect(dotPrefix('')).toEqual('.');
            expect(dotPrefix('.')).toEqual('..');
        });
    });
    describe('appendTo', () => {
        const list = [
            'item-1',
            'item-2',
            'item-3'
        ];
        const result = [
            'item-1:hover',
            'item-2:hover',
            'item-3:hover'
        ];
        it('should append given string to all items in given list', () => {
            expect(appendTo(list)(':hover')).toEqual(result);
            expect(appendTo(list)('')).toEqual(list);
            expect(appendTo([])(':not(:disabled)')).toEqual([]);
        });
    });
    describe('addItems', () => {
        it('should combine given class name with given pseudo elements', () => {
            const prev = ['.some-class-name'];
            const next = '::before||::after';
            const test = addItems(prev, next);
            const result = [
                '.some-class-name::before',
                '.some-class-name::after'
            ];
            expect(test).toEqual(result);
        });
        it('should combine given classes name with given pseudo element', () => {
            const prev = [
                '.some-class-name',
                '.other-class-name'
            ];
            const next = ':hover';
            const test = addItems(prev, next);
            const result = [
                '.some-class-name:hover',
                '.other-class-name:hover'
            ];
            expect(test).toEqual(result);
        });
        it('should combine given attribute selectors', () => {
            const prev = [
                '[href^=http]',
                '[href^=https]'
            ];
            const next = '[href$=jpg]||[href$=png]||[href$=svg]';
            const test = addItems(prev, next);
            const result = [
                '[href^=http][href$=jpg]',
                '[href^=https][href$=jpg]',
                '[href^=http][href$=png]',
                '[href^=https][href$=png]',
                '[href^=http][href$=svg]',
                '[href^=https][href$=svg]'
            ];
            expect(test).toEqual(result);
        });
        it('should combine given pseudo selectors', () => {
            const prev = [
                ':not(:disabled):hover:first-child',
                ':not(:disabled):hover:last-child'
            ];
            const next = '::before||::after';
            const test = addItems(prev, next);
            const result = [
                ':not(:disabled):hover:first-child::before',
                ':not(:disabled):hover:last-child::before',
                ':not(:disabled):hover:first-child::after',
                ':not(:disabled):hover:last-child::after'
            ];
            expect(test).toEqual(result);
        });
        it('should return split "next" when "prev" has no length', () => {
            const next = '::before||::after';
            const test = addItems([], next);
            const result = [];
            expect(test).toEqual(result);
        });
        it('should return "prev" when split "next" has no length', () => {
            const prev = [
                '.some-class-name',
                '.other-class-name'
            ];
            const test = addItems(prev, '');
            expect(test).toEqual(prev);
        });
    });
    describe('safeJoinWith', () => {
        it('should join given strings with given hyphens', () => {
            const test = safeJoinWith('-')('one', 'two', 'three');
            const result = 'one-two-three';
            expect(test).toEqual(result);
        });
        it('should join given numbers with comma spaced', () => {
            const test = safeJoinWith(', ')(1, 2, 3);
            const result = '1, 2, 3';
            expect(test).toEqual(result);
        });
        it('should join all non falsy values with pipe', () => {
            const test = safeJoinWith('|')(null, undefined, '', ' ', 0, '0', NaN, 7);
            const result = ' |0|7';
            expect(test).toEqual(result);
        });
    });
    describe('joinWithSpace', () => {
        it('should join given string with spaces', () => {
            const test = joinWithSpace('@media', 'screen, print', 'and', '(min-width: 768px) and (max-width: 991px)');
            const result = '@media screen, print and (min-width: 768px) and (max-width: 991px)';
            expect(test).toEqual(result);
        });
        it('should skip empty strings while joining give items with space', () => {
            const test = joinWithSpace('@media', '', '', '(prefers-color-scheme: dark)');
            const result = '@media (prefers-color-scheme: dark)';
            expect(test).toEqual(result);
        });
    });
});
