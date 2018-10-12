class BootGame extends Phaser.Scene {

    constructor() {
        super({ key: 'bootGame', active: true });
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
            this.scene.start('sceneGame');
        }, this);

        this.load.tilemapTiledJSON('map', 'public/images/sunken_defense.json');
        this.load.image('tiles', 'public/images/ashlands_tileset.png');
        this.load.image('tower_overlay', 'public/images/tower_overlay.png');
        this.load.atlas('headtower', 'public/images/headtower.png', 'public/images/headtower.json');
        this.load.atlas('hydralisk', 'public/images/hydralisk.png', 'public/images/hydralisk.json');
        this.load.atlas('bullet', 'public/images/bullet.png', 'public/images/bullet.json');
        // this.load.plugin('moveto-plugin', 'public/assets/moveto-plugin.js')
        // this.load.plugin('MoveTo', 'public/assets/MoveTo.js')
        // this.load.plugin('TickTask', 'public/assets/TickTask.js')
        // this.load.plugin('GetSceneObject', 'public/assets/GetSceneObject.js')
    }

    create() {
        this.anims.create({
            key: 'headtower_up',
            frames: this.anims.generateFrameNames('headtower', { prefix: 'up', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_do',
            frames: this.anims.generateFrameNames('headtower', { prefix: 'do', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_le',
            frames: this.anims.generateFrameNames('headtower', { prefix: 'le', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_ri',
            frames: this.anims.generateFrameNames('headtower', { prefix: 'ri', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_ul',
            frames: this.anims.generateFrameNames('headtower', { prefix: 'ul', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_ur',
            frames: this.anims.generateFrameNames('headtower', { prefix: 'ur', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_dl',
            frames: this.anims.generateFrameNames('headtower', { prefix: 'dl', start: 1, end: 4 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'headtower_dr',
            frames: this.anims.generateFrameNames('headtower', { prefix: 'dr', start: 1, end: 4 }),
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
            frameRate: 10,
            repeat: -1
        })
    }
}