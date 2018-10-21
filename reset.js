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
        resources = 10,
        towerDamage = 10,
        numberOfTowers = 0,
        waveNumber = 0,
        kills = 0,
        lurkerHP = 512,
        lurkerSpeed = 80,
        lurkerHPIncrease = 128,
        hydraliskHP = 60,
        hydraliskHPIncrease = 9,
        hydraliskSpeed = 100,
        hydralisksEscaped = 0;
        
        this.scene.start('GameScene');
    }
}