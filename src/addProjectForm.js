let addProjectForm = function () {
  let nav = document.querySelector("#navigation");

  let form = document.createElement("form");
  form.id = "addProjectForm";

  let projectPara = document.createElement("p");
  let projectLabel = document.createElement("label");
  projectLabel.for = "newProject";
  projectLabel.id = "project-form-title-input";
  projectLabel.textContent = "Project:";
  let projectInput = document.createElement("input");
  projectInput.type = "text";
  projectInput.id = "projectForm";
  projectInput.name = "projectForm";

  projectPara.appendChild(projectLabel);
  projectPara.appendChild(projectInput);

  let projectAddBtn = document.createElement("button");
  projectAddBtn.type = "submit";
  projectAddBtn.id = "project-add-btn";
  projectAddBtn.textContent = "ADD";

  projectPara.appendChild(projectAddBtn);

  form.appendChild(projectPara);
  nav.appendChild(form);
};

export { addProjectForm };
