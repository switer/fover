!function (global) {

	var _event = {

		statuschange : function (status, value) {
			var handlers = this._handlers;

			_event.triggerChain.call(this, this._chainsCalling);

			for ( var h in handlers ) {
				var handler = handlers[h];

				var variables = _fn.readCnd(handler['condition']);
				var eCnd = handler['condition'];
				for (var i = 0; i < variables.length; i++) {
					eCnd = eCnd.replace(new RegExp(variables[i], 'g'), this._status[variables[i]])
				}

				if (eval(eCnd)) {
					delete this._handlers[h];

					var chainCall;
					while(chainCall = this._chains[h].shift()) this._chainsCalling.push(chainCall);

					handler['handler']();
					_event.triggerChain.call(this, this._chainsCalling);
				}
			}
		},
		triggerChain : function (chain) {
			var chainCall;
			while(chainCall = chain.shift()) chainCall();
		}
	}
	var _fn = {
		readCnd : function (cnd) {
			var variables = cnd.match(/[^\s\|\&\(\)]+/g);
			return variables;
		}
	}

	var fover = function () {
		this._status = {};
		this._handlers = [];
		this._index = 0;
		this._chains = {};
		this._chainsCalling = []; //当前正在准备调用的chain
		
		this._mainChainId = "__forver_id_main";
		this._curChain = this._mainChainId;
		this._chains[this._curChain] = [];

	}

	fover.prototype.on = function ( condition, handler, handlerName ) {
		var foverId = "__fover_id_" + this._index;
		this._index ++;

		this._handlers[foverId]  = {
			condition : condition,
			handler : handler,
			handlerName : handlerName
		};
		
		this._curChain = foverId;
		this._chains[foverId] = [];

		return this;
	}
	fover.prototype.then = function (fn) {
		this._chains[this._curChain].push(fn);
		return this;
	}
	fover.prototype.end =  function () {
		_event.triggerChain.call(this, this._chains[this._mainChainId])
		return this;
	}

	fover.prototype.status = function (status) {

		if (!status) return JSON.parse( JSON.stringify( this._status ) );
		var isChange = false;
		for ( var s in status ) {
			//TODO NaN equal
			if ( this._status[s] !== status[s] ) {
				this._status[s] = status[s];
				isChange = true;
			}
		}
		isChange && _event.statuschange.call(this, s, status[s]);
	}

	global.Fover = fover;

}(this);



// var fover = new Fover();

// fover
// 	.then(function () {
// 		console.log('empty on : 1');
// 	})
// 	.then(function () {
// 		console.log('empty on : 2');
// 	})
// 	.then(function () {
// 		console.log('empty on : 3');
// 	})
// 	.end();

// fover
// 	.on('success && login', function () {
// 		console.log('login done');
// 		fover.status({
// 			isVip : true
// 		})
// 	})
// 	.then(function () {
// 		console.log('login : then1');
// 	})
// 	.on('success && isVip', function () {
// 		console.log('done : isVip');
// 	})
// 	.then(function () {
// 		console.log('isVip : then1');
// 	})
// 	.then(function () {
// 		console.log('isVip : then2');
// 	})

// fover.status({
// 	success : true,
// 	login : true
// })
