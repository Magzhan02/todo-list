const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todo');
const deleteAllBtn = document.querySelector('.footer button');
const info = document.querySelector('.info')

document.addEventListener("DOMContentLoaded", ready);

function ready(){
    let getLocalStorage = localStorage.getItem('Todo')
    let listArr = []
    if(getLocalStorage != null){
        listArr = JSON.parse(getLocalStorage) 
        let liTag = "";
        listArr.forEach((element,index) => {
            liTag += `<li>${element}<button class="delete" onclick="deleteTask(${index})">Del</button></li>`
        })
        todoList.innerHTML = liTag
        info.textContent = `Current task count: ${listArr.length}`
        deleteAllBtn.classList.add("active")
    }
};

inputBox.addEventListener('keyup', function(){
    let inputValue = inputBox.value;
    if(inputValue.trim() != 0){
        addBtn.classList.add("active")
    }else{
        addBtn.classList.remove("active");
    }
});

addBtn.addEventListener('click',function(){
    let inputValue = inputBox.value;
    let getLocalStorage = localStorage.getItem('Todo');
    let listArr = []
    if(getLocalStorage == null){
        listArr = []
    }
    else{
        listArr = JSON.parse(getLocalStorage)
    }
    listArr.push(inputValue)
    localStorage.setItem("Todo",JSON.stringify(listArr))
    addBtn.classList.remove("active")
    displayTodo()
    inputBox.value = '';
});



function displayTodo(){
    let getLocalStorage = localStorage.getItem('Todo');
    let listArr = []
    if(getLocalStorage != null){
        listArr = JSON.parse(getLocalStorage)
    }
    else{
        listArr = []
    }
        
    info.textContent = `Current task count: ${listArr.length}`;

    let liTag = "";
    
    listArr.forEach((element,index )=> {
        liTag += `<li>${element}<button class="delete" onclick="deleteTask(${index})">Del</button></li>`
    });

    todoList.innerHTML = liTag;
};

function deleteTask(index){
    let getLocalStorage = localStorage.getItem('Todo');
    let listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);
    localStorage.setItem('Todo', JSON.stringify(listArr))
    displayTodo()
};

deleteAllBtn.addEventListener('click', function(){
    localStorage.setItem('Todo',JSON.stringify([]));
    displayTodo()
});