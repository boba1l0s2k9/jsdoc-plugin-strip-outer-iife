var test = require("tap").test;

var plugin = require('../strip-outer-iife.js');

test("remove extra args iife", function (t) {
    t.plan(1);

    var fixer  = plugin.handlers.beforeParse,
        input  = function () {
                    (function(c, d){
                    function foo () {
                    }
                    function bar () {
                    }
                    })(a, b);
        }.toString().split('\n').slice(1, -1).join("\n").replace(/^\s*/mg, '');
        object = { source: input };

    fixer(object);
    t.equal(object.source, input.split("\n").slice(1, -1).join("\n"));
});

