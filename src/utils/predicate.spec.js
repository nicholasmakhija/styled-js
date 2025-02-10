import { isTypeOf, equals, isObjectLiteral, isNumberOrString, isNil } from './predicate';
const testFn = () => { alert('this is a function'); };
describe('utils.predicate', () => {
    describe('isTypeOf', () => {
        it('should return an instance of Function', () => {
            expect(isTypeOf('boolean')).toBeInstanceOf(Function);
        });
        const isString = isTypeOf('string');
        it('should be truthy when the typeof given value matches the expected type', () => {
            expect(isString('foo')).toBeTruthy();
            expect(isString('')).toBeTruthy();
        });
        it('should be falsy when the typeof given value does not match the expected type', () => {
            expect(isString(true)).toBeFalsy();
            expect(isString(testFn)).toBeFalsy();
            expect(isString(123)).toBeFalsy();
            expect(isString({})).toBeFalsy();
            expect(isString([])).toBeFalsy();
            expect(isString(null)).toBeFalsy();
            expect(isString(undefined)).toBeFalsy();
        });
    });
    describe('isObjectLiteral', () => {
        it('should be truthy when the typeof given value is an object literal', () => {
            expect(isObjectLiteral({ foo: 'bar' })).toBeTruthy();
            expect(isObjectLiteral({})).toBeTruthy();
        });
        it('should be falsy when the typeof given value is not an object literal', () => {
            expect(isObjectLiteral(true)).toBeFalsy();
            expect(isObjectLiteral(testFn)).toBeFalsy();
            expect(isObjectLiteral(123)).toBeFalsy();
            expect(isObjectLiteral([])).toBeFalsy();
            expect(isObjectLiteral(null)).toBeFalsy();
            expect(isObjectLiteral(undefined)).toBeFalsy();
            expect(isObjectLiteral('object')).toBeFalsy();
        });
    });
    describe('isNumberOrString', () => {
        it('should be truthy when the typeof given value is number or string', () => {
            expect(isNumberOrString(123)).toBeTruthy();
            expect(isNumberOrString(-123)).toBeTruthy();
            expect(isNumberOrString(0)).toBeTruthy();
            expect(isNumberOrString(100_000)).toBeTruthy();
            expect(isNumberOrString(NaN)).toBeTruthy();
            expect(isNumberOrString('foo')).toBeTruthy();
            expect(isNumberOrString('')).toBeTruthy();
        });
        it('should be falsy when the typeof given value is not number or string', () => {
            expect(isNumberOrString(true)).toBeFalsy();
            expect(isNumberOrString(testFn)).toBeFalsy();
            expect(isNumberOrString([])).toBeFalsy();
            expect(isNumberOrString(null)).toBeFalsy();
            expect(isNumberOrString(undefined)).toBeFalsy();
        });
    });
    describe('equals', () => {
        it('should return an instance of Function', () => {
            expect(equals(true)).toBeInstanceOf(Function);
        });
        const isUndefined = equals(undefined);
        it('should be truthy when the given value matches expected', () => {
            expect(isUndefined(undefined)).toBeTruthy();
        });
        it('should be falsy when the given value does not match expected', () => {
            expect(isUndefined(true)).toBeFalsy();
            expect(isUndefined(testFn)).toBeFalsy();
            expect(isUndefined(123)).toBeFalsy();
            expect(isUndefined({})).toBeFalsy();
            expect(isUndefined([])).toBeFalsy();
            expect(isUndefined(null)).toBeFalsy();
            expect(isUndefined('undefined')).toBeFalsy();
        });
    });
    describe('isNil', () => {
        it('should be truthy when the given value is null or undefined', () => {
            expect(isNil(null)).toBeTruthy();
            expect(isNil(undefined)).toBeTruthy();
        });
        it('should be falsy when the given value is not null or undefined', () => {
            expect(isNil(true)).toBeFalsy();
            expect(isNil(testFn)).toBeFalsy();
            expect(isNil(123)).toBeFalsy();
            expect(isNil({})).toBeFalsy();
            expect(isNil([])).toBeFalsy();
            expect(isNil('undefined')).toBeFalsy();
        });
    });
});
