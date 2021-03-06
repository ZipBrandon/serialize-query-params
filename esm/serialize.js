var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Interprets an encoded string and returns either the string or null/undefined if not available.
 * Ignores array inputs (takes just first element in array)
 * @param input encoded string
 */
function getEncodedValue(input, allowEmptyString) {
    if (input == null) {
        return input;
    }
    // '' or []
    if (input.length === 0 &&
        (!allowEmptyString || (allowEmptyString && input !== ''))) {
        return null;
    }
    var str = input instanceof Array ? input[0] : input;
    if (str == null) {
        return str;
    }
    if (!allowEmptyString && str === '') {
        return null;
    }
    return str;
}
/**
 * Interprets an encoded string and return null/undefined or an array with
 * the encoded string contents
 * @param input encoded string
 */
function getEncodedValueArray(input) {
    if (input == null) {
        return input;
    }
    return input instanceof Array ? input : input === '' ? [] : [input];
}
/**
 * Encodes a date as a string in YYYY-MM-DD format.
 *
 * @param {Date} date
 * @return {String} the encoded date
 */
export function encodeDate(date) {
    if (date == null) {
        return date;
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return "".concat(year, "-").concat(month < 10 ? "0".concat(month) : month, "-").concat(day < 10 ? "0".concat(day) : day);
}
/**
 * Converts a date in the format 'YYYY-mm-dd...' into a proper date, because
 * new Date() does not do that correctly. The date can be as complete or incomplete
 * as necessary (aka, '2015', '2015-10', '2015-10-01').
 * It will not work for dates that have times included in them.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param  {String} input String date form like '2015-10-01'
 * @return {Date} parsed date
 */
export function decodeDate(input) {
    var dateString = getEncodedValue(input);
    if (dateString == null)
        return dateString;
    var parts = dateString.split('-');
    // may only be a year so won't even have a month
    if (parts[1] != null) {
        parts[1] -= 1; // Note: months are 0-based
    }
    else {
        // just a year, set the month and day to the first
        parts[1] = 0;
        parts[2] = 1;
    }
    var decoded = new (Date.bind.apply(Date, __spreadArray([void 0], parts, false)))();
    if (isNaN(decoded.getTime())) {
        return null;
    }
    return decoded;
}
/**
 * Encodes a date as a string in ISO 8601 ("2019-05-28T10:58:40Z") format.
 *
 * @param {Date} date
 * @return {String} the encoded date
 */
export function encodeDateTime(date) {
    if (date == null) {
        return date;
    }
    return date.toISOString();
}
/**
 * Converts a date in the https://en.wikipedia.org/wiki/ISO_8601 format.
 * For allowed inputs see specs:
 *  - https://tools.ietf.org/html/rfc2822#page-14
 *  - http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
 *
 * If an array is provided, only the first entry is used.
 *
 * @param  {String} input String date form like '1995-12-17T03:24:00'
 * @return {Date} parsed date
 */
export function decodeDateTime(input) {
    var dateString = getEncodedValue(input);
    if (dateString == null)
        return dateString;
    var decoded = new Date(dateString);
    if (isNaN(decoded.getTime())) {
        return null;
    }
    return decoded;
}
/**
 * Encodes a boolean as a string. true -> "1", false -> "0".
 *
 * @param {Boolean} bool
 * @return {String} the encoded boolean
 */
export function encodeBoolean(bool) {
    if (bool == null) {
        return bool;
    }
    return bool ? '1' : '0';
}
/**
 * Decodes a boolean from a string. "1" -> true, "0" -> false.
 * Everything else maps to undefined.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded boolean string
 * @return {Boolean} the boolean value
 */
export function decodeBoolean(input) {
    var boolStr = getEncodedValue(input);
    if (boolStr == null)
        return boolStr;
    if (boolStr === '1') {
        return true;
    }
    else if (boolStr === '0') {
        return false;
    }
    return null;
}
/**
 * Encodes a number as a string.
 *
 * @param {Number} num
 * @return {String} the encoded number
 */
export function encodeNumber(num) {
    if (num == null) {
        return num;
    }
    return String(num);
}
/**
 * Decodes a number from a string. If the number is invalid,
 * it returns undefined.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded number string
 * @return {Number} the number value
 */
export function decodeNumber(input) {
    var numStr = getEncodedValue(input);
    if (numStr == null)
        return numStr;
    if (numStr === '')
        return null;
    var result = +numStr;
    return result;
}
/**
 * Encodes a string while safely handling null and undefined values.
 *
 * @param {String} str a string to encode
 * @return {String} the encoded string
 */
export function encodeString(str) {
    if (str == null) {
        return str;
    }
    return String(str);
}
/**
 * Decodes a string while safely handling null and undefined values.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded string
 * @return {String} the string value
 */
export function decodeString(input) {
    var str = getEncodedValue(input, true);
    if (str == null)
        return str;
    return String(str);
}
/**
 * Decodes an enum value while safely handling null and undefined values.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded string
 * @param {String[]} enumValues allowed enum values
 * @return {String} the string value from enumValues
 */
export function decodeEnum(input, enumValues) {
    var str = decodeString(input);
    if (str == null)
        return str;
    return enumValues.includes(str) ? str : undefined;
}
/**
 * Encodes anything as a JSON string.
 *
 * @param {Any} any The thing to be encoded
 * @return {String} The JSON string representation of any
 */
export function encodeJson(any) {
    if (any == null) {
        return any;
    }
    return JSON.stringify(any);
}
/**
 * Decodes a JSON string into javascript
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input The JSON string representation
 * @return {Any} The javascript representation
 */
export function decodeJson(input) {
    var jsonStr = getEncodedValue(input);
    if (jsonStr == null)
        return jsonStr;
    var result = null;
    try {
        result = JSON.parse(jsonStr);
    }
    catch (e) {
        /* ignore errors, returning undefined */
    }
    return result;
}
/**
 * Encodes an array as a JSON string.
 *
 * @param {Array} array The array to be encoded
 * @return {String[]} The array of strings to be put in the URL
 * as repeated query parameters
 */
export function encodeArray(array) {
    if (array == null) {
        return array;
    }
    return array;
}
/**
 * Decodes an array or singular value and returns it as an array
 * or undefined if falsy. Filters out undefined values.
 *
 * @param {String | Array} input The input value
 * @return {Array} The javascript representation
 */
export function decodeArray(input) {
    var arr = getEncodedValueArray(input);
    if (arr == null)
        return arr;
    return arr;
}
/**
 * Encodes a numeric array as a JSON string.
 *
 * @param {Array} array The array to be encoded
 * @return {String[]} The array of strings to be put in the URL
 * as repeated query parameters
 */
export function encodeNumericArray(array) {
    if (array == null) {
        return array;
    }
    return array.map(String);
}
/**
 * Decodes an array or singular value and returns it as an array
 * or undefined if falsy. Filters out undefined and NaN values.
 *
 * @param {String | Array} input The input value
 * @return {Array} The javascript representation
 */
export function decodeNumericArray(input) {
    var arr = decodeArray(input);
    if (arr == null)
        return arr;
    return arr.map(function (d) { return (d === '' || d == null ? null : +d); });
}
/**
 * Encodes an array as a delimited string. For example,
 * ['a', 'b'] -> 'a_b' with entrySeparator='_'
 *
 * @param array The array to be encoded
 * @param entrySeparator The string used to delimit entries
 * @return The array as a string with elements joined by the
 * entry separator
 */
export function encodeDelimitedArray(array, entrySeparator) {
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    if (array == null) {
        return array;
    }
    return array.join(entrySeparator);
}
/**
 * Decodes a delimited string into javascript array. For example,
 * 'a_b' -> ['a', 'b'] with entrySeparator='_'
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} input The JSON string representation
 * @param entrySeparator The array as a string with elements joined by the
 * entry separator
 * @return {Array} The javascript representation
 */
export function decodeDelimitedArray(input, entrySeparator) {
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    var arrayStr = getEncodedValue(input, true);
    if (arrayStr == null)
        return arrayStr;
    if (arrayStr === '')
        return [];
    return arrayStr.split(entrySeparator);
}
/**
 * Encodes a numeric array as a delimited string. (alias of encodeDelimitedArray)
 * For example, [1, 2] -> '1_2' with entrySeparator='_'
 *
 * @param {Array} array The array to be encoded
 * @return {String} The JSON string representation of array
 */
export var encodeDelimitedNumericArray = encodeDelimitedArray;
/**
 * Decodes a delimited string into javascript array where all entries are numbers
 * For example, '1_2' -> [1, 2] with entrySeparator='_'
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} jsonStr The JSON string representation
 * @return {Array} The javascript representation
 */
export function decodeDelimitedNumericArray(arrayStr, entrySeparator) {
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    var decoded = decodeDelimitedArray(arrayStr, entrySeparator);
    if (decoded == null)
        return decoded;
    return decoded.map(function (d) { return (d === '' || d == null ? null : +d); });
}
/**
 * Encode simple objects as readable strings. Works only for simple,
 * flat objects where values are numbers, strings.
 *
 * For example { foo: bar, boo: baz } -> "foo-bar_boo-baz"
 *
 * @param {Object} object The object to encode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {String} The encoded object
 */
export function encodeObject(obj, keyValSeparator, entrySeparator) {
    if (keyValSeparator === void 0) { keyValSeparator = '-'; }
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    if (obj == null)
        return obj; // null or undefined
    if (!Object.keys(obj).length)
        return ''; // {} case
    return Object.keys(obj)
        .map(function (key) { return "".concat(key).concat(keyValSeparator).concat(obj[key]); })
        .join(entrySeparator);
}
/**
 * Decodes a simple object to javascript. Currently works only for simple,
 * flat objects where values are strings.
 *
 * For example "foo-bar_boo-baz" -> { foo: bar, boo: baz }
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} input The object string to decode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {Object} The javascript object
 */
export function decodeObject(input, keyValSeparator, entrySeparator) {
    if (keyValSeparator === void 0) { keyValSeparator = '-'; }
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    var objStr = getEncodedValue(input, true);
    if (objStr == null)
        return objStr;
    if (objStr === '')
        return {};
    var obj = {};
    var keyValSeparatorRegExp = new RegExp("".concat(keyValSeparator, "(.*)"));
    objStr.split(entrySeparator).forEach(function (entryStr) {
        var _a = entryStr.split(keyValSeparatorRegExp), key = _a[0], value = _a[1];
        obj[key] = value;
    });
    return obj;
}
/**
 * Encode simple objects as readable strings. Alias of encodeObject.
 *
 * For example { foo: 123, boo: 521 } -> "foo-123_boo-521"
 *
 * @param {Object} object The object to encode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {String} The encoded object
 */
export var encodeNumericObject = encodeObject;
/**
 * Decodes a simple object to javascript where all values are numbers.
 * Currently works only for simple, flat objects.
 *
 * For example "foo-123_boo-521" -> { foo: 123, boo: 521 }
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} input The object string to decode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {Object} The javascript object
 */
export function decodeNumericObject(input, keyValSeparator, entrySeparator) {
    if (keyValSeparator === void 0) { keyValSeparator = '-'; }
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    var decoded = decodeObject(input, keyValSeparator, entrySeparator);
    if (decoded == null)
        return decoded;
    // convert to numbers
    var decodedNumberObj = {};
    for (var _i = 0, _a = Object.keys(decoded); _i < _a.length; _i++) {
        var key = _a[_i];
        decodedNumberObj[key] = decodeNumber(decoded[key]);
    }
    return decodedNumberObj;
}
