let sfx_config = {
    mute: false,
    loop: false,
},
music_config = {
    mute: false,
    loop: true,
    volume: 0.8,
},
game_track,

controls,
gameOver = false,
musicOn = true,
sfxOn = true,
build = false,
demolish = false,
clickNextWave = true,
pointerOnNav,

timerDisplay,
resourcesDisplay,
upgradeCostDisplay,
killsDisplay,
hydraliskHPDisplay,
hydraliskSpeedDisplay,
numberOfTowersDisplay,
waveNumberDisplay,
towerDamageDisplay,
hydralisksEscapedDisplay,

nextWaveInterval,
timer,
min,
sec,

buildButton,
demolishButton,
upgradeButton,
nextWaveButton,
musicButton,
sfxButton,

buildGraphic,
logWorldLayer,
path,

waveInfoText,
countDownText,
buildInfoText,
hydralisksEscapedInfoText,
gameOverText,

births,
hydralisks,
deaths,
headtowers,
bullets,

upgradeCost = 1,
resources = 10,
towerDamage = 10,
numberOfTowers = 0,
waveNumber = 1,
kills = 0,
hydraliskHP = 96,
hydraliskHPIncrease = 16,
hydraliskSpeed = 40,
hydralisksEscaped = 0,
birthTime = 3496;

function nextWave() {
    let swarm = 0;
    let birth1 = births.create(16, 512, 'hydralisk');
    game.sound.play('egg', sfx_config);
    birth1.anims.play('hydra_birth').on('animationcomplete', () => {
        game.sound.play('birth', sfx_config);
        let hydra = hydralisks.get(16, 512, 'hydralisk')
        hydra.body.setCircle(16, 6, 13)
        hydra.follower.t = 16/3744;
        birth1.destroy();
    }, this);
    let birth2 = births.create(52, 512, 'hydralisk');
    birth2.anims.play('hydra_birth').on('animationcomplete', () => {
        let hydra = hydralisks.get(52, 512, 'hydralisk')
        hydra.body.setCircle(16, 6, 13)
        hydra.follower.t = 52/3744;
        birth2.destroy();
    }, this);
    let birth3 = births.create(88, 512, 'hydralisk');
    birth3.anims.play('hydra_birth').on('animationcomplete', () => {
        let hydra = hydralisks.get(88, 512, 'hydralisk')
        hydra.body.setCircle(16, 6, 13)
        hydra.follower.t = 88/3744;
        birth3.destroy();
    }, this);
    let birth4 = births.create(124, 512, 'hydralisk');
    birth4.anims.play('hydra_birth').on('animationcomplete', () => {
        let hydra = hydralisks.get(124, 512, 'hydralisk')
        hydra.body.setCircle(16, 6, 13)
        hydra.follower.t = 124/3744;
        birth4.destroy();
    }, this);
    let birth5 = births.create(160, 512, 'hydralisk');
    birth5.anims.play('hydra_birth').on('animationcomplete', () => {
        let hydra = hydralisks.get(160, 512, 'hydralisk')
        hydra.body.setCircle(16, 6, 13)
        hydra.follower.t = 160/3744;
        birth5.destroy();
    }, this);
    let birth6 = births.create(196, 512, 'hydralisk');
    birth6.anims.play('hydra_birth').on('animationcomplete', () => {
        let hydra = hydralisks.get(196, 512, 'hydralisk')
        hydra.body.setCircle(16, 6, 13)
        hydra.follower.t = 196/3744;
        birth6.destroy();
    }, this);
    nextWaveInterval = setInterval( () => {
        let birth1 = births.create(16, 512, 'hydralisk');
        game.sound.play('egg', sfx_config);
        birth1.anims.play('hydra_birth').on('animationcomplete', () => {
            game.sound.play('birth', sfx_config);
            let hydra = hydralisks.get(16, 512, 'hydralisk');
            hydra.body.setCircle(16, 6, 13)
            hydra.follower.t = 16/3744;
            birth1.destroy();
        }, this);
        let birth2 = births.create(52, 512, 'hydralisk');
        birth2.anims.play('hydra_birth').on('animationcomplete', () => {
            let hydra = hydralisks.get(52, 512, 'hydralisk');
            hydra.body.setCircle(16, 6, 13)
            hydra.follower.t = 52/3744;
            birth2.destroy();
        }, this);
        let birth3 = births.create(88, 512, 'hydralisk');
        birth3.anims.play('hydra_birth').on('animationcomplete', () => {
            let hydra = hydralisks.get(88, 512, 'hydralisk');
            hydra.body.setCircle(16, 6, 13)
            hydra.follower.t = 88/3744;
            birth3.destroy();
        }, this);
        let birth4 = births.create(124, 512, 'hydralisk');
        birth4.anims.play('hydra_birth').on('animationcomplete', () => {
            let hydra = hydralisks.get(124, 512, 'hydralisk');
            hydra.body.setCircle(16, 6, 13)
            hydra.follower.t = 124/3744;
            birth4.destroy();
        }, this);
        let birth5 = births.create(160, 512, 'hydralisk');
        birth5.anims.play('hydra_birth').on('animationcomplete', () => {
            let hydra = hydralisks.get(160, 512, 'hydralisk');
            hydra.body.setCircle(16, 6, 13)
            hydra.follower.t = 160/3744;
            birth5.destroy();
        }, this);
        let birth6 = births.create(196, 512, 'hydralisk');
        birth6.anims.play('hydra_birth').on('animationcomplete', () => {
            let hydra = hydralisks.get(196, 512, 'hydralisk');
            hydra.body.setCircle(16, 6, 13)
            hydra.follower.t = 196/3744;
            birth6.destroy();
        }, this);
        swarm++;
        if (swarm > 2) {
            clearInterval(nextWaveInterval);
        }
    }, birthTime);
}

function damageHydralisks(hydralisk, bullet) {
    hydralisk.receiveDamage(bullet.damage);
    bullet.destroy();
}


class Tower extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.hp = 10;
        this.damage = towerDamage;  
        this.name = 'tower';
        this.timeToShoot = 0;
        this.range = 200;
        this.target = false;
    }
    
    update(time, delta) {
        if (time > this.timeToShoot && this.target.active) {      
            this.fire();          
            this.timeToShoot = time + 1000;
            let angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
            if (angle > .875 * Math.PI || angle <= -.875 * Math.PI) {
                this.anims.play('headtower_le', true);
            } else if (angle > .625 * Math.PI && angle <= .875 * Math.PI) {
                this.anims.play('headtower_dl', true);
            } else if (angle > .375 * Math.PI && angle <= .625 * Math.PI) {
                this.anims.play('headtower_do', true);
            } else if (angle > .125 * Math.PI && angle <= .375 * Math.PI) {
                this.anims.play('headtower_dr', true);
            } else if (angle <= .125 * Math.PI && angle > -.125 * Math.PI) {
                this.anims.play('headtower_ri', true);
            } else if (angle <= -.125 * Math.PI && angle > -.375 * Math.PI) {
                this.anims.play('headtower_ur', true);
            } else if (angle <= -.375 * Math.PI && angle > -.625 * Math.PI) {
                this.anims.play('headtower_up', true);
            } else if (angle <= -.625 * Math.PI && angle > -.875 * Math.PI) {
                this.anims.play('headtower_ul', true);
            }
        }
        if (!this.target || !this.target.active || Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) >= this.range) {
            this.target = this.getEnemy(this.range);
        }
    }
    
    fire() {
        if (this.target.active) {
            game.sound.play('bullet', sfx_config);
            let bullet = bullets.get(this.x, this.y, 'bullet_single', 0);
            bullet.body.setCircle(2);
            bullet.target = this.target;
            bullet.damage = this.damage;
        }
    }

    getEnemy() {
        let enemyUnits = hydralisks.getChildren();
        let enemiesInRange = [];
        for (let i = 0; i < enemyUnits.length; i++) {       
            if (enemyUnits[i].active && Phaser.Math.Distance.Between(this.x, this.y, enemyUnits[i].x, enemyUnits[i].y) <= this.range) {
                enemiesInRange.push([Phaser.Math.Distance.Between(this.x, this.y, enemyUnits[i].x, enemyUnits[i].y), enemyUnits[i]]);
            }
        }
        enemiesInRange.sort(function([a], [b]) { return a - b });
        if (enemiesInRange.length > 0) {
            return enemiesInRange[0][1];
        } else {
            return false;
        }
    }
}

class Bullet extends Phaser.GameObjects.Image {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.dx = 0;
        this.dy = 0;
        this.speed = Phaser.Math.GetSpeed(600, 1);
        this.startX = x;
        this.startY = y;
        this.range = 220;
    }

    update(time, delta) {
        this.scene.physics.add.overlap(this.target, this, damageHydralisks);
        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);
        let angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);
        if (!this.target.active || Phaser.Math.Distance.Between(this.startX, this.startY, this.target.x, this.target.y) >= this.range || this.x < 0 || this.y < 0 || this.x > 1919 || this.y > 799) {
            this.destroy();
        }
    }
};

class Hydralisk extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.hp = hydraliskHP;
        this.damage = 100;
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    }
    
    update(time, delta) {
        let prevX = this.follower.vec.x,
        prevY = this.follower.vec.y;

        this.follower.t += hydraliskSpeed/100000;
    
        path.getPoint(this.follower.t, this.follower.vec);
        
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        
        if (this.follower.vec.x > prevX) {
            if (this.follower.vec.y > prevY) {
                // if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
                //     this.anims.play('hydra_dldiag', true).setFlipX(false);
                // } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                //     this.anims.play('hydra_dhdiag', true).setFlipX(false);
                // } else {
                    this.anims.play('hydra_ddiag', true).setFlipX(false);
                // }
            } else if (this.follower.vec.y < prevY) {
                // if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
                //     this.anims.play('hydra_uhdiag', true).setFlipX(false);
                // } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                //     this.anims.play('hydra_uldiag', true).setFlipX(false);
                // } else {
                    this.anims.play('hydra_udiag', true).setFlipX(false);
                // }
            } else {
                this.anims.play('hydra_side', true).setFlipX(false);
            }
        } else if (this.follower.vec.x < prevX) {
            if (this.follower.vec.y > prevY) {
            //     if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
            //         this.anims.play('hydra_dldiag', true).setFlipX(true);
            //     } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
            //         this.anims.play('hydra_dhdiag', true).setFlipX(true);
            //     } else {
                    this.anims.play('hydra_ddiag', true).setFlipX(true);
            //     }
            } else if (this.follower.vec.y < prevY) {
            //     if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
            //         this.anims.play('hydra_uhdiag', true).setFlipX(true);
            //     } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
            //         this.anims.play('hydra_uldiag', true).setFlipX(true);
            //     } else {
                    this.anims.play('hydra_udiag', true).setFlipX(true);
            //     }
            // } else {
                this.anims.play('hydra_side', true).setFlipX(true);
            }
        } else {
            if (this.follower.vec.y > prevY) {
                this.anims.play('hydra_down', true);
            } else if (this.follower.vec.y < prevY) {
                this.anims.play('hydra_up', true);
            } else {
                this.anims.play('hydra_stop');
            }
        }
        
        if (this.body.x > 1808) {
            hydralisksEscaped++; 
            if (hydralisksEscaped === 1) {
                hydralisksEscapedInfoText.setText(`A Hydralisk Has Escaped`)
            } else {
                hydralisksEscapedInfoText.setText(`${hydralisksEscaped} Hydralisks Have Escaped`)
            }
            hydralisksEscapedDisplay.setText(`Hydralisks Escaped: ${hydralisksEscaped}`)
            this.scene.add.tween({
                targets: hydralisksEscapedInfoText,
                ease: 'Sine.easeInOut',
                duration: 4000,
                alpha: {
                    getStart: () => 1,
                    getEnd: () => 0
                }
            });
            game.sound.play('escape', sfx_config);
            this.destroy();
        }
    }
    
    receiveDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.deathAnimation(this.x, this.y);
            game.sound.play('hydra_death', sfx_config);
            this.destroy();
            kills++;
            killsDisplay.setText(`Kills: ${kills}`)
            if (kills % 8 === 0) {
                resources += 1;
                resourcesDisplay.setText(`Resources: ${resources}`)
                if (resources >= upgradeCost) {
                    upgradeButton.setFill('gold').setStroke('firebrick').setAlpha(1);
                } else {
                    upgradeButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
                }
            }
        }
    }
    
    deathAnimation(x, y) {
        let death = deaths.create(x, y, 'hydralisk').anims.play('hydra_death').on('animationcomplete', () => {
            death.destroy();
            let corpse = deaths.create(x, y, 'hydralisk').anims.play('hydra_corpse').on('animationcomplete', () => {
                corpse.destroy();
            });
        });
    }
}

class GameScene extends Phaser.Scene {
    
    constructor() {
        super('GameScene');
    }
    
    create() {
        game_track = this.sound.add('game_track', music_config);
        game_track.play();

        this.scene.launch('HUD');
        this.input.setDefaultCursor('url(public/assets/cursor.cur), pointer')
        
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('ashlands', 'tiles');
        const worldLayer = map.createDynamicLayer('World', tileset, 0, 0);
        const aboveLayer = map.createStaticLayer('Above', tileset, 0, 0);
        logWorldLayer = worldLayer.layer.data;
        
        worldLayer.setCollisionBetween(259, 268, true, 'World');
        worldLayer.setCollisionBetween(519, 534, true, 'World');
        
        path = this.add.path(0, 512);
        path.lineTo(432, 512);
        path.lineTo(432, 288);
        path.lineTo(656, 288);
        path.lineTo(656, 512);
        path.lineTo(864, 512);
        path.lineTo(864, 224);
        path.lineTo(960, 224);
        path.lineTo(960, 576);
        path.lineTo(1056, 576);
        path.lineTo(1056, 288);
        path.lineTo(1264, 288);
        path.lineTo(1264, 512);
        path.lineTo(1488, 512);
        path.lineTo(1488, 288);
        path.lineTo(1920, 288);
        
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
        hydralisks = this.physics.add.group({
            classType: Hydralisk, runChildUpdate: true
        });
        bullets = this.physics.add.group({
            classType: Bullet, runChildUpdate: true
        });
        births = this.physics.add.group();
        deaths = this.physics.add.group();

        buildGraphic = this.add.image(0, 0, 'tower_overlay').setAlpha(0);
        
        this.physics.add.collider(hydralisks, worldLayer);
        this.physics.add.collider(hydralisks, headtowers);

        this.input.on('pointerdown', function(pointer) {
            if (build && !pointerOnNav) {
                let x = Math.round(pointer.worldX/16),
                y = Math.round(pointer.worldY/16);
    
                if (logWorldLayer[y][x].properties.buildable && logWorldLayer[y-1][x].properties.buildable && logWorldLayer[y][x-1].properties.buildable && logWorldLayer[y-1][x-1].properties.buildable) {
                    if (resources > 0) {
                        headtowers.get(x*16, y*16, 'headtower')
                        .setInteractive().anims.play('headtower_do').body.setCircle(16);
                        this.sound.play('build_tower', sfx_config);

                        numberOfTowers++;
                        numberOfTowersDisplay.setText(`Towers: ${numberOfTowers}`);
    
                        logWorldLayer[y][x].properties.buildable = false;
                        logWorldLayer[y-1][x].properties.buildable = false;
                        logWorldLayer[y][x-1].properties.buildable = false;
                        logWorldLayer[y-1][x-1].properties.buildable = false;
    
                        resources--;
                        resourcesDisplay.setText(`Resources: ${resources}`)
                        if (resources >= upgradeCost) {
                            upgradeButton.setFill('gold').setStroke('firebrick').setAlpha(1);
                        } else {
                            upgradeButton.setFill('firebrick').setStroke('gold').setAlpha(0.33)
                        }            
        
                        buildInfoText.setText('');
                        if (resources === 0) {
                            build = false;
                            buildButton.setFill('firebrick').setStroke('gold').setAlpha(0.33);
                        }
                    } else {
                        buildInfoText.setText('Need Additional Resources');
                    }
                } else {
                    buildInfoText.setText('Cannot Build Here');
                    this.sound.play('error', sfx_config);
                }
                this.add.tween({
                    targets: buildInfoText,
                    ease: 'Sine.easeInOut',
                    duration: 2000,
                    alpha: {
                        getStart: () => 1,
                        getEnd: () => 0
                    }
                });
            }
        }, this);
        
        this.input.on('gameobjectdown', function (pointer, gameObject) {
            let demolishInfoText = this.add.text(496, 500, '', {fontSize: '40px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 3 }).setScrollFactor(0).setOrigin(0.5);
            if (demolish && !pointerOnNav && gameObject instanceof Tower) {
                let x = Math.round(gameObject.x/16),
                y = Math.round(gameObject.y/16);
                
                gameObject.destroy();
                this.sound.play('demolish_tower', sfx_config);

                numberOfTowers--;
                numberOfTowersDisplay.setText(`Towers: ${numberOfTowers}`);
                
                demolishInfoText.setText(`Tower Removed at (${x*16}, ${y*16})`)
                this.add.tween({
                    targets: demolishInfoText,
                    ease: 'Sine.easeInOut',
                    duration: 2000,
                    alpha: {
                        getStart: () => 1,
                        getEnd: () => 0
                    }
                });
                
                logWorldLayer[y][x].properties.buildable = true;
                logWorldLayer[y-1][x].properties.buildable = true;
                logWorldLayer[y][x-1].properties.buildable = true;
                logWorldLayer[y-1][x-1].properties.buildable = true;
            }
        }, this);
    }
    
    update(time, delta) {
        Phaser.Actions.Call(hydralisks.getChildren(), function(hydra) {
            this.children.bringToTop(hydra);
        }, this);
        Phaser.Actions.Call(headtowers.getChildren(), function(tower) {
            this.children.bringToTop(tower);
        }, this);
        Phaser.Actions.Call(bullets.getChildren(), function(bullet) {
            this.children.bringToTop(bullet);
        }, this);
    
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
            if (this.cameras.main.displayHeight < 800) {
                this.cameras.main.zoom = this.cameras.main.zoom -= 0.05;
            }
        }

        let pointer = this.input.activePointer;
        if (build && resources > 0) {
            let x = Math.round(pointer.worldX/16),
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
        if (pointer.y > 542) {
            pointerOnNav = true;
            buildGraphic.setPosition(-32, -32);
        } else {
            pointerOnNav = false;
        }

        if (!gameOver) {
            if ( (waveNumber > 30 && sec < 40 && hydralisks.countActive(true) === 0) || hydralisksEscaped > 19) {
                gameOver = true;
                this.scene.launch('GameOver');
                if (hydralisksEscaped > 19) {
                    this.sound.play('lose', sfx_config);
                } else {
                    this.sound.play('victory', sfx_config);
                }
                sfx_config.mute = true;
                game_track.stop();
                clearInterval(timer);
                clearInterval(nextWaveInterval);
                this.scene.setVisible(false, 'HUD');
                this.add.text(496, 300, ' ').setScrollFactor(0);
                this.cameras.main.fade(4000)
                .on('camerafadeoutcomplete', function() {
                    setTimeout( () => {
                        this.scene.stop('GameOver')
                        this.scene.stop('HUD')
                        this.scene.start('Reset');
                    }, 2000);
                }, this);
                return;
            }
        }
    }
}

class GameOver extends Phaser.Scene {
    
    constructor() {
        super('GameOver');
    }
    
    create() {
        gameOverText = this.add.text(496, 300, '', {fontSize: '60px', fill: 'firebrick', fontFamily: 'Arial', stroke: 'gold', strokeThickness: 3 }).setOrigin(0.5).setScrollFactor(0);
        if (hydralisksEscaped > 19) {
            gameOverText.setText('You failed to achieve victory!');
        } else {
            gameOverText.setText('You survived all 30 waves!');
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 992,
    height: 600,
    parent: 'gameContainer',
    backgroundColor: '#222222',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [ BootGame, Reset, GameScene, HUD, GameOver ]
};
const game = new Phaser.Game(config);

// x-axis 224, 1696 start and finish