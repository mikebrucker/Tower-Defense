class HUD extends Phaser.Scene {
    
    constructor() {
        super('HUD');
    }

    create() {
        let buildbox = this.add.graphics(),
        demolishbox = this.add.graphics();
        
        
        buildbox.fillStyle(0x000000).lineStyle(4, 0xb22222).fillRoundedRect(4, 4, 232, 48, 8).setAlpha(0.33).strokeRoundedRect(4, 4, 232, 48, 8).setScrollFactor(0);
        demolishbox.fillStyle(0x000000).lineStyle(4, 0xb22222).fillRoundedRect(676, 4, 312, 48, 8).setAlpha(0.33).strokeRoundedRect(676, 4, 312, 48, 8).setScrollFactor(0);
        
        buildButton = this.add.text(8, 0, 'Toggle Build', {fontSize: '40px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 6})
        .setInteractive().on('pointerdown', function(pointer) {
            build = !build;
            demolish = false;
            this.input.setDefaultCursor('url(public/assets/cursor.cur), pointer');
            demolishButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
            if (build) {
                buildButton.setFill('gold').setStroke('firebrick').setAlpha(1);
            } else {
                buildButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
            }
        }, this).setScrollFactor(0).setAlpha(0.33);
        demolishButton = this.add.text(680, 0, 'Toggle Demolish', {fontSize: '40px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 6})
        .setInteractive().on('pointerdown', function() {
            build = false;
            demolish = !demolish;
            buildButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
            if (demolish) {
                demolishButton.setFill('gold').setStroke('firebrick').setAlpha(1);
                this.input.setDefaultCursor('url(public/assets/redcursor.cur), pointer');
            } else {
                demolishButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
                this.input.setDefaultCursor('url(public/assets/cursor.cur), pointer');
            }
        }, this).setScrollFactor(0).setAlpha(0.33);
    }

    update() {
    }
}