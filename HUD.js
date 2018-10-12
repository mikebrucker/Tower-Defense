class HUD extends Phaser.Scene {
    
    constructor() {
        super('HUD');
    }

    create() {
        let time,
        buildbox = this.add.graphics(),
        demolishbox = this.add.graphics();
        
        
        buildbox.fillStyle(0x000000).lineStyle(4, 0xb22222).fillRoundedRect(4, 4, 232, 48, 8).setAlpha(0.33).strokeRoundedRect(4, 4, 232, 48, 8).setScrollFactor(0);
        demolishbox.fillStyle(0x000000).lineStyle(4, 0xb22222).fillRoundedRect(676, 4, 312, 48, 8).setAlpha(0.33).strokeRoundedRect(676, 4, 312, 48, 8).setScrollFactor(0);
        timerDisplay = this.add.text(496, 14, '', {fontSize: '20px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 3}).setOrigin(0.5);
        let min = 2,
        sec = 1;
        timer = setInterval( () => {
            sec--;
            if (sec < 0) {
                min--;
                sec = 59;
            }
            if (min < 0) {
                timerDisplay.setText('');
                min = 2;
                sec = 0;
                clearInterval(timer);
            } else if (sec < 10) {
                timerDisplay.setText(`${min}:0${sec}`);
            } else {
                timerDisplay.setText(`${min}:${sec}`);
            }
        }, 1000);
        resourcesDisplay = this.add.text(331, 14, `Resources: ${resources}`, {fontSize: '20px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 3}).setOrigin(0.5);
        killsDisplay = this.add.text(600, 14, `Kills: ${kills}`, {fontSize: '20px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 3}).setOrigin(0.5);

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