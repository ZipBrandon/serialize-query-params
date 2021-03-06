var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { stringify, parse as parseQueryString, parseUrl, } from 'query-string';
/**
 * An example of a transformSearchString function that undoes encoding of
 * common JSON characters that are technically allowed in URLs.
 */
var JSON_SAFE_CHARS = "{}[],\":"
    .split('')
    .map(function (d) { return [d, encodeURIComponent(d)]; });
export function transformSearchStringJsonSafe(searchString) {
    var str = searchString;
    for (var _i = 0, JSON_SAFE_CHARS_1 = JSON_SAFE_CHARS; _i < JSON_SAFE_CHARS_1.length; _i++) {
        var _a = JSON_SAFE_CHARS_1[_i], char = _a[0], code = _a[1];
        str = str.replace(new RegExp('\\' + code, 'g'), char);
    }
    return str;
}
/**
 * Update a location, wiping out parameters not included in encodedQuery
 * If a param is set to undefined it will be removed from the URL.
 */
export function updateLocation(encodedQuery, location, stringifyOptions) {
    var encodedSearchString = stringify(encodedQuery, stringifyOptions);
    if (stringifyOptions && stringifyOptions.transformSearchString) {
        encodedSearchString = stringifyOptions.transformSearchString(encodedSearchString);
    }
    var search = encodedSearchString.length ? "?".concat(encodedSearchString) : '';
    var href = parseUrl(location.href || '').url + search;
    var newLocation = __assign(__assign({}, location), { key: "".concat(Date.now()), // needed for some routers (e.g. react-router)
        href: href, search: search, query: encodedQuery });
    return newLocation;
}
/**
 * Update a location while retaining existing parameters.
 * If a param is set to undefined it will be removed from the URL.
 */
export function updateInLocation(encodedQueryReplacements, location, stringifyOptions) {
    // explicitly avoid parsing numbers to ensure the
    // return type has the same shape as EncodeQuery
    var currQuery = parseQueryString(location.search, { parseNumbers: false });
    var newQuery = __assign(__assign({}, currQuery), encodedQueryReplacements);
    return updateLocation(newQuery, location, stringifyOptions);
}
