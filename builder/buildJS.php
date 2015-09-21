<?php
	class BuildJS {
		private $output = "";
		private $sourcePath = "";
		private $includedClasses = array();
		private $packages = array();
		
		public function __construct() {}
		
		public function addPackage( $path, $relativePath ) {
			array_push( $this->packages, array(
				"path" => $path,
				"relativePath" => $relativePath
			));
		}
	
		public function build( $projectFolder, $baseClass, $outputPath, $minimize = true ) {
			if ( !isset( $baseClass ) || $baseClass == "" ) {
				exit( "Missing Parameter: baseClass" );
			}
		
			$this->includeJS( $projectFolder, $baseClass, "baseClass", 0 );
		
			if ( $minimize ) {
				include_once( dirname(__FILE__) . "/jsmin.php" );
				$this->output = JSMin::minify( $this->output );
			}
		
			$this->output = preg_replace( "/\r+/", "\n", $this->output );
			$this->output = preg_replace( "/\n+/", "\n", $this->output );
			$this->output = str_replace( "\n", ";", $this->output );
			$this->output = preg_replace( "/;+/", ";", $this->output );
		
			$f = fopen( $outputPath, "w" );
			fwrite( $f, $this->output );
			fclose( $f );
		
			return $this->output;
		}
		
		private function openFile( $projectFolder, $path ) {
			$dir = $projectFolder;
			for ( $i = 0; $i < count( $this->packages ); $i++ ) {
				if ( stripos( $path, $this->packages[ $i ][ "path" ] ) > -1 ) {
					$explodePath = explode( $this->packages[ $i ][ "path" ], $path );
					$customDir = $this->packages[ $i ][ "relativePath" ];
					if ( file_exists( $customDir . $explodePath[ 1 ] ) ) {
						$dir = $customDir;
						$path = $explodePath[ 1 ];
					}
				}
			}
			return !file_exists( $dir . $path ) ? false : file( $dir . $path );
		}
	
		private function includeJS( $projectFolder, $path, $parent, $line ) {
			$fileContent = $this->openFile( $projectFolder, $path );
			if ( $fileContent === false ) {
				exit( "Missing dependency: " . $path . " in " . $parent . " on line " . ( $line + 1 ) );
			} else {
				$out = "";
				for ( $i = 0; $i < count( $fileContent ); $i++ ) {
					$isSourcePath = strpos( $fileContent[ $i ], "sourcePath" ) === 0;
					$isIncludeOnce = strpos( $fileContent[ $i ], "includeOnce" ) === 0;
					$line = $fileContent[ $i ];
					if ( $isSourcePath || $isIncludeOnce ) {
						$line = str_replace( "includeOnce(", "", $line );
						$line = str_replace( "sourcePath(", "", $line );
						$line = str_replace( ")", "", $line );
						$line = str_replace( "'", "", $line );
						$line = str_replace( "\"", "", $line );
						$line = str_replace( " ", "", $line );
						$line = str_replace( "\n", "", $line );
						$line = str_replace( "\r", "", $line );
						$line = str_replace( ";", "", $line );
						if ( $isIncludeOnce ) {
							if ( !isset( $this->includedClasses[ $line ] ) || $this->includedClasses[ $line ] != true ) {
								$this->includedClasses[ $line ] = true;
								$this->includeJS( $projectFolder, $this->sourcePath . $line, $path, $i );
							}
						} else if ( $isSourcePath ) {
							if ( $this->sourcePath == "" ) {
								$this->sourcePath = $line;
							}
						}
					} else {
						$out .= $line . "\n";
					}
				}
				$this->output .= ";" . $out;
			}
		}
	
	}
?>
