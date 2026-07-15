const taskInput=document.getElementById("taskInput");
const taskDate=document.getElementById("taskDate");
const taskTime=document.getElementById("taskTime");
const priority=document.getElementById("priority");
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");

const search=document.getElementById("search");
const filter=document.getElementById("filter");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

displayDateTime();
renderTasks();

setInterval(displayDateTime,1000);

function displayDateTime(){

const now=new Date();

document.getElementById("dateTime").innerHTML=
now.toLocaleString();

}

addBtn.onclick=()=>{

if(taskInput.value.trim()==""){
alert("Enter Task");
return;
}

tasks.push({

text:taskInput.value,
date:taskDate.value,
time:taskTime.value,
priority:priority.value,
completed:false

});

saveTasks();

taskInput.value="";
taskDate.value="";
taskTime.value="";
priority.value="Medium";

renderTasks();

};

function renderTasks(){

taskList.innerHTML="";

let completed=0;

tasks.forEach((task,index)=>{

if(search.value &&
!task.text.toLowerCase().includes(search.value.toLowerCase()))
return;

if(filter.value=="completed" && !task.completed)
return;

if(filter.value=="pending" && task.completed)
return;

if(task.completed) completed++;

const li=document.createElement("li");

li.className="task";

if(task.completed)
li.classList.add("completed");

li.innerHTML=`

<div class="task-info">

<div class="task-title">${task.text}</div>

<div class="task-details">

📅 ${task.date}

🕒 ${task.time}

⭐ ${task.priority}

</div>

</div>

<div class="buttons">

<button class="complete"
onclick="toggleTask(${index})">

${task.completed?"Undo":"Done"}

</button>

<button class="edit"
onclick="editTask(${index})">

Edit

</button>

<button class="delete"
onclick="deleteTask(${index})">

Delete

</button>

</div>

`;

taskList.appendChild(li);

});

document.getElementById("totalTasks").innerHTML=tasks.length;

document.getElementById("completedTasks").innerHTML=
tasks.filter(t=>t.completed).length;

document.getElementById("pendingTasks").innerHTML=
tasks.filter(t=>!t.completed).length;

let percent=0;

if(tasks.length>0)
percent=(tasks.filter(t=>t.completed).length/tasks.length)*100;

document.getElementById("progressBar").style.width=
percent+"%";

document.getElementById("progressText").innerHTML=
Math.round(percent)+"% Completed";

}

function toggleTask(index){

tasks[index].completed=!tasks[index].completed;

saveTasks();

renderTasks();

}

function deleteTask(index){

if(confirm("Delete this task?")){

tasks.splice(index,1);

saveTasks();

renderTasks();

}

}

function editTask(index){

let newTask=prompt("Edit Task",tasks[index].text);

if(newTask){

tasks[index].text=newTask;

saveTasks();

renderTasks();

}

}

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

search.addEventListener("keyup",renderTasks);

filter.addEventListener("change",renderTasks);
