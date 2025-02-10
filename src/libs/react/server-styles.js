import React from 'react';
import { sheetCache } from '../../registries';
import { STYLED_ATTRIBUTE_NAME } from '../../constants';
const renderStyleTags = () => [...sheetCache.__getDataStore()].map(([id, sheet]) => React.createElement('style', {
    [STYLED_ATTRIBUTE_NAME]: id,
    key: id
}, sheet.css()));
export const ServerStyles = () => React.createElement(React.Fragment, {}, renderStyleTags());
