let controls,
build = false,
demolish = false,
resourcesDisplay,
killsDisplay,
timerDisplay,
timer,
buildButton,
demolishButton,
upgradeButton,
buildGraphic,
logWorldLayer,
waveInfoText,
buildInfoText,
hydralisksEscapedInfoText,
births,
hydralisks,
deaths,
headtowers,
bullets,
upgradeCost = 1,
birthTime = 4200,
hydralisksEscaped = 0,
resources = 10,
kills = 0,
waveNumber = 1,
hydraliskHP = 96,
hydraliskSpeed = 72,
towerDamage = 10;

function nextWave() {
    let swarm = 0;
    let birth1 = births.create(16, 512, 'hydralisk');
    birth1.anims.play('hydra_birth').on('animationcomplete', () => {
        hydralisks.get(16, 512, 'hydralisk').body.setVelocity(hydraliskSpeed, 0);
        birth1.destroy();
    }, this);
    let birth2 = births.create(52, 512, 'hydralisk');
    birth2.anims.play('hydra_birth').on('animationcomplete', () => {
        hydralisks.get(52, 512, 'hydralisk').body.setVelocity(hydraliskSpeed, 0);
        birth2.destroy();
    }, this);
    let birth3 = births.create(88, 512, 'hydralisk');
    birth3.anims.play('hydra_birth').on('animationcomplete', () => {
        hydralisks.get(88, 512, 'hydralisk').body.setVelocity(hydraliskSpeed, 0);
        birth3.destroy();
    }, this);
    let birth4 = births.create(124, 512, 'hydralisk');
    birth4.anims.play('hydra_birth').on('animationcomplete', () => {
        hydralisks.get(124, 512, 'hydralisk').body.setVelocity(hydraliskSpeed, 0);
        birth4.destroy();
    }, this);
    let birth5 = births.create(160, 512, 'hydralisk');
    birth5.anims.play('hydra_birth').on('animationcomplete', () => {
        hydralisks.get(160, 512, 'hydralisk').body.setVelocity(hydraliskSpeed, 0);
        birth5.destroy();
    }, this);
    let birth6 = births.create(196, 512, 'hydralisk');
    birth6.anims.play('hydra_birth').on('animationcomplete', () => {
        hydralisks.get(196, 512, 'hydralisk').body.setVelocity(hydraliskSpeed, 0);
        birth6.destroy();
    }, this);
    let nextWave = setInterval( () => {
        let birth1 = births.create(16, 512, 'hydralisk');
        birth1.anims.play('hydra_birth').on('animationcomplete', () => {
            hydralisks.get(16, 512, 'hydralisk').body.setVelocity(hydraliskSpeed, 0);
            birth1.destroy();
        }, this);
        let birth2 = births.create(52, 512, 'hydralisk');
        birth2.anims.play('hydra_birth').on('animationcomplete', () => {
            hydralisks.get(52, 512, 'hydralisk').body.setVelocity(hydraliskSpeed, 0);
            birth2.destroy();
        }, this);
        let birth3 = births.create(88, 512, 'hydralisk');
        birth3.anims.play('hydra_birth').on('animationcomplete', () => {
            hydralisks.get(88, 512, 'hydralisk').body.setVelocity(hydraliskSpeed, 0);
            birth3.destroy();
        }, this);
        let birth4 = births.create(124, 512, 'hydralisk');
        birth4.anims.play('hydra_birth').on('animationcomplete', () => {
            hydralisks.get(124, 512, 'hydralisk').body.setVelocity(hydraliskSpeed, 0);
            birth4.destroy();
        }, this);
        let birth5 = births.create(160, 512, 'hydralisk');
        birth5.anims.play('hydra_birth').on('animationcomplete', () => {
            hydralisks.get(160, 512, 'hydralisk').body.setVelocity(hydraliskSpeed, 0);
            birth5.destroy();
        }, this);
        let birth6 = births.create(196, 512, 'hydralisk');
        birth6.anims.play('hydra_birth').on('animationcomplete', () => {
            hydralisks.get(196, 512, 'hydralisk').body.setVelocity(hydraliskSpeed, 0);
            birth6.destroy();
        }, this);
        swarm++;
        if (swarm > 2) {
            waveNumber++;
            hydraliskHP += 12;
            if (hydraliskSpeed < 180) {
                hydraliskSpeed += 3;
            }
            if (birthTime > 2500) {
                birthTime -= 50;
            }
            clearInterval(nextWave);
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
        }
        if (!this.target || !this.target.active || Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) >= this.range) {
            this.target = this.getEnemy(this.range);
        } 
    }
    
    fire() {
        if (this.target.active) {
            let bullet = bullets.get(this.x, this.y, 'bullet_single', 0);
            bullet.body.setCircle(2);
            bullet.target = this.target;
            bullet.damage = this.damage;
        }
    }

    getEnemy(range) {
        let enemyUnits = hydralisks.getChildren();
        let enemiesInRange = [];
        for (let i = 0; i < enemyUnits.length; i++) {       
            if (enemyUnits[i].active && Phaser.Math.Distance.Between(this.x, this.y, enemyUnits[i].x, enemyUnits[i].y) <= range) {
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
        this.fireMe();
        if (!this.target.active || Phaser.Math.Distance.Between(this.startX, this.startY, this.target.x, this.target.y) >= this.range || this.x < 0 || this.y < 0 || this.x > 1919 || this.y > 799) {
            this.destroy();
        }
    }

    fireMe() {
        let angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
        this.dx = Math.cos(angle)
        this.dy = Math.sin(angle)
    }
};

class Hydralisk extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.hp = hydraliskHP;
        this.damage = 100;
    }

    update(time, delta) {
        if (this.body.velocity.x > 0) {
            if (this.body.velocity.y > 0) {
                if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
                    this.anims.play('hydra_dldiag', true).setFlipX(false);
                } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                    this.anims.play('hydra_dhdiag', true).setFlipX(false);
                } else {
                    this.anims.play('hydra_ddiag', true).setFlipX(false);
                }
            } else if (this.body.velocity.y < 0) {
                if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
                    this.anims.play('hydra_uhdiag', true).setFlipX(false);
                } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                    this.anims.play('hydra_uldiag', true).setFlipX(false);
                } else {
                    this.anims.play('hydra_udiag', true).setFlipX(false);
                }
            } else {
                this.anims.play('hydra_side', true).setFlipX(false);
            }
        } else if (this.body.velocity.x < 0) {
            if (this.body.velocity.y > 0) {
                if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
                    this.anims.play('hydra_dldiag', true).setFlipX(true);
                } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                    this.anims.play('hydra_dhdiag', true).setFlipX(true);
                } else {
                    this.anims.play('hydra_ddiag', true).setFlipX(true);
                }
            } else if (this.body.velocity.y < 0) {
                if (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y)) {
                    this.anims.play('hydra_uhdiag', true).setFlipX(true);
                } else if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                    this.anims.play('hydra_uldiag', true).setFlipX(true);
                } else {
                    this.anims.play('hydra_udiag', true).setFlipX(true);
                }
            } else {
                this.anims.play('hydra_side', true).setFlipX(true);
            }
        } else {
            if (this.body.velocity.y > 0) {
                this.anims.play('hydra_down', true);
            } else if (this.body.velocity.y < 0) {
                this.anims.play('hydra_up', true);
            } else {
                this.anims.play('hydra_stop');
            }
        }

        if (Phaser.Math.Distance.Between(this.x, this.y, 432, 512) < 4 && this.name != '432, 512') {
            this.setPosition(432, 512);
            this.setName('432, 512');
            this.body.setVelocity(0, -hydraliskSpeed);
        } else if (Phaser.Math.Distance.Between(this.x, this.y, 432, 288) < 4 && this.name != '432, 288') {
            this.setPosition(432, 288);
            this.setName('432, 288');
            this.body.setVelocity(hydraliskSpeed, 0);
        } else if (Phaser.Math.Distance.Between(this.x, this.y, 656, 288) < 4 && this.name != '656, 288') {
            this.setPosition(656, 288);
            this.setName('656, 288');
            this.body.setVelocity(0, hydraliskSpeed);
        } else if (Phaser.Math.Distance.Between(this.x, this.y, 656, 512) < 4 && this.name != '656, 512') {
            this.setPosition(656, 512);
            this.setName('656, 512');
            this.body.setVelocity(hydraliskSpeed, 0);
        } else if (Phaser.Math.Distance.Between(this.x, this.y, 864, 512) < 4 && this.name != '864, 512') {
            this.setPosition(864, 512)
            this.setName('864, 512')
            this.body.setVelocity(0, -hydraliskSpeed);
        } else if (Phaser.Math.Distance.Between(this.x, this.y, 864, 224) < 4 && this.name != '864, 224') {
            this.setPosition(864, 224)
            this.setName('864, 224')
            this.body.setVelocity(hydraliskSpeed, 0);
        } else if (Phaser.Math.Distance.Between(this.x, this.y, 960, 224) < 4 && this.name != '960, 224') {
            this.setPosition(960, 224)
            this.setName('960, 224')
            this.body.setVelocity(0, hydraliskSpeed);
        } else if (Phaser.Math.Distance.Between(this.x, this.y, 960, 576) < 4 && this.name != '960, 576') {
            this.setPosition(960, 576)
            this.setName('960, 576')
            this.body.setVelocity(hydraliskSpeed, 0);
        } else if (Phaser.Math.Distance.Between(this.x, this.y, 1056, 576) < 4 && this.name != '1056, 576') {
            this.setPosition(1056, 576)
            this.setName('1056, 576')
            this.body.setVelocity(0, -hydraliskSpeed);
        } else if (Phaser.Math.Distance.Between(this.x, this.y, 1056, 288) < 4 && this.name != '1056, 288') {
            this.setPosition(1056, 288)
            this.setName('1056, 288')
            this.body.setVelocity(hydraliskSpeed, 0);
        } else if (Phaser.Math.Distance.Between(this.x, this.y, 1264, 288) < 4 && this.name != '1264, 288') {
            this.setPosition(1264, 288)
            this.setName('1264, 288')
            this.body.setVelocity(0, hydraliskSpeed);
        } else if (Phaser.Math.Distance.Between(this.x, this.y, 1264, 512) < 4 && this.name != '1264, 512') {
            this.setPosition(1264, 512)
            this.setName('1264, 512')
            this.body.setVelocity(hydraliskSpeed, 0);
        } else if (Phaser.Math.Distance.Between(this.x, this.y, 1488, 512) < 4 && this.name != '1488, 512') {
            this.setPosition(1488, 512)
            this.setName('1488, 512')
            this.body.setVelocity(0, -hydraliskSpeed);
        } else if (Phaser.Math.Distance.Between(this.x, this.y, 1488, 288) < 4 && this.name != '1488, 288') {
            this.setPosition(1488, 288)
            this.setName('1488, 288')
            this.body.setVelocity(hydraliskSpeed, 0);
        }

        if (this.body.x > 1808) {
            hydralisksEscaped++; 
            if (hydralisksEscaped === 1) {
                hydralisksEscapedInfoText.setText(`A Hydralisk Has Escaped`)
            } else {
                hydralisksEscapedInfoText.setText(`${hydralisksEscaped} Hydralisks Have Escaped`)
            }
            this.scene.add.tween({
                targets: hydralisksEscapedInfoText,
                ease: 'Sine.easeInOut',
                duration: 4000,
                alpha: {
                    getStart: () => 1,
                    getEnd: () => 0
                }
            });
            this.destroy();
        }
    }

    receiveDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.deathAnimation(this.x, this.y);
            this.destroy();
            kills++;
            killsDisplay.setText(`Kills: ${kills}`)
            if (kills % 8 === 0 && kills != 0) {
                resources += 1;
                resourcesDisplay.setText(`Resources: ${resources}`)
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
            if (build) {
                let x = Math.round(pointer.worldX/16),
                y = Math.round(pointer.worldY/16);
    
                if (logWorldLayer[y][x].properties.buildable && logWorldLayer[y-1][x].properties.buildable && logWorldLayer[y][x-1].properties.buildable && logWorldLayer[y-1][x-1].properties.buildable) {
                    if (resources > 0) {
                        headtowers.get(x*16, y*16, 'headtower')
                        .setInteractive().anims.play('headtower_do').body.setCircle(16);
    
                        logWorldLayer[y][x].properties.buildable = false;
                        logWorldLayer[y-1][x].properties.buildable = false;
                        logWorldLayer[y][x-1].properties.buildable = false;
                        logWorldLayer[y-1][x-1].properties.buildable = false;
    
                        resources--;
                        resourcesDisplay.setText(`Resources: ${resources}`)
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
            if (demolish && gameObject.name === 'tower') {
                let x = Math.round(gameObject.x/16),
                y = Math.round(gameObject.y/16);
                
                gameObject.destroy();
                
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
            if (this.cameras.main.displayHeight < 756) {
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
        if ( (pointer.x < 232 && pointer.y < 50) || (pointer.x > 680 && pointer.y < 50) ) {
            buildGraphic.setPosition(-32, -32);
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
    scene: [ BootGame, SceneGame, HUD ]
};
const game = new Phaser.Game(config);

// x-axis 224, 1696 start and finish