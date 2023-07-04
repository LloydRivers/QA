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

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;

  const formData = {
    title: title,
    firstName: firstName,
    lastName: lastName,
    email: email,
    dob: dob,
    phoneNumber: phoneNumber,
    gender: gender,
  };

  fetch("https://localhost:3000/users", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
