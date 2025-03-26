/**
 * Convert object keys from snake_case to camelCase
 * @param obj - object to convert
 */
const toCamelCase = (obj) => {
    const camelCaseObj = {};
    Object.keys(obj).forEach((key) => {
        const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        camelCaseObj[camelCaseKey] = obj[key];
    });
    return camelCaseObj;
}

export default toCamelCase;
