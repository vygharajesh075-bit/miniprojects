function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span onclick="toggleTask(this)">${taskText}</span>
    <button class="delete-btn" onclick="deleteTask(this)">X</button>
  `;

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

function toggleTask(element) {
  element.parentElement.classList.toggle("completed");
}

function deleteTask(button) {
  button.parentElement.remove();
}
