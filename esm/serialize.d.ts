/**
 * Encodes a date as a string in YYYY-MM-DD format.
 *
 * @param {Date} date
 * @return {String} the encoded date
 */
export declare function encodeDate(date: Date | null | undefined): string | null | undefined;
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
export declare function decodeDate(input: string | (string | null)[] | null | undefined): Date | null | undefined;
/**
 * Encodes a date as a string in ISO 8601 ("2019-05-28T10:58:40Z") format.
 *
 * @param {Date} date
 * @return {String} the encoded date
 */
export declare function encodeDateTime(date: Date | null | undefined): string | null | undefined;
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
export declare function decodeDateTime(input: string | (string | null)[] | null | undefined): Date | null | undefined;
/**
 * Encodes a boolean as a string. true -> "1", false -> "0".
 *
 * @param {Boolean} bool
 * @return {String} the encoded boolean
 */
export declare function encodeBoolean(bool: boolean | null | undefined): string | null | undefined;
/**
 * Decodes a boolean from a string. "1" -> true, "0" -> false.
 * Everything else maps to undefined.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded boolean string
 * @return {Boolean} the boolean value
 */
export declare function decodeBoolean(input: string | (string | null)[] | null | undefined): boolean | null | undefined;
/**
 * Encodes a number as a string.
 *
 * @param {Number} num
 * @return {String} the encoded number
 */
export declare function encodeNumber(num: number | null | undefined): string | null | undefined;
/**
 * Decodes a number from a string. If the number is invalid,
 * it returns undefined.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded number string
 * @return {Number} the number value
 */
export declare function decodeNumber(input: string | (string | null)[] | null | undefined): number | null | undefined;
/**
 * Encodes a string while safely handling null and undefined values.
 *
 * @param {String} str a string to encode
 * @return {String} the encoded string
 */
export declare function encodeString(str: string | (string | null)[] | null | undefined): string | null | undefined;
/**
 * Decodes a string while safely handling null and undefined values.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded string
 * @return {String} the string value
 */
export declare function decodeString(input: string | (string | null)[] | null | undefined): string | null | undefined;
/**
 * Decodes an enum value while safely handling null and undefined values.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded string
 * @param {String[]} enumValues allowed enum values
 * @return {String} the string value from enumValues
 */
export declare function decodeEnum<T extends string>(input: string | (string | null)[] | null | undefined, enumValues: T[]): T | null | undefined;
/**
 * Encodes anything as a JSON string.
 *
 * @param {Any} any The thing to be encoded
 * @return {String} The JSON string representation of any
 */
export declare function encodeJson(any: any | null | undefined): string | null | undefined;
/**
 * Decodes a JSON string into javascript
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input The JSON string representation
 * @return {Any} The javascript representation
 */
export declare function decodeJson(input: string | (string | null)[] | null | undefined): any | null | undefined;
/**
 * Encodes an array as a JSON string.
 *
 * @param {Array} array The array to be encoded
 * @return {String[]} The array of strings to be put in the URL
 * as repeated query parameters
 */
export declare function encodeArray(array: (string | null)[] | null | undefined): (string | null)[] | null | undefined;
/**
 * Decodes an array or singular value and returns it as an array
 * or undefined if falsy. Filters out undefined values.
 *
 * @param {String | Array} input The input value
 * @return {Array} The javascript representation
 */
export declare function decodeArray(input: string | (string | null)[] | null | undefined): (string | null)[] | null | undefined;
/**
 * Encodes a numeric array as a JSON string.
 *
 * @param {Array} array The array to be encoded
 * @return {String[]} The array of strings to be put in the URL
 * as repeated query parameters
 */
export declare function encodeNumericArray(array: (number | null)[] | null | undefined): (string | null)[] | null | undefined;
/**
 * Decodes an array or singular value and returns it as an array
 * or undefined if falsy. Filters out undefined and NaN values.
 *
 * @param {String | Array} input The input value
 * @return {Array} The javascript representation
 */
export declare function decodeNumericArray(input: string | (string | null)[] | null | undefined): (number | null)[] | null | undefined;
/**
 * Encodes an array as a delimited string. For example,
 * ['a', 'b'] -> 'a_b' with entrySeparator='_'
 *
 * @param array The array to be encoded
 * @param entrySeparator The string used to delimit entries
 * @return The array as a string with elements joined by the
 * entry separator
 */
export declare function encodeDelimitedArray(array: (string | null)[] | null | undefined, entrySeparator?: string): string | null | undefined;
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
export declare function decodeDelimitedArray(input: string | (string | null)[] | null | undefined, entrySeparator?: string): (string | null)[] | null | undefined;
/**
 * Encodes a numeric array as a delimited string. (alias of encodeDelimitedArray)
 * For example, [1, 2] -> '1_2' with entrySeparator='_'
 *
 * @param {Array} array The array to be encoded
 * @return {String} The JSON string representation of array
 */
export declare const encodeDelimitedNumericArray: (array: (number | null)[] | null | undefined, entrySeparator?: string) => string | null | undefined;
/**
 * Decodes a delimited string into javascript array where all entries are numbers
 * For example, '1_2' -> [1, 2] with entrySeparator='_'
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} jsonStr The JSON string representation
 * @return {Array} The javascript representation
 */
export declare function decodeDelimitedNumericArray(arrayStr: string | (string | null)[] | null | undefined, entrySeparator?: string): (number | null)[] | null | undefined;
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
export declare function encodeObject(obj: {
    [key: string]: string | null | number | undefined;
} | null | undefined, keyValSeparator?: string, entrySeparator?: string): string | null | undefined;
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
export declare function decodeObject(input: string | (string | null)[] | null | undefined, keyValSeparator?: string, entrySeparator?: string): {
    [key: string]: string;
} | null | undefined;
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
export declare const encodeNumericObject: (obj: {
    [key: string]: number | null | undefined;
} | null | undefined, keyValSeparator?: string, entrySeparator?: string) => string | null | undefined;
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
export declare function decodeNumericObject(input: string | (string | null)[] | null | undefined, keyValSeparator?: string, entrySeparator?: string): {
    [key: string]: number | null | undefined;
} | null | undefined;
