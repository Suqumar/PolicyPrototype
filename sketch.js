let isDrawing = false;
let touchStartTime = 0; // Keep track of when the touch started

function touchStarted(event) {
    // Reset drawing state and touch start time
    isDrawing = false;
    touchStartTime = millis();

    // Check if the input is from an Apple Pencil or similar stylus
    if (event.touches && event.touches[0] && event.touches[0].touchType === 'stylus') {
        isDrawing = true; // Start drawing mode
        currentPath = []; // Start a new drawing path
    }
    return false; // Prevent default behavior like scrolling
}

function touchMoved() {
    if (isDrawing) {
        // Add points to the current drawing path if in drawing mode
        const point = {x: mouseX, y: mouseY};
        currentPath.push(point);
    }
    return false; // Prevent scrolling
}

function touchEnded() {
    let touchEndTime = millis();
    let touchDuration = touchEndTime - touchStartTime;

    if (!isDrawing && touchDuration > longPressDuration) {
        // Add an 'X' mark only if we're not drawing and if it's a long press
        const mark = {x: mouseX, y: mouseY};
        marks.push(mark);
    } else if (isDrawing) {
        // If was drawing, add the current path to the drawings
        if (currentPath.length > 0) {
            drawings.push(currentPath);
        }
    } else if (touchDuration <= longPressDuration && touchEndTime - lastTap < 300) {
        // Check for double tap, but only if it wasn't a long press or drawing
        saveCanvas('marked_image', 'jpg');
    }

    // Reset states
    isDrawing = false;
    lastTap = touchEndTime;

    return false; // Prevent default behavior
}
