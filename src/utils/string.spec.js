import { capitalize, toDashed, startsWithAny, toSingleLine, split } from './string';
describe('utils.string', () => {
    describe('capitalize', () => {
        it('should capitalize the first letter of the given string', () => {
            expect(capitalize('foo')).toEqual('Foo');
            expect(capitalize('Foo')).toEqual('Foo');
            expect(capitalize('5even')).toEqual('5even');
            expect(capitalize('')).toEqual('');
            expect(capitalize('-with')).toEqual('-with');
        });
    });
    describe('toDashed', () => {
        it('should change the case of the given string to kebab', () => {
            expect(toDashed('fontSize')).toEqual('font-size');
            expect(toDashed('FontSize')).toEqual('-font-size');
            expect(toDashed('font-size')).toEqual('font-size');
            expect(toDashed('fontsize')).toEqual('fontsize');
            expect(toDashed('-webkitBackdropFilter')).toEqual('-webkit-backdrop-filter');
            expect(toDashed('')).toEqual('');
        });
    });
    describe('startsWithAny', () => {
        const isAtRule = startsWithAny('@container', '@media', '@supports');
        it('should return an instance of Function', () => {
            expect(isAtRule).toBeInstanceOf(Function);
        });
        it('should be truthy if the given string starts with any of given values', () => {
            expect(isAtRule('@container')).toBeTruthy();
            expect(isAtRule('@media')).toBeTruthy();
            expect(isAtRule('@supports')).toBeTruthy();
        });
        it('should be falsy if the given string does not start with any of given values', () => {
            expect(isAtRule('@keyframes')).toBeFalsy();
            expect(isAtRule('at-rule')).toBeFalsy();
        });
    });
    describe('toSingleLine', () => {
        it('should remove all spaces, tabs and line breaks around the given string', () => {
            expect(toSingleLine('hello world')).toEqual('hello world');
            expect(toSingleLine(' hello world ')).toEqual('hello world');
            expect(toSingleLine(' hello \n  world')).toEqual('hello world');
            expect(toSingleLine(`
  @keyframes fade-in-out {
    0% { opacity: 1; }
    65% { opacity: 1; }
    66% { opacity: 0; }
    100% { opacity: 0; }
  }
      `)).toEqual('@keyframes fade-in-out {0% { opacity: 1; }65% { opacity: 1; }66% { opacity: 0; }100% { opacity: 0; }}');
        });
    });
    describe('split', () => {
        const splitByComma = split(',');
        it('should return an instance of Function', () => {
            expect(splitByComma).toBeInstanceOf(Function);
        });
        it('should split the given string by comma', () => {
            expect(splitByComma('Hello, World')).toEqual(['Hello', ' World']);
            expect(splitByComma('Hello,World')).toEqual(['Hello', 'World']);
            expect(splitByComma('Hello World')).toEqual(['Hello World']);
            expect(splitByComma('')).toEqual(['']);
        });
    });
});
