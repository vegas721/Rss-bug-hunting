const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value;
  errorEl.hidden = true;
  if (input.value === "" || input.value.includes(" ")) {
    errorEl.hidden = false;
  } else {
    tasks.push({ id: nextId++, text: text, done: false });
  }
  input.value = "";
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task.done === true) {
    task.done = false;
  } else {
    task.done = true;
  }
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
  updateCounter();
}

function clearCompleted() {
  tasks = tasks.filter((t) => t.done === false);
  render();
}

function getVisibleTasks() {
  return tasks;
}

function updateCounter() {
  const activeTasks = tasks.filter((t) => t.done === false);
  counter.textContent = "Активных задач: " + activeTasks.length;
}

function render() {
  list.textContent = "";
  const visible = getVisibleTasks();
  if (visible.length === 0) return;
  for (let i = 0; i < visible.length; i++) {
    const task = visible[i];
    const li = document.createElement("li");
    li.className = "task";
    if (task.done) {
      li.classList.add("completed");
      li.classList.toggle("done");
    }

    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(task.id));
    

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
  updateCounter();
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    let tasksAll = tasks.slice();
    const tasksActive = tasks.filter((t) => t.done === false);
    const tasksDone = tasks.filter((t) => t.done === true);
    if (currentFilter === "active") {
      tasks = tasksActive;
    }
    if (currentFilter === "done") {
      tasks = tasksDone;
    }
    render();
    tasks = tasksAll;
  });
});

render();
