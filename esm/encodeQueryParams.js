/**
 * Convert the values in query to strings via the encode functions configured
 * in paramConfigMap
 *
 * @param paramConfigMap Map from query name to { encode, decode } config
 * @param query Query updates mapping param name to decoded value
 */
export function encodeQueryParams(paramConfigMap, query) {
    var encodedQuery = {};
    var paramNames = Object.keys(query);
    for (var _i = 0, paramNames_1 = paramNames; _i < paramNames_1.length; _i++) {
        var paramName = paramNames_1[_i];
        var decodedValue = query[paramName];
        if (!paramConfigMap[paramName]) {
            if (process.env.NODE_ENV === 'development') {
                console.warn("Encoding parameter ".concat(paramName, " as string since it was not configured."));
            }
            // NOTE: we could just not encode it, but it is probably convenient to have
            // it be included by default as a string type.
            encodedQuery[paramName] =
                decodedValue == null ? decodedValue : String(decodedValue);
        }
        else {
            encodedQuery[paramName] = paramConfigMap[paramName].encode(query[paramName]);
        }
    }
    return encodedQuery;
}
export default encodeQueryParams;
