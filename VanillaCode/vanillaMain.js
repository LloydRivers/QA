import { renderTodos, addTodo } from "../TODO/todo.js";

const input = document.getElementById("task-input");
const addButton = document.getElementById("addTodo");

// Event listener for the add button
addButton.addEventListener("click", (event) => {
  event.preventDefault();
  const todoText = input.value.trim();

  if (todoText !== "") {
    addTodo(todoText);
    renderTodos();
    input.value = "";
  }
});

// Initial rendering of todos on page load
renderTodos();
