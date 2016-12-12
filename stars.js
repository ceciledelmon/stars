class Star {
  constructor(ctx, canvas, opts) {
    this.ctx = ctx
    this.canvas = canvas

    this.position = vec2.create()
    this.velocity = vec2.create()
    this.size = vec2.create()

    this.position[0]= opts.position.x || 0
    this.position[1]= opts.position.y || 0

    this.velocity[0]= opts.velocity.x || 0
    this.velocity[1]= opts.velocity.y || 0

    this.size = opts.size || 2

  }
  update(){
    vec2.add( this.position, this.position, this.velocity )
    if (this.position[0] < 0 || this.canvas.width-this.size < this.position[0]){
      this.velocity[0] = -this.velocity[0]
    }
    if (this.position[1] < 0 || this.canvas.height-this.size < this.position[1]){
      this.velocity[1] = -this.velocity[1]
    }

  }
  draw(){
    var ctx = this.ctx
    ctx.save()
    ctx.beginPath()
    ctx.translate(this.position[0], this.position[1])
    ctx.fillStyle = '#00ffff'
    ctx.arc(0,0,this.size/2,this.size,0,Math.PI*2,true)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }
  distortion(){
  this.position[0] = Math.random()*this.canvas.width
  this.position[1] = Math.random()*this.canvas.height
  }
  getRandomColor() {
    //var letters = '0123456789ABCDEF';
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
