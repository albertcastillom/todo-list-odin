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
        console.log(arr);
        console.log(Array.isArray(arr));
        //make rendering array logic
    }catch(error){
        console.log("error passing", error);
    }
}else {
    console.log("no local storage")
}


let todoArr = [];
let projArr = [];

let ToDoBtn = document.querySelector("#addToDo"); // +todo button
ToDoBtn.addEventListener("click", ()=>{ //event listener on +todo
  
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
        renderProject(projects);
        form.remove();

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
            
            localStorage.setItem("projects", JSON.stringify(projArr));

        };
    });
});

