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
        deleteTodoById(id);
      });

    todoItem.append(deleteButton);

    const editButton = $("<button>")
      .text("Edit")
      .addClass("btn btn-primary btn-sm edit-button")
      .click(() => {
        editTodoById(todo.id);
      });

    todoItem.append(editButton);

    todoList.append(todoItem);
  });
};

// Function to add a new todo
const addTodo = (text) => {
  const todoList = $(".todo-list");
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const newTodo = {
    id: generateUniqueId(),
    text: text,
    completed: false,
  };

  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  // DONE
  const todoItem = $("<div>").addClass("todo-item").attr("data-id", newTodo.id);

  const todoText = $("<span>").text(text);
  todoItem.append(todoText);

  const deleteButton = $("<button>")
    .text("Delete")
    .addClass("btn btn-danger btn-sm delete-button")
    .attr("data-id", newTodo.id)
    .click((event) => {
      const id = $(event.target).data("id");
      deleteTodoById(id);
    });

  todoItem.append(deleteButton);

  const editButton = $("<button>")
    .text("Edit")
    .addClass("btn btn-primary btn-sm edit-button")
    .click(() => {
      editTodoById(newTodo.id);
    });

  todoItem.append(editButton);

  todoList.append(todoItem).hide().fadeIn(1000);
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
    const todoItems = $(".todo-item");

    todoItems.fadeOut(() => {
      todoItems.remove();

      localStorage.removeItem("todos");
    });
  }
};

$("#clearAll").click(clearAllTodos);

export { addTodo, editTodoById, deleteTodoById, renderTodos };
