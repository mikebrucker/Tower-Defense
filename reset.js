class Reset extends Phaser.Scene {
    
    constructor() {
        super('Reset');
    }

    create() {
        sfx_config = {
            mute: false,
            loop: false,
            volume: 0.5,
        },
        music_config = {
            mute: false,
            loop: true,
            volume: 0.4,
        },
        game_track,
        bulletSoundsPlayed = 0,
        
        controls,
        gameFocus = true,
        gameOver = false,
        pauseOn = false,
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
        pauseButton,
        
        buildGraphic,
        logWorldLayer,
        path,
        lurkerpath,
        
        waveInfoText,
        countDownText,
        buildInfoText,
        hydralisksEscapedInfoText,
        gameOverText,
        pauseText,
        
        births,
        hydralisks,
        lurkers,
        deaths,
        headtowers,
        bullets,
        
        upgradeCost = 1,
        resources = 12,
        towerDamage = 10,
        numberOfTowers = 0,
        waveNumber = 1,
        kills = 0,
        lurkerHP = 1024,
        lurkerSpeed = 30,
        lurkerHPIncrease = 256,
        hydraliskHP = 96,
        hydraliskHPIncrease = 16,
        hydraliskSpeed = 40,
        hydralisksEscaped = 0,
        birthTime = 3496;        
        
        this.scene.start('GameScene');
    }
}