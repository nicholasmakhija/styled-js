import { existsAndNotFalse, doNotExist, createDescriptor, createPropSelector, skipTransient } from './props';
describe('utils.props', () => {
    describe('existsAndNotFalse', () => {
        const booleanProp = 'booleanProp';
        const stringProp = 'stringProp';
        const numericProp = 'numericProp';
        const objectLiteralProp = 'objectLiteralProp';
        it('should be truthy when prop is not null, undefined or false', () => {
            const obj = {
                [booleanProp]: true,
                [stringProp]: 'test',
                [numericProp]: 123,
                [objectLiteralProp]: {
                    foo: 'bar'
                }
            };
            const checkProp = existsAndNotFalse(obj);
            expect(checkProp(booleanProp)).toBeTruthy();
            expect(checkProp(stringProp)).toBeTruthy();
            expect(checkProp(numericProp)).toBeTruthy();
            expect(checkProp(objectLiteralProp)).toBeTruthy();
        });
        it('should be falsy when prop is null, undefined or false', () => {
            const obj = {
                [booleanProp]: false,
                [stringProp]: null,
                [objectLiteralProp]: undefined
            };
            const checkProp = existsAndNotFalse(obj);
            expect(checkProp('nonExistentProp')).toBeFalsy();
            expect(checkProp(booleanProp)).toBeFalsy();
            expect(checkProp(stringProp)).toBeFalsy();
            expect(checkProp(objectLiteralProp)).toBeFalsy();
        });
    });
    describe('doNotExist', () => {
        const booleanProp = 'booleanProp';
        const stringProp = 'stringProp';
        const numericProp = 'numericProp';
        const objectLiteralProp = 'objectLiteralProp';
        it('should be truthy when prop is null or undefined', () => {
            const obj = {
                [numericProp]: undefined,
                [objectLiteralProp]: null
            };
            const checkProp = doNotExist(obj);
            expect(checkProp('nonExistentProp')).toBeTruthy();
            expect(checkProp(numericProp)).toBeTruthy();
            expect(checkProp(objectLiteralProp)).toBeTruthy();
        });
        it('should be falsy when prop is not null or undefined', () => {
            const obj = {
                [booleanProp]: false,
                [stringProp]: 'string',
                [objectLiteralProp]: {
                    foo: 'bar'
                }
            };
            const checkProp = doNotExist(obj);
            expect(checkProp(booleanProp)).toBeFalsy();
            expect(checkProp(stringProp)).toBeFalsy();
            expect(checkProp(objectLiteralProp)).toBeFalsy();
        });
    });
    describe('createDescriptor', () => {
        const matcher = 'all';
        const names = ['isActive', 'skin'];
        const test = createDescriptor(matcher, names);
        it('should create descriptor for "all" props', () => {
            expect(test).toHaveProperty('keys');
            expect(test).toHaveProperty('predicate');
        });
        it('should have props "keys" array', () => {
            expect(test.keys).toEqual(names);
        });
        it('should have props "predicate" function', () => {
            const happyProps = {
                isActive: true,
                skin: 'ghost'
            };
            expect(test.predicate(happyProps)).toBeTruthy();
            const unhappyProps = {
                isActive: false,
                skin: 'ghost'
            };
            expect(test.predicate(unhappyProps)).toBeFalsy();
        });
    });
    describe('createPropSelector', () => {
        const tests = [{
                matcher: 'not',
                names: ['config', 'hasGutters'],
                joined: 'config,hasGutters'
            },
            {
                matcher: 'only',
                names: ['isActive'],
                joined: 'isActive'
            }];
        it('should create property selector for the given matcher and names', () => {
            tests.forEach(({ matcher, names, joined }) => {
                const test = createPropSelector(matcher)(...names);
                const result = `props.${matcher}(${joined})`;
                expect(test).toEqual(result);
            });
        });
    });
    describe('skipTransient', () => {
        const props = {
            className: '.foo',
            isActive: true,
            'aria-label': 'filtering props test',
            onClick: () => { alert('onClick'); },
            theme: 'dark'
        };
        it('should return all props when datastore has no matches', () => {
            const store = new Set();
            expect(skipTransient(props, store)).toEqual(props);
            expect(skipTransient(props, store.add('skin'))).toEqual(props);
        });
        it('should return filtered props when datastore has matches', () => {
            const store = new Set(['isActive', 'theme']);
            const result = {
                className: '.foo',
                'aria-label': 'filtering props test',
                onClick: () => { alert('onClick'); }
            };
            const test = skipTransient(props, store);
            expect(JSON.stringify(test)).toEqual(JSON.stringify(result));
            expect(Object.keys(test)).toEqual(Object.keys(result));
            expect(test).toHaveProperty('className');
            expect(test).toHaveProperty('aria-label');
            expect(test).toHaveProperty('onClick');
        });
    });
});
