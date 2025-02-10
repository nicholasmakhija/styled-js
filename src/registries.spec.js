import { createMethods } from './registries';
describe('registries', () => {
    describe('createMethods', () => {
        it('should have public methods "add", "get" and "has"', () => {
            const test = createMethods(new Map());
            expect(test).toHaveProperty('add');
            expect(test).toHaveProperty('get');
            expect(test).toHaveProperty('has');
            expect(test).toHaveProperty('__getDataStore');
        });
        it('should have also have private method "__getDataStore"', () => {
            const test = createMethods(new Map());
            expect(test).toHaveProperty('__getDataStore');
        });
    });
    describe('add method', () => {
        it('should add the given value', () => {
            const key = 'foo';
            const value = {
                bar: 'baz',
                isMock: true
            };
            const mock = jest.fn(() => ({
                ...value,
                toString: () => key
            }));
            const store = new Map();
            const register = createMethods(store);
            expect(register.add(key, mock)).toMatchObject(value);
            expect(mock).toHaveBeenCalledTimes(1);
        });
        it('should get existing value when trying to override', () => {
            const key = 'foo';
            const value = {
                bar: 'baz',
                isMock: true,
                toString: () => key
            };
            const mock = jest.fn(() => ({
                ...value,
                isOverride: true
            }));
            const store = new Map([
                [key, value]
            ]);
            const register = createMethods(store);
            expect(register.add(key, mock)).toEqual(value);
            expect(mock).toHaveBeenCalledTimes(0);
        });
    });
    describe('get method', () => {
        const store = new Map();
        const key = 'foo';
        const value = {
            bar: 'baz',
            isMock: true
        };
        const register = createMethods(store);
        const valueCreator = () => ({
            ...value,
            toString: () => key
        });
        it('should return undefined when the expected value does not exist', () => {
            expect(register.get(key)).toEqual(undefined);
        });
        it('should return the expected value when it exists', () => {
            register.add(key, valueCreator);
            expect(register.get(key)).toMatchObject(value);
        });
    });
    describe('has method', () => {
        const store = new Map();
        const data = {
            bar: 'baz',
            isMock: true
        };
        const register = createMethods(store);
        const valueCreator = () => data;
        it('should return false when the expected value does not exist', () => {
            expect(register.has('foo')).toBeFalsy();
        });
        it('should return true when the expected value exists', () => {
            register.add('foo', valueCreator);
            expect(register.has('foo')).toBeTruthy();
        });
    });
});
