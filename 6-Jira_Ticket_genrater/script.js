//variables
var uid=new ShortUniqueId();
let colors=["pink","blue","green","black"];
let defaultColor="black";
let cFilter="";
let locked=false;
let deleteMode=false;


//elements
let input=document.querySelector(".task_input");
let mainContainer=document.querySelector(".main-container");
let colorContainer=document.querySelector(".color-group_container");
let lockContainer = document.querySelector(".lock-container");
let unlockContainer = document.querySelector(".unlock-container");
let plusContainer = document.querySelector(".plus-container");

let deleteContainer = document.querySelector(".multiply-container");


//event listner
input.addEventListener("keydown",function(e){
    if(e.code=="Enter" &&input.value){
        console.log("task value",input.value);
        let id=uid();
        createTask(id,input.value,true);
        input.value="";
    }
})


//filtering


colorContainer.addEventListener("click",function(e){
    let element=e.target;
    console.log("e.target",element);
    if(element !=colorContainer){
        let filteredCardColor=element.classList[1];
        filterCards(filteredCardColor);
    }
})


lockContainer.addEventListener("click", function (e) {
    let numberOFElements = document.querySelectorAll(".task_main-container>div")
    for (let i = 0; i < numberOFElements.length; i++) {
        numberOFElements[i].contentEditable = false;
    }
    // ui match
    lockContainer.classList.add("active");
    unlockContainer.classList.remove("active");
})
unlockContainer.addEventListener("click", function (e) {
  let  numberOFElements = document.querySelectorAll(".task_main-container>div")
    for (let i = 0; i < numberOFElements.length; i++) {
        numberOFElements[i].contentEditable = true;
    }
    lockContainer.classList.remove("active");
    unlockContainer.classList.add("active");
})

deleteContainer.addEventListener("click", function (e) {
    deleteMode = !deleteMode;
    if (deleteMode) {
        deleteContainer.classList.add("active")
    } else {
        deleteContainer.classList.remove("active")

    }
})



function createTask(id,task,flag){
    let taskContainer=document.createElement("div");
    taskContainer.setAttribute("class","task_container");
    mainContainer.appendChild(taskContainer);
    taskContainer.innerHTML=`<div class="task_header
     ${defaultColor}"></div>
    <div class="task_main-container">
       <h3 class="task_id">#${id}</h3>
       <div class="text" contentEditable="true">${task}</div>
</div>
`;



// add event listner for color change

let taskHeader=taskContainer.querySelector(".task_header");
let nextColor;
taskHeader.addEventListener("click",function(){
    let cColor=taskHeader.classList[1];
    let idx=colors.indexOf(cColor);
    let nextIdx=(idx+1)%4;
    let nextColor=colors[nextIdx];
    taskHeader.classList.remove(cColor);
    taskHeader.classList.add(nextColor);

})

taskContainer.addEventListener("click", function (e) {
    if (deleteMode == true) {
        // delete ->ui , storage

        taskContainer.remove();

    }
})

if (flag == true) {
    let tasksString = localStorage.getItem("tasks");
    let tasksArr = JSON.parse(tasksString) || [];
    let taskObject = {
        id: id,
        task: task,
        color: defaultColor
    }
    tasksArr.push(taskObject);
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
}
}




function filterCards(filterColor){
    let allTaskCards=document.querySelectorAll(".task_container");
    if(cFilter !=filterColor){
        for(let i=0;i<allTaskCards.length;i++){
            let taskHeader=allTaskCards[i].querySelector(".task_header");
            let taskColor=taskHeader.classList[1];
            if(taskColor==filterColor){
                allTaskCards[i].style.display="block"
            }else{
                allTaskCards[i].style.display="none"
            }
        }
        cFilter=filterColor;
    }else{
        cFilter="";
        for(let i=0;i<allTaskCards.length;i++){
            allTaskCards[i].style.display="block"
        }
    }
}


(function () {
    // localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        let { id, task, color } = tasks[i];
        createTask(id,task,false);
    }
    // get it to ui
})();
