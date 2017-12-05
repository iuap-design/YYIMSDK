/**
 * @author Janusz Dziemidowicz rraptorr@nails.eu.org
 * @fileoverview All stuff related to WebSocket
 * <pre>
 * The WebSocket protocol is a bit of a mess. Various, incompatible,
 * protocol drafts were implemented in browsers. Fortunately, recently
 * a finished protocol was released in RFC6455. Further description
 * assumes RFC6455 WebSocket protocol version.
 *
 * WebSocket browser support. Current (November 2012) browser status:
 * - Chrome 16+ - works properly and supports RFC6455
 * - Firefox 16+ - works properly and support RFC6455 (ealier versions
 *   have problems with proxies)
 * - Opera 12.10 - supports RFC6455, but does not work at all if a
 *   proxy is configured (earlier versions do not support RFC6455)
 * - Internet Explorer 10+ - works properly and supports RFC6455
 *
 * Due to the above status, this code is currently recommended on
 * Chrome 16+, Firefox 16+ and Internet Explorer 10+. Using it on
 * other browsers is discouraged.
 *
 * Please also note that some users are only able to connect to ports
 * 80 and 443. Port 80 is sometimes intercepted by transparent HTTP
 * proxies, which mostly does not support WebSocket, so port 443 is
 * the best choice currently (it does not have to be
 * encrypted). WebSocket also usually does not work well with reverse
 * proxies, be sure to make extensive tests if you use one.
 *
 * There is no standard for XMPP over WebSocket. However, there is a
 * draft (http://tools.ietf.org/html/draft-ietf-xmpp-websocket-00) and
 * this implementation follows it.
 *
 * Tested servers:
 *
 * - node-xmpp-bosh (https://github.com/dhruvbird/node-xmpp-bosh) -
 *   supports RFC6455 and works with no problems since 0.6.1, it also
 *   transparently uses STARTTLS if necessary
 * - wxg (https://github.com/Gordin/wxg) - supports RFC6455 and works
 *   with no problems, but cannot connect to servers requiring
 *   STARTTLS (original wxg at https://github.com/hocken/wxg has some
 *   issues, that were fixed by Gordin).
 * - ejabberd-websockets
 *   (https://github.com/superfeedr/ejabberd-websockets) - does not
 *   support RFC6455 hence it does not work, adapting it to support
 *   RFC6455 should be quite easy for anyone knowing Erlang (some work
 *   in progress can be found on github)
 * - Openfire (http://www.igniterealtime.org/projects/openfire/) -
 *   unofficial plugin is available, but it lacks support
 *   for RFC6455 hence it does not work
 * - Apache Vysper (http://mina.apache.org/vysper/) - does
 *   not support RFC6455 hence does not work
 * - Tigase (http://www.tigase.org/) - works fine since 5.2.0.
 * - MongooseIM (https://github.com/esl/ejabberd) - a fork of ejabberd
 *   with support for XMPP over Websockets.
 * </pre>
 */

/*exported JSJaCWebSocketConnection */

/**
 * Instantiates a WebSocket session.
 * @class Implementation of {@link http://tools.ietf.org/html/draft-ietf-xmpp-websocket-00 | An XMPP Sub-protocol for WebSocket}.
 * @extends JSJaCConnection
 * @constructor
 * @param {Object} oArg connection properties.
 * @param {string} oArg.httpbase WebSocket connection endpoint (i.e. ws://localhost:5280)
 * @param {JSJaCDebugger} [oArg.oDbg] A reference to a debugger implementing the JSJaCDebugger interface.
 */
function JSJaCWebSocketConnection(oArg) {
	this.base = JSJaCConnection;
	this.base(oArg);

	this._ws = null;

	this.registerHandler('onerror', JSJaC.bind(this._cleanupWebSocket, this));
}

JSJaCWebSocketConnection.prototype = new JSJaCConnection();

JSJaCWebSocketConnection.prototype._cleanupWebSocket = function() {
	if(this._ws !== null) {
		this._ws.onclose = null;
		this._ws.onerror = null;
		this._ws.onopen = null;
		this._ws.onmessage = null;

		this._ws.close();
		this._ws = null;
	}
};

/**
 * Connect to a jabber/XMPP server.
 * @param {Object} oArg The configuration to be used for connecting.
 * @param {string} oArg.domain The domain name of the XMPP service.
 * @param {string} oArg.username The username (nodename) to be logged in with.
 * @param {string} oArg.resource The resource to identify the login with.
 * @param {string} oArg.password The user's password.
 * @param {string} [oArg.authzid] Authorization identity. Used to act as another user, in most cases not needed and rarely supported by servers. If present should be a bare JID (user@example.net).
 * @param {boolean} [oArg.allow_plain] Whether to allow plain text logins.
 * @param {boolean} [oArg.allow_scram] Whether to allow SCRAM-SHA-1 authentication. Please note that it is quite slow, do some testing on all required browsers before enabling.
 * @param {boolean} [oArg.register] Whether to register a new account.
 * @param {string} [oArg.authhost] The host that handles the actualy authorization. There are cases where this is different from the settings above, e.g. if there's a service that provides anonymous logins at 'anon.example.org'.
 * @param {string} [oArg.authtype] Must be one of 'sasl' (default), 'nonsasl', 'saslanon', or 'anonymous'.
 * @param {string} [oArg.xmllang] The requested language for this login. Typically XMPP server try to respond with error messages and the like in this language if available.
 */
JSJaCWebSocketConnection.prototype.connect = function(oArg) {
	this._cleanupWebSocket();
	this._setStatus('connecting');

	if(oArg.appType){
		this.appType = oArg.appType;				//rongqb for esn 20170223
	}
    
    if(oArg.clientIdentify){
    		this.clientIdentify = oArg.clientIdentify;	//rongqb for esn 20170223
    }

	this.domain = oArg.domain || 'localhost';
	this.username = oArg.username;
	this.resource = oArg.resource;
	this.pass = oArg.password || oArg.pass;
	this.authzid = oArg.authzid || '';
	this.register = oArg.register;

	this.authhost = oArg.authhost || this.domain;
	this.authtype = oArg.authtype || 'sasl';

	this.jid = this.username + '@' + this.domain;
	this.fulljid = this.jid + '/' + this.resource;

	if(oArg.allow_plain) {
		this._allow_plain = oArg.allow_plain;
	} else {
		this._allow_plain = JSJAC_ALLOW_PLAIN;
	}

	if(oArg.allow_scram) {
		this._allow_scram = oArg.allow_scram;
	} else {
		this._allow_scram = JSJAC_ALLOW_SCRAM;
	}

	if(oArg.xmllang && oArg.xmllang !== '') {
		this._xmllang = oArg.xmllang;
	} else {
		this._xmllang = 'en';
	}

	if(typeof WebSocket === 'undefined') {
		this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
		return;
	}

	this._ws = new WebSocket(this._httpbase, 'xmpp');
	this._ws.onclose = JSJaC.bind(this._onclose, this);
	this._ws.onerror = JSJaC.bind(this._onerror, this);
	this._ws.onopen = JSJaC.bind(this._onopen, this);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._onopen = function() {
	var data = {
		usr: this.username,
		atk: this.pass,
		br: this.resource
	}; 
	if(this.appType){ //rongqb for esn 20170223
		data.appType = this.appType;
	}
	if(this.clientIdentify){ //rongqb for esn 20170223
		data.clientIdentify = this.clientIdentify;
	}
	this._buildAndSend(new JumpPacket(data, OPCODE.AUTH.SEND));
	this._ws.onmessage = JSJaC.bind(this._onAuthMessage, this);
};

/**
 * 认证返回的包
 */
JSJaCWebSocketConnection.prototype._onAuthMessage = function(event) {
	var wsConn = this;
	if(event.data instanceof Blob) {
		var blob = event.data;
		var reader = new FileReader();
		reader.onload = function(evt) {
			if(evt.target.readyState == FileReader.DONE) {
				var arr = new Uint8Array(evt.target.result);
				// TODO if error

				// else
				var packetLen = wsConn._bytesToInteger(arr.subarray(PACKET_STRUCT.PACKET_LEN.START, PACKET_STRUCT.PACKET_LEN.END));
				var opcodeArr = arr.subarray(PACKET_STRUCT.OPCODE.START, PACKET_STRUCT.OPCODE.END);
				var bodyArr = arr.subarray(PACKET_HEADER_SIZE, PACKET_HEADER_SIZE + packetLen);
				// AUTH packet
				if(wsConn._bytesToInteger(opcodeArr) == OPCODE.AUTH.RECV) {
					var body = JSON.parse(wsConn._uint8ArrayToString(bodyArr));
					YYIMChat.log('【recv】\tOPCODE.AUTH.KEY\n\t' + JSON.stringify(body), 3);
					if(body.code != 200) {
						wsConn._handleEvent(OPCODE.STREAM_ERROR.KEY, {
							code: 401,
							message: 'not-authorized'
						});
						return;
					}
					wsConn._handleEvent('packet_in', body);
					wsConn._handleEvent(OPCODE.AUTH.KEY, body);

					wsConn._connected = true;
					wsConn._handleEvent('onconnect');
					wsConn._ws.onmessage = JSJaC.bind(wsConn._onJumpMessage, wsConn);
				} else if(wsConn._bytesToInteger(opcodeArr) == OPCODE.STREAM_ERROR.RECV) {
					var body = JSON.parse(wsConn._uint8ArrayToString(bodyArr));
					YYIMChat.log('【recv】\tOPCODE.AUTH.KEY\n\t' + JSON.stringify(body), 3);
					if(body.code != 200) {
						wsConn._handleEvent(OPCODE.STREAM_ERROR.KEY, {
							code: 401,
							message: 'not-authorized'
						});
						return;
					}
				}
			}

		}
		reader.readAsArrayBuffer(blob);
	}
};

/**
 * 发送JUMP类型的报文
 * @param jumpPacket
 */
JSJaCWebSocketConnection.prototype.sendJumpPacket = function(jumpPacket, cb, arg) {

	if(!this.connected()) {
		return false;
	}

	if(!jumpPacket || !jumpPacket.opcode) {
		return false;
		throw new Error('packet and its opcode cannot be null when send a packet.');
	}

	// 只有Message或IQ才可以回调
	if(cb && this._validateCallbackable(jumpPacket)) {
		if(!jumpPacket.content)
			throw new Error('packet content cannot be null when send a Message or IQ packet.');

		if(!jumpPacket.content.id) {
			// gen id
			jumpPacket.content.id = this._IDPrefix + this._ID++;
		}

		// 根据id注册回调
		this._registerPID(jumpPacket, cb, arg);
	}

	if(jumpPacket instanceof JumpPacket)
		YYIMChat.log('【send】\t ' + OPCODE_MAP.SEND.get(jumpPacket.opcode) + "\n\t" + JSON.stringify(jumpPacket), 3, new Date());

	try {
		// may be print logs
		// this._handleEvent(jumpPacket.opcode + '_out', jumpPacket);
		this._handleEvent('packet_out', jumpPacket);
	} catch(e) {
		this.oDbg.log(e.toString(), 1);
		return false;
	}

	this._buildAndSend(jumpPacket);
	return true;
};

JSJaCWebSocketConnection.prototype._buildAndSend = function(jumpPacket) {
	var bodyArr = null;
	
	var isNoContent = Object.prototype.toString.call(jumpPacket.content).slice(8,-1) == 'Undefined' 
	|| Object.prototype.toString.call(jumpPacket.content).slice(8,-1) == 'Null';
	
	var blob = new Blob([(isNoContent? '':JSON.stringify(jumpPacket.content))], {
		type: 'text/json'
	});
	
	var reader = new FileReader();
	var wsConn = this;
	reader.onload = function(event) {
		if(event.target.readyState == FileReader.DONE) {
			// bodyArr = this._stringToBytes(JSON.stringify(jumpPacket.content));
			bodyArr = this.result;
			var headerArr = new Uint8Array(PACKET_HEADER_SIZE);
			headerArr.set(wsConn._numToBytes(jumpPacket.sFrame, PACKET_STRUCT.CONSOLE_FRAME.SIZE), PACKET_STRUCT.CONSOLE_FRAME.START);
			headerArr.set(wsConn._numToBytes(jumpPacket.opcode, PACKET_STRUCT.OPCODE.SIZE), PACKET_STRUCT.OPCODE.START);
			if(isNoContent) {
				headerArr.set(wsConn._numToBytes(0, PACKET_STRUCT.PACKET_LEN.SIZE), PACKET_STRUCT.PACKET_LEN.START);
			} else {
				headerArr.set(wsConn._numToBytes(bodyArr.byteLength, PACKET_STRUCT.PACKET_LEN.SIZE), PACKET_STRUCT.PACKET_LEN.START);
			}
			headerArr.set(wsConn._numToBytes(jumpPacket.version, PACKET_STRUCT.VERSION.SIZE), PACKET_STRUCT.VERSION.START);
			headerArr.set(wsConn._numToBytes(jumpPacket.seqId, PACKET_STRUCT.SEQ_ID.SIZE), PACKET_STRUCT.SEQ_ID.START);

			var sendArr;
			if(isNoContent) {
				sendArr = headerArr;
			} else {
				sendArr = wsConn._concatUint8Array(headerArr, new Uint8Array(bodyArr));
			}
			wsConn._ws.send(sendArr);
		}
	};
	reader.readAsArrayBuffer(blob);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._handleOpenStream = function(event) {
	var open, stream;

	this.oDbg.log(event.data, 4);

	open = event.data;
	// skip XML prolog if any
	open = open.substr(open.indexOf('<stream:stream'));
	if(open.substr(-2) !== '/>' && open.substr(-16) !== '</stream:stream>') {
		// some servers send closed opening tag, some not
		open += '</stream:stream>';
	}
	stream = this._parseXml(open);
	if(!stream) {
		this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
		return;
	}

	// extract stream id used for non-SASL authentication
	this.streamid = stream.getAttribute('id');

	this.oDbg.log('got streamid: ' + this.streamid, 2);
	this._ws.onmessage = JSJaC.bind(this._handleInitialResponse, this);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._handleInitialResponse = function(event) {
	var doc = this._parseXml(event.data);
	if(!this._parseStreamFeatures(doc)) {
		this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
		return;
	}

	this._connected = true;

	if(this.register) {
		this._doInBandReg();
	} else {
		this._doAuth();
	}
};

/**
 * Disconnect from XMPP service
 *
 * When called upon leaving a page needs to use 'onbeforeunload' event
 * as Websocket would be closed already otherwise prior to this call.
 */
JSJaCWebSocketConnection.prototype.disconnect = function() {
	this._setStatus('disconnecting');

	if(!this.connected()) {
		return;
	}
	
	this._connected = false;

	this.oDbg.log('Disconnecting', 4);

	this._cleanupWebSocket();

	this.oDbg.log('Disconnected', 2);
	
	this._handleEvent('ondisconnect');
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._onclose = function() {
	this.oDbg.log('websocket closed', 2);
	if(this._status !== 'disconnecting') {
		this._connected = false;
		this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
	}
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._onerror = function() {
	this.oDbg.log('websocket error', 1);
	this._connected = false;
	this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
};

JSJaCWebSocketConnection.prototype._onJumpMessage = function(event) {
	var wsConn = this;
	if(event.data instanceof Blob) {
		var blob = event.data;
		var reader = new FileReader();
		reader.onload = function(evt) {
			if(evt.target.readyState == FileReader.DONE) {
				// TODO if error ?
				// else
				var arr = new Uint8Array(evt.target.result);
				var packetLen = wsConn._bytesToInteger(arr.subarray(PACKET_STRUCT.PACKET_LEN.START, PACKET_STRUCT.PACKET_LEN.END));
				var opcodeArr = arr.subarray(PACKET_STRUCT.OPCODE.START, PACKET_STRUCT.OPCODE.END);
				var bodyArr = arr.subarray(PACKET_HEADER_SIZE, PACKET_HEADER_SIZE + packetLen);
				wsConn._parseUint8Array(opcodeArr, bodyArr);
			}

		}
		reader.readAsArrayBuffer(blob);
	}
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._onmessage = function(event) {
	var wsConn = this;
	var stanza, node, packet;

	stanza = event.data;

	if(this._connected === true){
		this._setStatus('processing');
	}
	
	if(!stanza || stanza === '') {
		return;
	}

	// WebSocket works only on modern browsers, so it is safe to assume
	// that namespaceURI and getElementsByTagNameNS are available.
	node = this._parseXml(stanza);
	if(node.namespaceURI === NS_STREAM && node.localName === 'error') {
		if(node.getElementsByTagNameNS(NS_STREAMS, 'conflict').length > 0) {
			this._setStatus('session-terminate-conflict');
		}
		this._connected = false;
		this._handleEvent('onerror', JSJaCError('503', 'cancel',
			'remote-stream-error'));
		return;
	}

	packet = JSJaCPacket.wrapNode(node);
	if(!packet) {
		return;
	}

	this.oDbg.log('async recv: ' + event.data, 4);
	this._handleEvent('packet_in', packet);

	if(packet.pType && !this._handlePID(packet)) {
		this._handleEvent(packet.pType() + '_in', packet);
		this._handleEvent(packet.pType(), packet);
	}
};

/**
 * Parse single XML stanza. As proposed in XMPP Sub-protocol for WebSocket
 * draft, it assumes that every stanza is sent in a separate WebSocket frame,
 * which greatly simplifies parsing.
 * 
 * @private
 */
JSJaCWebSocketConnection.prototype._parseXml = function(s) {
	var doc;

	this.oDbg.log('Parsing: ' + s, 4);
	try {
		doc = XmlDocument.create('stream', NS_STREAM);
		if(s.trim() == '</stream:stream>') {
			// Consider session as closed
			this.oDbg.log("session terminated", 1);

			clearTimeout(this._timeout); // remove timer
			clearInterval(this._interval);
			clearInterval(this._inQto);

			try {
				JSJaCCookie.read(this._cookie_prefix + 'JSJaC_State').erase();
			} catch(e) {}

			this._connected = false;
			this._handleEvent('onerror', JSJaCError('503', 'cancel', 'session-terminate'));

			this.oDbg.log("Disconnected.", 1);
			this._handleEvent('ondisconnect');

			return null;
		} else if(s.indexOf('<stream:stream') === -1) {
			// Wrap every stanza into stream element, so that XML namespaces work properly.
			doc.loadXML("<stream:stream xmlns:stream='" + NS_STREAM + "' xmlns='jabber:client'>" + s + "</stream:stream>");
			if(typeof doc.documentElement.firstChild.xml == 'undefined')
				doc.documentElement.firstChild.xml = s;
			return doc.documentElement.firstChild;
		} else {
			doc.loadXML(s);
			return doc.documentElement;
		}
	} catch(e) {
		this.oDbg.log('Error: ' + e);
		this._connected = false;
		this._handleEvent('onerror', JSJaCError('500', 'wait', 'internal-service-error'));
	}

	return null;
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._getInitialRequestString = function() {
	var streamto, reqstr;

	streamto = this.domain;
	if(this.authhost) {
		streamto = this.authhost;
	}

	reqstr = '<stream:stream to="' + streamto + '" xmlns="jabber:client" xmlns:stream="' + NS_STREAM + '"';
	if(this.authtype === 'sasl' || this.authtype === 'saslanon') {
		reqstr += ' version="1.0"';
	}
	reqstr += '>';
	return reqstr;
};

JSJaCWebSocketConnection.prototype.send = function(packet, cb, arg) {
	this._ws.onmessage = JSJaC.bind(this._onmessage, this);
	if(!packet || !packet.pType) {
		this.oDbg.log('no packet: ' + packet, 1);
		return false;
	}

	if(!this.connected()) {
		return false;
	}

	// remember id for response if callback present
	if(cb) {
		if(!packet.getID()) {
			packet.setID('JSJaCID_' + this._ID++); // generate an ID
		}

		// register callback with id
		this._registerPID(packet, cb, arg);
	}

	try {
		this._handleEvent(packet.pType() + '_out', packet);
		this._handleEvent('packet_out', packet);
		this._ws.send(packet.xml());
	} catch(e) {
		this.oDbg.log(e.toString(), 1);
		return false;
	}

	return true;
};

/**
 * Resuming connections is not supported by WebSocket.
 */
JSJaCWebSocketConnection.prototype.resume = function() {
	return false; // not supported for websockets
};

/**
 * Suspending connections is not supported by WebSocket.
 */
JSJaCWebSocketConnection.prototype.suspend = function() {
	return false; // not supported for websockets
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthScramSha1S1 = function(event) {
	var el = this._parseXml(event.data);
	return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthScramSha1S1, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthScramSha1S2 = function(event) {
	var el = this._parseXml(event.data);
	return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthScramSha1S2, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthDigestMd5S1 = function(event) {
	var el = this._parseXml(event.data);
	return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthDigestMd5S1, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthDigestMd5S2 = function(event) {
	var el = this._parseXml(event.data);
	return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthDigestMd5S2, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthDone = function(event) {
	var el = this._parseXml(event.data);
	return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthDone, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._reInitStream = function(cb) {
	var reqstr, streamto = this.domain;
	if(this.authhost) {
		streamto = this.authhost;
	}

	reqstr = '<stream:stream xmlns:stream="' + NS_STREAM + '" xmlns="jabber:client" to="' + streamto + '" version="1.0">';
	this._sendRaw(reqstr, cb);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._sendRaw = function(xml, cb, arg) {
	if(!this._ws) {
		// Socket might have been closed already because of an 'onerror'
		// event. In this case we'd try to send a closing stream element
		// 'ondisconnect' which won't work.
		return false;
	}
	if(cb) {
		this._ws.onmessage = JSJaC.bind(cb, this, arg);
	}
	this._ws.send(xml);
	return true;
};

/**
 * 解析Uint8Array为Jump Packet
 * 
 * @param opcodeArr
 * @param bodyArr
 */
JSJaCWebSocketConnection.prototype._parseUint8Array = function(opcodeArr, bodyArr) {
	if(this._connected === true){
		this._setStatus('processing');
	}
	if(opcodeArr && bodyArr) {
		var event = OPCODE_MAP.RECV.get(this._bytesToInteger(opcodeArr));
		YYIMChat.log('【recv】\t' + OPCODE_MAP.RECV.get(this._bytesToInteger(opcodeArr)) + '\n\t' + this._uint8ArrayToString(bodyArr), 3, new Date());
		// ping or auth
		if(bodyArr.byteLength == 0) {
			this._handleEvent('packet_in');
			this._handleEvent(event);
			return;
		}
		try {
			var body = JSON.parse(this._uint8ArrayToString(bodyArr));
			if(!this._handlePID(body)) {
				this._handleEvent('packet_in', body);
				this._handleEvent(event, body);
			}
		} catch(e) {}
	}
};