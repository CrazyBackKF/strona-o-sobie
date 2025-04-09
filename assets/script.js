const music = new Howl({
    src: ["assets/i-be-poppin-bottles.mp3"],
    autoplay: true,
    repeat: true
})

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

class Confetti {
    constructor({position, color, velocity, rotation}) {
        this.position = position;
        this.color = color;
        this.velocity = velocity;
        this.rotation = rotation;
        this.rotationForce = rotation * 0.01;
        this.angle = 0;
        this.width = 10;
        this.height = 30;
        this.gravity = 0.3;
    }

    update() {
        this.draw();
        this.applyVelocity();
        this.applyGravity();
        this.applyRotation();
    }

    draw() {
        c.save();
        c.fillStyle = this.color;
        c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        c.rotate(this.angle);
        c.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        c.restore();
    }

    applyVelocity() {

        this.position.x += this.velocity.x * deltaTime / 10;
        this.position.y += this.velocity.y * deltaTime / 10;
    }

    applyGravity() {
        this.velocity.y += this.gravity * deltaTime / 10;
    }

    applyRotation() {
        this.angle += this.rotation * deltaTime / 10;
        this.rotation -= this.rotationForce * deltaTime / 10;
    }
}

let confettiTab = [];
let deltaTime = 0;
let lastTime = 0;

function animate(currentTime) {
    if (!lastTime) lastTime = currentTime;
    deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    confettiTab.forEach(confetti => confetti.update());
    confettiTab = confettiTab.filter(confetti => confetti.position.y < canvas.height);
}


function addConfetti(e) {
    for (let i = 0; i < 10; i++) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;
        const color = `rgb(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1})`;
        const speed = Math.random() * 10 + 3;
        const rotation = Math.random() - 0.5;
        const velocity = {
            x: speed * Math.cos(2 * Math.PI / 10 * i),
            y: speed * Math.sin(2 * Math.PI / 10 * i)
        }
        confettiTab.push(new Confetti({
            position: {
                x: mouseX,
                y: mouseY
            },
            color,
            velocity,
            rotation
        }))
    }
}

function resizeCanvas() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
addEventListener("load", () => {
    resizeCanvas(); 
    animate();
});
addEventListener("resize", resizeCanvas);
addEventListener("click", (e) => addConfetti(e))