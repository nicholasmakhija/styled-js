import PropTypes from 'prop-types';
import { style } from '../../helper.style';
import { accumulateData, hasCurrent, isValidRef, styled } from './styled';
describe('styled.helpers', () => {
    describe('accumulateData', () => {
        const sizeKey = 'props.only(size)';
        const isTintedKey = 'props.only(isTinted)';
        const Div = styled.div({
            backgroundColor: '#fbbac9',
            color: '#fff',
            padding: '10px'
        });
        const randomStyles = {
            backgroundColor: 'transparent',
            margin: '0 0 1.5rem'
        };
        const Section = styled.section({
            [style.prop('isTinted')]: {
                backgroundColor: '#f1f2f3'
            },
            [style.prop('size')]: (size) => ({
                paddingTop: `${size / 16}rem`,
                paddingBottom: `${size / 16}rem`
            })
        }).withProps({
            isTinted: PropTypes.bool,
            size: PropTypes.number
        });
        const GenericWithSize = styled.generic({
            [style.prop('size')]: (size) => ({
                fontSize: `${size / 16}rem`,
                lineHeight: `${(size / 16) * 1.5}rem`
            })
        }).withProps({
            size: PropTypes.number
        });
        const list = [
            Div,
            randomStyles,
            Section,
            GenericWithSize
        ];
        const [mergedStyles, mergedPropTypes] = accumulateData(list, [{}, {}]);
        const result = [{
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '10px',
                margin: '0 0 1.5rem',
                [isTintedKey]: {
                    backgroundColor: '#f1f2f3'
                },
                [sizeKey]: (size) => ({
                    fontSize: `${size / 16}rem`,
                    lineHeight: `${(size / 16) * 1.5}rem`
                })
            },
            {
                isTinted: PropTypes.bool,
                size: PropTypes.number
            }];
        it('should accumulate given "styles"', () => {
            const testKeys = Object.keys(mergedStyles);
            const resultKeys = Object.keys(result[0]);
            expect(testKeys).toEqual(resultKeys);
        });
        it('should accumulate all static styles', () => {
            expect(mergedStyles.backgroundColor).toEqual('transparent');
            expect(mergedStyles.color).toEqual('#fff');
            expect(mergedStyles.padding).toEqual('10px');
            expect(mergedStyles.margin).toEqual('0 0 1.5rem');
        });
        it('should accumulate prop based styles', () => {
            expect(mergedStyles[isTintedKey]).toEqual({
                backgroundColor: '#f1f2f3'
            });
            const sizeFunction = mergedStyles[sizeKey];
            expect(sizeFunction(32)).toEqual({
                fontSize: '2rem',
                lineHeight: '3rem'
            });
        });
        it('should accumulate given "propTypes"', () => {
            const testKeys = Object.keys(mergedPropTypes);
            const resultKeys = Object.keys(result[1]);
            expect(testKeys).toEqual(resultKeys);
        });
    });
    describe('hasCurrent', () => {
        it('should be truthy when given "ref" has "current" property', () => {
            expect(hasCurrent({ current: true })).toBeTruthy();
            expect(hasCurrent({ current: undefined })).toBeTruthy();
            expect(hasCurrent({ current: [] })).toBeTruthy();
            expect(hasCurrent({ current: {} })).toBeTruthy();
        });
        it('should be falsy when given "ref" does not have "current" property', () => {
            expect(hasCurrent({})).toBeFalsy();
            expect(hasCurrent(null)).toBeFalsy();
            expect(hasCurrent(undefined)).toBeFalsy();
        });
    });
    describe('isValidRef', () => {
        it('should be truthy if the given "ref" is valid', () => {
            expect(isValidRef({ current: true })).toBeTruthy();
            expect(isValidRef({ current: undefined })).toBeTruthy();
            expect(isValidRef((node) => typeof node === 'object')).toBeTruthy();
        });
        it('should be falsy if the given "ref" is invalid', () => {
            expect(isValidRef({})).toBeFalsy();
            expect(isValidRef(null)).toBeFalsy();
            expect(isValidRef(undefined)).toBeFalsy();
        });
    });
});
