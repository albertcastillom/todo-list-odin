let renderProject = function(project){

    if(Array.isArray(project)){
        project.forEach(item =>{
            renderProject(item);
        });
    } else if (typeof project === "object" && project !== null){
    const nav = document.querySelector("#navigation");
    let newProjectTab = document.createElement("button");
    newProjectTab.classList = "newProject"; 

    let output = "";
    for (const key in project){
        output +=  `${project[key]}` + " ";
    }
    newProjectTab.innerHTML = output;

    let deleteBtn = document.createElement("button");
    deleteBtn.classList = "project-delete-btn";
    deleteBtn.textContent = "DONE";
    newProjectTab.appendChild(deleteBtn);

    nav.appendChild(newProjectTab);
    }
};

export{renderProject};