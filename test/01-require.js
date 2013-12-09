var test = require("tap").test;

test("module loads", function (t) {
    t.plan(3);

    var plugin = require('../strip-outer-iife.js');
    t.type(plugin,                       'object');
    t.type(plugin.handlers,              'object');
    t.type(plugin.handlers.beforeParse,  'function');
});

