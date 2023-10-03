function isNumber(number) {
    return number in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
}

function userInputCleaner(buttonPresses) {

    let i = 0;

    while (i < buttonPresses.length) {
        if (i == 0 && !isNumber(buttonPresses[i])) {

            let validOperator = buttonPresses[i];
            let j = i + 1;

            do {
                if (isNumber(buttonPresses[j])) {
                    break;
                }
                validOperator = buttonPresses[j];
                j++;
            } while (!isNumber(buttonPresses[j]) && j < buttonPresses.length);

            buttonPresses.splice(0, j, '0', validOperator);
            i++;
            continue;
        }

        if (isNumber(buttonPresses[i])) {
            let validNumber = buttonPresses[i];
            let j = i + 1;

            while (isNumber(buttonPresses[j]) && j < buttonPresses.length) {
                validNumber += buttonPresses[j];
                j++;
            }

            buttonPresses.splice(i, j - i, validNumber);
            i++;
            continue;
        }

        if (!isNumber(buttonPresses[i])) {
            let validOperator = buttonPresses[i];
            let j = i + 1;

            do {
                if (isNumber(buttonPresses[j])) {
                    break;
                }
                validOperator = buttonPresses[j];
                j++;
            } while (!isNumber(buttonPresses[j]) && j < buttonPresses.length);

            buttonPresses[i] = validOperator;
            buttonPresses.splice(i, j - i, validOperator);
            i++;
            continue;
        }
    }

    if (!isNumber(buttonPresses.length - 1)) {
        buttonPresses.splice(-1, 1);
    }

    return buttonPresses;
}

function operator(cleanedButtonPresses) {

    const operators = {
        "+": function(a,b) {return a + b},
        "-": function(a,b) {return a - b},
        "x": function(a,b) {return a * b},
        "/": function(a,b) {return a / b}
    };

    while (cleanedButtonPresses.length > 1) {
        let lastCalculated = operators[
            cleanedButtonPresses[1]](
                parseInt(cleanedButtonPresses[0])
                ,parseInt(cleanedButtonPresses[2])
        );
        cleanedButtonPresses.splice(0, 3, lastCalculated)
    }

    return cleanedButtonPresses[0];
}

operator(userInputCleaner(['6','3','-','6']))


function displayOnPress() {
    // Grab the HTML elements for the display and the button
    const buttons = document.querySelectorAll("button");
    const display = document.getElementById('input');
    const invisibleButtons = ["add", "subtract", "multiply", "divide", 
        "clear", "equals"]

    let pressRecord = [];

    // Run a listener for button presses and update the display
    buttons.forEach(button => 
        button.addEventListener("click", function(event) {
            // Clear the input whenever a button is pressed
            display.innerHTML = "";

            // Update the display with the given button

            if (!invisibleButtons.includes(this.id)) {
                display.value = this.innerHTML;
            }

            // We need to track all of the button presses and when the user
            // hits the equal sign then we go ahead and run the operate function

            if (this.id == "clear") {
                pressRecord = [];
                display.value = " ";
            } 

            else {
                if (this.id != "equals") {
                    pressRecord.push(this.id);
                }
                else {
                    let cleanedValues = userInputCleaner(pressRecord);
                    let calculatedValue = operator(cleanedValues);
                    display.value = calculatedValue;
                    pressRecord = [];
                }   
            }   
        })
    );
}

displayOnPress();   