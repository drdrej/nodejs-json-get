json-tools
===============


json-tools is a simple js-lib to simplify access to elements in json.
it should help to do some basic tasks with json-structure like rendering, selection, transformation.


     development: active
     version: 0.2.6
     author: A.siebert (drdrej)
     

## Usage

First of all you need to install an npm module.

     >npm install json
     
In the next step you need to load the npm-module.

```javascript
   var tools = require( 'json-tools' );

```

Now you can work with these json-tools. The tools-instance provides some methods to work with json:
     1. asText( value, options)
     2. selectable( object )


F.e. if you like to make a selection on JSON-Object, then you need to create a selectable and then you can use css-selectors to querying a structure.

**Example:** 
```javascript
   var myObj = {
      root: [
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
   ]};

   // creates a selectable:
   var selectable = tools.selectable( myObj );
   
   // return the first element in the result:
   console.log( selectable.first( ".root > *" ) );
   
   // return string/text of a selection
   console.log( selectable.text( ".root > * > .name" ) );

```

You can also iterate over selection in callback-style.

**Example:** 
```javascript

   selectable.each( ".root > *", function(element) {
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



## License
This project is open-source and is distributed under MIT License (check the LICENSE-file).



write code & have fun!
   A. Siebert
