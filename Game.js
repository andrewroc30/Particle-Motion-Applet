ParticleMotionApplet.Game = function (game) {
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
};

ParticleMotionApplet.Game.prototype = {

    create: function (){
        this.gameover = false;
        this.secondsElapsed = 0;
        this.timer = this.time.create(false);
        this.timer.loop(1000, this.updateSeconds, this);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.cannonball = this.add.sprite(-100, -100, 'cannonball');
        this.cannonball.velocity = 0;
        this.cannonball.enableBody = true;

        this.game.physics.arcade.enable([this.cannonball]);

        this.cannon = this.add.sprite(70, 400, 'cannon');
        this.cannon.anchor.setTo(0.5, 0.5);

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
    },

    updateSeconds: function(){
        this.secondsElapsed++;
    },

    buildWorld: function () {
        //this.counter = this.add.bitmapText(10, 10, 'eightbitwonder', 'Score: ' + this.score, 0);
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

    /*fireBullet: function(){
        //To avoid them being allowed to fire too fast we set a time limit
        if (this.game.time.now > this.bulletTime)
        {
            //Grab the first bullet we can from the pool
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet){
                //And fire it
                this.tooClose = true;
                while(this.tooClose == true){
                    this.bullet.reset(Math.random() * 1600, Math.random() * 800);
                    if(this.bullet.body.x > (this.cannonball.x + 300) || this.bullet.body.x < (this.cannonball.x - 300) || this.bullet.body.y > (this.cannonball.y + 300) || this.bullet.body.y < (this.cannonball.y - 300)){
                        this.tooClose = false;
                    }
                    else{
                        this.bullet.kill();
                    }
                }
                this.directionUpdate(this.bullet);
                this.bulletTime = this.game.time.now + 200;
            }
        }
    },*/

    fireCannonball: function(){
        //if(this.game.time.now > this.shootTime){
            if(fireKey.isDown){
                this.cannonball.position.x = 70;
                this.cannonball.position.y = 400;
                //this.directionUpdate(this.cannonball);
                this.shootTime = this.game.time.now + 200;
            }
        //}
    },

    /*directionUpdate: function(bullt) {
        // Calculate direction towards player
        this.toPlayerX = this.cannonball.x - bullt.body.x;
        this.toPlayerY = this.cannonball.y - bullt.body.y;
        // Move towards the player
        bullt.body.velocity.x = this.toPlayerX;
        bullt.body.velocity.y = this.toPlayerY;
    },*/
    
    directionUpdate: function(){
        
    },

    updateSeconds: function(){
        this.score++;
        //this.counter.text = 'Score: ' + this.score;
    },

    /*killBullets: function(){
        this.bullets.forEachAlive(function(bullet){
            if(bullet.body.x > 1600 || bullet.body.x < 0 || bullet.body.y > 800 || bullet.body.y < 0){
                bullet.kill();
                console.log('bullet killed');
                this.bulletsDodged++;
            }
        }, this)
    },*/

    rotateCannon: function(){
        if(angleDownKey.isDown && this.cannon.angle < 90){
            this.cannon.angle += 1;
        }
        if(angleUpKey.isDown && this.cannon.angle > -90){
            this.cannon.angle -= 1;
        }
    },

    update: function() {
        if(this.gameover == false){
            //this.fireBullet();
            //this.physics.arcade.overlap(this.cannonball, this.bullets, this.enemyHitsPlayer, null, this);
            //this.boundsCollision();
            //this.killBullets();
            this.rotateCannon();
            this.fireCannonball();
        }
        else{
            this.quitGame();
        }
    }

};