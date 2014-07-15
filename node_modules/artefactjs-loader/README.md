artefactjs-loader
=================

EXPERIMENTAL: extension for artefactjs to load jsons - abstraction of loading json with meta-data.

    state: active
    version: 0.0.7

## Use-Cases

This library/module is used in some of my other projects where i need to load functions and jsons, but
want to see more in log. ift eno 'require' says not enough, this will help.

Another point is the loader-hierarchy. This loader resolves the file
1. against the process, and if this file not exists in process-dir, then
2. against the caller-dir, where the json() or fnc() functions are called.

## Usage

**How to load a function**
```javascript
        var lib = require('../lib');

        var loaded = lib.fnc( './external_fnc.js', function(path) {
            var imported = require(path);
            return imported.test;
        });
```

LICENSE: MIT
write code and have fun,
A. Siebert
