const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);


const gravity = 0.2;


class Sprite {
  constructor({position, velocity}) {
    this.position = position;
    this.velocity = velocity;
<<<<<<< HEAD
    this.height = 150
=======
>>>>>>> f4ba0a88518935c4090a261f47d9a0029371d0d2
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw()
    this.velocity.y += gravity
    this.position.y += this.velocity.y

     if(this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
     }

  }

  update() {
    this.draw()
    this.position.y += 10
  }
}

const player = new Sprite({
  position:{
  x: 0,
  y: 0,
},
velocity:{
  x: 0,
  y: 0
}
});


const enemy = new Sprite({
  position:{
  x: 400,
  y: 100,
},
velocity:{
  x:0,
  y:0
}

});

enemy.draw();

console.log(player);

function animate() {
  window.requestAnimationFrame(animate);
<<<<<<< HEAD
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height)
=======
>>>>>>> f4ba0a88518935c4090a261f47d9a0029371d0d2
  player.update()
  enemy.update()
}

animate();
