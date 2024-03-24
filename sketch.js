let video;
let marks = []; // Array to store positions for long presses
let drawings = []; // Store drawing paths
let currentPath = []; // Store points for the current path
let touchStart = 0; // Time when the touch started
let lastTap = 0; // Time since the last tap
let longPressDuration = 500; // Time in milliseconds for a long press

function setup() {
    createCanvas(windowWidth, windowHeight);

    let constraints = {
        video: {
            facingMode: "environment"
        },
        audio: false
    };

    video = createCapture(constraints);
    video.size(windowWidth, windowHeight);
    video.hide();

    stroke(255, 0, 0); // Default drawing color
    strokeWeight(3); // Default stroke weight
    noFill(); // Ensure that shapes are not filled
}

function draw() {
    background(0);
    image(video, 0, 0, width, height);

    // Draw all long press marks
    marks.forEach(mark => drawMark(mark.x, mark.y));

    // Draw all paths
    drawings.forEach(path => {
        beginShape();
        path.forEach(pt => {
            vertex(pt.x, pt.y);
        });
        endShape();
    });

    // Also draw the current path
    if (currentPath.length > 0) {
        beginShape();
        currentPath.forEach(pt => {
            vertex(pt.x, pt.y);
        });
        endShape();
    }
}

function drawMark(x, y) {
    line(x - 10, y - 10, x + 10, y + 10);
    line(x + 10, y - 10, x - 10, y + 10);
}

function touchStarted(event) {
    touchStart = millis();

    // Check if the input is from an Apple Pencil or similar stylus
    if (event.touches && event.touches[0] && event.touches[0].touchType === 'stylus') {
        isDrawing = true;
        currentPath = [];
        return false; // Prevent default
    }
    return true; // Allow default for non-stylus touches
}

function touchMoved() {
    if (isDrawing) {
        currentPath.push({x: mouseX, y: mouseY});
    }
    return false; // Prevent default actions like scrolling
}

function touchEnded() {
    let currentTime = millis();
    let touchDuration = currentTime - touchStart;

    if (isDrawing) {
        drawings.push(currentPath);
        isDrawing = false;
    } else if (touchDuration > longPressDuration) {
        marks.push({x: mouseX, y: mouseY});
    } else if (currentTime - lastTap < 300) {
        saveCanvas('marked_image', 'jpg');
    }
    lastTap = currentTime;
    return false;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    video.size(windowWidth, windowHeight);
}
