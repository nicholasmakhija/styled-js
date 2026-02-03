import { Component } from 'solid-js';
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

type EnhancedType<T, P> = T extends GenericComponent ? GenericComponent<P> : StyledComponent<P>;
interface EnhancedProps<T, P> {
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
}
type AnyRecord = Record<string, any>;
type StyledComponent<P = UnknownProp> = Component<P & AnyRecord> & EnhancedProps<StyledComponent, P>;
interface FactoryHOC<P> {
    <K>(C: Component<K & AnyRecord>): StyledComponent<P & K>;
}
type GenericComponent<P = UnknownProp> = FactoryHOC<P> & EnhancedProps<GenericComponent, P>;
type ExtendableItem = CSSProperties | GenericComponent | StyledComponent;

/**
 * API for creating React styled component(s)
 */
declare const styled: {
    generic: <P = UnknownProp>(arg?: CSSProperties) => GenericComponent<P>;
    object: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    a: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    abbr: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    address: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    area: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    article: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    aside: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    audio: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    b: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    base: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    bdi: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    bdo: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    blockquote: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    body: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    br: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    button: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    canvas: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    caption: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    cite: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    code: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    col: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    colgroup: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    data: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    datalist: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    dd: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    del: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    details: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    dfn: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    dialog: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    div: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    dl: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    dt: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    em: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    embed: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    fieldset: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    figcaption: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    figure: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    footer: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    form: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    h1: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    h2: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    h3: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    h4: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    h5: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    h6: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    head: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    header: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    hgroup: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    hr: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    html: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    i: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    iframe: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    img: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    input: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    ins: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    kbd: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    label: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    legend: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    li: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    link: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    main: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    map: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    mark: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    math: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    menu: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    meta: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    meter: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    nav: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    noscript: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    ol: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    optgroup: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    option: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    output: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    p: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    picture: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    portal: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    pre: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    progress: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    q: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    rp: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    rt: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    ruby: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    s: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    samp: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    script: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    section: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    select: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    small: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    source: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    span: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    strong: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    style: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    sub: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    summary: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    sup: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    svg: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    table: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    tbody: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    td: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    textarea: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    tfoot: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    th: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    thead: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    time: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    title: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    tr: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    track: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    u: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    ul: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    var: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    video: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
    wbr: <P = UnknownProp>(arg?: CSSProperties) => StyledComponent<P>;
};

declare const mq: (...mediaTypes: MediaTypes[]) => MediaQueryAPI;

declare const style: StyleHelper;

declare const getStyles: () => string;

export { CSSProperties, StyledComponent, styled as default, getStyles, mq, style };
