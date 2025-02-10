import { asRule, asAtRule, asObjectLiteral, asObjectStyles, createDeclaration, groupStyles, styleParser } from './style-parser';
import { style } from './helper.style';
describe('style-parser.helpers', () => {
    describe('asRule', () => {
        it('should concatenate the give styles and selector as a ruleset', () => {
            const selector = '.s-sqy97z';
            const rules = 'display:flex;flex-wrap:wrap;margin-right:-1rem;margin-left:-1rem;';
            const test = asRule(rules, selector);
            const result = selector + '{' + rules + '}';
            expect(test).toEqual(result);
        });
    });
    describe('asAtRule', () => {
        it('should wrap given declarations in given at-rules', () => {
            const declaration = '.s-sqy97z{display:flex;flex-wrap:wrap;margin-right:-1rem;margin-left:-1rem;}';
            const atRules = [
                '@media screen and (min-width: 768px)',
                '@supports (position: absolute) and (display: flex)'
            ];
            const test = asAtRule(declaration, atRules);
            const result = atRules[0] + '{' + atRules[1] + '{' + declaration + '}}';
            expect(test).toEqual(result);
        });
    });
    describe('asObjectLiteral', () => {
        it('should create object literal from given rules and prop', () => {
            const prop = '@media screen and (min-width: 768px)';
            const rules = {
                flex: '0 0 50%',
                maxWidth: '50%',
                marginTop: 0
            };
            const test = asObjectLiteral(rules, prop);
            expect(test).toEqual({ [prop]: rules });
        });
    });
    describe('asObjectStyles', () => {
        it('should create object literal from given rules and prop', () => {
            const atRules = [
                '@media screen and (min-width: 768px)',
                '@supports (position: absolute) and (display: flex)'
            ];
            const rules = {
                flex: '0 0 50%',
                maxWidth: '50%',
                marginTop: 0
            };
            const test = asObjectStyles(rules, atRules);
            expect(test).toEqual({
                [atRules[0]]: {
                    [atRules[1]]: rules
                }
            });
        });
    });
    describe('createDeclaration', () => {
        it('should create CSS from given key and value', () => {
            expect(createDeclaration('color', '#FC0')).toEqual('color:#FC0;');
            expect(createDeclaration('margin', '0 auto')).toEqual('margin:0 auto;');
            expect(createDeclaration('fontWeight', 'bold')).toEqual('font-weight:bold;');
        });
        it('should stringify CSS content property', () => {
            expect(createDeclaration('content', '')).toEqual('content:"";');
            expect(createDeclaration('content', 'Chapter ')).toEqual('content:"Chapter ";');
            expect(createDeclaration('content', ' • ')).toEqual('content:" • ";');
        });
    });
    describe('groupStyles', () => {
        it('should return an Array of CSS string and empty object when no nested styles are passed', () => {
            const test = groupStyles({
                position: 'relative',
                margin: 0,
                height: '100%',
                overflow: 'hidden',
                borderRadius: '0.125rem',
                backgroundColor: '#fff'
            });
            const result = [
                'position:relative;margin:0;height:100%;overflow:hidden;border-radius:0.125rem;background-color:#fff;',
                {}
            ];
            expect(test).toEqual(result);
        });
        it('should return an Array of empty string and nested object styles when no root styles are passed', () => {
            const test = groupStyles({
                '@media screen and (min-width: 768px)': {
                    fontSize: '1.25rem',
                    lineHeight: '1.75rem'
                },
                'props.only(isFooter)': {
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    left: 0,
                    paddingTop: 0,
                    '@media screen and (min-width: 768px)': {
                        paddingTop: '20px'
                    }
                }
            });
            const result = [
                '',
                {
                    '@media screen and (min-width: 768px)': {
                        fontSize: '1.25rem',
                        lineHeight: '1.75rem'
                    },
                    'props.only(isFooter)': {
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        left: 0,
                        paddingTop: 0,
                        '@media screen and (min-width: 768px)': {
                            paddingTop: '20px'
                        }
                    }
                }
            ];
            expect(test).toEqual(result);
        });
        it('should return an Array of CSS and nested object styles when both root and nested styles are passed', () => {
            const test = groupStyles({
                position: 'relative',
                margin: 0,
                height: '100%',
                overflow: 'hidden',
                borderRadius: '0.125rem',
                backgroundColor: '#fff',
                '@media screen and (min-width: 768px)': {
                    fontSize: '1.25rem',
                    lineHeight: '1.75rem'
                },
                'props.only(isFooter)': {
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    left: 0,
                    paddingTop: 0,
                    '@media screen and (min-width: 768px)': {
                        paddingTop: '20px'
                    }
                }
            });
            const result = [
                'position:relative;margin:0;height:100%;overflow:hidden;border-radius:0.125rem;background-color:#fff;',
                {
                    '@media screen and (min-width: 768px)': {
                        fontSize: '1.25rem',
                        lineHeight: '1.75rem'
                    },
                    'props.only(isFooter)': {
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        left: 0,
                        paddingTop: 0,
                        '@media screen and (min-width: 768px)': {
                            paddingTop: '20px'
                        }
                    }
                }
            ];
            expect(test).toEqual(result);
        });
        it('should return an Array of empty string and empty object when no styles are passed', () => {
            const test = groupStyles({});
            const result = ['', {}];
            expect(test).toEqual(result);
        });
    });
});
describe('style-parser', () => {
    it('should return skeleton cache data when no styles are defined', () => {
        const test = styleParser('s-1oq2o')({});
        const result = {
            baseClassName: 's-1oq2o',
            computables: [],
            rules: []
        };
        expect(test).toEqual(result);
    });
    it('should populate rules when static styles are defined', () => {
        const test = styleParser('s-sqy97z')({
            display: 'flex',
            flexWrap: 'wrap',
            marginRight: '-1rem',
            marginLeft: '-1rem',
            [style.after]: {
                content: '',
                clear: 'both',
                display: 'block'
            }
        });
        const result = {
            baseClassName: 's-sqy97z',
            computables: [],
            rules: [
                '.s-sqy97z{display:flex;flex-wrap:wrap;margin-right:-1rem;margin-left:-1rem;}',
                '.s-sqy97z::after{content:"";clear:both;display:block;}'
            ]
        };
        expect(test).toEqual(result);
    });
    it('should populate computables when prop based styles are defined', () => {
        const test = styleParser('s-m42262')({
            [style.prop('size')]: (size) => ({
                fontSize: `${size / 16}rem`,
                lineHeight: `${(size / 16) * 1.5}rem`
            })
        });
        expect(test.baseClassName).toEqual('s-m42262');
        expect(test.computables).toHaveLength(1);
        expect(test.rules).toHaveLength(0);
        const computable = test.computables[0];
        expect(computable).toHaveProperty('keys');
        expect(computable).toHaveProperty('predicate');
        expect(computable).toHaveProperty('identity');
        expect(computable).toHaveProperty('yield');
        expect(computable.keys).toEqual(['size']);
        expect(computable.predicate({})).toEqual(false);
        expect(computable.predicate({ size: undefined })).toEqual(false);
        expect(computable.predicate({ size: 16 })).toEqual(true);
        expect(computable.yield({ size: 32 })).toEqual({
            fontSize: '2rem',
            lineHeight: '3rem'
        });
    });
    it('should populate rules and computables when all styles are defined', () => {
        const test = styleParser('s-p2l13z')({
            width: '100%',
            paddingRight: '1rem',
            paddingLeft: '1rem',
            marginRight: 'auto',
            marginLeft: 'auto',
            '@media screen and (min-width: 768px)': {
                maxWidth: '45rem'
            },
            '@media screen and (min-width: 992px)': {
                maxWidth: '60rem'
            },
            '@media screen and (min-width: 1200px)': {
                maxWidth: '71.25rem'
            },
            [style.prop('isFullWidth')]: {
                maxWidth: '100%'
            },
            [style.props.any('isFluid', 'noPadding')]: {
                paddingRight: 0,
                paddingLeft: 0
            }
        });
        expect(test.baseClassName).toEqual('s-p2l13z');
        expect(test.computables).toHaveLength(2);
        expect(test.rules).toHaveLength(4);
        expect(test.rules).toEqual([
            '.s-p2l13z{width:100%;padding-right:1rem;padding-left:1rem;margin-right:auto;margin-left:auto;}',
            '@media screen and (min-width: 768px){.s-p2l13z{max-width:45rem;}}',
            '@media screen and (min-width: 992px){.s-p2l13z{max-width:60rem;}}',
            '@media screen and (min-width: 1200px){.s-p2l13z{max-width:71.25rem;}}'
        ]);
        const computable = test.computables;
        [{
                keys: ['isFullWidth']
            }, {
                keys: ['isFluid', 'noPadding']
            }].forEach((item, i) => {
            expect(computable[i]).toHaveProperty('keys');
            expect(computable[i]).toHaveProperty('predicate');
            expect(computable[i]).toHaveProperty('identity');
            expect(computable[i]).toHaveProperty('yield');
            expect(computable[i].keys).toEqual(item.keys);
        });
        expect(computable[1].predicate({})).toEqual(false);
        expect(computable[1].predicate({ isFluid: false })).toEqual(false);
        expect(computable[1].predicate({ noPadding: false })).toEqual(false);
        expect(computable[1].predicate({ isFluid: true })).toEqual(true);
        expect(computable[1].predicate({ noPadding: true })).toEqual(true);
        expect(computable[1].predicate({ isFluid: false, noPadding: true })).toEqual(true);
        expect(computable[1].predicate({ isFluid: true, noPadding: false })).toEqual(true);
        expect(computable[1].predicate({ isFluid: true, noPadding: true })).toEqual(true);
        expect(computable[1].yield({ isFluid: true })).toEqual({
            paddingRight: 0,
            paddingLeft: 0
        });
    });
});
