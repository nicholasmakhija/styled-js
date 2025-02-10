export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const toDashed = (str) => str.trim().replace(/([A-Z])+/g, '-$1').toLowerCase();
export const startsWithAny = (...searchStrings) => (str) => searchStrings.some((chars) => str.startsWith(chars));
export const toSingleLine = (str) => str.replace((/ {2}|\r\n|\n|\r/gm), '').trim();
export const split = (separator) => (str) => str.split(separator);
