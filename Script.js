let images = [];
let leftWeight = 0, rightWeight = 0;
let balanceAngle = 0;

function preload() {
    images.push({ img: loadImage('images/img1.png'), x: 100, y: 200, weight: 3, side: 'left', dragging: false });
    images.push({ img: loadImage('images/img2.png'), x: 200, y: 200, weight: 5, side: 'right', dragging: false });
    images.push({ img: loadImage('images/img3.png'), x: 300, y: 200, weight: 2, side: 'right', dragging: false });
}

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(220);
    drawBalance();
    drawImages();
}

function drawBalance() {
    push();
    translate(width / 2, 300);
    rotate(balanceAngle);
    stroke(0);
    line(-100, 0, 100, 0);
    ellipse(0, 0, 10, 10);
    pop();
}

function drawImages() {
    for (let img of images) {
        image(img.img, img.x, img.y, 50, 50);
    }
}

function mousePressed() {
    for (let img of images) {
        if (mouseX > img.x && mouseX < img.x + 50 && mouseY > img.y && mouseY < img.y + 50) {
            img.dragging = true;
        }
    }
}

function mouseDragged() {
    for (let img of images) {
        if (img.dragging) {
            img.x = mouseX - 25;
            img.y = mouseY - 25;
        }
    }
}

function mouseReleased() {
    for (let img of images) {
        img.dragging = false;
        if (img.x < width / 2 - 50) {
            img.side = 'left';
        } else if (img.x > width / 2 + 50) {
            img.side = 'right';
        } else {
            img.side = null;
        }
    }
    updateBalance();
}

function updateBalance() {
    leftWeight = rightWeight = 0;
    for (let img of images) {
        if (img.side === 'left') {
            leftWeight += img.weight;
        } else if (img.side === 'right') {
            rightWeight += img.weight;
        }
    }
    balanceAngle = map(rightWeight - leftWeight, -10, 10, -PI / 6, PI / 6);
}
