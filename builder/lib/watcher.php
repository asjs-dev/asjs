<?php
	class Watcher {
		private $callback	= null;
		private $path		= null;
		private $timeout	= 1;
		private $isRunning	= false;
		private $stat		= 0;
		private $message	= "";
		
		public function __construct() {}
		
		public function setCallback( $callback ) {
			$this->callback = $callback;
		}
		
		public function setPathToWatch( $path ) {
			$this->path = $path;
		}
		
		public function setWaitingMessage( $message ) {
			$this->message = $message;
		}
		
		public function startWatching( $timeout ) {
			if ( $this->isRunning || $this->path == null || !is_array( $this->path ) || $this->callback == null ) return;
			
			$this->isRunning	= true;
			$this->timeout		= max( 1, (int)$timeout );
			
			$this->stat			= array();
			$i = -1;
			$l = count( $this->path );
			while ( ++$i < $l ) $this->stat[ $i ] = 0;
			
			$this->run();
		}
		
		private function getStat( $path ) {
			$ret = 0;
			if ( $handle = opendir( $path ) ) {
				while ( false !== ( $entry = readdir( $handle ) ) ) {
					if ( $entry != ".." && $entry != "." ) {
						$entryPath = $path . "/" . $entry;
						if ( is_dir( $entryPath ) ) $ret += $this->getStat( $entryPath );
						else $ret += stat( $entryPath )[ "mtime" ];
					}
				}

				closedir( $handle );
			}
			return $ret;
		}
		
		private function readlineTimeout( $sec, $def ) {
			return trim( shell_exec( 'bash -c ' . escapeshellarg( 'phprlto=' . escapeshellarg( $def ) . ';' . 'read -t ' . ( (int)$sec ) . ' phprlto;' . 'echo -ne "$phprlto\033[0K\r"' ) ) );
		}
		
		private function run() {
			echo "\033[0K\r" . $this->message;
			$i = -1;
			$l = count( $this->path );
			while ( ++$i < $l ) {
				$newStat = $this->getStat( $this->path[ $i ] );
				if ( $newStat != $this->stat[ $i ] ) {
					$this->stat[ $i ] = $newStat;
					call_user_func( $this->callback );
				}
			}
			$line = $this->readlineTimeout( $this->timeout, "" );
			if ( substr( $line, 0, 4 ) != "exit" ) $this->run();
		}
	
	}
?>
