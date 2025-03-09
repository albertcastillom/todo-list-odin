import "./styles.css";
import { toDo } from "./addToDo";
import { addToDoForm } from "./addToDoForm";
import { renderTodo } from "./renderTodo";
import { addProjectForm } from "./addProjectForm";
import { addProject } from "./addProject";
import { renderProject } from "./renderProjects";

//retireve local storage
const storedArr = localStorage.getItem("todos");
if (storedArr) {
  try {
    const arr = JSON.parse(storedArr);
    let tab = "content";
    renderTodo(arr, tab);
    //make rendering array logic
  } catch (error) {
    console.log("error passing", error);
  }
}

let projArr = JSON.parse(localStorage.getItem("projects")) || [];
if (projArr) {
  try {
    renderProject(projArr);
    projArr.forEach((object) => {
      let main = document.querySelector("#main");
      let tab = document.createElement("div");
      tab.id = `content-${object.project}`;
      tab.classList = "tab-content hide";
      let tabTitle = document.createElement("h3");
      tabTitle.textContent = `${object.project}: `;
      tab.appendChild(tabTitle);
      main.appendChild(tab);
    });
  } catch (error) {
    console.log("error passing projects", error);
  }
}

let todoArr = [];
//let projArr = [];

//add todo btn logic
let ToDoBtn = document.querySelector("#addToDo"); // grab +todo button
ToDoBtn.addEventListener("click", (e) => {
  //event listener on +todo
  //check which tab is open to add the from to the corrsponding one
  let tabContents = document.querySelectorAll(".tab-content");
  if (tabContents[1] != undefined) {
    tabContents.forEach((content) => {
      let classNames = content.classList;
      if (classNames[1] === "active") {
        addToDoForm(content.id);
      }
    });
  } else {
    addToDoForm("content");
  }
  const form = document.querySelector("#toDoForm");
  const addBtn = document.querySelector("#add-btn"); //grabs form to add event
  addBtn.addEventListener("click", (event) => {
    //adding event
    event.preventDefault();

    //grabs tab that is open
    let openTab = event.target.closest("div");
    //grabbing form values
    const name = document.getElementById("ToDo").value;
    const description = document.getElementById("ToDoDescription").value;
    const dueDate = document.getElementById("ToDoDate").value;
    //creates Todo
    let todo = toDo(name, description, dueDate);

    if (openTab.id !== "content") {
      let existingTodos =
        JSON.parse(localStorage.getItem(`${openTab.id}-todos`)) || [];
      existingTodos.push(todo);
      localStorage.setItem(
        `${openTab.id}-todos`,
        JSON.stringify(existingTodos),
      );
    } else {
      todoArr.push(todo);
      localStorage.setItem("todos", JSON.stringify(todoArr));
    }
    renderTodo(todo, openTab.id); //renders todo
    form.remove(); //removes form
  });
});

//adds listener to all todo done btns
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      e.preventDefault();
      let tab = tabThatsOpen();
      let buttons = Array.from(
        document.getElementById(`${tab}`).querySelectorAll(".delete-btn"),
      );
      if (tab != "content") {
        let index = buttons.indexOf(e.target);
        e.target.closest("div").remove();
        buttons.splice(index, 1);
        let existingTodos = JSON.parse(localStorage.getItem(`${tab}-todos`));
        existingTodos.splice(index, 1);
        localStorage.setItem(`${tab}-todos`, JSON.stringify(existingTodos));
      } else {
        // Find the index of the clicked button
        let index = buttons.indexOf(e.target);
        e.target.closest("div").remove();
        buttons.splice(index, 1);
        todoArr.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todoArr));
      }
    }
  });
});

////adding new project btn logic to add projects
let newProjectBtn = document.querySelector("#addNewProject");
newProjectBtn.addEventListener("click", () => {
  addProjectForm();
  const form = document.querySelector("#addProjectForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const project = document.getElementById("projectForm").value;

    let projects = addProject(project);

    projArr.push(projects);
    localStorage.setItem("projects", JSON.stringify(projArr));

    renderProject(projects);
    form.remove();

    let main = document.querySelector("#main");
    let tab = document.createElement("div");
    tab.id = `content-${project}`;
    tab.classList = "tab-content";
    let tabTitle = document.createElement("h3");
    tabTitle.textContent = `${project}: `;
    tab.appendChild(tabTitle);
    main.appendChild(tab);
    openTab(`content-${project}`);
  });
});

let renderedTodos = {}; // Track rendered todos per tab

// Adding function to project button in navigation bar to open new tab
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("newProject")) {
      e.preventDefault();

      let tabId = `content-${e.target.id}`;
      openTab(tabId);

      // Check if this tab was already opened before
      if (!renderedTodos[tabId]) {
        let tab = tabThatsOpen(); // Assuming this function returns the current open tab's ID

        // Getting todos that are stored in localStorage
        const storedArr = localStorage.getItem(`${tab}-todos`);
        if (storedArr) {
          try {
            const arr = JSON.parse(storedArr);
            // Check if todos are already present in the DOM
            let existingTodos = document.querySelector(`#${tab} .toDosDiv`);
            if (!existingTodos) {
              renderTodo(arr, `${tab}`);
            }
          } catch (error) {
            console.log("Error parsing todos:", error);
          }
        }

        // Mark this tab as opened to prevent reloading todos
        renderedTodos[tabId] = true;
      }
    }
  });
});
//add project delete btn logic, deleting a project
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-delete-btn")) {
      e.preventDefault();

      let buttons = Array.from(
        document.querySelectorAll(".project-delete-btn"),
      );
      let index = buttons.indexOf(e.target);
      openTab(`content-${e.target.closest(".newProject").id}`);
      e.target.closest(".newProject").remove();
      buttons.splice(index, 1);
      projArr.splice(index, 1);

      let tab = tabThatsOpen();
      let closeTab = document.getElementById(tab);
      closeTab.remove();

      localStorage.removeItem(`${tab}-todos`);
      localStorage.setItem("projects", JSON.stringify(projArr));
      openTab("content");
    }
  });
});

///tab switicher
function openTab(tabId) {
  let tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach((content) => {
    content.classList.add("hide");
    content.classList.remove("active");
  });

  let selectedTab = document.querySelector(`#${tabId}`);
  if (selectedTab) {
    // If the tab exists, make it active
    selectedTab.classList.remove("hide");
    selectedTab.classList.add("active");
  } else {
    // If the tab doesn't exist, you can either create it or show a default tab.
    // For example, let's show a default tab or create a new tab:
    console.log(`Tab with ID ${tabId} not found.`);
  }
}

//general to dos tab switch
let generalTab = document.querySelector("#defaultToDos");
generalTab.addEventListener("click", (e) => {
  e.preventDefault();

  openTab("content");
});

// get open tab function
function tabThatsOpen() {
  let tabContents = document.querySelectorAll(".tab-content");
  if (tabContents.length > 1) {
    for (let content of tabContents) {
      if (content.classList.contains("active")) {
        return content.id; // Now it correctly returns the id
      }
    }
  }
  return "content"; // Return null if no active tab is found
}
