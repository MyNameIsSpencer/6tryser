var game;
var gameOptions = {
    playerSpeed: 120,
    playerJumpSpeed: {
        x: 30,
        y: -100
    },
    tileSize: 32,
    changeDirectionRange: 32,
    playerGravity: 400
}
window.onload = function() {
    var gameConfig = {
        width: 800,
        height: 320,
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 0
                }
            }
        },
        scene: [playGame]
    }
    game = new Phaser.Game(gameConfig);
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);
}
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    preload(){
		this.load.tilemapTiledJSON("map", "map.json");
		this.load.image("tiles", "tiles.png");
        this.load.image("player", "player.png");
	}
	create(){
        this.tilePoint = null;
        this.map = this.make.tilemap({
            key: "map"
        });
        var tileSet = this.map.addTilesetImage("tileset01", "tiles");
        this.levelLayer = this.map.createDynamicLayer("myLevel", tileSet);
        this.map.setCollisionBetween(1, 2);
        this.player = this.physics.add.sprite(48, 226, "player");
        this.player.isJumping = false;
        this.player.direction = 1;
        this.player.body.gravity.y = gameOptions.playerGravity;
        this.input.on("pointerdown", this.addBlock, this);
	}
	update(){
        this.player.body.velocity.x = 0;
        this.physics.world.collide(this.player, this.levelLayer, this.movePlayer, null, this);
	}
    movePlayer(){
        if(this.player.body.blocked.down){
            this.player.body.velocity.x = gameOptions.playerSpeed * this.player.direction;
            this.player.isJumping = false;
        }
        if(this.player.body.blocked.right && this.player.direction == 1){
            if((!this.map.getTileAtWorldXY(this.player.x + gameOptions.tileSize, this.player.y - gameOptions.tileSize) && !this.map.getTileAtWorldXY(this.player.x, this.player.y - gameOptions.tileSize)) || this.player.isJumping){
				this.jump();
			}
            else{
                this.player.direction *= -1;
            }
        }
        if(this.player.body.blocked.left && this.player.direction == -1){
			if((!this.map.getTileAtWorldXY(this.player.x - gameOptions.tileSize, this.player.y - gameOptions.tileSize) && !this.map.getTileAtWorldXY(this.player.x, this.player.y - gameOptions.tileSize)) || this.player.isJumping){
				this.jump();
			}
			else{
				this.player.direction *= -1;
			}
		}
    }
    addBlock(e){
        var distanceX = e.x - this.player.x;
        var distanceY = e.y - this.player.y;
        if ((distanceX * distanceX + distanceY * distanceY) < gameOptions.changeDirectionRange * gameOptions.changeDirectionRange){
            this.player.direction *= -1;
        }
        else{
            if(!this.map.getTileAtWorldXY(e.x, e.y)){
                if(this.tilePoint){
                    this.map.removeTileAtWorldXY(this.tilePoint.x, this.tilePoint.y);
                }
                this.map.putTileAtWorldXY(2, e.x, e.y);
                this.tilePoint = new Phaser.Math.Vector2(e.x, e.y);
            }
        }
    }
    jump(){
        this.player.body.velocity.y = gameOptions.playerJumpSpeed.y;
        this.player.body.velocity.x = gameOptions.playerJumpSpeed.x * this.player.direction;
        this.player.isJumping = true;
    }
}
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
