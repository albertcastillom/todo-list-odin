let addToDoForm =  function(arg){
    if(arguments.length === 0){
        let content = document.querySelector("#content");

        let form = document.createElement("form");
        form.id = "toDoForm";

        let ToDoPara = document.createElement("p");
        let toDoLabel = document.createElement("label");
        toDoLabel.for = "ToDo";
        toDoLabel.textContent = "To Do:";
        let toDoInput = document.createElement("input");
        toDoInput.type = "text";
        toDoInput.id = "ToDo";
        toDoInput.name = "ToDo";
        


        ToDoPara.appendChild(toDoLabel);
        ToDoPara.appendChild(toDoInput);

        let ToDoPara2 = document.createElement("p");
        let toDoLabel2 = document.createElement("label");
        toDoLabel2.for = "ToDoDescription";
        toDoLabel2.textContent = "To Do Description:";
        let toDoInput2 = document.createElement("input");
        toDoInput2.type = "text";
        toDoInput2.id = "ToDoDescription";
        toDoInput2.name = "ToDoDescription";


        ToDoPara.appendChild(toDoLabel2);
        ToDoPara.appendChild(toDoInput2);

        let ToDoPara3 = document.createElement("p");
        let toDoLabel3 = document.createElement("label");
        toDoLabel3.for = "ToDoDate";
        toDoLabel3.textContent = "To Do Due Date:";
        let toDoInput3 = document.createElement("input");
        toDoInput3.type = "text";
        toDoInput3.id = "ToDoDate";
        toDoInput3.name = "ToDoDate";
        

        ToDoPara.appendChild(toDoLabel3);
        ToDoPara.appendChild(toDoInput3);


        let addBtn = document.createElement("button");
        addBtn.type = "submit";
        addBtn.id = "add-btn";
        addBtn.textContent = "ADD";

        form.appendChild(ToDoPara);
        form.appendChild(addBtn);

        content.appendChild(form);
    }else {
        /////check this logic , make sure to add todo to right page and use local storage to render it inside proper content tab
        let content = document.getElementById(arg);

        let form = document.createElement("form");
        form.id = "toDoForm";

        let ToDoPara = document.createElement("p");
        let toDoLabel = document.createElement("label");
        toDoLabel.for = "ToDo";
        toDoLabel.textContent = "To Do:";
        let toDoInput = document.createElement("input");
        toDoInput.type = "text";
        toDoInput.id = "ToDo";
        toDoInput.name = "ToDo";
        


        ToDoPara.appendChild(toDoLabel);
        ToDoPara.appendChild(toDoInput);

        let ToDoPara2 = document.createElement("p");
        let toDoLabel2 = document.createElement("label");
        toDoLabel2.for = "ToDoDescription";
        toDoLabel2.textContent = "To Do Description:";
        let toDoInput2 = document.createElement("input");
        toDoInput2.type = "text";
        toDoInput2.id = "ToDoDescription";
        toDoInput2.name = "ToDoDescription";


        ToDoPara.appendChild(toDoLabel2);
        ToDoPara.appendChild(toDoInput2);

        let ToDoPara3 = document.createElement("p");
        let toDoLabel3 = document.createElement("label");
        toDoLabel3.for = "ToDoDate";
        toDoLabel3.textContent = "To Do Due Date:";
        let toDoInput3 = document.createElement("input");
        toDoInput3.type = "text";
        toDoInput3.id = "ToDoDate";
        toDoInput3.name = "ToDoDate";
        

        ToDoPara.appendChild(toDoLabel3);
        ToDoPara.appendChild(toDoInput3);


        let addBtn = document.createElement("button");
        addBtn.type = "submit";
        addBtn.id = "add-btn";
        addBtn.textContent = "ADD";

        form.appendChild(ToDoPara);
        form.appendChild(addBtn);

        content.appendChild(form);
    }
};

export {addToDoForm};