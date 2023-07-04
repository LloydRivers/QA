const displayErrorMessage = (container) => {
  if (!container.querySelector(".error-message")) {
    const errorMessage = document.createElement("span");
    errorMessage.className = "error-message";
    errorMessage.style.color = "red";
    errorMessage.textContent = "Incorrect email format";

    container.appendChild(errorMessage);
  }
};

const removeErrorMessage = (container) => {
  const errorMessage = container.querySelector(".error-message");

  if (errorMessage) {
    container.removeChild(errorMessage);
  }
};

export { displayErrorMessage, removeErrorMessage };
