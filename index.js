/*
////////////////////////
INITIALISATION CANVAS
////////////////////////
*/

var canvas = document.getElementById('canvas')
canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight - 30
var ctx = canvas.getContext('2d')
document.getElementById('canvas').style.background = '#000000'

/*
////////////////////////
INITIALISATION VARIABLES
////////////////////////
*/

var mouse = vec2.create()
mouse[0] = 1
mouse[1] = 1

var stars = [];

for (var i = 0; i < 100; i++) {
  ctx.save()
  var optionsStar = {
    position: {
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height
    },
    velocity:{
      x: Math.random()*5,
      y: Math.random()*5
    },
    size: Math.random()* (10 - 5) + 5,
    random: Math.floor(Math.random() * 2) + 1,
    ease: Math.random() /100
  }
  stars.push(new Star(ctx, canvas, optionsStar))
  ctx.restore()
}


/*
////////////////////////
INITIALISATION EVENTS
////////////////////////
*/
document.onmousemove = function(e){
    mouse[0] = e.clientX;
    mouse[1] = e.clientY;
}

window.addEventListener('wheel', function(e) {
  for (var Star of stars) {
    Star.distortion()
  }
  //document.getElementById('canvas').style.background = Star.getRandomColor()
})

/*
////////////////////////
INITIALISATION TICKER
////////////////////////
*/
var dist = vec2.create();
var distance = 0;
var dist2 = vec2.create();

var startAnimation = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (star of stars) {
    star.update()
    star.draw()
    for (otherstar of stars) {
        vec2.subtract(dist, star.position, otherstar.position);
        distance = Math.sqrt(dist[0] * dist[0] + dist[1] * dist[1]);
        if (distance < 150) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = star.getRandomColor();
            ctx.globalAlpha = 1 - ((distance) / 150);
            ctx.moveTo(star.position[0], star.position[1]);
            ctx.lineTo(otherstar.position[0], otherstar.position[1]);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
        distance=0
        vec2.subtract(dist2, mouse, otherstar.position);
        distance = Math.sqrt(dist2[0] * dist2[0] + dist2[1] * dist2[1]);
        if (distance < 300) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = star.getRandomColor();
            ctx.globalAlpha = 1 - ((distance) / 300);
            ctx.moveTo(mouse[0], mouse[1]);
            ctx.lineTo(otherstar.position[0], otherstar.position[1]);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }
  }

  requestAnimationFrame(startAnimation)
}

startAnimation()

/*
////////////////////////
INITIALISATION FONCTIONS
////////////////////////
*/
