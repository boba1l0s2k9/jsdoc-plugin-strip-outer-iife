/**
 * @overview Remove outermost IIFE
 * @module plugins/strip-outer-iife
 * @author boba1l0s2k9 <boba1l0s2k9@outlook.com>
 */

(function(){
'use strict';

var comment_line  = '(?://.*?\r?\n)',
    comment_block = '(?:[/][*](?:[^\n]*?\n)*?.*?[*][/])',
    comments      = '((?:' + comment_line + '|' + comment_block + '|[\s\n]*)*)',
    iife_start    = '(^[(]function\s*[(][^)]*[)]\s*[{]\s*\n)',
    iife_end_in   = '(?:[(][^)]*[)][)])',
    iife_end_out  = '(?:[)][(][^)]*[)])',
    iife_end_cs   = '(?:[)][.]call[(][^)]*[)])',
    iife_end      = '(\n[}](?:' + iife_end_in + '|' + iife_end_out + '|' + iife_end_cs + ');)',
    anything      = '((?:[^\n]*\n)*.*)';

function warn (msg) {
    if (typeof process.env.TAP !== 'undefined')
        console.error("Passthrough reason:", msg);
    return;
}

function remove_iife (e) {
    var pattern = comments + iife_start + anything + iife_end + anything,
        regex   = new RegExp(pattern, 'mg'),
        results = regex.exec(e.source);

    if (typeof results === 'object' && results === null)
        return warn("Result is null");

    if (typeof results.input !== 'string')
        return warn("Input not string");

    if (e.source !== results.input)
        return warn("Input doesn't match input after regex");

    if (results.input.length !== results[0].length)
        return warn("Failed to match full input");

    if (results.index !== 0)
        return warn("Failed to match start of input");

    if (regex.lastIndex !== results.input.length)
        return warn("Failed to match full input, global");

    /*      1                      2           3         4             5
     * Leading comments + <not iffe start> + body + <not iffe end> + trailer
     */
    e.source = results[1] + results[3] + results[5];
}

exports.handlers = { beforeParse: remove_iife };

}());
