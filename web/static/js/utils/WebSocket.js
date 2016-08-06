import config from '../config';
import { Socket } from 'phoenixjs';

class WebSocket {
  constructor(socketUrl) {
    this.socketUrl = socketUrl;
    this.socket = new Socket(this.socketUrl);
    this.channel = null;
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  join(channelName, params) {
    this.channel = this.socket.channel(channelName, params);
    return this.channel.join();
  }

  leave() {
    return this.channel.leave();
  }
}

export default new WebSocket(config.api.socket);
