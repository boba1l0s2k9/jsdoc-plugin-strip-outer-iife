var test = require("tap").test;

var plugin = require('../strip-outer-iife.js');

test("remove iife save comments", function (t) {
    t.plan(1);

    var fixer  = plugin.handlers.beforeParse,
        input  = function () {
                    // This is a comment
                    (function(){
                    function foo () {
                    }
                    function bar () {
                    }
                    }());
        }.toString().replace(/^\s*/mg, '').split("\n"),
        nowrapper = input.slice(1, -1).join("\n"),
        noiife    = input.slice(1, 2).join("\n") + "\n" +
                    input.slice(3, -2).join("\n"),
        object = { source: nowrapper };

    //console.log("1,2", input.slice(1, 2).join("\n"), "\n\n\n\n");
    //console.log("3,-2", input.slice(3, -2).join("\n"), "\n\n\n\n");

    fixer(object);
    t.equal(object.source, noiife);
});

