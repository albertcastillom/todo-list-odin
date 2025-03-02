import "./styles.css";
import { toDo } from "./addToDo";
import { addToDoForm } from "./addToDoForm";
import { renderTodo } from "./renderTodo";
import { addProjectForm } from "./addProjectForm";
import { addProject } from "./addProject";
import { renderProject } from "./renderProjects";

//retireve local storage
const storedArr = localStorage.getItem("todos");
if(storedArr){
    try{
        const arr = JSON.parse(storedArr);
        renderTodo(arr);
        //make rendering array logic
    }catch(error){
        console.log("error passing", error);
    }
}else {
    console.log("no local storage")
}

const storedProj = localStorage.getItem("projects");
if (storedProj){
    try{
        const arr = JSON.parse(storedProj);
        renderProject(arr);
    }catch(error){
        console.log("error passing projects", error);
    }
}else {
    console.log(" no local projects stored");
}


let todoArr = [];
let projArr = [];

let ToDoBtn = document.querySelector("#addToDo"); // +todo button
ToDoBtn.addEventListener("click", (e)=>{ //event listener on +todo

    let tabContents = document.querySelectorAll('.tab-content');
    if (tabContents[1] != undefined){
        tabContents.forEach(content => {
        let classNames = content.classList;
        if(classNames[2] === undefined){
            addToDoForm(content.id);
        }
        });
    }else
  
    addToDoForm();  
    //creates +div form
    const form = document.querySelector("#toDoForm"); //grabs form to add event

    form.addEventListener("submit", (event)=>{ //adding event
        event.preventDefault();

        //grabbing form values
        const name = document.getElementById("ToDo").value;
        const description = document.getElementById("ToDoDescription").value;
        const dueDate = document.getElementById("ToDoDate").value;
        //creates Todo
        let todo = toDo(name, description, dueDate);

        todoArr.push(todo);
        localStorage.setItem("todos", JSON.stringify(todoArr));

        renderTodo(todo); //renders todo
        form.remove(); //removes form

    });
});

 //adds listener to done btns
 document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            e.preventDefault();

            let buttons = Array.from(document.querySelectorAll(".delete-btn"));
            
            // Find the index of the clicked button
            let index = buttons.indexOf(e.target);
            e.target.closest('div').remove();
            buttons.splice(index, 1);
            todoArr.splice(index, 1);
            
            localStorage.setItem("todos", JSON.stringify(todoArr));

            
        };
    });
});

let newProjectBtn = document.querySelector("#addNewProject");
newProjectBtn.addEventListener("click", ()=>{

    addProjectForm();

    const form = document.querySelector("#addProjectForm");
    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        const project = document.getElementById("projectForm").value;

        let projects = addProject(project);

        projArr.push(projects);
        localStorage.setItem("projects", JSON.stringify(projArr));

        renderProject(projects);
        form.remove();

    });
});


// adding function to porject buttons in navigation bar
document.addEventListener("DOMContentLoaded", ()=>{
    document.body.addEventListener("click", (e) => {
        if(e.target.classList.contains("newProject")){
            e.preventDefault();

            let buttons = Array.from(document.querySelectorAll(".newProject"));
            let index = buttons.indexOf(e.target);

            if (document.querySelector(`#content${index + 1}`)){
                let existingtab = document.querySelector(`#content${index + 1}`);
                existingtab.remove();
            }
            let main = document.querySelector("#main");
            let tab = document.createElement("div");
            tab.id = `content${index + 1}`;
            tab.classList = "tab-content";
            main.appendChild(tab);
            openTab(`content${index + 1}`);

        }
    });
});

//add delete btn logic
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("project-delete-btn")) {
            e.preventDefault();

            let buttons = Array.from(document.querySelectorAll(".project-delete-btn"));
            
            // Find the index of the clicked button
            let index = buttons.indexOf(e.target);
            e.target.closest('.newProject').remove();
            buttons.splice(index, 1);
            projArr.splice(index, 1);

            if (document.querySelector(`#content${index + 1}`)){
                let existingtab = document.querySelector(`#content${index + 1}`);
                existingtab.remove();
                openTab("content");
            }
            
            localStorage.setItem("projects", JSON.stringify(projArr));

        };
    });
});

///tab switicher
function openTab(tabId) {
    let tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.add('hide'));


    let selectedTab = document.getElementById(tabId);
    selectedTab.classList.remove("hide");
    selectedTab.classList.add('active');
};
 
//general to dos tab switch
  let generalTab = document.querySelector("#defaultToDos");
  generalTab.addEventListener("click", (e)=>{
    e.preventDefault();
    openTab("content");
  });



// Save div content to local storage
function saveDivContent(divClass, key) {
  const div = document.getElementsByClassName(divClass);
  if (div) {
    const content = div.innerHTML;
    localStorage.setItem(key, content);
  }
}

// Load div content from local storage
function loadDivContent(divClass, key) {
    const div = document.getElementsByClassName(divClass);
    if (div) {
      const savedContent = localStorage.getItem(key);
      if (savedContent) {
        div.innerHTML = savedContent;
      }
    }
}
