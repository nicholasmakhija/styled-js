/// <reference types="react" />
import * as PropTypes from 'prop-types';
import * as CSS from 'csstype';

declare const PSEUDO_ELEMENTS: readonly ["after", "backdrop", "before", "cue", "cueRegion", "firstLetter", "firstLine", "fileSelectorButton", "marker", "placeholder", "selection"];
declare const PSEUDO_ELEMENT_FUNCTIONS: readonly ["part", "slotted"];
declare const PSEUDO_CLASSES: readonly ["active", "anyLink", "autofill", "checked", "default", "defined", "disabled", "empty", "enabled", "first", "firstChild", "firstOfType", "fullscreen", "focus", "focusVisible", "focusWithin", "hover", "indeterminate", "inRange", "invalid", "lastChild", "lastOfType", "left", "link", "modal", "onlyChild", "onlyOfType", "optional", "outOfRange", "pictureInPicture", "placeholderShown", "paused", "playing", "readOnly", "readWrite", "required", "right", "root", "scope", "target", "valid", "visited"];
declare const PCF_STRING: readonly ["host", "lang"];
declare const PCF_STRING_ARRAY: readonly ["is", "not", "where"];
declare const PCF_NUMBER_OR_STRING: readonly ["nthChild", "nthLastChild", "nthLastOfType", "nthOfType"];

type CSSAttributes = object & CSS.Properties & CSS.PropertiesHyphen;
interface PropsFunction {
    (arg: unknown): false | undefined | CSSProperties;
}
interface CSSNestedAttributes {
    [key: string]: CSSAttributes | PropsFunction | CSSNestedAttributes;
}
type CSSProperties = CSSAttributes | CSSNestedAttributes;
type UnknownProp = {
    [key: string]: unknown;
};

type MediaTypes = 'print' | 'screen';
type TypeMethods = {
    [key in MediaTypes]: () => MediaQueryAPI;
};
interface DefinedFeatures {
    anyPointer(arg: 'fine' | 'coarse' | 'none'): MediaQueryAPI;
    colorGamut(arg: 'srgb' | 'p3' | 'rec2020'): MediaQueryAPI;
    displayMode(arg: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser'): MediaQueryAPI;
    orientation(arg: 'landscape' | 'portrait'): MediaQueryAPI;
    overflowBlock(arg: 'none' | 'scroll' | 'optional-paged' | 'paged'): MediaQueryAPI;
    pointer(arg: 'fine' | 'coarse' | 'none'): MediaQueryAPI;
    prefersColorScheme(arg: 'light' | 'dark'): MediaQueryAPI;
    prefersContrast(arg: 'no-preference' | 'more' | 'less'): MediaQueryAPI;
    scripting(arg: 'none' | 'initial-only' | 'enabled'): MediaQueryAPI;
    update(arg: 'none' | 'slow' | 'fast'): MediaQueryAPI;
}
interface RangeFeatures {
    height(arg: string): MediaQueryAPI;
    minHeight(arg: string): MediaQueryAPI;
    maxHeight(arg: string): MediaQueryAPI;
    width(arg: string): MediaQueryAPI;
    minWidth(arg: string): MediaQueryAPI;
    maxWidth(arg: string): MediaQueryAPI;
    /**
     * Test aspect ratio of the viewport by supplying
     * a `ratio` CSS data type.
     *
     * @example
     * mq().aspectRatio('1/1')
     */
    aspectRatio(arg: string): MediaQueryAPI;
    /**
     * Test minimum aspect ratio of the viewport by supplying
     * a `ratio` CSS data type.
     *
     * @example
     * mq().minAspectRatio('8/5')
     */
    minAspectRatio(arg: string): MediaQueryAPI;
    /**
     * Test maximum aspect ratio of the viewport by supplying
     * a `ratio` CSS data type.
     *
     * @example
     * mq().maxAspectRatio('3/2')
     */
    maxAspectRatio(arg: string): MediaQueryAPI;
    /**
     * Test the bits per color component (red, green, blue) of
     * the output device by supplying an `integer` CSS data type.
     *
     * Leave empty to test any device.
     *
     * @example
     * mq().color()
     */
    color(arg?: number): MediaQueryAPI;
    /**
     * Test the minimum bits per color component (red, green, blue) of
     * the output device by supplying an `integer` CSS data type.
     *
     * Leave empty to test any device.
     *
     * @example
     * mq().minColor(8)
     */
    minColor(arg?: number): MediaQueryAPI;
    /**
     * Test the maximum bits per color component (red, green, blue) of
     * the output device by supplying an `integer` CSS data type.
     *
     * Leave empty to test any device.
     *
     * @example
     * mq().maxColor(8)
     */
    maxColor(arg?: number): MediaQueryAPI;
    /**
     * Test the number of entries in the output device's color lookup
     * table by supplying an `integer` CSS data type.
     *
     * Leave empty to test any device.
     *
     * @example
     * mq().colorIndex()
     */
    colorIndex(arg?: number): MediaQueryAPI;
    /**
     * Test the minimum number of entries in the output device's
     * color lookup table by supplying an `integer` CSS data type.
     *
     * Leave empty to test any device.
     *
     * @example
     * mq().minColorIndex(1500)
     */
    minColorIndex(arg?: number): MediaQueryAPI;
    /**
     * Test the maximum number of entries in the output device's
     * color lookup table by supplying an `integer` CSS data type.
     *
     * Leave empty to test any device.
     *
     * @example
     * mq().maxColorIndex(1500)
     */
    maxColorIndex(arg?: number): MediaQueryAPI;
    /**
     * Test the number of bits per pixel in the monochrome frame
     * buffer of the output device  by supplying an `integer`
     * CSS data type.
     *
     * Leave empty to test non-monochrome device.
     *
     * @example
     * mq().monochrome()
     * @example
     * mq().monochrome(0)
     */
    monochrome(arg?: number): MediaQueryAPI;
    /**
     * Test the minimum number of bits per pixel in the monochrome
     * frame buffer of the output device  by supplying an `integer`
     * CSS data type.
     *
     * Leave empty to test non-monochrome device.
     *
     * @example
     * mq().minMonochrome()
     * @example
     * mq().minMonochrome(0)
     */
    minMonochrome(arg?: number): MediaQueryAPI;
    /**
     * Test the maximum number of bits per pixel in the monochrome
     * frame buffer of the output device  by supplying an `integer`
     * CSS data type.
     *
     * Leave empty to test non-monochrome device.
     *
     * @example
     * mq().maxMonochrome()
     * @example
     * mq().maxMonochrome(0)
     */
    maxMonochrome(arg?: number): MediaQueryAPI;
    /**
     * Test the pixel density of the output device by supplying
     * a `resolution` CSS data type.
     *
     * @example
     * mq().resolution('150dpi')
     */
    resolution(arg: string): MediaQueryAPI;
    /**
     * Test the minimum pixel density of the output device by
     * supplying a `resolution` CSS data type.
     *
     * @example
     * mq().minResolution('72dpi')
     */
    minResolution(arg: string): MediaQueryAPI;
    /**
     * Test the maximum pixel density of the output device by
     * supplying a `resolution` CSS data type.
     *
     * @example
     * mq().maxResolution('300dpi')
     */
    maxResolution(arg: string): MediaQueryAPI;
}
interface ToggleFeatures {
    anyHover(arg: 'none' | 'hover'): MediaQueryAPI;
    hover(arg: 'none' | 'hover'): MediaQueryAPI;
    forcedColors(arg: 'none' | 'active'): MediaQueryAPI;
    grid(arg: '0' | '1'): MediaQueryAPI;
    invertedColors(arg: 'none' | 'inverted'): MediaQueryAPI;
    overflowInline(arg: 'none' | 'scroll'): MediaQueryAPI;
    prefersReducedMotion(arg: 'no-preference' | 'reduce'): MediaQueryAPI;
}
type FeatureMethods = Prettify<DefinedFeatures & RangeFeatures & ToggleFeatures>;
interface MediaQueryAPI extends TypeMethods, FeatureMethods {
    /**
     * Creates range feature to query the `min-width`
     * of the viewport against the given value in `pixels`.
     *
     * @example
     * mq().from(768) // '@media (min-width: 768px)'
     */
    from(arg: number): MediaQueryAPI;
    /**
     * Creates range feature to query the `max-width`
     * of the viewport against the given value in `pixels`.
     *
     * @example
     * mq().to(991) // '@media (max-width: 991px)'
     */
    to(arg: number): MediaQueryAPI;
    feature(name: string, value?: number | string): MediaQueryAPI;
    toString(): string;
}

type PseudoClass = CreateType<typeof PSEUDO_CLASSES[number], string>;
type PseudoClassFunctionString = CreateType<typeof PCF_STRING[number], (arg: string) => string>;
type PseudoClassFunctionStringArray = CreateType<typeof PCF_STRING_ARRAY[number], (...args: string[]) => string>;
type PseudoClassFunctionNumberOrString = CreateType<typeof PCF_NUMBER_OR_STRING[number], (arg: number | string) => string>;
type PseudoClasses = Prettify<PseudoClass & PseudoClassFunctionString & PseudoClassFunctionStringArray & PseudoClassFunctionNumberOrString>;
type PseudoElement = CreateType<typeof PSEUDO_ELEMENTS[number], string>;
type PseudoElementFunction = CreateType<typeof PSEUDO_ELEMENT_FUNCTIONS[number], (arg: string) => string>;
type PseudoElements = Prettify<PseudoElement & PseudoElementFunction>;
type ComponentSelector = string | {
    toString(): string;
};
interface Combinators {
    or(...data: string[]): string;
    and(...data: string[]): string;
}
interface StyleHelper extends Combinators, PseudoClasses, PseudoElements {
    attribute(name: string): AttributeAPI;
    data(attribute: string): AttributeAPI;
    /**
     * Helper to create descendent selector(s) accepts both
     * complex CSS selector(s) OR StyledComponent(s)
     */
    selector<T extends ComponentSelector>(...data: T[]): string;
    /**
     * Prop base styles where key is the prop name and
     * value can be Object Styles OR a function that
     * accepts an argument and renders styles based on
     * the given value
     *
     * @example
     * [style.prop('isActive')]: {
     *    ...rules
     * }
     * @example
     * [style.prop('alignment')]: (alignment) => ({
     *    textAlign: alignment
     * })
     */
    prop<P>(name: Extract<keyof P, string>): string;
    props: {
        /**
         * Prop matcher function to test `all` given prop names
         * exist AND its value is not false.
         *
         * Value can be Object Styles OR a function that accepts
         * props object as its only argument.
         *
         * @example
         * [style.props.all(
         *    'isChecked',
         *    'border'
         * )]: {
         *    ...rules
         * }
         * @example
         * [style.props.all(
         *    'isChecked',
         *    'borderColor'
         * )]: ({ borderColor }) => ({
         *    border: `4px dashed ${borderColor}`
         * })
         */
        all<P>(...names: Extract<keyof P, string>[]): string;
        /**
         * Prop matcher function to test `any` given prop names
         * exist AND its value is not false.
         *
         * Value can be Object Styles OR a function that accepts
         * props object as its only argument.
         *
         * @example
         * [style.props.any(
         *    'isChecked',
         *    'border'
         * )]: {
         *    ...rules
         * }
         * @example
         * [style.props.any(
         *    'isChecked',
         *    'borderColor'
         * )]: ({ borderColor = 'pink' }) => ({
         *    border: `4px dashed ${borderColor}`
         * })
         */
        any<P>(...names: Extract<keyof P, string>[]): string;
        /**
         * Prop matcher function to test that the given props do not exist.
         *
         * @example
         * [style.props.not(
         *    'config',
         *    'hasGutters'
         * )]: {
         *    ...rules
         * }
         */
        not<P>(...names: Extract<keyof P, string>[]): string;
    };
}
interface AttributeAPI {
    equals(...items: string[]): string;
    /** Attribute selector for matching whole word */
    contains(...items: string[]): string;
    /** Attribute selector for matching substring */
    containsAny(...items: string[]): string;
    startsWith(...items: string[]): string;
    endsWith(...items: string[]): string;
    toString(): string;
}

type CreateType<T extends PropertyKey, V> = {
    [K in keyof PropertyKey as T]: V;
};
type Prettify<T> = {
    [K in keyof T]: T[K];
} & unknown;

type ReactPropTypes<T> = {
    [K in keyof T]?: PropTypes.Validator<T[K] | null | undefined>;
};
interface FunctionalComponent<P = SomeProps> {
    (props: P, ref?: React.ForwardedRef<unknown>): React.ReactElement<P>;
    displayName?: string;
}
type SomeProps = UnknownProp & {
    children?: React.ReactNode;
    className?: string;
};
type EnhancedType<T, P> = T extends GenericComponent ? GenericComponent<P> : StyledComponent<P>;
interface EnhancedProps<T, P> {
    propTypes: ReactPropTypes<P>;
    styles: CSSProperties;
    toString(): string;
    /**
     * Harness the styles and propTypes from other
     * components simply by "extending" them.
     *
     * You can even pass plain object literal(s) as
     * arguments on top of styled components including
     * `generic`(s).
     */
    extend<K>(...items: ExtendableItem[]): EnhancedType<T, P & K>;
    /**
     * Provides a mechanism to passing string based CSS
     * styles.
     *
     * This is mainly used for global styles, At-rules
     * such as `@keyframe`, `@font-face`, `@counter-style`
     * etc.
     */
    withCSS(...styles: string[]): EnhancedType<T, P>;
    /**
     * Built-in typechecking support for props.
     *
     * This is the same as applying `propTypes` attribute
     * on components.
     */
    withProps(props: ReactPropTypes<P>): EnhancedType<T, P>;
    /**
     * Out of the box support for `ref` forwarding.
     *
     * This invokes React's `forwardRef` functionality
     * automatically.
     */
    withRef(): EnhancedType<T, P>;
}
type StyledComponent<P = UnknownProp> = FunctionalComponent<P> & EnhancedProps<StyledComponent, P>;
interface FactoryHOC<P> {
    <K>(C: FunctionalComponent<K>): StyledComponent<P & K>;
}
type GenericComponent<P = UnknownProp> = FactoryHOC<P> & EnhancedProps<GenericComponent, P>;
type ExtendableItem = CSSProperties | GenericComponent | StyledComponent;

/**
 * API for creating React styled component(s)
 */
declare const styled: {
    generic: <P = UnknownProp>(arg?: CSSProperties | undefined) => GenericComponent<P>;
    object: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    a: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    abbr: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    address: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    area: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    article: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    aside: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    audio: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    b: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    base: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    bdi: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    bdo: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    blockquote: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    body: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    br: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    button: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    canvas: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    caption: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    cite: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    code: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    col: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    colgroup: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    data: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    datalist: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    dd: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    del: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    details: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    dfn: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    dialog: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    div: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    dl: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    dt: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    em: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    embed: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    fieldset: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    figcaption: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    figure: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    footer: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    form: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    h1: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    h2: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    h3: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    h4: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    h5: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    h6: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    head: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    header: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    hgroup: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    hr: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    html: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    i: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    iframe: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    img: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    input: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    ins: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    kbd: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    label: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    legend: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    li: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    link: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    main: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    map: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    mark: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    math: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    menu: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    meta: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    meter: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    nav: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    noscript: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    ol: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    optgroup: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    option: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    output: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    p: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    picture: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    portal: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    pre: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    progress: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    q: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    rp: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    rt: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    ruby: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    s: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    samp: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    script: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    section: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    select: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    small: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    source: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    span: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    strong: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    style: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    sub: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    summary: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    sup: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    svg: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    table: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    tbody: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    td: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    textarea: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    tfoot: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    th: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    thead: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    time: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    title: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    tr: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    track: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    u: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    ul: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    var: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    video: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
    wbr: <P_1 = UnknownProp>(arg?: CSSProperties | undefined) => StyledComponent<P_1>;
};

declare const mq: (...mediaTypes: MediaTypes[]) => MediaQueryAPI;

declare const style: StyleHelper;

declare const getStyles: () => string;

declare const ServerStyles: () => JSX.Element;

export { CSSProperties, ServerStyles, StyledComponent, styled as default, getStyles, mq, style };
