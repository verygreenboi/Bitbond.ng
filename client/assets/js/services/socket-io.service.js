export default class SocketIO {
	constructor(Token) {
		'ngInject';
		this.token = Token;
    this.init();
  }
  init() {
    let host = window.location.origin+'/sockets';
    console.log("WEBSOCKET connecting to", host);

    this.socket = io.connect(host);

    this.socket.on('connect', () => {
      let sessionId = this.socket.io.engine.id;

      console.log("WEBSOCKET connected with session id", sessionId);

      this.socket.emit('new_user', { sid: sessionId, uid: this.token.get() });
    })
  }
}