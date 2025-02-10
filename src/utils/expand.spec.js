import { expand } from './expand';
describe('utils.expand', () => {
    describe('objects', () => {
        const obj = {
            foo: 'bar'
        };
        const objTest = expand(obj, {
            isBar: false,
            getName: () => 'Object:foo'
        });
        it('should expand the given object with "isBar" and "getName" properties', () => {
            expect(objTest).toHaveProperty('foo');
            expect(objTest).toHaveProperty('isBar');
            expect(objTest).toHaveProperty('getName');
        });
        it('should contain "isBar" property with value false', () => {
            expect(objTest.isBar).toBeFalsy();
        });
        it('should contain "getName" property with value of type function', () => {
            expect(objTest.getName).toBeInstanceOf(Function);
        });
    });
    describe('functions', () => {
        const fn = ((a, b) => a + b);
        const fnTest = expand(fn, {
            isFunction: true,
            displayName: 'sum'
        });
        it('should expand the given function with "isFunction" and "displayName" properties', () => {
            expect(fnTest).toHaveProperty('isFunction');
            expect(fnTest).toHaveProperty('displayName');
        });
        it('should contain "isFunction" property with value true', () => {
            expect(fnTest.isFunction).toBeTruthy();
        });
        it('should contain "displayName" property with value "sum"', () => {
            expect(fnTest.displayName).toEqual('sum');
        });
    });
});
