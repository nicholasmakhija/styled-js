export const expand = (target, properties) => {
    for (const key in properties) {
        Object.defineProperty(target, key, {
            value: properties[key]
        });
    }
    return target;
};
