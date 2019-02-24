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
var standDirection = 0;
var stars;
// var bombs;
// var platforms;
var cursors;
var score = 0;
var gameOver = false;
// var scoreText;


var game = new Phaser.Game(config);


function preload () {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    // this.load.image('star', 'assets/star.png');
    // this.load.image('bomb', 'assets/bomb.png');
    // this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('legi', 'assets/legi.png', { frameWidth: 30, frameHeight: 30, endFrame: 25 });
    this.load.spritesheet('basicGuy', 'assets/BasicGuy8080.png', { frameWidth: 80, frameHeight: 80, endFrame: 12 });
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
  player = this.physics.add.sprite(100, 150, 'basicGuy');

  //  Player physics properties. Give the little guy a slight bounce.
  player.setCollideWorldBounds(true);


  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
      key: 'moveLeft',
      frames: this.anims.generateFrameNumbers('basicGuy', { start: 2, end: 3 }),
      frameRate: 4,
      repeat: -1
  });

  this.anims.create({
      key: 'standLeft',
      frames: [ { key: 'basicGuy', frame: 0 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'standRight',
      frames: [ { key: 'basicGuy', frame: 1 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'moveRight',
      frames: this.anims.generateFrameNumbers('basicGuy', { start: 4, end: 5 }),
      frameRate: 4,
      repeat: -1
  });

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();


  //  Player physics properties. Give the little guy a slight bounce.
  // player.setBounce(0.3);
  player.setCollideWorldBounds(true);


  //  Collide the player and the stars with the platforms
  this.physics.add.collider(player, platforms);
  // this.physics.add.collider(stars, platforms);
  // this.physics.add.collider(bombs, platforms);

  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function

  // this.physics.add.overlap(player, stars, collectStar, null, this);

  // this.physics.add.collider(player, bombs, hitBomb, null, this);

}

function update () {
  // if (gameOver)
  // {
  //     return;
  // }



// Player movement

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('moveLeft', true);
    standDirection = 0;
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('moveRight', true);
    standDirection = 1;
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-160);
    if (!cursors.left.isDown) {
      player.anims.play('moveRight', true);
      standDirection = 1;
    }
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
    if (!cursors.right.isDown) {
      player.anims.play('moveLeft', true);
      standDirection = 0;
    }
  } else {
    player.setVelocityY(0);
    if (!cursors.left.isDown && !cursors.right.isDown) {
      if (standDirection === 0) {
        player.anims.play('standLeft', true);
      } else {
        player.anims.play('standRight', true);
      }

    }
  }



  // else
  // {
  //     player.setVelocityX(0);
  //
  //     player.anims.play('turn');
  // }

  // if (cursors.up.isDown && player.body.touching.down) {
  //     player.setVelocityY(-330);
  // }
}
