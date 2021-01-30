
const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];


function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;

    sortToDoId();
    saveToDos();
}

function saveToDos(){
localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function sortToDoId(){
    const toDoLen = toDos.length;
    for(i=0; i<toDoLen; i++){
        toDos[i].id = i+1;
    }
    let liToDos = document.getElementsByTagName("li");
    const liToDosLen = liToDos.length;
    for(i=0; i<liToDosLen; i++){
        liToDos[i].id = i+1;
    }
}

function paintToDo(text){
const li = document.createElement("li");
const delBtn = document.createElement("button");
const span = document.createElement("span");
const newId = toDos.length + 1
delBtn.innerText = "x"
delBtn.className = "css-delBtn"
delBtn.addEventListener("click", deleteToDo);
span.innerText = text;
span.className = "css-span"
li.className = "css-li"
li.appendChild(span);
li.appendChild(delBtn);
li.id = newId;
toDoList.appendChild(li);
const toDoObj = {
    text: text,
    id: newId
};
toDos.push(toDoObj);
saveToDos();
}

function handleSubmit(event){
event.preventDefault();
const currentValue = toDoInput.value;
paintToDo(currentValue);
toDoInput.value="";
}


function loadToDos(){
const loadedToDos = localStorage.getItem(TODOS_LS);
if(loadedToDos!== null){
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo){
        paintToDo(toDo.text);
    });
}
}

function init(){
loadToDos();
toDoForm.addEventListener("submit", handleSubmit);
}

init();