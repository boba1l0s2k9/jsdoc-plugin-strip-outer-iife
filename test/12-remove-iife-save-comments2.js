var test = require("tap").test;

var plugin = require('../strip-outer-iife.js');

test("remove iife save comments", function (t) {
    t.plan(1);

    var fixer  = plugin.handlers.beforeParse,
        input  = function () {
                    // This is a comment
                    /* start of file */
                    (function(){
                    function foo () {
                    }
                    function bar () {
                    }
                    /* Trailing comments */
                    // end of file
                    }());
        }.toString().replace(/^\s*/mg, '').split("\n"),
        nowrapper = input.slice(1, -1).join("\n"),
        noiife    = input.slice(1, 3).join("\n") + "\n" +
                    input.slice(4, -2).join("\n"),
        object = { source: nowrapper };

    //console.log("1,3", input.slice(1, 2).join("\n"), "\n\n\n\n");

    fixer(object);
    t.equal(object.source, noiife);
});

