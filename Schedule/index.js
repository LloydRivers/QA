const listItems = document.querySelectorAll(".nav li a");

listItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();

    listItems.forEach((item) => item.classList.remove("active"));

    item.classList.add("active");
  });
});
