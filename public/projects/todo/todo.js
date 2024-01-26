const tasks = document.getElementById("tasks");
const taskInput = document.getElementById("taskInput");

const check = "bxs-circle";
const uncheck = "bx-circle";
const line_through = "lineThrough";

let list;

let data = localStorage.getItem("TODO");

if (data) {
    list = JSON.parse(data);
    loadList(list);
} else {
    list = [];
}

document.addEventListener("click", function (event) {
    if (event.target.closest(".bx-reset") !== null) {
        localStorage.clear();
        this.location.reload();
    }
});

function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.status);
    });
}

function addToDo(toDo, status) {
    const done = status ? check : uncheck;
    const line = status ? line_through : "not_line_through";

    let newTask = document.createElement("li");
    newTask.classList.add("item");

    let doneBtn = document.createElement("i");
    doneBtn.classList.add("bx", done, "co");
    doneBtn.setAttribute("job", "complete");
    doneBtn.setAttribute("id", toDo);

    let text = document.createElement("p");
    text.classList.add("text", line);
    text.textContent = toDo;

    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("bx", "bx-trash", "de");
    deleteBtn.setAttribute("job", "delete");
    deleteBtn.setAttribute("id", toDo);

    newTask.appendChild(doneBtn);
    newTask.appendChild(text);
    newTask.appendChild(deleteBtn);
    tasks.appendChild(newTask);

    taskInput.value = "";
}

function pushList(toDo) {
    list.push({
        name: toDo,
        status: false,
    });
    localStorage.setItem("TODO", JSON.stringify(list));
}

function duplicaatChecker(toDo) {
    let i = 0;
    list.forEach((element) => {
        if (element.name == toDo.trim()) {
            i++;
        }
    });
    return i === 0 ? true : false;
}

document.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && taskInput.value.trim() !== "") {
        const toDo = taskInput.value.trim();
        if (duplicaatChecker(toDo)) {
            addToDo(toDo, false);
            pushList(toDo);
        } else {
            alert("Veuillez entrer une nouvelle tâche!");
        }
    }
});

document.addEventListener("click", function (event) {
    if (event.target.closest(".bx-add-to-queue") !== null && taskInput.value.trim() !== "") {
        const toDo = taskInput.value;
        if (duplicaatChecker(toDo)) {
            addToDo(toDo, false);
            pushList(toDo);
        } else {
            alert("Veuillez entrer une nouvelle tâche!");
        }
    }
});

function completeToDo(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);
    let i = 0;
    let indexToRemove = 0;
    list.forEach((item) => {
        if (element.id === item.name) {
            indexToRemove = i;
        }
        i++;
    });
    list[indexToRemove].status = list[indexToRemove].status ? false : true;
}

function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    let i = 0;
    let indexToRemove = 0;
    list.forEach((item) => {
        if (element.id === item.name) {
            indexToRemove = i;
        }
        i++;
    });
    list.splice(indexToRemove, 1);
}

tasks.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeTodo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(list));
});
