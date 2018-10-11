let controls,
build = false,
demolish = false,
buildGraphic,
logWorldLayer,
blankLayer,
births,
hydralisks,
deaths,
headtowers;

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
    }
}

class HUD extends Phaser.Scene {
    
    constructor() {
        super('HUD');
    }

    create() {
        let buildbox = this.add.graphics(),
        demolishbox = this.add.graphics();
        
        
        buildbox.fillStyle(0x000000).lineStyle(4, 0xb22222).fillRoundedRect(4, 4, 232, 48, 8).setAlpha(0.33).strokeRoundedRect(4, 4, 232, 48, 8).setScrollFactor(0);
        demolishbox.fillStyle(0x000000).lineStyle(4, 0xb22222).fillRoundedRect(676, 4, 312, 48, 8).setAlpha(0.33).strokeRoundedRect(676, 4, 312, 48, 8).setScrollFactor(0);
        
        let buildButton = this.add.text(8, 0, 'Toggle Build', {fontSize: '40px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 6})
        .setInteractive().on('pointerdown', function(pointer) {
            build = !build;
            demolish = false;
            demolishButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
            if (build) {
                buildButton.setFill('gold').setStroke('firebrick').setAlpha(1);
            } else {
                buildButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
            }
        }, this).setScrollFactor(0).setAlpha(0.33);
        let demolishButton = this.add.text(680, 0, 'Toggle Demolish', {fontSize: '40px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 6})
        .setInteractive().on('pointerdown', function() {
            build = false;
            demolish = !demolish;
            buildButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
            if (demolish) {
                demolishButton.setFill('gold').setStroke('firebrick').setAlpha(1);
            } else {
                demolishButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
            }
        }, this).setScrollFactor(0).setAlpha(0.33);
    }

    update() {

    }
}

function killHydralisks(hydralisk, headtower) {
    let death = deaths.create(hydralisk.x, hydralisk.y, 'hydralisk').anims.play('hydra_death').on('animationcomplete', () => {
        death.destroy();
        let corpse = deaths.create(hydralisk.x, hydralisk.y, 'hydralisk').anims.play('hydra_corpse').on('animationcomplete', () => {
            corpse.disableBody(true, false);
            setTimeout( () => {
                corpse.destroy();
            }, 6000);
        });
    });
    hydralisk.destroy();
}

class SceneGame extends Phaser.Scene {
    
    constructor() {
        super('sceneGame');
    }

    create() {
        this.scene.launch('HUD');
        this.input.setDefaultCursor('url(public/assets/cursor.cur), pointer')

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('ashlands', 'tiles');
        const worldLayer = map.createDynamicLayer('World', tileset, 0, 0);
        const aboveLayer = map.createStaticLayer('Above', tileset, 0, 0);
        logWorldLayer = worldLayer.layer.data;
        
        worldLayer.setCollisionBetween(259, 268, true, 'World');
        worldLayer.setCollisionBetween(519, 534, true, 'World');
        
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.centerToBounds();
        
        let cursors = this.input.keyboard.createCursorKeys(),
        controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5,
            disableCull: true,
        };
        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
        
        headtowers = this.physics.add.group({ immovable: true });
        births = this.physics.add.group();
        hydralisks = this.physics.add.group();
        deaths = this.physics.add.group();

        buildGraphic = this.add.image(0, 0, 'tower_overlay').setAlpha(0);
        
        this.physics.add.collider(hydralisks, worldLayer);

        setInterval( () => {
            for (let i = 0; i < 10; i++) {
                    let birth1 = births.create(96, 256 + (i * 32), 'hydralisk').setCircle(16, 6, 13),
                    birth2 = births.create(128, 256 + (i * 32), 'hydralisk').setCircle(16, 6, 13);
                    birth1.anims.play('hydra_birth').on('animationcomplete', () => {
                        hydralisks.create(96, 256 + (i * 32), 'hydralisk').setCircle(16, 6, 13);
                        birth1.destroy();
                    });
                    birth2.anims.play('hydra_birth').on('animationcomplete', () => {
                        hydralisks.create(128, 256 + (i * 32), 'hydralisk').setCircle(16, 6, 13);
                        birth2.destroy();
                    });
            }
            // hydra.anims.play('hydra_birth').on('animationcomplete', function() {
                // hydra.setVelocityX(60);
            // }, this);
        }, 5000);

        this.physics.add.overlap(hydralisks, headtowers, killHydralisks, null, this);

        this.input.on('pointerdown', function(pointer) {
            if (build) {
                let x = Math.round(pointer.worldX/16),
                y = Math.round(pointer.worldY/16);
                console.log(x*16 + ', ' + y*16)
    
                if (logWorldLayer[y][x].properties.buildable && logWorldLayer[y-1][x].properties.buildable && logWorldLayer[y][x-1].properties.buildable && logWorldLayer[y-1][x-1].properties.buildable) {
                    
                    let ht = headtowers.create(x*16, y*16, 'headtower').setCircle(16);
                    ht.setInteractive().setName('tower').anims.play('headtower_do');

                    logWorldLayer[y][x].properties.buildable = false;
                    logWorldLayer[y-1][x].properties.buildable = false;
                    logWorldLayer[y][x-1].properties.buildable = false;
                    logWorldLayer[y-1][x-1].properties.buildable = false;
                    console.log("√");
                
                } else {
                    console.log("can't place tower here");
                }
            }
        }, this);

        this.input.on('gameobjectdown', function (pointer, gameObject) {
            if (demolish && gameObject.name === 'tower') {
                let x = Math.round(gameObject.x/16),
                y = Math.round(gameObject.y/16);
    
                gameObject.destroy();
                console.log('tower removed');

                logWorldLayer[y][x].properties.buildable = true;
                logWorldLayer[y-1][x].properties.buildable = true;
                logWorldLayer[y][x-1].properties.buildable = true;
                logWorldLayer[y-1][x-1].properties.buildable = true;
            }
        }, this);
    }

    update(time, delta) {
        controls.update(delta);
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE).isDown) {
            this.cameras.main.setZoom(1);
        } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO).isDown) {
            this.cameras.main.setZoom(1.25);
        } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE).isDown) {
            this.cameras.main.setZoom(1.5);
        } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR).isDown) {
            this.cameras.main.setZoom(1.75);
        } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE).isDown) {
            this.cameras.main.setZoom(2);
        } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO).isDown) {
            if (this.cameras.main.displayHeight > 256) {
            this.cameras.main.zoom = this.cameras.main.zoom += 0.05;
            }
        } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE).isDown) {
            if (this.cameras.main.displayHeight < 756) {
                this.cameras.main.zoom = this.cameras.main.zoom -= 0.05;
            }
        }

        for (let hydra of hydralisks.getChildren()) {
            if (hydra.body.velocity.x > 0) {
                if (hydra.body.velocity.y > 0) {
                    if (Math.abs(hydra.body.velocity.x) < Math.abs(hydra.body.velocity.y)) {
                        hydra.anims.play('hydra_dldiag', true).setFlipX(false);
                    } else if (Math.abs(hydra.body.velocity.x) > Math.abs(hydra.body.velocity.y)) {
                        hydra.anims.play('hydra_dhdiag', true).setFlipX(false);
                    } else {
                        hydra.anims.play('hydra_ddiag', true).setFlipX(false);
                    }
                } else if (hydra.body.velocity.y < 0) {
                    if (Math.abs(hydra.body.velocity.x) < Math.abs(hydra.body.velocity.y)) {
                        hydra.anims.play('hydra_uhdiag', true).setFlipX(false);
                    } else if (Math.abs(hydra.body.velocity.x) > Math.abs(hydra.body.velocity.y)) {
                        hydra.anims.play('hydra_uldiag', true).setFlipX(false);
                    } else {
                        hydra.anims.play('hydra_udiag', true).setFlipX(false);
                    }
                } else {
                    hydra.anims.play('hydra_side', true).setFlipX(false);
                }
            } else if (hydra.body.velocity.x < 0) {
                if (hydra.body.velocity.y > 0) {
                    if (Math.abs(hydra.body.velocity.x) < Math.abs(hydra.body.velocity.y)) {
                        hydra.anims.play('hydra_dldiag', true).setFlipX(true);
                    } else if (Math.abs(hydra.body.velocity.x) > Math.abs(hydra.body.velocity.y)) {
                        hydra.anims.play('hydra_dhdiag', true).setFlipX(true);
                    } else {
                        hydra.anims.play('hydra_ddiag', true).setFlipX(true);
                    }
                } else if (hydra.body.velocity.y < 0) {
                    if (Math.abs(hydra.body.velocity.x) < Math.abs(hydra.body.velocity.y)) {
                        hydra.anims.play('hydra_uhdiag', true).setFlipX(true);
                    } else if (Math.abs(hydra.body.velocity.x) > Math.abs(hydra.body.velocity.y)) {
                        hydra.anims.play('hydra_uldiag', true).setFlipX(true);
                    } else {
                        hydra.anims.play('hydra_udiag', true).setFlipX(true);
                    }
                } else {
                    hydra.anims.play('hydra_side', true).setFlipX(true);
                }
            } else {
                if (hydra.body.velocity.y > 0) {
                    hydra.anims.play('hydra_down', true);
                } else if (hydra.body.velocity.y < 0) {
                    hydra.anims.play('hydra_up', true);
                } else {
                    hydra.anims.play('hydra_stop');
                }
            }
            if (hydra.body.x < 225) {
                hydra.setVelocityX(60);
            } else if (hydra.body.x > 1808) {
                hydra.destroy();
            }
        }

        if (build) {
            let pointer = this.input.activePointer,
            x = Math.round(pointer.worldX/16),
            y = Math.round(pointer.worldY/16);
            buildGraphic.setPosition(x*16, y*16).setAlpha(1);
            buildGraphic.setTint(0x00FF00);
            if (logWorldLayer[y][x].properties.buildable && logWorldLayer[y-1][x].properties.buildable && logWorldLayer[y][x-1].properties.buildable && logWorldLayer[y-1][x-1].properties.buildable) {
            } else {
                buildGraphic.setTint(0xFF0000);
            }
        } else {
            buildGraphic.setAlpha(0);
        }
    }
}

let config = {
    type: Phaser.AUTO,
    width: 992,
    height: 756,
    parent: 'gameContainer',
    backgroundColor: '#222222',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [ BootGame, SceneGame, HUD ]
},
game = new Phaser.Game(config);

// x-axis 224, 1696 start and finish