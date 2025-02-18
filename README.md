# styled

A high performance and easy to use CSS-in-JS library that can be used with `React` or `Solid`.

## Installation

```shell
# with npm
npm install @n3e/styled

# with yarn
yarn add @n3e/styled

# with pnpm
pnpm add @n3e/styled

# with bun
bun add @n3e/styled
```

## Usage

```tsx
import styled from '@n3e/styled';

const accent = '#ff6995';

const Button = styled.button({
  appearance: 'none',
  backgroundColor: accent,
  border: `2px solid ${accent}`,
  borderRadius: '0.25rem',
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

## Solid

SolidJS users need to import Styled from the the `solid` output folder:

```shell
# as ES module
import styled from '@n3e/styled/solid/esm';

# as CommonJS module
import styled from '@n3e/styled/solid/cjs';
```

## Documentation

See https://www.styled.guide/