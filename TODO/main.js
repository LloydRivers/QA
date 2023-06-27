import { renderTodos, addTodo } from "./todo.js";

$(document).ready(() => {
  const input = $("#task-input");
  const addButton = $("#addTodo");

  // Event listener for the add button
  addButton.click((event) => {
    event.preventDefault();
    const todoText = input.val().trim();

    if (todoText !== "") {
      addTodo(todoText);
      // renderTodos();
      input.val("");
    }
  });

  // Initial rendering of todos on page load
  renderTodos();
});
