// Comments taken from Jquery documentation
import { generateUniqueId } from "./generateUniqueId.js";

// Function to render the todos on the page
const renderTodos = () => {
  const todoList = $(".todo-list");

  todoList.empty();
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    const todoItem = $("<div>").addClass("todo-item").attr("data-id", todo.id);

    const todoText = $("<span>").text(todo.text);
    todoItem.append(todoText);

    const deleteButton = $("<button>")
      .text("Delete")
      .addClass("btn btn-danger btn-sm delete-button")
      .attr("data-id", todo.id)
      .click((event) => {
        const id = $(event.target).data("id");
        console.log("forEach", id);
        deleteTodoById(id);
        renderTodos();
      });

    todoItem.append(deleteButton);

    const editButton = $("<button>")
      .text("Edit")
      .addClass("btn btn-primary btn-sm")
      .click(() => {
        editTodoById(todo.id);
      });
    todoItem.append(editButton);

    todoList.append(todoItem);
  });
};

// Function to add a new todo
const addTodo = (text) => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const newTodo = {
    id: generateUniqueId(),
    text: text,
    completed: false,
  };

  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));

  const todoItem = $("<div>")
    .addClass("todo-item")
    .attr("data-id", newTodo.id)
    .css("display", "none"); // Hide the new todo item initially using inline style

  const todoText = $("<span>").text(newTodo.text);
  todoItem.append(todoText);

  $(".todo-list").append(todoItem);

  // Fade in the new todo item
  todoItem.fadeIn();
};

const deleteTodoById = (id) => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const updatedTodos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));

  const todoItem = $(`.todo-item[data-id="${id}"]`);
  todoItem.fadeOut(() => {
    todoItem.remove();
  });
};

// Event delegation using jQuery
$(".todo-list").on("click", ".delete-button", function () {
  const id = $(this).data("id");
  console.log("delegation ", id);
  deleteTodoById(id);
});

// Function to edit a todo by ID
const editTodoById = (id) => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const todoToUpdate = todos.find((todo) => todo.id === id);
  if (todoToUpdate) {
    const updatedText = prompt(
      "Enter the updated todo text:",
      todoToUpdate.text
    );
    if (updatedText !== null) {
      todoToUpdate.text = updatedText;
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    }
  }
};

// Event delegation using jQuery
$(".todo-list").on("click", ".edit-button", function () {
  const id = $(this).data("id");
  editTodoById(id);
});

const clearAllTodos = () => {
  if (confirm("Are you sure you want to delete all todos?")) {
    // Get all todo items
    const todoItems = $(".todo-item");

    // Apply fadeOut animation to each todo item
    todoItems.fadeOut(() => {
      // Remove todo items from the DOM
      todoItems.remove();

      // Clear the todos from localStorage
      localStorage.removeItem("todos");
    });
  }
};

// Event listener for the "Clear All" button
$("#clearAll").click(clearAllTodos);

export { addTodo, editTodoById, deleteTodoById, renderTodos };
