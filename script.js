function load() {
  const btns = document.querySelectorAll("#calculator span");
  const operators = ["+", "-", "x", "÷"];
  const inputScreen = document.querySelector("#screen");
  let btnValue;
  let input;
  let decimalAdded = false; // Flag used to avoid two decimals

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      btnValue = this.innerHTML;
      input = inputScreen.innerHTML;

      switch (btnValue) {
        case "C":
          inputScreen.innerHTML = "0";
          decimalAdded = false;
          break;

        case "=":
          // Last character of the input string
          const lastChar = input[input.length - 1];

          // Replace 'x' with '*' and '÷' with '/' for evaluation
          input = input.replace(/x/g, "*").replace(/÷/g, "/");

          // Remove invalid trailing operators or decimals
          if (operators.includes(lastChar) || lastChar === ".") {
            input = input.slice(0, -1);
          }

          // Evaluate the input expression and display the result
          if (input) {
            try {
              inputScreen.innerHTML = eval(input);
            } catch (error) {
              inputScreen.innerHTML = "Error";
            }
          }

          decimalAdded = false;
          break;

        case ".":
          if (!decimalAdded) {
            inputScreen.innerHTML += btnValue;
            decimalAdded = true;
          }
          break;

        case "+":
        case "-":
        case "x":
        case "÷":
          const lastInputChar = input[input.length - 1];

          // Only add operator if input is not empty and last char is not an operator
          if (input !== "0" && !operators.includes(lastInputChar)) {
            inputScreen.innerHTML += btnValue;
          }

          // Allow negative numbers at the beginning
          if (input === "0" && btnValue === "-") {
            inputScreen.innerHTML = btnValue;
          }

          // Replace last operator with a new one if needed
          if (operators.includes(lastInputChar)) {
            inputScreen.innerHTML = input.slice(0, -1) + btnValue;
          }

          decimalAdded = false;
          break;

        default:
          // Add numbers to the display
          if (input === "0") {
            inputScreen.innerHTML = btnValue; // Replace 0 with first input
          } else {
            inputScreen.innerHTML += btnValue;
          }
          decimalAdded = false;
          break;
      }
    });
  }
}