function operator(a,op,b) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
    }
}

function displayOnPress() {
    // Grab the HTML elements for the display and the button
    const buttons = document.querySelectorAll("button");
    const display = document.getElementById('input');

    // Run a listener for button presses and update the display
    buttons.forEach(button => 
        button.addEventListener("click", function(event) {
            // Clear the input whenever a button is pressed
            console.log(display);
            display.innerHTML = "   ";

            // Update the display with the given button
            display.value = this.id;
        })
    );
}

displayOnPress();   
