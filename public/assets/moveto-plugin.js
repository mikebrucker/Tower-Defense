import MoveTo from 'MoveTo.js';

class MoveToPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new MoveTo(gameObject, config);
    }
}

export default MoveToPlugin;