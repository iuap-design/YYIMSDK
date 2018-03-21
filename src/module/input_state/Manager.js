var Manager = (function() {
	
	function monitor() {
		YYIMChat.getConnection().registerHandler(OPCODE.INPUT_STATE.KEY, function(state) {
			if(state && state.from){
				state.from = YYIMChat.getJIDUtil().getID(state.from);
			}
			if(state && state.to){
				state.to = YYIMChat.getJIDUtil().getID(state.to);
			}
			onInputStateChanged(state);
		});
	}
	
	var onInputState = {};
	function onInputStateChanged(arg){
		onInputState[arg.from] = onInputState[arg.from] || {
			timer: 0,
			param: arg
		};
		
		onInputState[arg.from].param = arg;
		
		if(onInputState[arg.from].timer){
			clearTimeout(onInputState[arg.from].timer);
			onInputState[arg.from].timer = 0;
		}
		
		if(arg.typing == 0){
			var param = onInputState[arg.from].param;
			onInputState[arg.from] = null;
			YYIMChat.onInputStateChanged(param);
		}else{
			YYIMChat.onInputStateChanged(onInputState[arg.from].param);
			onInputState[arg.from].timer = setTimeout(function(){
				var param = onInputState[arg.from].param;
				param.typing = 0;
				onInputState[arg.from] = null;
				YYIMChat.onInputStateChanged(param);
			},onInputState[arg.from].param.timeout || YYIMChat.getConfig().INPUT_STATE.INTERVAL);
		}
	}
	
	function sendInputState(arg){
		var msgBody = {
		   "id": Math.uuid(),
		   "to": YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(arg.to)),
		   "contentType": arg.contentType,
		   "typing": arg.typing
	 	};
	 	
		YYIMChat.getConnection().send(new JumpPacket(msgBody, OPCODE.INPUT_STATE.SEND));
	}
	
	var inputState = {};
	function inputStateChange(arg){
		inputState[arg.to] = inputState[arg.to] || {
			timer: 0,
			param: arg,
			lastUpdateTime: 0,
			lastSendTime: 0
		};
		
		if(inputState[arg.to].timer){
			clearTimeout(inputState[arg.to].timer);
			inputState[arg.to].timer = 0;
		}
		
		inputState[arg.to].lastUpdateTime = new Date().getTime();
		
		if((inputState[arg.to].lastUpdateTime - inputState[arg.to].lastSendTime) > YYIMChat.getConfig().INPUT_STATE.INTERVAL
			|| arg.contentType != inputState[arg.to].param.contentType){
				
			inputState[arg.to].param = arg;
			inputState[arg.to].param.typing = 1;
			inputState[arg.to].lastSendTime = inputState[arg.to].lastUpdateTime;
			sendInputState(inputState[arg.to].param);
		}
			
		inputState[arg.to].timer = setTimeout(function(){
			var param = inputState[arg.to].param;
			param.typing = 0;
			inputState[arg.to] = null;
			
			sendInputState(param);
		},YYIMChat.getConfig().INPUT_STATE.INTERVAL);
	}
	
	return {
		monitor: monitor,
		inputStateChange: inputStateChange
	};
})();