<?php
	class BuildCSS {
		private $output		= "";
		private $packages	= array();
		
		private $pregReplace	= array(
			array( "/\/\/(.*)\n/", "" ),
			array( "/\s+\n/", "" ),
			array( "/\/\*(\*(?!\/)|[^*])*\*\//", "" ),
			array( "/\s+/", " " )
		);
		
		private $strReplace		= array(
			array( ": ", ":" ),
			array( "( ", "(" ),
			array( " (", "(" ),
			array( ") ", ")" ),
			array( " )", ")" ),
			array( "{ ", "{" ),
			array( " {", "{" ),
			array( "} ", "}" ),
			array( " }", "}" ),
			array( ", ", "," ),
			array( " ,", "," ),
			array( "; ", ";" ),
			array( " ;", ";" ),
			array( "\n", "" ),
			array( "\r", "" ),
			array( "\t", "" )
		);
		
		public function __construct() {}
		
		public function clearCache() {
			$this->output	= "";
			$this->packages	= array();
		}
		
		public function addPackage( $path ) {
			array_push( $this->packages, $path );
		}
		
		public function build( $minimize = true ) {
			$this->collectSources();
			if ( $minimize ) $this->minimize();			
			$this->output = preg_replace( "/;+/", ";", $this->output );
		}
		
		public function save( $path ) {
			$f = fopen( $path, "w" );
			fwrite( $f, $this->output );
			fclose( $f );
		}
		
		private function getFolderContent( $path ) {
			$ret = "";
			if ( $handle = opendir( $path ) ) {
				while ( false !== ( $entry = readdir( $handle ) ) ) {
					if ( $entry != ".." && $entry != "." ) {
						$entryPath = $path . "/" . $entry;
						if ( is_dir( $entryPath ) ) $ret .= $this->getFolderContent( $entryPath );
						else $ret .= file_get_contents( $entryPath );
					}
				}

				closedir( $handle );
			}
			
			return $ret;
		}
		
		private function collectSources() {
			$i = -1;
			$l = count( $this->packages );
			while ( ++$i < $l ) $this->output .= $this->getFolderContent( $this->packages[ $i ] );
		}
		
		private function minimize() {
			$i = -1;
			$l = count( $this->pregReplace );
			while ( ++$i < $l ) $this->output = preg_replace( $this->pregReplace[ $i ][ 0 ], $this->pregReplace[ $i ][ 1 ], $this->output );
			
			$i = -1;
			$l = count( $this->strReplace );
			while ( ++$i < $l ) $this->output = str_replace( $this->strReplace[ $i ][ 0 ], $this->strReplace[ $i ][ 1 ], $this->output );
		}
		
	}
?>
