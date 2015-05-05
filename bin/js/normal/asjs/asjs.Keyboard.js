ASJS.Keyboard = function() {
	var that = {};
	var _pressedKeys = {};
	
	that.isPressed = function( which ) {
		return _pressedKeys[ which ];
	}
	
	that.addKeyListener = function( target, downCallback, upCallback ) {
		if ( !target ) return;
		
		that.removeKeyListener( target );
		
		target.addEventListener( "keydown", function( event ) {
			_pressedKeys[ event.which ] = true;
			if ( downCallback ) downCallback();
			return false;
		});
	
		target.addEventListener( "keyup", function( event ) {
			_pressedKeys[ event.which ] = false;
			if ( upCallback ) upCallback();
			return false;
		});
	}
	
	that.removeKeyListener = function( target ) {
		target.removeEventListener( "keydown" );
		target.removeEventListener( "keyup" );
	}
	
	/* CONSTRUCTOR */{}
	
	return that;
}
ASJS.Keyboard.BACKSPACE = 8;
ASJS.Keyboard.TAB = 9;
ASJS.Keyboard.ENTER = 13;
ASJS.Keyboard.SHIFT = 16;
ASJS.Keyboard.CTRL = 17;
ASJS.Keyboard.ALT = 18;
ASJS.Keyboard.PAUSE_BREAK = 19;
ASJS.Keyboard.CAPS_LOCK = 20;
ASJS.Keyboard.ESCAPE = 27;
ASJS.Keyboard.PAGE_UP = 33;
ASJS.Keyboard.PAGE_DOWN = 34;
ASJS.Keyboard.END = 35;
ASJS.Keyboard.HOME = 36;
ASJS.Keyboard.LEFT_ARROW = 37;
ASJS.Keyboard.UP_ARROW = 38;
ASJS.Keyboard.RIGHT_ARROW = 39;
ASJS.Keyboard.DOWN_ARROW = 40;
ASJS.Keyboard.INSERT = 45;
ASJS.Keyboard.DELETE = 46;
ASJS.Keyboard.NUM_0 = 48;
ASJS.Keyboard.NUM_1 = 49;
ASJS.Keyboard.NUM_2 = 50;
ASJS.Keyboard.NUM_3 = 51;
ASJS.Keyboard.NUM_4 = 52;
ASJS.Keyboard.NUM_5 = 53;
ASJS.Keyboard.NUM_6 = 54;
ASJS.Keyboard.NUM_7 = 55;
ASJS.Keyboard.NUM_8 = 56;
ASJS.Keyboard.NUM_9 = 57;
ASJS.Keyboard.A = 65;
ASJS.Keyboard.B = 66;
ASJS.Keyboard.C = 67;
ASJS.Keyboard.D = 68;
ASJS.Keyboard.E = 69;
ASJS.Keyboard.F = 70;
ASJS.Keyboard.G = 71;
ASJS.Keyboard.H = 72;
ASJS.Keyboard.I = 73;
ASJS.Keyboard.J = 74;
ASJS.Keyboard.K = 75;
ASJS.Keyboard.L = 76;
ASJS.Keyboard.M = 77;
ASJS.Keyboard.N = 78;
ASJS.Keyboard.O = 79;
ASJS.Keyboard.P = 80;
ASJS.Keyboard.Q = 81;
ASJS.Keyboard.R = 82;
ASJS.Keyboard.S = 83;
ASJS.Keyboard.T = 84;
ASJS.Keyboard.U = 85;
ASJS.Keyboard.V = 86;
ASJS.Keyboard.W = 87;
ASJS.Keyboard.X = 88;
ASJS.Keyboard.Y = 89;
ASJS.Keyboard.Z = 90;
ASJS.Keyboard.LEFT_block_KEY = 91;
ASJS.Keyboard.RIGHT_block_KEY = 92;
ASJS.Keyboard.SELECT_KEY = 93;
ASJS.Keyboard.NUMPAD_0 = 96;
ASJS.Keyboard.NUMPAD_1 = 97;
ASJS.Keyboard.NUMPAD_2 = 98;
ASJS.Keyboard.NUMPAD_3 = 99;
ASJS.Keyboard.NUMPAD_4 = 100;
ASJS.Keyboard.NUMPAD_5 = 101;
ASJS.Keyboard.NUMPAD_6 = 102;
ASJS.Keyboard.NUMPAD_7 = 103;
ASJS.Keyboard.NUMPAD_8 = 104;
ASJS.Keyboard.NUMPAD_9 = 105;
ASJS.Keyboard.MULTIPLY = 106;
ASJS.Keyboard.ADD = 107;
ASJS.Keyboard.SUBTRACT = 109;
ASJS.Keyboard.DECIMAL_POINT = 110;
ASJS.Keyboard.DIVIDE = 111;
ASJS.Keyboard.F1 = 112;
ASJS.Keyboard.F2 = 113;
ASJS.Keyboard.F3 = 114;
ASJS.Keyboard.F4 = 115;
ASJS.Keyboard.F5 = 116;
ASJS.Keyboard.F6 = 117;
ASJS.Keyboard.F7 = 118;
ASJS.Keyboard.F8 = 119;
ASJS.Keyboard.F9 = 120;
ASJS.Keyboard.F10 = 121;
ASJS.Keyboard.F11 = 122;
ASJS.Keyboard.F12 = 123;
ASJS.Keyboard.NUM_LOCK = 144;
ASJS.Keyboard.SCROLL_LOCK = 145;
ASJS.Keyboard.SEMICOLON = 186;
ASJS.Keyboard.EQUAL_SIGN = 187;
ASJS.Keyboard.COMMA = 188;
ASJS.Keyboard.DASH = 189;
ASJS.Keyboard.PERIOD = 190;
ASJS.Keyboard.FORWARD_SLASH = 191;
ASJS.Keyboard.GRAVE_ACCENT = 192;
ASJS.Keyboard.OPEN_BRACKET = 219;
ASJS.Keyboard.BACK_SLASH = 220;
ASJS.Keyboard.CLOSE_BRAKET = 221;
ASJS.Keyboard.SINGLE_QUOTE = 222;
