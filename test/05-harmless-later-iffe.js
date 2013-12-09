var test = require("tap").test;

var plugin = require('../strip-outer-iife.js');

test("fixer is harmless later iife", function (t) {
    t.plan(1);

    var fixer  = plugin.handlers.beforeParse,
        input  = function () {
                    function foo () {
                    }
                    (function(){
                        function blek () {}
                    }());
                    function bar () {
                    }
        }.toString().split('\n').slice(1, -1).join("\n");
        object = { source: input };

    fixer(object);
    t.equal(object.source, input);
});

