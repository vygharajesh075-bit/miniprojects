function addTask() {
    let input = document.getElementById("taskInput");
    let list = document.getElementById("taskList");

    if (!input.value) return;

    let li = document.createElement("li");
    li.innerText = input.value;

    li.onclick = () => li.remove();

    list.appendChild(li);
    input.value = "";
}