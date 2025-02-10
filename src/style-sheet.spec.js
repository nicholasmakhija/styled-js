import { has, slowInsert, fastInsert, createSheet } from './style-sheet';
describe('style-sheet', () => {
    const tests = [{
            description: 'CSS with HTML tag selector',
            css: 'body { font-size: 16px;line-height: 24px; }'
        }, {
            description: 'CSS with comma separated selectors',
            css: 'body, html { margin: 0px; padding: 0px; width: 100%; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }'
        }, {
            description: 'CSS with class name selector',
            css: '.d-none { display: none !important; }'
        }, {
            description: 'CSS with pseudo selector',
            css: '.button:hover { background-color: pink; }'
        }, {
            description: 'media query CSS',
            css: '@media (min-width: 576px) { .d-sm-none { display: none !important; } }'
        }];
    describe('has', () => {
        const styleElement = document.createElement('style');
        const rule = 'body { font-size: 16px;line-height: 24px; }';
        it('should return false when style element does not have styles', () => {
            const test = has(rule, styleElement);
            expect(test).toBeFalsy();
        });
        it('should return true when style element has styles', () => {
            styleElement.textContent = rule;
            const test = has(rule, styleElement);
            expect(test).toBeTruthy();
        });
    });
    describe('slowInsert', () => {
        const styleElement = document.createElement('style');
        const slowInsertTests = [
            ...tests, {
                description: 'not valid CSS',
                css: 'foo'
            }
        ];
        slowInsertTests.forEach(({ css, description }) => {
            it(`should insert ${description} as text node in "slow mode"`, () => {
                slowInsert(styleElement)(css);
                expect(styleElement.textContent).toContain(css);
            });
        });
        it('should insert given CSS only once', () => {
            const styleElement = document.createElement('style');
            const rule = 'body { font-size: 16px;line-height: 24px; }';
            slowInsert(styleElement)(rule);
            slowInsert(styleElement)(rule);
            expect(styleElement.textContent).toEqual(rule);
        });
    });
    describe('fastInsert', () => {
        const styleElement = document.createElement('style');
        const sheet = new CSSStyleSheet();
        const { cssRules } = sheet;
        tests.forEach(({ css, description }, index) => {
            it(`should insert ${description} as CSS rule`, () => {
                fastInsert(styleElement, sheet)(css);
                expect(cssRules.length).toEqual(index + 1);
            });
        });
        it('should insert given CSS only once', () => {
            const styleElement = document.createElement('style');
            const rule = 'body { font-size: 16px;line-height: 24px; }';
            const sheet = new CSSStyleSheet();
            const { cssRules } = sheet;
            styleElement.innerText = rule;
            fastInsert(styleElement, sheet)(rule);
            expect(cssRules.length).toEqual(1);
        });
    });
    describe('createSheet', () => {
        it('should have methods "inject" and "css"', () => {
            const test = createSheet('test-sheet');
            expect(test).toHaveProperty('inject');
            expect(test).toHaveProperty('css');
        });
        it('should not "inject" give CSS more than once ', () => {
            const testTag = document.createElement('style');
            const testRules = [
                '*,:after,:before {box-sizing: border-box;}',
                'html {-webkit-text-size-adjust: 100%;text-size-adjust: 100%;}'
            ];
            const testSheet = createSheet('test-sheet', testTag);
            testSheet.inject('test-0', testRules);
            testSheet.inject('test-0', testRules);
            expect(testSheet.css()).toEqual(testRules.join(''));
        });
        it('should return all styles when "css" method is called', () => {
            const testSheet = createSheet('test-sheet');
            testSheet.inject('test-0', [
                '.s-903m6q{width:100%;padding-right:1rem;padding-left:1rem;margin-right:auto;margin-left:auto;}',
                '@media screen and (min-width:768px){.s-903m6q{max-width:45rem;}}',
                '@media screen and (min-width:992px){.s-903m6q{max-width:60rem;}}',
                '@media screen and (min-width:1200px){.s-903m6q{max-width:71.25rem;}}'
            ]);
            testSheet.inject('test-1', [
                '.s-903m6q.d-ovzu1t{padding-right:0;padding-left:0;}'
            ]);
            const test = testSheet.css();
            const result = '.s-903m6q{width:100%;padding-right:1rem;padding-left:1rem;margin-right:auto;margin-left:auto;}@media screen and (min-width:768px){.s-903m6q{max-width:45rem;}}@media screen and (min-width:992px){.s-903m6q{max-width:60rem;}}@media screen and (min-width:1200px){.s-903m6q{max-width:71.25rem;}}.s-903m6q.d-ovzu1t{padding-right:0;padding-left:0;}';
            expect(test).toEqual(result);
        });
        it('should use "slowInsert" when slow mode flag is true', () => {
            window.__STYLED_SLOW_MODE = true;
            const testTag = document.createElement('style');
            const testSheet = createSheet('test-sheet', testTag);
            const testRules = [
                '*,:after,:before {box-sizing: border-box;}'
            ];
            testSheet.inject('test-0', testRules);
            expect(testTag.textContent).toEqual(testRules.join(''));
        });
    });
});
