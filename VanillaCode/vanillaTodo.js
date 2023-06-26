import { generateUniqueId } from "./generateUniqueId.js";
// Get the required elements from the DOM
const todoList = document.querySelector(".todo-list");

// Function to render the todos on the page
const renderTodos = () => {
  todoList.innerHTML = "";
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const todoText = document.createElement("span");
    todoText.textContent = todo.text;
    todoItem.appendChild(todoText);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");
    deleteButton.addEventListener("click", () => {
      deleteTodoById(todo.id);
      renderTodos();
    });
    todoItem.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("btn", "btn-primary", "btn-sm");
    editButton.addEventListener("click", () => {
      editTodoById(todo.id);
    });
    todoItem.appendChild(editButton);

    todoList.appendChild(todoItem);
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
};

// Function to delete a todo by ID
const deleteTodoById = (id) => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const updatedTodos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};

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

// ...

// Function to clear all todos
const clearAllTodos = () => {
  if (confirm("Are you sure you want to delete all todos?")) {
    localStorage.removeItem("todos");
    renderTodos();
  }
};

// Event listener for the "Clear All" button
const clearAllButton = document.getElementById("clearAll");
clearAllButton.addEventListener("click", clearAllTodos);

// ...

export { addTodo, editTodoById, deleteTodoById, renderTodos };
