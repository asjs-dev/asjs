# &lt;AS/JS>

&lt;AS/JS> is a JavaScript framework, for ActionScript3 like display list handling

## HOW TO

* Create your index html ( include asjs.min.js, normalize.css and the latest jquery )

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/normalize.css">
        <script src="js/lib/jquery-latest.js" type="text/javascript"></script>
        <script src="../asjs.min.js" type="text/javascript"></script>
    </head>
    <body>
    </body>
</html>
```

* Add your script and init asjs with your base app class

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/normalize.css">
        <script src="js/lib/jquery-latest.js" type="text/javascript"></script>
        <script src="../asjs.min.js" type="text/javascript"></script>
        <script type="text/javascript">
          function Application() {
              var that = {};
             
              (function() {
                  console.log( "<AS/JS> Application" );
              })();
             
              return that;
          };
          
          ASJS.startASJS( Application );
        </script>
    </head>
    <body>
    </body>
</html>
```

* Add a simple ASJS.Sprite to ASJS.Stage

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/normalize.css">
        <script src="js/lib/jquery-latest.js" type="text/javascript"></script>
        <script src="../asjs.min.js" type="text/javascript"></script>
        <script type="text/javascript">
          function Application() {
              var that = {};
             
              (function() {
                  console.log( "<AS/JS> Application" );
                 
                  var s = new ASJS.Sprite();
                  stage.addChild( s );
              })();
             
              return that;
          };
          
          ASJS.startASJS( Application );
        </script>
    </head>
    <body>
    </body>
</html>
```

* Add style to your ASJS.Sprite

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/normalize.css">
        <script src="js/lib/jquery-latest.js" type="text/javascript"></script>
        <script src="../asjs.min.js" type="text/javascript"></script>
        <script type="text/javascript">
          function Application() {
              var that = {};
             
              (function() {
                  console.log( "<AS/JS> Application" );
                 
                  var s = new ASJS.Sprite();
                    s.setSize( 100, 100 );
                    s.move( 50, 50 );
                    s.setCSS( "background-color", "#000000" );
                  stage.addChild( s );
              })();
             
              return that;
          };
          
          ASJS.startASJS( Application );
        </script>
    </head>
    <body>
    </body>
</html>
```

* Add mouse click event listener to your ASJS.Sprite

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/normalize.css">
        <script src="js/lib/jquery-latest.js" type="text/javascript"></script>
        <script src="../asjs.min.js" type="text/javascript"></script>
        <script type="text/javascript">
          function Application() {
              var that = {};
             
              (function() {
                  console.log( "<AS/JS> Application" );
                 
                  var s = new ASJS.Sprite();
                    s.setSize( 100, 100 );
                    s.move( 50, 50 );
                    s.setCSS( "background-color", "#000000" );
                    s.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
                      console.log( "click :)" );
                    });
                  stage.addChild( s );
              })();
             
              return that;
          };
          
          ASJS.startASJS( Application );
        </script>
    </head>
    <body>
    </body>
</html>
```

* You can also add two or more ASJS.Sprite to ASJS.Stage

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/normalize.css">
        <script src="js/lib/jquery-latest.js" type="text/javascript"></script>
        <script src="../asjs.min.js" type="text/javascript"></script>
        <script type="text/javascript">
          function Application() {
            var that = {};
           
            (function() {
              console.log( "<AS/JS> Application" );
             
              var i;
              var s;
              for ( i = 0; i < 10; i++ ) {
                s = new ASJS.Sprite();
                s.setSize( 40, 40 );
                s.move( 50 + i * 50 , 50 );
                s.setCSS( "background-color", "#336699" );
                s.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
                  stage.getChildByDOMObject( event.target ).setCSS( "background-color", "#00FF00" );
                });
                stage.addChild( s );
              }
            })();
           
            return that;
          };
          
          ASJS.startASJS( Application );
        </script>
    </head>
    <body>
    </body>
</html>
```

* Create your own display object class extended from ASJS.Sprite

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/normalize.css">
        <script src="js/lib/jquery-latest.js" type="text/javascript"></script>
        <script src="../asjs.min.js" type="text/javascript"></script>
        <script type="text/javascript">
          function MySprite() {
        		var that = new ASJS.Sprite();
        		
        		that.setBackgroundColor = function( color ) {
        			that.setCSS( "background-color", color );
        		}
        		
        		function onClick( event ) {
	            	var r = Math.floor( Math.random() * 255 );
	            	var g = Math.floor( Math.random() * 255 );
	            	var b = Math.floor( Math.random() * 255 );
	            	that.setBackgroundColor( "rgb( " + r + ", " + g + ", " + b + " )" );
	            	that.rotation = Math.round( Math.random() * 360 );
        		}
        		
        		(function() {
		            that.setSize( 40, 40 );
		            that.setBackgroundColor( "#336699" );
		            that.addEventListener( ASJS.MouseEvent.CLICK, onClick );
        		})();
        		
        		return that;
        	}
        	
          function Application() {
            var that = {};

            (function() {
              console.log( "<AS/JS> Application" );

              var i;
              var s;
              for ( i = 0; i < 10; i++ ) {
                s = new MySprite();
                s.move( 50 + i * 50 , 50 );
                s.setBackgroundColor( "rgb( " + ( i * 2 ) + ", " + ( i * 10 ) + ", " + ( i * 20 ) + " )" );
                stage.addChild( s );
              }
            })();

            return that;
          };

          ASJS.startASJS( Application );
        </script>
    </head>
    <body>
    </body>
</html>
```

## OTHER WAY

You can build your own minimized js from your code base, merged with used ASJS classes.
You need to add a php file:
```php
<?php
    include_once( "builder/buildJS.php" );
    $buildJS = new BuildJS();
    $buildJS->build( "bin/", "js/normal/com/asjs/Application.js", "bin/js/min/application.js" );
?>
```
The build function parameters:
* source base directory
* base class
* target file into wich generated the merged js
* minimized ( optional )

If you use this method, you need to change your html:
```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/normalize.css">
        <script src="js/lib/jquery-latest.js" type="text/javascript"></script>
        <script src="js/min/application.js" type="text/javascript"></script>
    </head>
    <body>
    </body>
</html>
```

And you have to change the Application.js:
```javascript
sourcePath( "js/normal/" );

includeOnce( "org/asjs/asjs.Main.js" );
includeOnce( "org/asjs/display/asjs.Stage.js" );
includeOnce( "org/asjs/display/asjs.Sprite.js" );

function Application() {
    var that = {};
   
    (function() {
        console.log( "<AS/JS> Application" );
       
        var s = new ASJS.Sprite();
          s.setSize( 100, 100 );
          s.move( 50, 50 );
          s.setCSS( "background-color", "#000000" );
          s.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
            console.log( "click :)" );
          });
        stage.addChild( s );
    })();
   
    return that;
};

ASJS.startASJS( Application );
```

And run your php.

---
