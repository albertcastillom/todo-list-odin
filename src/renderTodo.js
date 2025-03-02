
let renderTodo = function(todo){

    if(Array.isArray(todo)){
        todo.forEach(item =>{
            renderTodo(item);
        });
    } else if (typeof todo === "object" && todo !== null){
        //creating todos
        const content = document.querySelector("#content");
        let todoDiv = document.createElement("div");
        todoDiv.classList = "toDosDiv" 
    
        //render logic
        let output = "";
        for (const key in todo){
            output +=  `${todo[key]}` + " ";
        }
        todoDiv.innerHTML = output;

        //done btn
        let deleteBtn = document.createElement("button");
        deleteBtn.classList = "delete-btn";
        deleteBtn.textContent = "DONE";
        todoDiv.appendChild(deleteBtn);

        content.appendChild(todoDiv);
    }
};

export {renderTodo};