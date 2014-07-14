json-tools
===============

**json-tools** is a library for access, transformation, and rendering of json.
Using json-tools can be built a stream of selectors, transformations and validations. 
This stream will later be filled with JSON/objects.

     development: active
     version: 0.2.30
     author: A.siebert (drdrej)

## Inspired by the following concepts
* streams
* events & event-processing
* fluent APIs
* domain specific languages


## Third-Party Code
To build this product I've used some open-source stuff:
* event-stream
* JSONSelect
* string
* underscore
* wrench

I like to say thank you to authors of this useful stuff!

## Goals
* select & transform objects with only few lines of code
* declarative
* code should be easy to read
 

## When and where to use

If you like fluent apis and streaming, knows css, and needs to handle a json-structure then json-tools is maybe a good helper.



## Usage

### Install & load json-tools

First of all you need to install an npm module.

```
     > npm install json-tools
```

The caller-script should load the npm-module  **'json-tools'**.

```javascript
   var tools = require( 'json-tools' );
   
   // ...
   // use json-tools to work with json

```

### Simple objects and tasks.    

Now you can work with these json-tools. A json-tools instance provides the following methods:

     1. asText( value, options) - renders text of a passed value
     2. selectable( object ) - prepare object to be of prototype Selectable
     3. each( fnc ) - iterates over selection
     4. json( json, [options] ) - creates a pipe of streams to handle json objects

Methods 1. -3. are sync and provides simple taks. Method json() is async and creates a pipe. This pipe can be filled with transformations and
consume json-objects.

If you like to make a selection on JSON-Object, then you need to create a selectable
and then you can use css-selectors to querying a structure.

**Example:** 
```javascript
   var myObj = {
      root: {
         persons : [

       {
          name: "xyz",
          age: 13 
       },
       
       {
          name: "abz",
          age: 23 
       },
       
       {
          name: "cde",
          age: 33 
       }  
   ]}};

   // creates a selectable:
   var selectable = tools.selectable( myObj );
   
   // return the first element in the result:
   console.log( selectable.first( ".root > .persons > *" ) );
   
   // return string/text of a selection
   console.log( selectable.text( ".root > .persons > * > .name" ) );

```

You can also iterate over selection in callback-style.

**Example:** 
```javascript

   selectable.each( ".root > .persons > *", function(element) {
        // passed "element" is also a selectable.
        // so you have same methods in selected element (text, first, each)
        
        // different ways to work with content
        // ------------------------------------
        
        // access to json-sub-structure:
        console.log( element.json.name );
   
        // access to json-sub-structure:
        console.log( element.text( ".name" ) );
   });

```

Good to know, that you can also use the each() method on selected element.
**Example:**
```javascript

   selectable.each( query, function(element) {
        element.each( subQuery, function( subElement ) {
            ...
        });
   });

```

### Streams and Pipes

This example shows how to work with transformations and selection:

```javascript

   var tools = require( 'json-tools' );

   tools.json()
     .select( path )
     .transform(function(element) {
         // do some changes on passed element or create new one.
         return element;
     }) 
     .validate(function(element) {
         // use validators to validate and return true or false|null|undefined
         return true;
     })
     .done( function() {
         // this function will be called when stream is finished (send 'end')
     });
     
   tools.consume( { ... } );
```


### Transformations

API supports now transformations. To exec a transformation you need to create a query object and call select()
and transform() functions.

**Example:**
```javascript

   var tools = require( 'json-tools' );
   tools.query( json )
        .select( '.root > .persons > *' )
        .transform( function( element ){
               // do some transformation with element
               var result = ...

               // returns transformed element.
               return result;
   });
   
   
   // transformation modul in file.
   /**
 *
 * @param json
 * @param options
 */
exports.transform = function( json, options ) {
    console.log( "-- prepare empty images list" );

    json.$images = [];

    return json;
};
```

You can easyly render and dump a json-element to a file like in the following example:

```javascript
   var tools = require( 'json-tools' );
   tools.query( json )
        .select( '.root > .persons > *' )
        .transform( function( element ){
               ...
        })
        .dump( "c:\\temp\\test\\<%= name %>.json" );
```

In the above example dump-function will use the passed path-template and json-data
to render the path and dump json-data into this file.

Another nice short-cut is a transform( string:path ) and write external transformations.

First of all you can move above used transformation-function to another file. F.e. create a folder **"/transform/"**
and place this file **"myTransformation.js"** into this folder:

```javascript

   // this is a transformation-file
   exports.transform = function( element ){
               ...
   };
```

Modify your code  to use this external transformation:

```javascript
   var tools = require( 'json-tools' );
   tools.query( json )
        .select( '.root > .persons > *' )
        .transform( __dirname + '/transform/myTransformation.js' )
        .dump( "c:\\temp\\test\\<%= name %>.json" );
```
**Important:** current version supports only absolute path and do not check the path-var.


### Merge and Split

Sometimes you need to split a passed object into a bunch of objects. you can do it with the split() function
and asArray() catch a stream of objects and build an array. path this array in the stream to the next handler.

**Important:**  current version of slit() supports only arrays.


*TODO: need examples*


### Render content

```javascript
   var tools = require( 'json-tools' );
   tools.query( json )
        .select( '.root > .persons > *' )
        .transform( function( element ){
               ...
        })
        .render( 'test content rendered with <%= name %> and wrote to field $rendered', '$rendered' )
```

In this example the render()-function creates field named $rendered in passed object, and fill this field with rendered value, based on passed template and object (in the stream).



## API



### asText
Extract text from structure.



### selectable
Extends passed object with methods to query and render this object.

#### text
function (path, defVal, shouldTrim)

#### exists
function (path)

#### first
function (path)

#### each
function (path, step)

#### render( template )

#### put( key, value )

#### list( path, template, delim )

This method gives you a way to render object.
Current implementation uses Underscore.templates.

* **template**: Path underscore-template or path to existing template.

**Example:**
```javascript
   var tools = require( 'json-tools' );
   var selectable = tools.selectable( json );
   var rendered = selectable.render( "<%= text('.field') %>" )
```




### json
Creates a stream-pipe and forward passed json-object into this stream.

#### select( String:cssPath )

Selects elements on passed Object. Result is an array of elements. Every element in array will be passed in the pipe to the next stream.

##### Parameters:
* **cssPath** of type String.


**Example:**
```javascript
   var obj = { ... };
   var tools = require( 'json-tools' );

   // select a field:
   var rendered = tools.json( obj ).select('.field' );
```

#### render( )
#### done( )
#### render
#### dump
#### transform
#### validate
#### asArray
#### asSelectable
#### split
#### done



## History

### until version 0.2.12
- Only basic implementation.
- Not tested well - need more tests.
- use it actively in my other projects.

I found in some situations I need to redesign json-tools.
I've started to change the api(). Release 0.3.x should have a valid and sable api.

### version 0.3.x


## License
This project is open-source and is distributed under MIT License (check the LICENSE-file).

The MIT License (MIT)

Copyright (c) 2014 Andreas Siebert

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


write code & have fun! ---- A. Siebert
