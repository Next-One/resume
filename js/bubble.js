function Bubble(x, y, speedX, speedY, radius, rgb, a) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;
    this.rgb = rgb;
    this.a = a;
    this.sA = a;
    this.clicked = false;
    this.maxR = 80;
    this.count = 0;

}

Bubble.prototype.update = function () {
    if (!this.clicked) {
        var speedX = this.speedX,
            speedY = this.speedY;
        if (this.y - this.radius <= 0) {
            speedY = Math.abs(speedY);
        }
        if (this.y + this.radius >= this.height) {
            speedY = -Math.abs(speedY);
        }
        if (this.x - this.radius <= 0) {
            speedX = Math.abs(speedX);
        }
        if (this.x + this.radius >= this.width) {
            speedX = -Math.abs(speedX);
        }
        this.speedY = speedY;
        this.speedX = speedX;
        this.y += speedY;
        this.x += speedX;
    } else {
        this.count++;
        if(this.count > this.maxCount){
            this.clicked = false;
            this.a = this.sA;
            this.count = 0;
        }else{
            this.a = 0;
        }
    }
};

Bubble.prototype.render = function (context) {
    context.beginPath();
    context.fillStyle = "rgba(" + this.rgb + "," + this.a + ")";
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
};
const bubbleConfig = {
    num: 15,
    maxRadius: 30,
    minRadius: 25,
    minYVelocity: .5,
    minXVelocity: 1,
    maxYVelocity: 1.5,
    maxXVelocity: 2.5,
    maxCount:800
};
const canvasNode=document.querySelector("#myCanvas");
function init() {
    var i, bubble, R, G, B, A, sx, sy,
        bubbles = [],
        bubblesNum = bubbleConfig.num,
        maxRadius = bubbleConfig.maxRadius,
        minRadius = bubbleConfig.minRadius,
        minYVelocity = bubbleConfig.minYVelocity,
        minXVelocity = bubbleConfig.minXVelocity,
        maxYVelocity = bubbleConfig.maxYVelocity,
        maxXVelocity = bubbleConfig.maxXVelocity;

    const w =window.innerWidth, h = window.innerHeight;
    Bubble.prototype.maxCount = bubbleConfig.maxCount;
    setSize();
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    for (i = 0; i < bubblesNum; i++) {
        bubble = new Bubble();
        R = randomInRange(0, 150);
        G = randomInRange(150, 255);
        B = 255;
        A = randomInRange(.6, .9);
        bubble.radius = randomInRange(minRadius, maxRadius);
        bubble.x = randomInRange(bubble.radius, w - bubble.radius);
        bubble.y = randomInRange(bubble.radius, h - bubble.radius);
        sx = randomInRange(minXVelocity, maxXVelocity);
        sy = randomInRange(minYVelocity, maxYVelocity);
        bubble.speedX = Math.random() > 0.5 ? sx : -sx;
        bubble.speedY = Math.random() > 0.5 ? sy : -sy;
        bubble.rgb = R + ',' + G + ',' + B;
        bubble.a = A;
        bubble.sA = A;
        bubbles.push(bubble);
    }
    return bubbles;
}

const bubbles = init(),context = canvasNode.getContext("2d");
function drawBubbles() {
    context.clearRect(0,0,Bubble.prototype.width,Bubble.prototype.height );
    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
        bubbles[i].render(context);
    }
    requestAnimationFrame(drawBubbles);
}

drawBubbles();

function setSize() {
    const width =window.innerWidth, height = window.innerHeight;
    canvasNode.width = width;
    canvasNode.height = height;
    Bubble.prototype.height = height;
    Bubble.prototype.width = width;
}

window.addEventListener('resize', setSize);


const COLORS = {
    RED:      '#FD5061',
    YELLOW:   '#FFCEA5',
    BLACK:    '#29363B',
    WHITE:    'white',
    VINOUS:   '#A50710'
};

const burst1 = new mojs.Burst({
    left: 0, top: 0,
    count:    5,
    radius:   { 50: 250 },
    children: {
        fill:   'white',
        shape:  'line',
        stroke: [ COLORS.WHITE, COLORS.VINOUS ],
        strokeWidth: 12,
        radius: 'rand(30, 60)',
        radiusY: 0,
        scale: { 1: 0 },
        pathScale: 'rand(.5, 1)',
        degreeShift: 'rand(-360, 360)',
        isForce3d: true,
    }
});

const burst2 = new mojs.Burst({
    top: 0, left: 0,
    count:  3,
    radius: { 0: 250 },
    children: {
        shape:      [ 'circle', 'rect' ],
        points:     5,
        fill:       [ COLORS.WHITE, COLORS.VINOUS ],
        radius:     'rand(30, 60)',
        scale:      { 1: 0 },
        pathScale:  'rand(.5, 1)',
        isForce3d:  true
    }
});

const CIRCLE_OPTS = {
    left: 0, top: 0,
    fill:     COLORS.WHITE,
    scale:    { .2: 1 },
    opacity: { 1: 0 },
    isForce3d: true,
    isShowEnd: false
};

const circle1 = new mojs.Shape({
    ...CIRCLE_OPTS,
    radius:   200,
});

const circle2 = new mojs.Shape({
    ...CIRCLE_OPTS,
    radius:   240,
    easing: 'cubic.out',
    delay: 150,
});

document.addEventListener('mousemove', function (e) {
    var i, b, r, x, y,
        cx = e.pageX,
        cy = e.pageY,
        len = bubbles.length;
    for (i = 0; i < len; i++) {
        b = bubbles[i];

        if (b.clicked) {
            continue;
        }
        x = b.x;
        r = b.radius;
        y = b.y;
        if (cx > x - r && cx < x + r && cy < y + r && cy > y - r) {
            b.clicked = true;
            burst1
                .tune({ x: x, y: y })
                .generate()
                .replay();

            burst2
                .tune({ x: x, y: y })
                .generate()
                .replay();

            circle1
                .tune({ x: x, y: y })
                .replay();

            circle2
                .tune({ x: x, y: y })
                .replay();
            break;
        }
    }
});