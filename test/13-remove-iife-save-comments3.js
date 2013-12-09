var test = require("tap").test;

var plugin = require('../strip-outer-iife.js');

test("remove iife save comments", function (t) {
    t.plan(1);

    var fixer  = plugin.handlers.beforeParse,
        input  = function () {
                    // 1Line comment
                    /* 2Block comment one line */
                    // 3Line comment
                    /* 4Block comment one line */
                    /* 5aBlock comment
                     * 6amultiple lines
                     */
                    // 8Line comment
                    // 9Line comment
                    (function(){
                    function foo () {
                    }
                    function bar () {
                    }
                    /* -7Block comment */
                    // -6Line comment
                    }());
                    /* -4Block comment one line */
                    /* -3Block comment one line */
                    // -2Line comment
                    // -1Line comment
        }.toString().replace(/^\s*/mg, '').split("\n"),
        nowrapper = input.slice( 1, -1).join("\n"),
        noiife    = input.slice( 1, 10).join("\n") + "\n" +
                    input.slice(11, -6).join("\n") + "\n" +
                    input.slice(-5, -1).join("\n"),
        object = { source: nowrapper };

    //console.log("1,3", input.slice(1, 2).join("\n"), "\n\n\n\n");

    fixer(object);
    t.equal(object.source, noiife);
});

