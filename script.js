let canvas = document.getElementById('headerCanvas')
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = 200;
canvas.style.backgroundColor = "black";

let particleArray = [];

const mouse = {
    x:null,
    y:null,
    radius:40
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

ctx.fillStyle = "white"
ctx.font = '120px Roboto'
ctx.fillText('Kealing CTE', 80, 140);
let textCoordinates = ctx.getImageData(70,0,800,180);

class Particle {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0 , Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if(distance < mouse.radius){
        this.x -= directionX;
        this.y -= directionY;
        }
        else {
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/10
            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this. y-= dy/10
            }
        }
    }
}

function init(){
    let x = Math.random() * canvas.width;
    // let y = Math.random() * canvas.height;
    particleArray = [];

    let y2 = textCoordinates.height;
    let x2 = textCoordinates.width;

    for(let y = 0, y2 = textCoordinates.height; y < y2; y++){
    for(let x = 0, x2 = textCoordinates.width; x < x2; x++){

    if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x*4) + 3] > 128){
    let positionX = x + 120;
    let positionY = y - 30;
    particleArray.push(new Particle(positionX ,positionY ))
}
}

}
console.log(particleArray[2])
// for(let i = 0; i < 300; i++){
// let x = Math.random() * canvas.width;
// let y = Math.random() * canvas.height;
// particleArray.push(new Particle(x,y));
// }
}


init();


function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "red";
    ctx.rect(100,10,700,170);
    ctx.stroke();
    for(let i = 0; i < particleArray.length; i++){

    particleArray[i].draw();
    particleArray[i].update();
}


requestAnimationFrame(animate)
}


animate()