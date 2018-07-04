(function() {
  let buffer = "0";
  let operator = null;
  let result = 0;

  const screen = document.querySelector(".screen");

  function handleSymbol(value) {
    switch (value) {
      case "C":
        buffer = "0";
        result = 0;
        operator = null;
        rerender();
        break;
      case "←":
        if (buffer.length === 1) {
          buffer = "0";
        } else {
          buffer = buffer.substr(0, buffer.length - 1);
        }
        rerender();
        break;
      case "=":
        if (operator === null) {
          return;
        }
        executeCalculation(parseInt(buffer));
        operator = null;
        buffer = "" + result;
        result = 0;
        rerender();
        break;
      case "÷":
      case "×":
      case "−":
      case "+":
        handleMath(value);
        break;
    }
  }

  function executeCalculation(operand2) {
    switch (operator) {
      case "÷":
        result = result / operand2;
        break;
      case "×":
        result = result * operand2;
        break;
      case "−":
        result = result - operand2;
        break;
      case "+":
        result = result + operand2;
        break;
    }
  }

  // When a operator is clicked
  function handleMath(value) {
    if (buffer === "0") {
      return;
    }

    const intBuffer = parseInt(buffer);
    if (result === 0) {
      result = intBuffer;
    } else {
      executeCalculation(intBuffer);
      buffer = "" + result;
      rerender();
    }
    operator = value;
    buffer = "0";
  }

  function handleNumber(value) {
    if (buffer === "0") {
      buffer = value;
    } else {
      buffer += value;
    }
    rerender();
  }

  function rerender() {
    screen.innerText = buffer;
  }

  function buttonClick(value) {
    if (isNaN(parseInt(value))) {
      handleSymbol(value);
    } else {
      handleNumber(value);
    }
  }

  function init() {
    document
      .querySelector(".calculator")
      .addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
      });
  }

  init();
})();
