import { createElement } from './create-element';
describe('utils.createElement', () => {
    it('should have methods "appendTo", "withAttribute" and "unwrap"', () => {
        const test = createElement('span');
        expect(test).toHaveProperty('appendTo');
        expect(test).toHaveProperty('withAttribute');
        expect(test).toHaveProperty('unwrap');
    });
    it('should create element from give tag name', () => {
        const test = createElement('div').unwrap();
        const result = document.createElement('div');
        expect(test).toEqual(result);
    });
    it('should create element with given property', () => {
        const div = createElement('div')
            .withAttribute('class', 'foo')
            .unwrap();
        expect([...div.classList]).toContain('foo');
    });
});
