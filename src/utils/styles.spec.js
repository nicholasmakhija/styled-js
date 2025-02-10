import { mergeStyles } from './styles';
describe('utils.styles', () => {
    describe('mergeStyles', () => {
        const tests = [{
                type: 'static',
                target: {
                    backgroundColor: '#fbbac9',
                    color: '#fff',
                    padding: '10px'
                },
                source: {
                    backgroundColor: 'transparent',
                    margin: '0 0 1.5rem'
                },
                result: {
                    backgroundColor: 'transparent',
                    color: '#fff',
                    padding: '10px',
                    margin: '0 0 1.5rem'
                }
            }, {
                type: 'nested static',
                target: {
                    'not(:disabled)': {
                        ':hover': {
                            color: 'pink',
                            textDecoration: 'none'
                        }
                    }
                },
                source: {
                    'not(:disabled)': {
                        ':hover': {
                            color: 'aqua',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }
                    }
                },
                result: {
                    'not(:disabled)': {
                        ':hover': {
                            color: 'aqua',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }
                    }
                }
            }, {
                type: 'dynamic',
                target: {
                    'props.any(isActive,isVisible)': {
                        opacity: 1,
                        visibility: 'visible',
                        border: '2px dashed #777'
                    }
                },
                source: {},
                result: {
                    'props.any(isActive,isVisible)': {
                        opacity: 1,
                        visibility: 'visible',
                        border: '2px dashed #777'
                    }
                }
            }];
        tests.forEach((test) => {
            const { type, target, source, result } = test;
            it(`should merge ${type} styles`, () => {
                const test = mergeStyles(target, source);
                const testKeys = Object.keys(test);
                const resultKeys = Object.keys(result);
                expect(testKeys).toEqual(resultKeys);
                const testValues = Object.values(test);
                const resultValues = Object.values(result);
                expect(testValues).toEqual(resultValues);
            });
        });
        it('should merge computed styles', () => {
            const target = {
                'props.only(size)': (size) => ({
                    paddingTop: `${size / 16}rem`,
                    paddingBottom: `${size / 16}rem`
                })
            };
            const source = {
                'props.only(size)': (size) => ({
                    fontSize: `${size / 16}rem`,
                    lineHeight: `${(size / 16) * 1.5}rem`
                })
            };
            const merged = mergeStyles(target, source);
            const test = merged['props.only(size)'](32);
            expect(test).toEqual({
                fontSize: '2rem',
                lineHeight: '3rem'
            });
        });
    });
});
