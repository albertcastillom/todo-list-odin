let renderTodo = function (todo, tab) {
  if (Array.isArray(todo)) {
    todo.forEach((item) => {
      renderTodo(item, tab);
    });
  } else if (typeof todo === "object" && todo !== null) {
    //creating todos
    const content = document.querySelector(`#${tab}`);
    let todoDiv = document.createElement("div");
    todoDiv.classList = "toDosDiv";

    //render logic
    let output = "";
    for (const key in todo) {
      output += `${todo[key]}` + " ";
    }
    todoDiv.innerHTML = output.trim();

    //done btn
    let deleteBtn = document.createElement("button");
    deleteBtn.classList = "delete-btn";
    deleteBtn.textContent = "DONE";
    todoDiv.appendChild(deleteBtn);

    content.appendChild(todoDiv);
  }
};

export { renderTodo };
