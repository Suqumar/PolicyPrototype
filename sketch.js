let video;
let marks = []; // Array to store the positions where you click or touch
let touchStart = 0; // Time when the touch started
let lastTap = 0; // Time since the last tap
let longPressDuration = 500; // Time in milliseconds for a long press

function setup() {
    createCanvas(640, 480);
    
    // Define camera constraints for the rear-facing (environment) camera without microphone
    let constraints = {
        video: {
            facingMode: "environment"
        },
        audio: false // Do not request microphone access
    };

    // Create a video capture with the defined constraints
    video = createCapture(constraints);
    video.size(width, height);
    video.hide(); // Hide the HTML video element
}

function draw() {
    background(0);
    image(video, 0, 0); // Draw the video feed

    // Draw all marks
    for (let mark of marks) {
        drawMark(mark.x, mark.y); // Draw an X at each marked position
    }
}

function drawMark(x, y) {
    stroke(255, 0, 0); // Red color for the X mark
    strokeWeight(3); // Stroke weight for the X mark
    line(x - 10, y - 10, x + 10, y + 10); // Draw one line of the X
    line(x + 10, y - 10, x - 10, y + 10); // Draw the other line of the X
}

function touchStarted() {
    touchStart = millis(); // Record the start time of the touch
    return false; // Prevent default browser behavior
}

function touchEnded() {
    let currentTime = millis();
    let touchDuration = currentTime - touchStart;

    if (touchDuration > longPressDuration) {
        // Long press detected, add a mark
        marks.push({x: mouseX, y: mouseY});
    } else {
        // Check for double tap
        if (currentTime - lastTap < 300) {
            saveCanvas('marked_image', 'jpg'); // Save the image on double-tap
        }
        lastTap = currentTime;
    }
    return false; // Prevent default browser behavior
}
