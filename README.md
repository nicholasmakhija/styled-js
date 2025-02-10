# styled

A high performance and easy to use CSS-in-JS library with support for server-side rendering. Built similar to other popular libraries, with a familiar API, providing a great overall developer experience.

Styles are defined using Object Literal syntax, meaning instead of writing properties in `kebab-case` like regular CSS, they are in `camelCase` eg: `max-width` would be `maxWidth`. Don't worry, Styled provides autocompletion and type checking for CSS properties and values thanks to [CSSType](https://github.com/frenic/csstype#readme).

There is also a way to define global styles using CSS, more on that later.

## Installation


```shell
# npm
npm install @n3e/styled

# yarn
yarn add @n3e/styled

#pnpm
pnpm add @n3e/styled

#bun
bun add @n3e/styled
```

## Getting started

Let's start by building a simple button.

```tsx
import styled from '@n3e/styled';

const buttonAccent = 'hotpink';

const Button = styled.button({
  appearance: 'none',
  backgroundColor: buttonAccent,
  border: `2px solid ${buttonAccent}`,
  borderRadius: '4px',
  fontSize: '0.875rem',
  lineHeight: '1.5rem',
  margin: 0,
  padding: '0 6px',
  transition: '0.2s linear'
});

const Composition = () => (
  <Button>
    I'm a button
  </Button>
);
```

## Pseudo

Styled comes with a [helper](docs/api.md#style-helper) for writing pseudo styles, below is an example of how to use `pseudo-classes`.

```tsx
const Button = styled.button({
  // button base styles

  [style.hover]: {
    backgroundColor: 'rgba(255, 105, 180, 0.7)'
  },

  // pseudo class function
  [style.not(style.disabled)]: {
    backgroundColor: 'purple',
    borderColor: 'purple',
    color: 'white'
  },

  // you can write it yourself, if preferred
  ':hover': {
    backgroundColor: 'rgba(255, 105, 180, 0.7)'
  },

  ':not(:disabled)': {
    backgroundColor: 'purple',
    borderColor: 'purple',
    color: 'white'
  }
});

const Composition = () => (
  <Button>
    I'm a button
  </Button>
);
```

Similarly `pseudo-element` styles are defined as shown below.

```tsx
const PrefixedUsingBefore = styled.div({
  [style.before]: {
    content: '$'
  },

  // the same can be done manually
  '::before': {
    content: '$'
  }
});

const Composition = () => (
  <PrefixedUsingBefore>dollar bucks</PrefixedUsingBefore>
);
```

## Combinator

### Descendant combinator

```tsx
const Paragraph = styled.p({
  margin: 0,
  padding: 0
});

const RichText = styled.div({
  [style.selector('p')]: {
    margin: '0 0 24px'
  },

  // target a Styled Component
  [style.selector(Paragraph)]: {
    margin: '0 0 24px'
  }
});

const Composition = () => (
  <RichText>
    <p>Para one text<p>
    <Paragraph>Para two text<Paragraph>
  </RichText>
);
```

### Child combinator (>)


```tsx
const Image = styled.img({
  display: 'block',
  maxWith: '100%'
});

const Paragraph = styled.p({
  // paragraph styles
});

const RichText = styled.div({
  [style.selector('> img')]: {
    border: '2px solid yellow'
  },

  // target a Styled Component
  [style.selector(`> ${Image}`)]: {
    border: '2px solid yellow'
  }
});

const Composition = () => (
  <RichText>
    <Image src='path/to/image' />
    <Paragraph>Para one text<Paragraph>
    <Paragraph>Para two text<Paragraph>
  </RichText>
);
```

### Sibling combinators (~ or +)

```tsx
const Label = styled.label({
  display: 'inline-block',
  cursor: 'pointer',
  verticalAlign: 'top',
});

const Checkbox = styled.input({
  [style.checked]: {
    [style.selector('+ label')]: {
      fontWeight: 'bold'
    }

    // target a Styled Component
    [style.selector(`+ ${Label}`)]: {
      fontWeight: 'bold'
    }
  }
});


const Composition = () => (
  <>
    <Checkbox type='checkbox' {...otherProps} />
    <Label>Checkbox label</Label>
  <> 
);
```

## Attribute selectors

You can event create selectors based on attributes and yes, Styled does comes with a [helper](docs/api.md#attribute-selector) for creating these.

```tsx
const Link = styled.a({
  // link base styles

  [style.attribute('href').startsWith('http', 'https')]: {
    // some attribute based styles
  }

  // you need to use Styled's combinator helper `or` to create
  // nested selector lists (ie: comma separated selector)
  [style.or(
    '[href^="http"]',
    '[href^="https"]'
  )]: {
    // some attribute based styles
  },

  // or have to duplicate style definitions
  '[href^="http"]': { /* some attribute based styles */ },
  '[href^="https"]': { /* some attribute based styles */ }
});

const Composition = () => (
  <Link href='#'>
    I'm a Link
  </Link>
);
```

## At-rules

Nested at-rules such as `@media`, `@supports` and even `@container` are declared as demonstrated below.

```tsx
const Container = styled.div({
  // container base styles

  '@media screen and (min-width: 576px)': {
    maxWidth: '540px'
  },

  '@media screen and (min-width: 768px)': {
    maxWidth: '720px'
  },

  // you can even nest at-rules
  '@supports (display: flex)': {
    display: 'flex',
    flexDirection: 'column',

    '@media screen and (min-width: 768px)': {
      flexDirection: 'row'
    }
  }
});
```

For examples of `@keyframes` and `@font-face`, refer to [API](docs/api.md#global-styles) section.

Styled also exposes a [helper](docs/api.md#media-query-builder) for building media queries.

## Prop based styles

Property matching or pattern matching can be achieved by calling the `prop` method on the `style` helper.

```tsx
const Link = styled.a({
  display: 'inline-block',
  textTransform: 'uppercase',
  cursor: 'pointer',

  [style.prop('isActive')]: {
    color: 'hotpink'
    textDecoration: 'none'
  }
});

const Composition = () => (
  <Link href='#' isActive>
    I'm a Link
  </Link>
);
```

You can even specify a function that takes the prop being matched as its only argument and also type the props for the same.

```tsx
type SVGProps = {
  width?: number;
  height?: number;
};

const Svg = styled.svg<SVGProps>({
  display: 'inline-block',
  stroke: 'transparent',
  fill: 'currentColor',
  verticalAlign: 'middle',
  pointerEvents: 'none',
  cursor: 'inherit',

  [style.prop('width')]: (width: number) => ({
    width: `${width}px`
  }),

  [style.prop('height')]: (height: number) => ({
    height: `${height}px`
  })
});

const Composition = () => (
  <Svg width={36} height={36} />
);
```


> **IMPORTANT!**
>
> In order to avoid maintaining a whitelist of props that are not meant to be passed down to the underlying HTML tag, all props used in any of the pattern matching functions will be treated as transient props and will **NOT** flow downward.
>
> Thus in the example above `width` and `height` props will not be passed to the underlying `svg` tag, so ensure styles are defined to handle that.

To match against multiple properties, just use one of `all`, `any` or `not` methods on the `style.props` helper.

```typescript
type CheckboxUIProps = {
  isChecked?: boolean;
  isDisabled?: boolean;
};

const CheckboxUI = styled.span<CheckboxUIProps>({
  [style.props.all('isChecked', 'isDisabled')]: {
    opacity: 0.7
  }
});
```

In the above example, opacity styles will only be applied when both `isChecked` and `isDisabled` props are supplied to the `CheckBoxUI` component.

When using a function for matching multiple props, be sure to pass in **all** props or the props object if not destructuring.

```typescript
type ButtonProps = {
  borderColour?: string;
  borderStyle?: 'solid' | 'dashed' | 'none';
};

const Button = styled.button<ButtonProps>({
  // button base styles
  
  [style.props.any('borderColour', 'borderStyle')]: ({
    borderColour,
    borderStyle
  }: ButtonProps) => ({
    borderColor: borderColour || 'purple',
    borderStyle: borderStyle || 'solid'
  }) 
});
```

## Generics

Not to confuse with Typescript's Generics, there is a mechanism for defining Components that are _"generic"_, basically a Higher Order Component that takes a `Component` as its only argument.

To define a Generic component, simply call the `generic` method as shown below.

```typescript
type SizeProp = {
  size?: number;
};

const GenericSize = styled.generic<SizeProp>({
  boxSizing: 'border-box',
  
  [style.prop('size')]: (size: number) => ({
    fontSize: `${size / 16}rem`,
    lineHeight: `${(size / 16) * 1.5}rem`
  })
});
```

Then wrap a component with it as shown below.

```tsx
const Heading = styled.h1({
  // some styles
});

const Wrapped = GenericSize(Heading);

const Composition = () => (
  <Wrapped size={64}>
    Heading Component wrapped
  </Wrapped>
);
```

Generic components will pass all props received down to the wrapped component. Ensure that the `className` prop is passed down to the underlying DOM node when using custom components.

```tsx
type CustomHeadingProps = {
  children?: React.ReactNode;
  className?: string;
};

const CustomHeading = ({
  children,
  className
}) => <h2 className={className}>{ children }</h2>;

const Wrapped = GenericSize(CustomHeading);

const Composition = () => (
  <Wrapped size={48}>
    CustomHeading Component wrapped
  </Wrapped>
);
```

To avoid nesting when trying to use multiple generic components, simply call the `extend` method.

```typescript
const GenericContentParadigm = styled.generic({
  margin: '0 0 1.5rem',
  [style.lastChild]: {
    marginBottom: 0
  }
});

const GenericHugeText = styled.generic({
  fontSize: '4.5rem',
  lineHeight: '5rem'
});

const PageHeading = styled.h1({
  color: '#333',
  fontWeight: 400,
  padding: 0
}).extend(
  GenericContentParadigm,
  GenericHugeText
);
```

You can also extend from other Styled Components and even plain object literal styles. The `extend` method performs a deep merge, so nested styles containing duplicate keys will be combined.

```typescript
const GenericClearFloat = styled.generic({
  float: 'left',
  [style.after]: {
    content: '',
    clear: 'both',
    display: 'block'
  }
});

const Danger = styled.span({
  color: 'red',
  [style.after]: {
    content: '!'
  }
});

const ExtendMayhem = styled.div({
  color: 'blue',
  [style.hover]: {
    textDecoration: 'underline',
    [style.after]: {
      color: 'pink',
      cursor: 'pointer'
    }
  }
}).extend(
  Danger,
  GenericClearFloat, 
  {
    [style.hover]: {
      textDecoration: 'none',
      [style.after]: {
        cursor: 'default'
      }
    }
  }
);
```

The resulting object styles for `<ExtendMayhem>` will be

```typescript
{
  float: 'left',
  color: 'red',
  [style.after]: {
    content: '',
    clear: 'both',
    display: 'block'
  },
  [style.hover]: {
    textDecoration: 'none',
    [style.after]: {
      color: 'pink',
      cursor: 'default'
    }
  }
}
```

## More docs

* [Advanced](docs/advanced.md) - server-side rendering, using refs, experimental features etc.
* [API](docs/api.md) - style helper, media query builder, global styles etc. 
* [SolidJS](docs/solidjs.md) - as the name suggest, things to know for SolidJS users
