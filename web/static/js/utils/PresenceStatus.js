import { Presence } from 'phoenixjs';

class PresenceStatus {
  constructor(channel, userId) {
    this.userId = userId;
    this.channel = channel;

    this.presences = {};

    this.init();
  }

  init() {
    this.channel.on('participant:presence_state', (state) => {
      Presence.syncState(this.presences, state);
      this.onChange(this.checkIfPresent(), this.presences);
    });

    this.channel.on('participant:presence_diff', (diff) => {
      Presence.syncDiff(this.presences, diff);
      this.onChange(this.checkIfPresent(), this.presences);
    });
  }

  onChange() {}

  checkIfPresent() {
    const list = Presence.list(this.presences, this.listBy);

    return !!list.find(u => u.id === this.userId);
  }

  listBy(id, { metas: metas }) {
    return {
      id: id,
      onlineAt: metas[0].online_at
    }
  }
}

export default PresenceStatus;
