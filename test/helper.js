'use strict';

/**
 * Removes the line break in the given file contents.
 */
exports.removeLineBreak = function (contents) {
    return contents.toString().replace(/\r?\n|\r/g, '');
};
