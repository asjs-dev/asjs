<?php
	include_once( dirname(__FILE__) . "/lib/colors.php" );
	include_once( dirname(__FILE__) . "/lib/buildJS.php" );
	include_once( dirname(__FILE__) . "/lib/buildCSS.php" );
	include_once( dirname(__FILE__) . "/lib/watcher.php" );
	
	class Builder {
		private $config		= "";
		
		private $colors		= null;
		private $buildJS	= null;
		private $buildCSS	= null;
		private $watcher	= null;
		
		public function __construct() {}
		
		public function run( $config ) {
			$this->config	= $config;
			
			if ( !isset( $this->config[ "minimize" ] ) ) {
				$minimizeCL = readline( "minimize script: " );
				$this->config[ "minimize" ] = $minimizeCL == "true";
			}
			
			if ( !isset( $this->config[ "watching" ] ) ) {
				$watchingCL = readline( "watching modifications: " );
				$this->config[ "watching" ] = $watchingCL == "true";
			}
			
			$this->colors	= new Colors();
			$this->buildJS	= new BuildJS();
			$this->buildCSS	= new BuildCSS();
			$this->watcher	= new Watcher();
			
			if ( $this->config[ "watching" ] ) $this->watching();
			else $this->build();
		}
		
		private function build() {
			echo date( "H:i:s" ) . "	";
		
			try {
				$jsConfig = $this->config[ "js" ];
				$cssConfig = $this->config[ "css" ];
				
				$i = -1;
				$l = count( $jsConfig[ "packages" ] );
				while ( ++$i < $l ) {
					$this->buildJS->addPackage( $jsConfig[ "packages" ][ $i ][ "path" ], $jsConfig[ "packages" ][ $i ][ "relativePath" ] );
				}
				
				$this->buildJS->build( $jsConfig[ "sourcePath" ], $jsConfig[ "baseClass" ], $this->config[ "minimize" ] );
				$this->buildJS->save( $jsConfig[ "output" ] );
			
				$i = -1;
				$l = count( $cssConfig[ "packages" ] );
				while ( ++$i < $l ) {
					$this->buildCSS->addPackage( $cssConfig[ "packages" ][ $i ] );
				}
				
				$this->buildCSS->build( $this->config[ "minimize" ] );
				$this->buildCSS->save( $cssConfig[ "output" ] );
			
				echo $this->colors->getColoredString( "build complete", "yellow" );
			} catch( Exception $e ) {
				echo $this->colors->getColoredString( $e->getMessage(), "light_red" );
			}
			
			$this->buildJS->clearCache();
			$this->buildCSS->clearCache();
		
			echo "\n";
		}
		
		private function watching() {
			if ( !isset( $this->config[ "watcherTimeout" ] ) ) {
				$timeoutCL	= readline( "watcher timeout: " );
				$this->config[ "watcherTimeout" ]	= max( 1, (int)$timeoutCL );
			}
		
			system( 'clear' );
		
			ini_set( 'xdebug.max_nesting_level', -1 );
		
			$this->watcher->setCallback( function() {
				$this->build();
			});
			$this->watcher->setPathToWatch( $this->config[ "watcherPath" ] );
			$this->watcher->setWaitingMessage( "waiting: " );
			$this->watcher->startWatching( $this->config[ "watcherTimeout" ] );
		
			ini_set( 'xdebug.max_nesting_level', 100 );
		}
		
	}
?>
