import MoveToPlugin from 'public/assets/moveto-plugin.js';

let controls,
build = false,
demolish = false,
resources = 10,
buildButton,
demolishButton,
buildGraphic,
logWorldLayer,
blankLayer,
births,
hydralisks,
deaths,
headtowers,
bullets,
towerDamage = 10;

function deathAnimation(x, y) {
    let death = deaths.create(x, y, 'hydralisk').anims.play('hydra_death').on('animationcomplete', () => {
        death.destroy();
        let corpse = deaths.create(x, y, 'hydralisk').anims.play('hydra_corpse').on('animationcomplete', () => {
            corpse.disableBody(true, false);
            setTimeout( () => {
                corpse.destroy();
            }, 6000);
        });
    });
}

function damageHydralisks(hydralisk) {
    hydralisk.receiveDamage(towerDamage);
}

function getEnemy(x, y, distance) {
    let enemyUnits = hydralisks.getChildren();
    let enemiesInRange = [];
    for (let i = 0; i < enemyUnits.length; i++) {       
        if (enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance) {
            enemiesInRange.push([Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y), enemyUnits[i]]);
        }
    }
    enemiesInRange.sort(function([a], [b]){return a-b});
    if (enemiesInRange.length > 0) {
        return enemiesInRange[0];
    } else {
        return false;
    }
}

let Tower = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:

    function Tower(scene, x, y, texture, frame) {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
        this.hp = 10;
        this.damage = 10;  
        this.name = 'tower';
        this.timeToShoot = 0;
    },
    update: function (time, delta) {
        if (time > this.timeToShoot) {      
            this.fire();          
            this.timeToShoot = time + 1000;
        }
    },
    fire: function() {
        let enemy = getEnemy(this.x, this.y, 400);
        if (enemy) {
            let angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            console.log('shot');
            let bullet = bullet.create(this.x, this.y, 'bullet');
            let moveBullet = this.plugins.get('rexMoveTo').add(bullet, {
                speed: 50,
                rotateToTarget: false
            });
            moveBullet.moveTo(enemy.x, enemy.y);
            bullet.anims.play('bullet', true);
        }
    },
    // addBullet: function(x, y, angle) {
    //     let bullet = bullets.get(x, y, 'bullet');
    //     if (bullet) {
    //         bullet.fire(x, y, angle);
    //         console.log('bullet');
    //     }
    // }
    
});

// let Bullet = new Phaser.Class({
//     Extends: Phaser.GameObjects.Sprite,

//     initialize:

//     function Bullet(scene, x, y, texture, frame) {
//         Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
//         this.dx = 0;
//         this.dy = 0;
//         this.speed = Phaser.Math.GetSpeed(600, 1);
//     },

//     fire: function (x, y, angle) {
//         this.setActive(true);
//         this.setVisible(true);
//         this.setPosition(x, y);
//         this.dx = Math.cos(angle);
//         this.dy = Math.sin(angle);
//     },

//     update: function (time, delta) {
//         this.x += this.dx * (this.speed * delta);
//         this.y += this.dy * (this.speed * delta);
//     }
// });

let Hydralisk = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:

    function Hydralisk(scene, x, y, texture, frame) {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
        this.hp = 100;
        this.damage = 100;
    },
    receiveDamage: function(damage) {
        this.hp -= damage;
        console.log(this.hp);
        if (this.hp < 1) {
            deathAnimation(this.x, this.y);
            this.destroy();
        }
    }
})

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
        
        headtowers = this.physics.add.group({
            classType: Tower, runChildUpdate: true, immovable: true
        });
        bullets = this.physics.add.group({
        });
        hydralisks = this.physics.add.group({
            classType: Hydralisk, runChildUpdate: true
        });
        births = this.physics.add.group();
        deaths = this.physics.add.group();

        // let bullet = bullets.create(100, 400, 'bullet');
        // bullet.anims.play('bullet', true);
        // bullet.setVelocityX(100);

        buildGraphic = this.add.image(0, 0, 'tower_overlay').setAlpha(0);
        
        setInterval( () => {
            for (let i = 0; i < 10; i++) {
                let birth1 = births.create(96, 256 + (i * 32), 'hydralisk'),
                birth2 = births.create(128, 256 + (i * 32), 'hydralisk');
                birth1.anims.play('hydra_birth').on('animationcomplete', () => {
                    this.add.existing(hydralisks.get(96, 256 + (i * 32), 'hydralisk'));
                    this.add.existing(hydralisks.get(128, 256 + (i * 32), 'hydralisk'));
                    birth1.destroy();
                }, this);
                birth2.anims.play('hydra_birth').on('animationcomplete', () => {
                    birth2.destroy();
                }, this);
            }
        }, 5000);
        
        this.physics.add.collider(hydralisks, worldLayer);
        this.physics.add.collider(hydralisks, headtowers);
        this.physics.add.overlap(hydralisks, bullets, damageHydralisks, null, this);

        this.input.on('pointerdown', function(pointer) {
            let buildInfoText = this.add.text(496, 378, '', {fontSize: '40px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'black', strokeThickness: 3 }).setScrollFactor(0).setOrigin(0.5);
            if (build) {
                let x = Math.round(pointer.worldX/16),
                y = Math.round(pointer.worldY/16);
    
                if (logWorldLayer[y][x].properties.buildable && logWorldLayer[y-1][x].properties.buildable && logWorldLayer[y][x-1].properties.buildable && logWorldLayer[y-1][x-1].properties.buildable && resources > 0) {
                    let headtower = headtowers.get(x*16, y*16, 'headtower');
                    this.add.existing(headtower);
                    headtower.setInteractive().anims.play('headtower_do').body.setCircle(16);

                    logWorldLayer[y][x].properties.buildable = false;
                    logWorldLayer[y-1][x].properties.buildable = false;
                    logWorldLayer[y][x-1].properties.buildable = false;
                    logWorldLayer[y-1][x-1].properties.buildable = false;

                    resources--;

                } else if (resources < 1) {
                    buildInfoText.setText('Need Additional Resources');
                } else {
                    buildInfoText.setText('Cannot Build Here');
                }
                this.add.tween({
                    targets: buildInfoText,
                    ease: 'Sine.easeInOut',
                    duration: 1000,
                    alpha: {
                        getStart: () => 1,
                        getEnd: () => 0
                    }
                });
            }
        }, this);

        this.input.on('gameobjectdown', function (pointer, gameObject) {
            if (demolish && gameObject.name === 'tower') {
                let x = Math.round(gameObject.x/16),
                y = Math.round(gameObject.y/16);
    
                gameObject.destroy();

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
                hydra.body.setVelocityX(60);
            } else if (hydra.body.x > 1808) {
                hydra.destroy();
            }
        }

        if (build) {
            let pointer = this.input.activePointer,
            x = Math.round(pointer.worldX/16),
            y = Math.round(pointer.worldY/16);

            buildGraphic.setPosition(x*16, y*16).setAlpha(1);

            if (logWorldLayer[y][x].properties.buildable && logWorldLayer[y-1][x].properties.buildable && logWorldLayer[y][x-1].properties.buildable && logWorldLayer[y-1][x-1].properties.buildable) {
                buildGraphic.setTint(0x00FF00);
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
    plugins: {
        global: [{
            key: 'rexMoveTo',
            plugin: MoveToPlugin,
            start: true
        }]
    },
    scene: [ BootGame, SceneGame, HUD ]
},
game = new Phaser.Game(config);

// x-axis 224, 1696 start and finish