
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('legi', 'assets/ComProLeg.png', { frameWidth: 30, frameHeight: 30, endFrame: 25 });
}

function create ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'legi');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.3);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('legi', { start: 13, end: 14 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'legi', frame: 16 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('legi', { start: 11, end: 12 }),
        frameRate: 4,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}



//
// var frames = [
//     { key: 'boom', frame: 0 },
//     { key: 'boom', frame: 1 },
//     { key: 'boom', frame: 2 },
//     { key: 'boom', frame: 1 }
// ];







// 
//
// class PlatformerScene extends Phaser.Scene {
//     constructor() {
//         super({ key: 'PlatformerScene' })
//         this.accumulator = 0;
//         this.fps = 60;  // Physics checks 60 times/s
//         this.physicsTimestep = 1000 / this.fps;
//
//         console.log("constructor");
//     }
//
//     preload() {
//         console.log("preload");
//     }
//
//     create() {
//         console.log("create");
//     }
//
//     update(timestamp, elapsed) {
//         console.log("update");
//
//         this.accumulator += elapsed;
//         while (this.accumulator >= this.physicsTimestep) {
//             this.accumulator -= this.physicsTimestep;
//             this.physics.update(this.physicsTimestep);
//         }
//         this.render(timestamp, elapsed);
//     }
// }
//
//
// var config = {
//     type: Phaser.AUTO,
//     width:  window.innerWidth,
//     height: window.innerHeight,
//     backgroundColor: '#000404',
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 300 },
//             debug: false
//         }
//     },
//     scene: PlatformerScene
// }
//
// game = new Phaser.Game(config);
