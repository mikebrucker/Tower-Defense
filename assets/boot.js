class BootGame extends Phaser.Scene {

    constructor() {
        super({ key: 'BootGame', active: true });
    }

    preload() {
        let progressBox = this.add.graphics(),
        progressBar = this.add.graphics(),
        loadText = this.add.text(496, 300, 'Loading... 0%', { fontSize: '24px', fill: 'gold', fontFamily: 'Arial', stroke: 'firebrick', strokeThickness: 8 }).setOrigin(0.5),
        assetText = this.add.text(496, 360, 'Loading Asset:', { fontSize: '24px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 4 }).setOrigin(0.5);
        progressBox.fillStyle(0xB22222, 0.8);
        progressBox.fillRect(20, 270, 952, 60);
        
        this.load.on('progress', function(value) {
            progressBar.clear();
            progressBar.fillStyle(0xFFD700, 1);
            progressBar.fillRect(30, 280, 932 * value, 40);
            loadText.setText(`Loading... ${Math.round(value * 100)}%`);
        }, this);
        
        this.load.on('fileprogress', function(file) {
            assetText.setText(`Loading Asset: ${file.key}`);
        });
        
        this.load.on('complete', function() {
            this.scene.start('GameScene');
        }, this);

        this.load.tilemapTiledJSON('map', '../images/sunken_defense_path.json');
        this.load.image('tiles', '../images/ashlands_tileset.png');
        this.load.image('tower_overlay', '../images/tower_overlay.png');
        this.load.image('bullet_single', '../images/bullet_single.png');
        this.load.atlas('headtower', '../images/headtower.png', '../images/headtower.json');
        this.load.atlas('hydralisk', '../images/hydralisk.png', '../images/hydralisk.json');
        this.load.atlas('lurker', '../images/lurker.png', '../images/lurker.json');
        this.load.atlas('bullet', '../images/bullet.png', '../images/bullet.json');
        this.load.audio('hydra_birth', '../audio/hydra_birth.ogg');
        this.load.audio('hydra_death', '../audio/hydra_death.ogg');
        this.load.audio('lurker_birth', '../audio/lurker_birth.ogg');
        this.load.audio('lurker_death', '../audio/lurker_death.ogg');
        this.load.audio('bullet', '../audio/bullet.ogg');
        this.load.audio('build_tower', '../audio/build_tower.ogg');
        this.load.audio('demolish_tower', '../audio/demolish_tower.ogg');
        this.load.audio('beep', '../audio/beep.ogg');
        this.load.audio('egg', '../audio/egg.ogg');
        this.load.audio('victory', '../audio/victory.ogg');
        this.load.audio('lose', '../audio/lose.ogg');
        this.load.audio('upgrade', '../audio/upgrade.ogg');
        this.load.audio('error', '../audio/error.ogg');
        this.load.audio('escape', '../audio/escape.ogg');
        this.load.audio('game_track', '../audio/battle.wav');
    }

    create() {
        this.anims.create({
            key: 'headtower_up',
            frames: [ { key: 'headtower', frame: 'up1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'up', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_do',
            frames: [ { key: 'headtower', frame: 'do1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'do', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_le',
            frames: [ { key: 'headtower', frame: 'le1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'le', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_ri',
            frames: [ { key: 'headtower', frame: 'ri1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'ri', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_ul',
            frames: [ { key: 'headtower', frame: 'ul1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'ul', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_ur',
            frames: [ { key: 'headtower', frame: 'ur1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'ur', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_dl',
            frames: [ { key: 'headtower', frame: 'dl1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'dl', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_dr',
            frames: [ { key: 'headtower', frame: 'dr1' } ],
            // frames: this.anims.generateFrameNames('headtower', { prefix: 'dr', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_side',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_side', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_up',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_up', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_down',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_down', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_udiag',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_udiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_ddiag',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_ddiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_uldiag',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_uldiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_dldiag',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_dldiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_uhdiag',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_uhdiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_dhdiag',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'walk_dhdiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hydra_birth',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'birth', start: 1, end: 18 }),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'hydra_death',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'death', start: 1, end: 4 }),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'hydra_corpse',
            frames: this.anims.generateFrameNames('hydralisk', { prefix: 'death', start: 5, end: 12 }),
            frameRate: 1,
            repeat: 0
        })
        this.anims.create({
            key: 'hydra_stop',
            frames: [ { key: 'hydralisk', frame: 'walk_down1' } ],
            frameRate: 20,
        });
        this.anims.create({
            key: 'bullet',
            frames: this.anims.generateFrameNames('bullet', { prefix: 'bullet', start: 1, end: 8 }),
            frameRate: 30,
            repeat: -1
        })
        this.anims.create({
            key: 'bullet_single',
            frames: [ { key: 'bullet_single', frame: 0 } ],
            frameRate: 20,
        });
        this.anims.create({
            key: 'lurker_side',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'side', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_up',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'up', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_down',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'down', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_udiag',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'udiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_ddiag',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'ddiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_uldiag',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'uldiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_dldiag',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'dldiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_uhdiag',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'uhdiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_dhdiag',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'dhdiag', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lurker_birth',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'birth', start: 1, end: 23 }),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'lurker_death',
            frames: this.anims.generateFrameNames('lurker', { prefix: 'death', start: 1, end: 10 }),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'lurker_stop',
            frames: [ { key: 'lurker', frame: 'down1' } ],
            frameRate: 20,
        });
    }
}