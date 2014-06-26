json-tools
===============


json-tools is a simple js-lib to simplify access to elements in json.
it should help to do some basic tasks with json-structure like rendering, selection, transformation.


     development: active
     version: 0.2.11
     author: A.siebert (drdrej)
     

## Usage

First of all you need to install an npm module.

```
     > npm install json-tools
```
     
In the next step you need to load the npm-module.

```javascript
   var tools = require( 'json-tools' );

```

Now you can work with these json-tools. A tools-instance provides some methods to work with json:

     1. asText( value, options)
     2. selectable( object )
     3. each( fnc )
     4. query( json )

F.e. if you like to make a selection on JSON-Object, then you need to create a selectable
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




## License
This project is open-source and is distributed under MIT License (check the LICENSE-file).



write code & have fun! ---- A. Siebert
