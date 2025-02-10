# API

## Style Helper

Styled also exposes a helper for writing pseudo, attribute and prop selectors.

```typescript
import styled, { style } from '@n3e/styled';

const SomeElement = styled.button({
  [style.disabled]: {
    // disabled ui styles
  }
});
```

### Pseudo Elements

| Name               | Type     | Arg type |
| ------------------ | -------- | -------- |
| after              | string   | n/a      |
| backdrop           | string   | n/a      |
| before             | string   | n/a      |
| cue                | string   | n/a      |
| cueRegion          | string   | n/a      |
| firstLetter        | string   | n/a      |
| firstLine          | string   | n/a      |
| fileSelectorButton | string   | n/a      |
| marker             | string   | n/a      |
| placeholder        | string   | n/a      |
| selection          | string   | n/a      |
| part               | function | string   |
| slotted            | function | string   |

### Pseudo Classes

| Name             | Type     | Arg type      |
| ---------------- | -------- | ------------- |
| active           | string   | n/a           |
| anyLink          | string   | n/a           |
| autofill         | string   | n/a           |
| checked          | string   | n/a           |
| default          | string   | n/a           |
| defined          | string   | n/a           |
| disabled         | string   | n/a           |
| empty            | string   | n/a           |
| enabled          | string   | n/a           |
| first            | string   | n/a           |
| firstChild       | string   | n/a           |
| firstOfType      | string   | n/a           |
| fullscreen       | string   | n/a           |
| focus            | string   | n/a           |
| focusVisible     | string   | n/a           |
| focusWithin      | string   | n/a           |
| hover            | string   | n/a           |
| indeterminate    | string   | n/a           |
| inRange          | string   | n/a           |
| invalid          | string   | n/a           |
| lastChild        | string   | n/a           |
| lastOfType       | string   | n/a           |
| left             | string   | n/a           |
| link             | string   | n/a           |
| modal            | string   | n/a           |
| onlyChild        | string   | n/a           |
| onlyOfType       | string   | n/a           |
| optional         | string   | n/a           |
| outOfRange       | string   | n/a           |
| pictureInPicture | string   | n/a           |
| placeholderShown | string   | n/a           |
| paused           | string   | n/a           |
| playing          | string   | n/a           |
| readOnly         | string   | n/a           |
| readWrite        | string   | n/a           |
| required         | string   | n/a           |
| right            | string   | n/a           |
| root             | string   | n/a           |
| scope            | string   | n/a           |
| target           | string   | n/a           |
| valid            | string   | n/a           |
| visited          | string   | n/a           |
| host             | function | string        |
| lang             | function | string        |
| is               | function | string[]      |
| not              | function | string[]      |
| where            | function | string[]      |
| nthChild         | function | number/string |
| nthLastChild     | function | number/string |
| nthLastOfType    | function | number/string |
| nthOfType        | function | number/string |

### Attribute Selector 

| Method             | Arg type | CSS syntax    |
| ------------------ | -------- | ------------- |
| equals             | string[] | [attr=value]  |
| contains           | string[] | [attr~=value] |
| containsAny        | string[] | [attr*=value] |
| startsWith         | string[] | [attr^=value] |
| endsWith           | string[] | [attr$=value] |

### Combinators

`style.or` for creating nested selector lists (comma separated)

```typescript
style.or(style.before, style.after)
// ::before, ::after
```

`style.and` for combining nested selectors

```typescript
style.and(style.hover, style.focus)
// :hover:focus
```

## Media Query builder

Writing media queries can be made easy with the help of the `mq` helper that provides a nice DSL. Simply chain the exposed methods to build the desired media query string.

```tsx
import styled, { mq } from '@n3e/styled';

const Container = styled.div({
  // @media screen and (min-width: 768px) and (max-width: 991px) { ... }
  [mq().screen().from(768).to(991)]: { 
    maxWidth: '45rem'
  }
});
```

### Media Types

The mq helper exposes 2 media type methods

* `screen` which outputs `@media screen`
* `print` which outputs `@media print` 

### Defined media query features

These methods accept a `string` argument which is of a pre-defined set

| Method               | Allowed args                                              |
| -------------------- | --------------------------------------------------------- |
| anyPointer           | 'fine' or 'coarse' or 'none'                              |
| colorGamut           | 'srgb' or 'p3' or 'rec2020'                               |
| displayMode          | 'fullscreen' or 'standalone' or 'minimal-ui' or 'browser' |
| orientation          | 'landscape' or 'portrait'                                 |
| overflowBlock        | 'none' or 'scroll' or 'optional-paged' or 'paged'         |
| pointer              | 'fine' or 'coarse' or 'none'                              |
| prefersColorScheme   | 'light' or 'dark'                                         |
| prefersContrast      | 'no-preference' or 'more' or 'less'                       |
| scripting            | 'none' or 'initial-only' or 'enabled'                     |
| update               | 'none' or 'slow' or 'fast'                                |
| anyHover             | 'none' or 'hover'                                         |
| hover                | 'none' or 'hover'                                         |
| forcedColors         | 'none' or 'active'                                        |
| grid                 | '0' or '1'                                                |
| invertedColors       | 'none' or 'inverted'                                      |
| overflowInline       | 'none' or 'scroll'                                        |
| prefersReducedMotion | 'no-preference' or 'reduce'                               |

### Range media query features

As the CSS specification defines, these are features that are prefixed with `min` and `max`.

| Method      | Arg type          |
| ----------- | ----------------- |
| height      | string            |
| width       | string            |
| aspectRatio | string            |
| color       | number (optional) |
| colorIndex  | number (optional) |
| monochrome  | number (optional) |
| resolution  | string            |

All the methods in the above table also have min and max versions. eg: `width(arg: string)` me can be used as `minWidth(arg: string)` as well as `maxWith(arg: string)`.

To help with `min-width` and `max-width` just use `from` and `to` accordingly. **NOTE:** `px` unit applied to number supplied to `to` or `from`.

### Escape hatch

There is also an escape hatch to use media features not supplied by `mq` helper or an unofficial or experimental one.

The `feature` method takes 2 arguments, the feature name `string` and the feature value `number` or `string`.

```tsx
mq().feature('awesome-new-feature', '100ghz')
```

## Global styles

To set default styles for body, headings etc. just use `withCSS` method which accepts normal CSS as its arguments.

```typescript
const boxSizing = `
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
`;

const htmlAndBody = `
  body,
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`;

const AppWrapper = styled.div().withCSS(
  boxSizing,
  htmlAndBody
);
```

CSS variables can also be defined using this method

```typescript
const AppWrapper = styled.div().withCSS(
`:root {
  --background-primary: #fff;
  --color-primary: #262223;
}`,

`@media (prefers-color-scheme: dark) {
  :root {
    --background-primary: #121212;
    --color-primary: #fff;
  } 
}`);
```

Keyframe animations can be declared and used like so

```typescript
const shimmer = 'shimmer';

const SomeElement = styled.div({
  animation: `${shimmer} 1.5s ease-in-out infinite`
}).withCSS(
`@keyframes ${shimmer} {
  0% { opacity: 0.5; }
  50% { opacity: 0.8; }
  100% { opacity: 0.5; }
}`)
```

Font face rules

```typescript
const AppWrapper = styled.div().withCSS(
`@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Hw5aXp-p7K4KLg.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}`);
```

## Supported CSS

The following at-rules are supported:

* container
* counter-style
* font-face
* keyframes
* media
* property
* starting-style
* supports
