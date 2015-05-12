<?php
	$GLOBALS[ "relativePathToASJS" ] = "/../bin/js/normal/asjs/";
	$GLOBALS[ "output" ] = "";
	$GLOBALS[ "includedClasses" ] = array();
	$GLOBALS[ "includedClasses" ][ $baseClass ] = true;
	
	function openFile( $projectFolder, $path ) {
		$dir = $projectFolder;
		if ( stripos( $path, "js/normal/asjs/" ) > -1 ) {
			$asjsExplodePath = explode( "js/normal/asjs/", $path );
			$asjsDir = dirname(__FILE__) . $GLOBALS[ "relativePathToASJS" ];
			if ( file_exists( $asjsDir . $asjsExplodePath[ 1 ] ) ) {
				$dir = $asjsDir;
				$path = $asjsExplodePath[ 1 ];
			}
		}
		if ( !file_exists( $dir . $path ) ) {
			return false;
		}
		return file( $dir . $path );
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
