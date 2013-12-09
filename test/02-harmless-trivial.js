var test = require("tap").test;

var plugin = require('../strip-outer-iife.js');

test("fixer is harmless trivial", function (t) {
    t.plan(1);

    var fixer  = plugin.handlers.beforeParse,
        input  = "asdf";
        object = { source: input };

    fixer(object);
    t.equal(object.source, input);
});

