# Advanced

## Forwarding Ref

Use the `withRef` method to pass the `ref` down to the underlying DOM element. This uses React's `forwardRef` functionality behind the scenes. Then use the `useRef` hook to access its value.

```tsx
import { useRef } from 'react';

const Div = styled.div({
  // div styles
}).withRef();

const Button = styled.button({
  // button styles
});

const Composition = () => {
  const divRef = useRef(null);

  const clickHandler = () => {
    console.log('divRef', divRef.current);
  };

  return (
    <>
      <Div ref={divRef}>Div with ref forwarded</Div>
      <Button
        onClick={clickHandler}
      >Log ref to console</Button>
    </>
  );
};
```

## PropTypes

Built-in typechecking support for React propsTypes. Just chain the `withProps` method to an already defined Styled Component and pass the propTypes object as its only argument. This is the same as assigning the `propTypes` property on a Component.

```typescript
import PropTypes from 'prop-types';

type ButtonColour = 'blue' | 'green' | 'purple';

type ButtonProps = {
  isDisabled?: boolean;
  colour?: ButtonColour;
};

const Button = styled.button<ButtonProps>({
  // button styles
  
  [style.prop('isDisabled')]: {
    color: 'light grey',
    cursor: 'not-allowed'
  },

  [style.prop('colour')]: (colour: ButtonColour) => ({
    backgroundColor: colour,
    borderColour: colour
  })
}).withProps({
  isDisabled: PropTypes.bool,
  colour: PropTypes.oneOf(['blue', 'green', 'purple'])
});
```

## Server Side Rendering

SSR is supported out of the box, no extra setup required. To get the CSS rendered _(including their wrapping style tags)_, just import and invoke the `getStyles` method.

```tsx
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { getStyles } from '@n3e/styled';

import App from './App';

/**
 * @param {string} html
 * @param {string} sheets
 * @returns {string}
 */
const renderPage = (html, sheets) =>
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>App: served by express</title>
  ${sheets}
  <script defer src="path/to/script.js"></script>
<head>
<body>
  <div id="root">${html}</div>
</body>
</html>`;

const app = express();

app.use((req, res) => {
  // render the component to a string.
  const html = ReactDOMServer.renderToString(<App />);
  // get generated styles after component is rendered
  const sheets = getStyles();

  return res
    .status(200)
    .contentType('text/html')
    .send(renderPage(html, sheets));
});

app.listen('9000');
```

## Experimental

Although Styled works with NextJS, please use with caution as these features have not been finalised.

First, create a component at the root directory, it can be called anything you like.

```tsx
import { ServerStyles } from '@n3e/styled';

export default async function RootStyles() {
  return <ServerStyles />
}
```

Then in the `layout.(js|tsx)` file, import the component created above and insert it as a child of the `head` tag.

```tsx
import type { Metadata } from "next";
import RootStyles from './RootStyles';

export const metadata: Metadata = {
  // meta data properties
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <RootStyles />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```
