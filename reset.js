class Reset extends Phaser.Scene {
    
    constructor() {
        super('reset');
    }

    create() {

        controls,
        gameOver = false,
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

        this.scene.start('sceneGame');
    }
}