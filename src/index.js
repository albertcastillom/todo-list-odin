import "./styles.css";
import { toDo } from "./addToDo";
import { addToDoForm } from "./addToDoForm";
import { renderTodo } from "./renderTodo";
import { addProjectForm } from "./addProjectForm";
import { addProject } from "./addProject";
import { renderProject } from "./renderProjects";


let ToDoBtn = document.querySelector("#addToDo"); // +todo button

ToDoBtn.addEventListener("click", ()=>{ //event listenet on +todo

    addToDoForm();  //creates +div form

    const form = document.querySelector("#toDoForm"); //grabs form to add event

    form.addEventListener("submit", (event)=>{ //adding event
        event.preventDefault();

        //grabbing form values
        const name = document.getElementById("ToDo").value;
        const description = document.getElementById("ToDoDescription").value;
        const dueDate = document.getElementById("ToDoDate").value;
        //creates Todo
        let toDos = toDo(name, description, dueDate);
        renderTodo(toDos); //renders todo
        form.remove(); //removes form

        //adds listener to done btns
       let deleteBtn = document.querySelectorAll(".delete-btn").forEach((item)=>{
            item.addEventListener("click", (e)=>{
                e.preventDefault();
                e.target.closest('div').remove();
            });
       });
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
        renderProject(projects);
        form.remove();

        //add delete btn logic
    });


});