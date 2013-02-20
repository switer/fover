!function (global) {

	var _event = {
		trigger : function (evtType, args) {
		},
		statuschange : function (status, value) {

		}
	}
	var _fn = {
		readCnd : function (cnd) {
			if (cnd instanceof Array) {

			}
			else if (cnd instanceof Object)
		}
	}

	var fover = function () {
		this._status = {};
		this._handlers = [];
	}

	fover.prototype.on = function ( condition, handler, handlerName ) {

	}

	fover.prototype.off = function () {

	}

	fover.prototype.status = function (status) {

		!status && return JSON.parse( JSON.stringify( this._status ) );

		for ( var s in status ) {
			//TODO NaN equal
			if ( this._status[s] !== status[s] ) {

				this._status[s] = status[s];
				_event.statuschange(s, status[s]);
			}
		}
	}


	global.Fover = fover;

}(this);