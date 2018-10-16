class Reset extends Phaser.Scene {
    
    constructor() {
        super('Reset');
    }

    create() {
        sfx_config = {
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
        
        this.scene.start('GameScene');
    }
}