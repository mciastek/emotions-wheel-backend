import config from '../config';
import { Socket } from 'phoenix';

class WebSocket {
  constructor(socketUrl) {
    this.socketUrl = socketUrl;
    this.socket = new Socket(this.socketUrl);
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  join(channelName) {
    this.channel = this.socket.channel(channelName);
    this.channel.join();
  }

  leave() {
    this.channel.leave();
  }
}

export default new WebSocket(config.api.socket);
