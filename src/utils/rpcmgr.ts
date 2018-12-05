import socketio from 'socket.io-client';

class SocketMgr
{
    io:SocketIOClient.Socket;

    constructor(){
        this.io = socketio('http://localhost:52333')
    }
}

//export default new SocketMgr().io;