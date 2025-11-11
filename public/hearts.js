// hearts.js
const canvas = document.getElementById('hearts-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const hearts = [];
  function random(min, max){ return Math.random() * (max - min) + min; }

  class Heart {
    constructor(){
      this.x = random(0, canvas.width);
      this.y = canvas.height + random(20, 120);
      this.size = random(8, 26);
      this.speed = random(0.6, 2.2);
      this.angle = random(0, Math.PI*2);
      this.spin = random(0.002, 0.02);
      this.color = `rgba(255, ${Math.floor(random(60,210))}, ${Math.floor(random(140,255))}, 0.9)`;
    }
    draw(){
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -this.size/2, -this.size, -this.size/2, -this.size, 0);
      ctx.bezierCurveTo(-this.size, this.size/2, 0, this.size, 0, this.size*1.4);
      ctx.bezierCurveTo(0, this.size, this.size, this.size/2, this.size, 0);
      ctx.bezierCurveTo(this.size, -this.size/2, 0, -this.size/2, 0, 0);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();

      this.y -= this.speed;
      this.angle += this.spin;
      if (this.y < -60) {
        this.y = canvas.height + random(10, 140);
        this.x = random(0, canvas.width);
      }
    }
  }

  function initHearts() {
    for (let i=0; i<28; i++) hearts.push(new Heart());
  }
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    hearts.forEach(h => h.draw());
    requestAnimationFrame(animate);
  }
  initHearts();
  animate();
}
