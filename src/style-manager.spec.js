import { style } from './helper.style';
import { collectClassNames, unfold, styleManager } from './style-manager';
import { existsAndNotFalse } from './props';
import { sheetCache } from './registries';
import { STYLED_ATTRIBUTE_NAME } from './constants';
describe('styleManager.helpers', () => {
    describe('unfold', () => {
        it('should return an empty array when no computables exist', () => {
            const baseClassName = 's-1oq2o';
            const cacheCreator = () => ({
                baseClassName,
                computables: [],
                rules: []
            });
            const test = unfold(baseClassName, cacheCreator)(collectClassNames({}));
            expect(test).toEqual([]);
        });
        it('should return a list of generated class names', () => {
            const propsOnlyPredicate = (names) => (props) => existsAndNotFalse(props)(names[0]);
            const baseClassName = 's-xlz7w5';
            const cacheCreator = () => ({
                baseClassName,
                computables: [
                    {
                        keys: ['hasLoader'],
                        identity: () => 'd-qprzwn',
                        predicate: propsOnlyPredicate(['hasLoader']),
                        yield: () => ({
                            backgroundColor: 'var(--skeleton)',
                            animation: 'shimmer 1.5s ease-in-out infinite'
                        })
                    },
                    {
                        keys: ['aspectRatio'],
                        identity: () => 'c-78vsmj',
                        predicate: propsOnlyPredicate(['aspectRatio']),
                        yield: () => ({
                            paddingBottom: '0.00%'
                        })
                    }
                ],
                rules: []
            });
            const test = unfold(baseClassName, cacheCreator)(collectClassNames({
                hasLoader: true
            }));
            expect(test).toEqual(['d-qprzwn']);
        });
        it('should create style tag with data attribute', () => {
            const identifier = 's-1ujm494';
            const cacheCreator = () => ({
                baseClassName: identifier,
                computables: [],
                rules: []
            });
            unfold(identifier, cacheCreator)(collectClassNames({}));
            const selector = `style[${STYLED_ATTRIBUTE_NAME}=${identifier}]`;
            const styleElement = document.querySelector(selector);
            const test = styleElement.dataset.styledSheet;
            expect(test).toEqual(identifier);
        });
        it('should render given CSS', () => {
            const identifier = 's-11c0jvc';
            const rules = [
                '.s-11c0jvc { position:relative; }'
            ];
            const globals = [
                'html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }',
                '*,:after,:before { box-sizing: border-box; }'
            ];
            const cacheCreator = () => ({
                baseClassName: identifier,
                computables: [],
                rules,
                globals
            });
            unfold(identifier, cacheCreator)(collectClassNames({}));
            const testSheet = sheetCache.get(identifier);
            expect(testSheet?.css()).toContain(rules.join(''));
            expect(testSheet?.css()).toContain(globals.join(''));
        });
    });
});
describe('styleManager', () => {
    it('should return only base class name', () => {
        const resultNoStyles = styleManager({}, [])({});
        expect(resultNoStyles.length).toBe(1);
        const css = [
            `*,
      :after,
      :before {
        box-sizing: border-box;
      }`,
            `body {
        font-size: 16px;
        line-height: 24px;
        font-family: Verdana, sans-serif;
        color: #333;
      }`,
            `body,
      html {
        margin: 0;
        padding: 0;
        width: 100%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }`
        ];
        const resultStaticStyles = styleManager({
            position: 'relative',
            display: 'flex',
            marginBottom: '1rem',
            '@media screen and (min-width: 576px)': {
                marginBottom: '1.5rem'
            }
        }, css)({});
        expect(resultStaticStyles.length).toBe(1);
        const resultDynamicStyles = styleManager({
            [style.prop('isActive')]: {
                color: '#fc0'
            }
        }, [])({
            isActive: false
        });
        expect(resultDynamicStyles.length).toBe(1);
        const resultComputedStyles = styleManager({
            [style.prop('size')]: (size) => ({
                fontSize: `${size / 16}rem`
            })
        }, [])({});
        expect(resultComputedStyles.length).toBe(1);
    });
    it('should return multiple class names', () => {
        const tests = [{
                props: {
                    isActive: false
                },
                count: 1
            }, {
                props: {
                    isActive: false,
                    size: 24
                },
                count: 2
            }, {
                props: {
                    isActive: true,
                    size: 24
                },
                count: 3
            }, {
                props: {
                    color: 'pink',
                    isActive: true
                },
                count: 3
            }, {
                props: {
                    color: 'pink',
                    isActive: false,
                    size: 30
                },
                count: 2
            }, {
                props: {
                    color: 'pink',
                    isActive: true,
                    size: 16
                },
                count: 4
            }];
        tests.forEach(({ props, count }) => {
            const test = styleManager({
                [style.prop('isActive')]: {
                    color: '#fc0',
                    [style.prop('color')]: (color) => ({
                        color
                    })
                },
                [style.prop('size')]: (size) => ({
                    fontSize: `${size / 16}rem`,
                    lineHeight: `${(size / 16) * 1.5}rem`
                })
            }, [])(props);
            expect(test).toHaveLength(count);
        });
    });
});
