ProjectileMotionApplet.Game = function (game) {
    this.counter;
    this.secondsElapsed;
    this.timer;
    this.ding;
    this.explosion;
    this.cannonball;
    this.angleUpKey;
    this.angleDownKey;
    this.powerUpKey;
    this.powerDownKey;
    this.fireKey;
    this.cannon;
    this.power;
    this.angleMessage;
    this.powerMessage;
    this.ground;
};

ProjectileMotionApplet.Game.prototype = {

    create: function (){
        this.secondsElapsed = 0;
        this.timer = this.time.create(false);
        this.timer.loop(1000, this.updateSeconds, this);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.cannonball = this.add.sprite(-100, -100, 'cannonball');
        this.game.physics.arcade.enable([this.cannonball]);
        this.cannonball.enableBody = true;
        this.cannonball.velocity = 0;
        this.cannonball.velocity.x = 0;
        this.cannonball.velocity.y = 0;
        this.cannonball.body.bounce.setTo(.1,.6);

        this.power = 20;

        this.cannon = this.add.sprite(70, 750, 'cannon');
        this.cannon.anchor.setTo(0.5, 0.5);

        this.ground = this.add.sprite(0, 780, 'ground');
        this.game.physics.arcade.enable([this.ground]);
        this.ground.enableBody = true;
        this.ground.body.immovable = true;

        angleUpKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        angleDownKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        fireKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
        powerUpKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
        powerDownKey = this.input.keyboard.addKey(Phaser.Keyboard.S);

        this.ding = this.add.audio('select_audio');
        this.explosion = this.add.audio('explosion_audio');

        this.buildWorld();
        alert('CONTROLS:  Use W/S to control the power, use the UP/DOWN arrow keys to adjust the angle, and use F to fire');
        this.ding.play();
    },

    buildWorld: function () {
        this.counter = this.add.bitmapText(10, 90, 'eightbitwonder', 'Seconds elapsed: ' + this.secondsElapsed, 0);
        this.angleMessage = this.add.bitmapText(10, 10, 'eightbitwonder', 'Angle: ' + this.cannon.angle, 0);
        this.powerMessage = this.add.bitmapText(10, 50, 'eightbitwonder', 'Power: ' + this.power, 0);
        this.timer.start();
    },

    fireCannonball: function(){
        //if(this.game.time.now > this.shootTime){
        if(fireKey.isDown){
            this.cannonball.position.x = 70;
            this.cannonball.position.y = 750;
            this.directionInitial();
            //this.shootTime = this.game.time.now + 200;
            //this.explosion.play();
            this.secondsElapsed = 0;
            console.log('boom');
            //plays audio several times since there is no pause between shooting
        }
        //}
    },

    directionInitial: function(){
        this.cannonball.body.velocity.x = this.power * Math.cos(Phaser.Math.degToRad(this.cannon.angle)) * 10;
        this.cannonball.body.velocity.y = this.power * Math.sin(Phaser.Math.degToRad(this.cannon.angle)) * 10;
    },

    directionUpdate: function(){
        this.cannonball.body.velocity.y += 9.81;
    },

    updateSeconds: function(){
        this.secondsElapsed++;
        this.counter.text = 'Seconds Elapsed: ' + this.secondsElapsed;
    },

    rotateCannon: function(){
        if(angleDownKey.isDown && this.cannon.angle < 0){
            this.cannon.angle += 1;
        }
        if(angleUpKey.isDown && this.cannon.angle > -90){
            this.cannon.angle -= 1;
        }
    },

    powerAdjust: function(){
        if(powerUpKey.isDown && this.power < 100){
            this.power++;
        }
        if(powerDownKey.isDown && this.power > 20){
            this.power--;
        }
    },

    displayInfo: function(){
        this.angleMessage.text = 'Angle: ' + this.cannon.angle;
        this.powerMessage.text = 'Power: ' + this.power;
    },

    decreaseXVelocity: function(){
        this.cannonball.body.velocity.x = this.cannonball.body.velocity.x * .8;
    },

    update: function() {
        this.physics.arcade.overlap(this.ground, this.cannonball, this.decreaseXVelocity, null, this);
        this.game.physics.arcade.collide(this.ground, this.cannonball);
        //this.boundsCollision();
        this.rotateCannon();
        this.fireCannonball();
        this.powerAdjust();
        this.displayInfo();
        this.directionUpdate();
    }

};