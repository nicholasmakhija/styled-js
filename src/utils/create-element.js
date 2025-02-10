export const createElement = (tagName) => {
    const element = document.createElement(tagName);
    const api = {
        appendTo: (target) => target.appendChild(element) && api,
        withAttribute: (name, value) => element.setAttribute(name, value) || api,
        unwrap: () => element
    };
    return api;
};
