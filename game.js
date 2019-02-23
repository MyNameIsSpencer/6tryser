var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
        //     gravity: { y: 300 },
        //     debug: false
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
// var bombs;
// var platforms;
// var cursors;
var score = 0;
var gameOver = false;
// var scoreText;


var game = new Phaser.Game(config);


function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    // this.load.image('star', 'assets/star.png');
    // this.load.image('bomb', 'assets/bomb.png');
    // this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('legi', 'assets/legi.png', { frameWidth: 30, frameHeight: 30, endFrame: 25 });
}

function create () {
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

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('legi', { start: 13, end: 14 }),
      frameRate: 4,
      repeat: -1
  });

  // this.anims.create({
  //     key: 'turn',
  //     frames: [ { key: 'legi', frame: 16 } ],
  //     frameRate: 20
  // });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('legi', { start: 11, end: 12 }),
      frameRate: 4,
      repeat: -1
  });


  //  Player physics properties. Give the little guy a slight bounce.
  // player.setBounce(0.3);
  player.setCollideWorldBounds(true);


}

function update ()
{

}
