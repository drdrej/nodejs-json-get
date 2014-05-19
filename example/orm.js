
// Folgende Fragen beim beschreiben einer Komponente muss ich beantworten:
// =======================================================================
// 1. welches Artefakt will ich anlegen?
// 2. woher kommen die daten für das Rendern?
// 3. was passiert mit fehlern?

// weiterfuehrende fragen: kann ich das ganze in gulp integrieren?

// Artefakte identifizieren:
// 1. Model-Enum
// 2. DB-Tables
// 3. Fragmente
// 4. Verbindungen



var table = {
   name : 'DeviceInfo',
   
   columns : [
       {
	       name   : 'name',
	       sql    : 'VARCHAR', /* default: VARCHAR */
		   java   : 'java.lang.String',
		   unique : true
	   },
	   
	   {
	       name : 'value',
	       sql : 'VARCHAR',
		   java : 'java.lang.String'
	   },
	   
	   {
	       name : 'category',
		   type : 'int'
	   }
   ]
};


var query = require('../api.js').query;

        query({
            persons: [
                {
                    name: "AAA"
                },

                {
                    name: "BBB"
                },

                {
                    name: "CCC"
                }
            ]
        })
            .select( " .persons > * " )
            .transform(function (data) {
                console.log( "## next data element." );
                console.log(data);

                return data;
            })

            .render( "this is embedded text. Hello <%= name %>!", "$rendered" )

            .dump( "c:\\temp\\test-json\\<%= name %>.json" )
            .finished(done);