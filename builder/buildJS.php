<?php
	$GLOBALS[ "output" ] = "";
	$GLOBALS[ "includedClasses" ] = array();
	$GLOBALS[ "includedClasses" ][ $baseClass ] = true;
	
	$GLOBALS[ "packages" ] = array();
	addPackage( "js/normal/asjs/", dirname(__FILE__) . "/../bin/js/normal/asjs/" );
	
	function openFile( $projectFolder, $path ) {
		$dir = $projectFolder;
		for ( $i = 0; $i < count( $GLOBALS[ "packages" ] ); $i++ ) {
			if ( stripos( $path, $GLOBALS[ "packages" ][ $i ][ "path" ] ) > -1 ) {
				$explodePath = explode( $GLOBALS[ "packages" ][ $i ][ "path" ], $path );
				$customDir = $GLOBALS[ "packages" ][ $i ][ "relativePath" ];
				if ( file_exists( $customDir . $explodePath[ 1 ] ) ) {
					$dir = $customDir;
					$path = $explodePath[ 1 ];
				}
			}
		}
		return !file_exists( $dir . $path ) ? false : file( $dir . $path );
	}
	
	function addPackage( $path, $relativePath ) {
		array_push( $GLOBALS[ "packages" ], array(
			"path" => $path,
			"relativePath" => $relativePath
		));
	}
	
	function includeJS( $projectFolder, $path, $parent, $line ) {
		$fileContent = openFile( $projectFolder, $path );
		if ( $fileContent === false ) {
			exit( "Missing dependency: " . $path . " in " . $parent . " at line " . ( $line + 1 ) );
		} else {
			$out = "";
			for ( $i = 0; $i < count( $fileContent ); $i++ ) {
				if ( strpos( $fileContent[ $i ], "import " ) === 0 || strpos( $fileContent[ $i ], "includeOnce" ) === 0 ) {
					$line = str_replace( "import ", "", $fileContent[ $i ] );
					$line = str_replace( ";", "", $line );
					$line = str_replace( "includeOnce(", "", $line );
					$line = str_replace( ")", "", $line );
					$line = str_replace( "'", "", $line );
					$line = str_replace( "\"", "", $line );
					$line = str_replace( " ", "", $line );
					$line = str_replace( "\n", "", $line );
					$line = str_replace( "\r", "", $line );
					if ( $GLOBALS[ "includedClasses" ][ $line ] != true ) {
						$GLOBALS[ "includedClasses" ][ $line ] = true;
						includeJS( $projectFolder, $line, $path, $i );
					}
				} else {
					$out .= $fileContent[ $i ] . "\n";
				}
			}
			$GLOBALS[ "output" ] .= ";" . $out;
		}
	}
	
	function buildJS( $projectFolder, $baseClass, $outputPath, $minimize = true ) {
		if ( !isset( $baseClass ) || $baseClass == "" ) {
			exit( "Missing Parameter: baseClass" );
		}
		
		includeJS( $projectFolder, $baseClass, "baseClass", 0 );
		
		if ( $minimize ) {
			include_once( dirname(__FILE__) . "/jsmin.php" );
			$GLOBALS[ "output" ] = JSMin::minify( $GLOBALS[ "output" ] );
		}
		
		$GLOBALS[ "output" ] = preg_replace( "/\r+/", "\n", $GLOBALS[ "output" ] );
		$GLOBALS[ "output" ] = preg_replace( "/\n+/", "\n", $GLOBALS[ "output" ] );
		$GLOBALS[ "output" ] = str_replace( "\n", ";", $GLOBALS[ "output" ] );
		$GLOBALS[ "output" ] = preg_replace( "/;+/", ";", $GLOBALS[ "output" ] );
		
		$f = fopen( $outputPath, "w" );
		fwrite( $f, $GLOBALS[ "output" ] );
		fclose( $f );
		
		header( "Content-type: text/javascript" );
		echo $GLOBALS[ "output" ];
	}
?>
