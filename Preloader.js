ProjectileMotionApplet.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

ProjectileMotionApplet.Preloader.prototype = {

    preload: function () {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);
        this.titleText = this.add.image(this.world.centerX, this.world.centerY-220, 'titleimage');
        this.titleText.anchor.setTo(0.5, 0.5);
        this.load.bitmapFont('eightbitwonder', 'fonts/eightbitwonder.png', 'fonts/eightbitwonder.fnt');
        this.load.image('cannon', 'images/cannon.png');
        this.load.image('cannonball', 'images/cannonball.png')
        this.load.image('ground', 'images/ground.png')
        this.load.audio('select_audio', 'audio/select.mp3');
        this.load.audio('explosion_audio', 'audio/cannon.wav');
    },

    create: function () {
        this.preloadBar.cropEnabled = false; //force show the whole thing
    },

    update: function () {
        if(this.ready == false){
            this.ready = true;
            this.state.start('Game');
        }
    }
};