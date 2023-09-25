function isNumber (number) {
    return number in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
}

function operator(buttonPresses) {
    // Create an object that maps the operator values to functions
    
    let isLastPressNumber = true;

    const operators = {
        "add": function(a,b) {return a + b},
        "subtract": function(a,b) {return a - b},
        "multiply": function(a,b) {return a * b},
        "divide": function(a,b) {return a / b}
    };

    let currentNumber = "";
    let currentOperator = "";
    let numOfPresses = buttonPresses.length;

    for (let i = 0; i <  numOfPresses; i++) {
        if (isLastPressNumber) {
        
            if (isNumber( buttonPresses[i] )) {
                currentNumber += buttonPresses[i];
            }

            else if (buttonPresses[i] in operators) {
                currentOperator = buttonPresses[i];
                isLastPressNumber = false;
            }
            
        }
        else if (!isLastPressNumber) {

            if (buttonPresses[i] in operators) {
                currentOperator = buttonPresses[i]
            }
            
            else if (isNumber( buttonPresses[ i ] )) {

                if ( i + 1 == numOfPresses ) { 
                    return operators[buttonPresses[ i - 1 ]]
                        (parseInt(currentNumber), parseInt(buttonPresses[ i ]))
                }

                else {
                    if (isNumber (buttonPresses[ i + 1 ])) {
                        currentNumber += buttonPresses[ i ];
                    }
                    else if (buttonPresses[ i + 1] in operators) {
                        currentNumber = operators[buttonPresses[ i - 1 ]]
                            (parseInt(currentNumber), 
                            parseInt(buttonPresses[ i ]))
                        isLastPressNumber = true;
                    }
                }
            } 
        }
    } 

    return currentNumber;
}

function displayOnPress() {
    // Grab the HTML elements for the display and the button
    const buttons = document.querySelectorAll("button");
    const display = document.getElementById('input');

    let pressRecord = [];

    // Run a listener for button presses and update the display
    buttons.forEach(button => 
        button.addEventListener("click", function(event) {
            // Clear the input whenever a button is pressed
            display.innerHTML = "";

            // Update the display with the given button
            display.value = this.id;

            // We need to track all of the button presses and when the user
            // hits the equal sign then we go ahead and run the operate function

            if (this.id == "clear") {
                pressRecord = [];
            } 
            else {
                if (this.id != "equals") {
                    pressRecord.push(this.id);
                }
                else {
                    let calculatedValue = operator(pressRecord);
                    display.value = calculatedValue;
                    pressRecord = [calculatedValue];
                }   
            }

            console.log(pressRecord);
        })
    );
}

displayOnPress();   
