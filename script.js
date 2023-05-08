"use strict";
const todos = [];

function updateItem(e) {
  todos[e.target.dataset.key].completed = !todos[e.target.dataset.key]
    .completed;
  setItems();
}

function setItems() {
  const domTodos = document.querySelector(".container .card #items");
  domTodos.innerHTML = "";
  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.style.cursor = "pointer";
    listItem.dataset.key = index;
    listItem.onclick = updateItem;

    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.onclick = deleteItem;
    listItem.appendChild(span);

    if (todo.completed) {
      const deletedItem = document.createElement("del");
      deletedItem.style.pointerEvents = "none";
      deletedItem.innerText = todo.text;
      listItem.appendChild(deletedItem);
    } else {
      listItem.innerText = todo.text;
    }
    domTodos.appendChild(listItem);
  });
}

function createTask(text) {
  todos.push({
    completed: false,
    text: text,
  });
  setItems();
}

function deleteItem(e) {
  const listItem = e.target.parentElement;
  const key = listItem.dataset.key;
  todos.splice(key, 1);
  setItems();
}

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("field");
  if (input.value === "") {
    alert("Hey dude, you must write something!");
  } else {
    createTask(input.value);
    form.reset();
  }
});

const domTodos = document.querySelector(".container .card #items");
domTodos.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      deleteItem(e);
    }
  },
  false
);

setItems();
