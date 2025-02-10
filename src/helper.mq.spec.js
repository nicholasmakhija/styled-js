import { createRange, mq } from './helper.mq';
import { capitalize } from './utils';
import { RANGE_FEATURES } from './constants';
describe('helper.mq', () => {
    describe('media type methods', () => {
        it('should have type methods "screen" and "print"', () => {
            const test = mq();
            expect(test).toHaveProperty('screen');
            expect(test).toHaveProperty('print');
        });
    });
    describe('range feature methods', () => {
        it('it should have min prefixed method', () => {
            const test = mq();
            RANGE_FEATURES.forEach((feature) => {
                const Feature = capitalize(feature);
                expect(test).toHaveProperty(`min${Feature}`);
                expect(test).toHaveProperty(`max${Feature}`);
                expect(test).toHaveProperty(feature);
            });
        });
        it('should construct a range feature media query', () => {
            const tests = [{
                    test: mq().minAspectRatio('8/5'),
                    result: '@media (min-aspect-ratio:8/5)'
                }, {
                    test: mq().maxColor(0),
                    result: '@media (max-color:0)'
                }, {
                    test: mq().maxHeight('40rem'),
                    result: '@media (max-height:40rem)'
                }, {
                    test: mq().minWidth('768px'),
                    result: '@media (min-width:768px)'
                }, {
                    test: mq().minMonochrome(),
                    result: '@media (min-monochrome)'
                }];
            tests.forEach(({ test, result }) => {
                expect(test.toString()).toEqual(result);
            });
        });
        it('should have a feature defined only once', () => {
            const test = mq().from(768).from(768).toString();
            expect(test).toEqual('@media (min-width:768px)');
        });
    });
    describe('range functions', () => {
        it('should have methods "to" and "from"', () => {
            const test = mq();
            expect(test).toHaveProperty('to');
            expect(test).toHaveProperty('from');
        });
        it('should construct width range feature(s) with value in pixels', () => {
            const tests = [{
                    test: mq().from(768),
                    result: '@media (min-width:768px)'
                }, {
                    test: mq().to(991),
                    result: '@media (max-width:991px)'
                }, {
                    test: mq().from(992).to(1199),
                    result: '@media (min-width:992px) and (max-width:1199px)'
                }];
            tests.forEach(({ test, result }) => {
                expect(test.toString()).toEqual(result);
            });
        });
    });
    describe('feature (escape hatch) method', () => {
        it('should have escape hatch method "feature"', () => {
            const test = mq();
            expect(test).toHaveProperty('feature');
        });
        it('should construct a feature with the given name', () => {
            const test = mq().feature('something-cool');
            const result = '@media (something-cool)';
            expect(`${test}`).toEqual(result);
        });
        it('should construct a feature with the given name and value', () => {
            const test = mq().feature('secret-agent', 99);
            const result = '@media (secret-agent:99)';
            expect(`${test}`).toEqual(result);
        });
        it('should construct multiple features with method chaining', () => {
            const test = mq().feature('spider-man').feature('secret-agent', '007');
            const result = '@media (spider-man) and (secret-agent:007)';
            expect(`${test}`).toEqual(result);
        });
    });
    describe('toString method', () => {
        it('should return a constructed media query string', () => {
            const tests = [{
                    test: mq().print(),
                    result: '@media print'
                }, {
                    test: mq().screen().print(),
                    result: '@media screen, print'
                }, {
                    test: mq().screen().from(768),
                    result: '@media screen and (min-width:768px)'
                }, {
                    test: mq().screen().from(768).to(991),
                    result: '@media screen and (min-width:768px) and (max-width:991px)'
                }];
            tests.forEach(({ test, result }) => {
                expect(test.toString()).toEqual(result);
            });
        });
    });
});
describe('mq utils', () => {
    describe('createRange', () => {
        it('should create range from the given prefixes and list', () => {
            const list = ['color', 'height', 'width'];
            const test = createRange('minimum', 'maximum')(list);
            const result = [
                'minimumColor',
                'maximumColor',
                'color',
                'minimumHeight',
                'maximumHeight',
                'height',
                'minimumWidth',
                'maximumWidth',
                'width'
            ];
            expect(test).toEqual(result);
        });
        it('should return empty array when given list is empty', () => {
            const list = [];
            const test = createRange('minimum', 'maximum')(list);
            const result = [];
            expect(test).toEqual(result);
        });
        it('should return list without ranges when no prefixes are supplied', () => {
            const list = ['color', 'height', 'width'];
            const test = createRange()(list);
            const result = ['color', 'height', 'width'];
            expect(test).toEqual(result);
        });
    });
});
