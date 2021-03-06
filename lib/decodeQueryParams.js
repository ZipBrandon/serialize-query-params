"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeQueryParams = void 0;
/**
 * Convert the values in query to strings via the encode functions configured
 * in paramConfigMap
 *
 * @param paramConfigMap Map from query name to { encode, decode } config
 * @param query Query updates mapping param name to decoded value
 */
function decodeQueryParams(paramConfigMap, encodedQuery) {
    var decodedQuery = {};
    // iterate over all keys in the config (#30)
    var paramNames = Object.keys(paramConfigMap);
    // ensure any non configured keys that are in the URL are also included
    for (var _i = 0, _a = Object.keys(encodedQuery); _i < _a.length; _i++) {
        var encodedKey = _a[_i];
        if (paramConfigMap[encodedKey] == null) {
            paramNames.push(encodedKey);
        }
    }
    for (var _b = 0, paramNames_1 = paramNames; _b < paramNames_1.length; _b++) {
        var paramName = paramNames_1[_b];
        var encodedValue = encodedQuery[paramName];
        if (!paramConfigMap[paramName]) {
            if (process.env.NODE_ENV === 'development') {
                console.warn("Passing through parameter ".concat(paramName, " during decoding since it was not configured."));
            }
            // NOTE: we could just not include it, but it is probably convenient to have
            // it default to be a string type.
            decodedQuery[paramName] = encodedValue;
        }
        else {
            decodedQuery[paramName] = paramConfigMap[paramName].decode(encodedValue);
        }
    }
    return decodedQuery;
}
exports.decodeQueryParams = decodeQueryParams;
