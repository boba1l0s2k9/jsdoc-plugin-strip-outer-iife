# NAME

jsdoc-plugin-strip-outer-iife - JSDoc plugin to filter out root-level [IIFE][] before processing

# INSTALL

    mkdir node_modules
    npm install jsdoc-plugin-strip-outer-iife
    cp node_modules/jsdoc-plugin-strip-outer-iife/strip-outer-iife.js node_modules/jsdoc/plugins/
    # create jsdoc.conf.json mentioning this plugin, see below

# JSDoc configuration

Sample JSDoc configuration file, e.g. jsdoc.conf.json

```json
{ "plugins": [ "plugins/strip-outer-iife.js" ] }
```

# RUN

    jsdoc --configure jsdoc.conf.json inputfile.js

# DESCRIPTION

This is a plugin for [jsdoc][] using the [jsdoc-plugins][] system to filter
source code before it's seen by the main JSDoc parser to remove the common
root-level [IIFE][]'s.  The intent of this plugin is to:
   * Be harmless in case it doesn't understand your content.
   * Allow comments and whitespace before your root-level IIFE.
   * Ignore any and all IIFE's in the body.
   * Allow anything after the close of the root-level IIFE.
   * Only consider IIFE's that start at the beginning of a line, without
     whitespace.
   * Only consider IIFE's that end at the beginning of a line, without
     whitespace.

# EXAMPLES

All of these should get removed:

## Basic inner
```javascript
(function(){
    // Whatever is in here gets saved.
}());
```

## Basic outer
```javascript
(function(){
    // Whatever is in here gets saved.
})();
```

## Browser window
```javascript
(function(){
    // Whatever is in here gets saved.
})(window);
```

## CoffeeScript
```javascript
(function(){
    // Whatever is in here gets saved.
}).call(this);
```
## Common inner
```javascript
/**
 * It's okay to have comments here, these get preserved
 */
// So do single line comments like this
(function(){
    // Whatever is in here gets saved.
}());
// It's also okay to have comments here -- also preserved
```

# LICENSE

This module is licensed under [CC0][], a kind of internationally-aware "public 
domain" license, or more properly said: a declaration of my affirmative intent 
to waive the rights normally reserved under copyright law.  You're free to 
copy, modify, sell for profit, etc, without any need to contact me, give me 
attribution, reproduce the license text, etc.  See [LICENSE][] for the full 
license text.

# TODO

# Why not use this module

   * Not using a real JavaScript parser to modify the input stream, only
     regular expressions.
   * Doesn't use the JSDoc plugin style (yet).
   * Not the right way to fix the problem, see [jsdoc-issue-456][]

[jsdoc-issue-456]: https://github.com/jsdoc3/jsdoc/issues/456
[jsdoc-plugins]: https://github.com/jsdoc3/jsdoc/blob/master/plugins/README.md
[jsdoc]: https://github.com/jsdoc3/jsdoc
[CC0]: http://creativecommons.org/publicdomain/zero/1.0/legalcode
[LICENSE]: https://raw.github.com/boba1l0s2k9/jsdoc-plugin-strip-outer-iife/master/LICENSE
[IIFE]: http://benalman.com/news/2010/11/immediately-invoked-function-expression/

