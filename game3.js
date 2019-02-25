var config = {
    type: Phaser.AUTO,
    width: 1000,  // 1400
    height: 600,  // 750
    physics: {
        default: 'arcade',
        // arcade: {
        //     gravity: { y: 300 },
        //     debug: false
        // }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};



var player;
var standDirection = 0;
// var stars;
// var bombs;
// var platforms;
var cursors;
// var score = 0;
// var gameOver = false;
// var scoreText;


var game = new Phaser.Game(config);

function preload () {
  this.load.image('map', 'assets/Onett.gif');
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('ship', 'assets/jet3.png');
  this.load.spritesheet('legi', 'assets/legi.png', { frameWidth: 30, frameHeight: 30, endFrame: 25 });
  this.load.spritesheet('basicGuy', 'assets/BasicGuy8080.png', { frameWidth: 80, frameHeight: 80, endFrame: 12 });
}

function create () {
  this.cameras.main.setBounds(0, 0, 1600, 1200);

  this.add.image(0, 0, 'map').setOrigin(0).setScrollFactor(1);

  cursors = this.input.keyboard.createCursorKeys();

  player = this.physics.add.sprite(100, 150, 'basicGuy');
  ship = this.physics.add.image(400.5, 301.3, 'ship');
  ship.setScale(0.3, 0.3);


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





  // this.cameras.main.setBounds(0, 0, 1600, 1200);
  //
  // this.add.image(-150, -150, 'map').setOrigin(0).setScrollFactor(1);
  //
  // cursors = this.input.keyboard.createCursorKeys();
  //
  // ship = this.physics.add.image(50, 50, 'ship');
  //
  // this.cameras.main.startFollow(ship, true, 0.09, 0.09);
  // this.cameras.main.roundPixels = true;

  // this.cameras.main.setZoom(4);

}

function update () {

  if (cursors.left.isDown) {
    player.setVelocityX(-250);
    player.anims.play('moveLeft', true);
    standDirection = 0;
  } else if (cursors.right.isDown) {
    player.setVelocityX(250);
    player.anims.play('moveRight', true);
    standDirection = 1;
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-250);
    if (!cursors.left.isDown) {
      player.anims.play('moveRight', true);
      standDirection = 1;
    }
  } else if (cursors.down.isDown) {
    player.setVelocityY(250);
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
}
