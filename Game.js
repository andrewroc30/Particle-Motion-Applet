ProjectileMotionApplet.Game = function (game) {
    this.gameover;
    this.counter;
    this.overmessage;
    this.secondsElapsed;
    this.timer;
    this.music;
    this.ding;
    this.cannonball;
    this.restartKey;
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
        this.gameover = false;
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
        
        this.power = 0;

        this.cannon = this.add.sprite(70, 750, 'cannon');
        this.cannon.anchor.setTo(0.5, 0.5);
        
        this.ground = this.add.sprite(0, 780, 'ground');
        this.game.physics.arcade.enable([this.ground]);
        this.ground.enableBody = true;

        restartKey = this.input.keyboard.addKey(Phaser.Keyboard.R);
        angleUpKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        angleDownKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        fireKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
        powerUpKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
        powerDownKey = this.input.keyboard.addKey(Phaser.Keyboard.S);

        this.music = this.add.audio('game_audio');
        this.music.play('', 0, 0.3, true);   //marker, position, volume, loop
        this.ding = this.add.audio('select_audio');
        
        this.buildWorld();
        alert('CONTROLS:  Use W/S to control the power, use the UP/DOWN arrow keys to adjust the angle, and use F to fire');
    },

    updateSeconds: function(){
        this.secondsElapsed++;
    },

    buildWorld: function () {
        //this.counter = this.add.bitmapText(10, 10, 'eightbitwonder', 'Score: ' + this.score, 0);
        this.angleMessage = this.add.bitmapText(10, 10, 'eightbitwonder', 'Angle: ' + this.cannon.angle, 0);
        this.powerMessage = this.add.bitmapText(10, 50, 'eightbitwonder', 'Power: ' + this.power, 0);
        this.timer.start();
    },

    quitGame: function(pointer){
        if(restartKey.isDown){
            this.ding.play();
            this.state.start(this.state.current);
        }
    },

    /*boundsCollision: function(){
        if(this.sprite.x <= 0 || this.sprite.x >= 1580 || this.sprite.y <= 0 || this.sprite.y >= 780){
            if (leftKey.isDown || leftKeyA.isDown){
                this.sprite.x += 5;
            }
            else if (rightKey.isDown || rightKeyD.isDown){
                this.sprite.x -= 5;
            }
            if (upKey.isDown || upKeyW.isDown){
                this.sprite.y += 5;
            }
            else if (downKey.isDown || downKeyS.isDown){
                this.sprite.y -= 5;
            }
        }
    },*/

    enemyHitsPlayer: function(){
        this.cannonball.kill();
        this.gameover = true;
        this.timer.pause();
        this.music.stop();
        this.overmessage = this.add.bitmapText(this.world.centerX-350, this.world.centerY-120, 'eightbitwonder', 'GAME OVER\n\n' + 'Score:  ' + this.score + '\n\n Bullets Dodged:  ' + this.bulletsDodged, 42);
        this.overmessage.align = "center";
        this.overmessage.inputEnabled = true;
        this.overmessage.events.onInputDown.addOnce(this.quitGame, this);     
    },

    fireCannonball: function(){
        //if(this.game.time.now > this.shootTime){
            if(fireKey.isDown){
                this.cannonball.position.x = 70;
                this.cannonball.position.y = 750;
                this.directionInitial();
                //this.shootTime = this.game.time.now + 200;
            }
        //}
    },
    
    directionInitial: function(){
        //have to make this faster
        this.cannonball.body.velocity.x = this.power * Math.cos(Phaser.Math.degToRad(this.cannon.angle)) * 10;
        this.cannonball.body.velocity.y = this.power * Math.sin(Phaser.Math.degToRad(this.cannon.angle)) * 10;
    },
    
    directionUpdate: function(){
        //have to make this faster
        this.cannonball.body.velocity.y += 9.81;
    },

    updateSeconds: function(){
        this.score++;
        //this.counter.text = 'Score: ' + this.score;
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
        if(powerDownKey.isDown && this.power > 0){
            this.power--;
        }
    },
    
    displayInfo: function(){
        this.angleMessage.text = 'Angle: ' + this.cannon.angle;
        this.powerMessage.text = 'Power: ' + this.power;
    },

    update: function() {
        if(this.gameover == false){
            //this.physics.arcade.overlap(this.cannonball, this.bullets, this.enemyHitsPlayer, null, this);
            //this.boundsCollision();
            this.rotateCannon();
            this.fireCannonball();
            this.powerAdjust();
            this.displayInfo();
            this.directionUpdate();
        }
        else{
            this.quitGame();
        }
    }

};