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
        let tab = "content"
        renderTodo(arr, tab);
        //make rendering array logic
    }catch(error){
        console.log("error passing", error);
    }
}

const storedProj = localStorage.getItem("projects");
if (storedProj){
    try{
        const arr = JSON.parse(storedProj);
        renderProject(arr);
    }catch(error){
        console.log("error passing projects", error);
    }
}


let todoArr = [];
let projArr = [];

//add todo btn logic
let ToDoBtn = document.querySelector("#addToDo"); // grab +todo button
ToDoBtn.addEventListener("click", (e)=>{ //event listener on +todo
    //check which tab is open to add the from to the corrsponding one
    let tabContents = document.querySelectorAll('.tab-content');
        if (tabContents[1] != undefined){
            tabContents.forEach(content => {
            let classNames = content.classList;
                if(classNames[2] === undefined){
                    addToDoForm(content.id);
                }
            });
        }else{
            addToDoForm("content");  
        }

  
    const form = document.querySelector("#toDoForm"); //grabs form to add event

    form.addEventListener("submit", (event)=>{ //adding event
        event.preventDefault();
         //grabs tab that is open
         let openTab = event.target.closest("div");

        //grabbing form values
        const name = document.getElementById("ToDo").value;
        const description = document.getElementById("ToDoDescription").value;
        const dueDate = document.getElementById("ToDoDate").value;
        //creates Todo
        let todo = toDo(name, description, dueDate);

        if(openTab.id !== "content"){
            let newArr= [];
            newArr.push(todo);
            localStorage.setItem(`${openTab.id}-todos`, JSON.stringify(newArr));

        }else{
            todoArr.push(todo);
            localStorage.setItem("todos", JSON.stringify(todoArr));
        }
        renderTodo(todo, openTab.id); //renders todo
        form.remove(); //removes form
    });
});

 //adds listener to done btns
 document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            e.preventDefault();
            let openTab = e.target.closest("div");
            let buttons = Array.from(document.querySelectorAll(".delete-btn"));
            
            // Find the index of the clicked button
            let index = buttons.indexOf(e.target);
            e.target.closest('div').remove();
            buttons.splice(index, 1);
            if (openTab.id !== "content"){
                ///delete from local storage
            }
            todoArr.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todoArr));

        };
    });
});

////adding new project btn logic
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


// adding function to project buttons in navigation bar
let clickCount = 0;
document.addEventListener("DOMContentLoaded", ()=>{
    document.body.addEventListener("click", (e) => {
        if(e.target.classList.contains("newProject")){
            e.preventDefault();
            clickCount++;
            let buttons = Array.from(document.querySelectorAll(".newProject"));
            let index = buttons.indexOf(e.target);

            if (document.querySelector(`#content${index + 1}`)){
                openTab(`content${index + 1}`);
             }else{
                    let main = document.querySelector("#main");
                    let tab = document.createElement("div");
                    tab.id = `content${index + 1}`;
                    tab.classList = "tab-content";
                    main.appendChild(tab);
                    openTab(`content${index + 1}`);
                }
                
             if(clickCount <= 1){
                let tabContents = document.querySelectorAll('.tab-content');
                if (tabContents[1] != undefined){
                    tabContents.forEach(content => {
                        let classNames = content.classList;
                        if(classNames[2] === undefined){
                            
                            const storedArr = localStorage.getItem(`${content.id}-todos`);
                            if(storedArr){
                                try{
                                    const arr = JSON.parse(storedArr);
                                    let tab = `content${index + 1}`;
                                    renderTodo(arr, tab);
                                }catch(error){
                                    console.log("error passing", error);
                                }
                            }
                        }
                    });
                }
            } 
        }
    });
});

//add delete btn logic
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("project-delete-btn")) {
            e.preventDefault();

            let buttons = Array.from(document.querySelectorAll(".project-delete-btn"));
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
    tabContents.forEach((content) => content.classList.add('hide'));

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
