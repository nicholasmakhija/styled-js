# SolidJS

SolidJS users need to import Styled from the the `solid` output folder as shown below:

```typescript
// as ES module
import styled from '@n3e/styled/solid/esm';

// as CommonJS module
const styled = require('@n3e/styled/solid/cjs');
```

> **IMPORTANT!** 
>
> Styled for SolidJS has all the bells and whistles except for `withRef` and `withPropTypes` methods,
> that are not applicable and thus non-existant.


```typescript
import type { JSXElement } from 'solid-js';

export const Content = styled.div<{
  children?: JSXElement;
  isTransparent?: boolean;
}>({
  position: 'relative',
  [style.prop('isTransparent')]: {
    opacity: 0.4
  }
});
```
