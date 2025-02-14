import "./styles.css";
import { toDo } from "./addToDo";
import { addToDoForm } from "./addToDoForm";
import { renderTodo } from "./renderTodo";



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

