import { hasher, generateClassName } from './class-name';
describe('utils.class-name', () => {
    describe('hasher', () => {
        const tests = [{
                description: 'empty object',
                obj: {},
                hash: '1ujm494'
            }, {
                description: 'root styles',
                obj: {
                    color: '#333',
                    fontSize: '1rem',
                    lineHeight: '1.5rem'
                },
                hash: '1ogv2uf'
            }, {
                description: 'nested styles',
                obj: {
                    '@media screen and (min-width: 768px)': {
                        fontSize: '1.5rem',
                        lineHeight: '2rem'
                    }
                },
                hash: '1apo2dc'
            }, {
                description: 'root and nested styles',
                obj: {
                    color: '#333',
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                    '@media screen and (min-width: 768px)': {
                        fontSize: '1.5rem',
                        lineHeight: '2rem'
                    }
                },
                hash: '18x3luo'
            }, {
                description: 'root and dynamic styles',
                obj: {
                    color: '#333',
                    'props.only(isActive)': {
                        backgroundColor: '#fc0'
                    }
                },
                hash: 'wf9ffz'
            }, {
                description: 'root and computed styles',
                obj: {
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                    'props.only(size)': (size) => ({
                        fontSize: `${size / 16}rem`,
                        lineHeight: `${(size / 16) * 1.5}rem`
                    })
                },
                hash: '1c3niym'
            }, {
                description: 'root and nested prop styles',
                obj: {
                    'props.only(hasBorder)': {
                        border: '4px dashed hotpink',
                        'props.only(borderColor)': (borderColor) => ({
                            borderColor
                        })
                    }
                },
                hash: '16d1kyf'
            }
        ];
        tests.forEach(({ description, obj, hash }) => {
            it(`should generate hash from ${description}`, () => {
                const result = hasher([obj]);
                expect(result).toContain(hash);
            });
        });
    });
    describe('generateClassName', () => {
        it('should return a class name from given id and data', () => {
            const test = generateClassName('s')({});
            const result = 's-1ujm494';
            expect(test).toEqual(result);
        });
    });
});
