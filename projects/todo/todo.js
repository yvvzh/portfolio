const tasks = document.getElementById("tasks");
const input = document.getElementById("input")

const CHECK = "bxs-circle";
const UNCHECK = "bx-circle";
const LINE_THROUGH = "lineThrough";

let LIST, id;

let data = localStorage.getItem("TODO");

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

function addToDo(toDo, id, done, trash){
    if(trash){
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const text =  
    `<li class="item">
        <i class="bx  ${DONE}  co" job="complete" id="${id}"></i> 
        <p class="text ${LINE}"> ${toDo} </p>
        <i class="bx bx-trash de" job="delete" id="${id}"></i>
    </li>`;

    const position = "beforeend"
    tasks.insertAdjacentHTML(position, text);
};

document.addEventListener("keyup", (e) => {
    if (e.key == "Enter"){
        const toDo = input.value; 
        if (toDo){ 
            addToDo(toDo, id, false, false);
            LIST.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
            });
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value ="";
    }
});

document.addEventListener('click',function(event){
    if (event.target.closest('.bx-add-to-queue') !== null) {
        const toDo = input.value; 
        if (toDo){ 
            addToDo(toDo, id, false, false);
            LIST.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
            });
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value ="";
    }
});

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
};

function removeTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
};

tasks.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob =="delete"){
        removeTodo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});