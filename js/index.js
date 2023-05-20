const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);


const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './oak_woods_v1.0/background/JS_Fighting_Background.png'
 
})


const shop = new Sprite({
  position: {
    x: 600,
    y: 165
  },
  imageSrc: './oak_woods_v1.0/decorations/shop_anim.png',
  scale: 2.75,
  framesMax: 6

 
})


//Player1

const player = new Fighter({
  position:{
  x: 0,
  y: 0,
},
velocity:{
  x: 0,
  y: 0
},
offset: {
  x:0,
  y:0
},
imageSrc: './Martial Hero/Sprites/Idle.png',
framesMax: 8,
scale: 2.5,
offset: {
  x: 215,
  y: 160
},
sprites: {
  idle: {
    imageSrc: './Martial Hero/Sprites/Idle.png',
    framesMax: 8
  },
  run: {
    imageSrc: './Martial Hero/Sprites/Run.png',
    framesMax: 8
  },
  jump: {

    imageSrc: './Martial Hero/Sprites/Jump.png',
    framesMax: 2
  },

  fall: {
    imageSrc: './Martial Hero/Sprites/Fall.png',
    framesMax: 2
  },

   attack1: {
    imageSrc: './Martial Hero/Sprites/Attack1.png',
    framesMax: 6
  },

  takeHit: {
    imageSrc:'./Martial Hero/Sprites/Take Hit.png',
    framesMax: 4
  },

  death:{
    imageSrc:'./Martial Hero/Sprites/Death.png',
    framesMax: 6
  }
},

attackBox: {
  offset: {

  x: 100,
  y:50
  },
  width: 140,
  height: 50
}
});


const enemy = new Fighter({
  position:{
  x: 400,
  y: 100,
},
velocity:{
  x:0,
  y:0
},
color: 'blue',
offset: {
  X: -50,
  y:0
},
sprites: {
  idle: {
    imageSrc: './Martial Hero_2/Sprites/Idle.png',
    framesMax: 8
  },
  run: {
    imageSrc: './Martial Hero_2/Sprites/Run.png',
    framesMax: 8
  },
  jump: {
    imageSrc: './Martial Hero_2/Sprites/Jump.png',
    framesMax: 2
  },

  fall: {
    imageSrc: './Martial Hero_2/Sprites/Fall.png',
    framesMax: 2
  },

   attack2: {
    imageSrc: './Martial Hero_2/Sprites/Attack2.png',
    framesMax: 4
  },

  takeHit: {
    imageSrc: './Martial Hero_2/Sprites/Take hit.png',
    framesMax: 3
  },

  death:{
    imageSrc:'./Martial Hero_2/Sprites/Death.png',
    framesMax: 7
  }
},

attackBox: {
  offset: {

  x: 100,
  y:50
  },
  width: 140,
  height: 50
},


});

enemy.draw();

console.log(player);



const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowDown:{
    pressed: false
  }
}



decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = 'black';
  c.fillRect(0,0, canvas.width, canvas.height)
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  shop.update()
  player.update()
  enemy.update()


   player.velocity.x = 0;
   enemy.velocity.x = 0;

   // Player Movement
   
   if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5

    player.switchSprite('run')

    player.image = player.sprites.run.image

   } else if (keys.d.pressed && player.lastKey ==='d') {
    player.velocity.x = 5
    player.switchSprite('run')
   } else {
    player.switchSprite('idle')
   }

   // Player Jump
   if(player.velocity.y < 0) {
    player.switchSprite('jump')
   } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
   }



   if(player.velocity.y < 0) {}



   //Enemy Movement
   if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
    enemy.switchSprite('run')
   } else if (keys.ArrowRight.pressed && enemy.lastKey ==='ArrowRight') {
    enemy.velocity.x = 5
    enemy.image = enemy.sprites.run.image
   }

  //Collision Detection
  if( 
    rectangularCollision({
    rectangle1: player,
    rectangle2: enemy
  }) && 
  player.isAttacking && player.framesCurrent === 4){
      enemy.takeHit()
      player.isAttacking = false
      
   document.querySelector('#enemyHealth').style.width =enemy.health + '%'
   WebGLSampler.to('#enemyHealth', {width: enemy.health + '%'})
    }

   //If Player Misses
   if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
   }


  if( 
    rectangularCollision({
    rectangle1: enemy,
    rectangle2: player
  }) && 
  enemy.isAttacking && enemy.framesCurrent === 2) {

      player.takeHit()
      enemy.isAttacking = false
      document.querySelector('#playerHealth').style.width =player.health + '%'
      WebGLSampler.to('#playerHealth',{width: player.health + '%'} )

   //If Enemy Misses
   if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
   }
   

  }
//End Game Based on Health

 if (enemy.health <= 0 || player.health <= 0){
determineWinner({player, enemy, timerId})
 }


}

animate();


window.addEventListener('keydown', (event) => {

  if(!player.dead) {
  
  switch(event.key) {
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd'
      break
      case 'a':
     keys.a.pressed = true;
     player.lastKey = 'a'
      break
      case 'w':
     player.velocity.y = -20
      break
      case ' ':
        player.attack()
      break 
  }
}
  
if(!enemy.dead) {
  switch(event.key) {
    case 'ArrowRight':
        keys.ArrowRight.pressed = true;
        enemy.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft':
       keys.ArrowLeft.pressed = true;
       enemy.lastKey = 'ArrowLeft'
        break
        case 'ArrowUp':
       enemy.velocity.y = -20
        break
        case 'ArrowDown':
         enemy.isAttacking = true;
           break
  }
}
})

window.addEventListener('keyup', (event) => {
  switch(event.key) {
    case 'd':
     keys.d.pressed = false;
      break
      case 'a':
      keys.a.pressed = false;
      break
      case 'w':
     keys.w.pressed = false;
     lastKey = 'w'
      break

      case 'ArrowRight':
     keys.ArrowRight.pressed = false;
      break
      case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break
      case 'ArrowUp':
     keys.ArrowUp.pressed = false;
     lastKey = 'ArrowUp'
      break
  }
 
})