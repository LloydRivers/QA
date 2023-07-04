import { displayErrorMessage, removeErrorMessage } from "./helpers.js";
const emailInput = document.getElementById("email");
const emailContainer = document.getElementById("errorContainer");

const validateEmail = () => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  const email = emailInput.value.trim();

  if (emailRegex.test(email)) {
    removeErrorMessage(emailContainer);
  } else {
    displayErrorMessage(emailContainer);
  }
};

emailInput.addEventListener("input", validateEmail);
