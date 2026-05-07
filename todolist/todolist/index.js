let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "all";

const list = document.getElementById("todoList");
const count = document.getElementById("count");
const input = document.getElementById("todoInput");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTodo();
});

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function setFilter(type) {
  filter = type;
  render();
}

function clearDone() {
  todos = todos.filter(t => !t.done);
  save();
  render();
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  todos.push({
    text,
    done: false
  });

  input.value = "";
  save();
  render();
}

function toggle(index) {
  todos[index].done = !todos[index].done;
  save();
  render();
}

function removeTodo(index) {
  todos.splice(index, 1);
  save();
  render();
}

function getFilteredTodos() {
  if (filter === "active") return todos.filter(t => !t.done);
  if (filter === "done") return todos.filter(t => t.done);
  return todos;
}

function render() {
  list.innerHTML = "";

  const filtered = getFilteredTodos();

  count.innerText = `${filtered.length} tasks`;

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${todo.done ? "done" : ""}">
        ${todo.text}
      </span>

      <div class="actions">
        <button onclick="toggle(${index})">✔</button>
        <button onclick="removeTodo(${index})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });
}

render();