import {
  clearElement,
  createProject,
  createTask,
  renderProjectLists,
  renderTaskCount,
  renderTasks,
  disableMode,
  exitEditMode,
  editMode,
} from "./todo";

const projectContainer = document.querySelector(".project-list");
const newProjectForm = document.querySelector("[data-new-project-form]");
const newProjectInput = document.querySelector(".new-project-input");
const deleteProjectButton = document.querySelector(".btn-delete-project");

const projectDisplayContainer = document.querySelector(".todo-content");
const projectTitleElement = document.querySelector(".todo-title");
const tasksCountElement = document.querySelector(".task-count");
const tasksContainer = document.querySelector(".all-tasks");
const taskDeleteButton = document.querySelector(".btn-delete-complete");

const newTaskForm = document.querySelector(".new-task-form");
const newTaskInput = document.querySelector(".new-task-title-input");
const newTaskDate = document.querySelector(".new-task-date");
const newTaskNote = document.querySelector(".new-task-details");
const newTaskPriority = document.getElementsByName("create-new-priority");

const editTaskForm = document.querySelector(".edit-task-form");
const editTaskInput = document.querySelector(".edit-task-title-input");
const editTaskDate = document.querySelector(".edit-task-date");
const editTaskNote = document.querySelector(".edit-task-details");
const editTaskPriority = document.getElementsByName("edit-priority");

let projects = JSON.parse(localStorage.getItem("project.lists")) || [];
let selectedProjectId = localStorage.getItem("project.selectedListId");
let idToEdit = "";

//update selected project
projectContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedProjectId = e.target.dataset.projId;

    save();
    render();
  }
});

//update incomplete task count
tasksContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );
    const selectedTask = selectedProject.tasks.find(
      (task) => task.id === e.target.id
    );
    selectedTask.complete = e.target.checked;

    save();
    renderTaskCount(selectedProject, tasksCountElement);
  }
});

//delete all completed tasks
taskDeleteButton.addEventListener("click", (e) => {
  let selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );
  const completedTaskCount = selectedProject.tasks.filter(
    (task) => task.complete
  ).length;

  if (completedTaskCount === 0) {
    alert("No completed task to delete");
  } else {
    selectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );
    selectedProject.tasks = selectedProject.tasks.filter(
      (task) => !task.complete
    );

    save();
    render();
  }
});

//open specific task details
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-task-details")) {
    const id = e.target.id.split("-");
    const details = document.getElementById("row-" + id[1]);

    details.classList.toggle("active-details");
  }
});

//open specific edit details
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-task-edit")) {
    disableMode();

    let idArr = e.target.id.split("-");
    idToEdit = idArr[1];

    const selectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );
    let selectedTask = selectedProject.tasks.find(
      (task) => task.id === idToEdit
    );

    editMode(selectedTask, projectContainer);

    //submit edit details
    editTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const taskName = editTaskInput.value;
      const taskDate = editTaskDate.value;
      const taskNote = editTaskNote.value;

      let taskPriority = "";

      for (let i = 0; i < editTaskPriority.length; i++) {
        if (editTaskPriority[i].checked) {
          taskPriority = editTaskPriority[i].value;
        }
      }

      let selectedTask = selectedProject.tasks.find(
        (task) => task.id === idToEdit
      );

      selectedTask.name = taskName;
      selectedTask.notes = taskNote;
      selectedTask.dueDate = taskDate;
      selectedTask.priority = taskPriority;

      save();
      exitEditMode(projectContainer);
      render();
    });

    //cancel edit button
    const cancelEditButton = document.querySelector("#btn-cancel-edit-task");
    cancelEditButton.addEventListener("click", () => {
      exitEditMode(projectContainer);
    });
  }
});

//delete individual task
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-task-delete")) {
    let idArr = e.target.id.split("-");
    let idToDelete = idArr[1];

    const selectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );
    selectedProject.tasks = selectedProject.tasks.filter(
      (task) => task.id !== idToDelete
    );

    save();
    render();
  }
});

//delete selected project
deleteProjectButton.addEventListener("click", (e) => {
  projects = projects.filter((project) => project.id !== selectedProjectId);
  selectedProjectId = null;

  save();
  render();
});

//add new project
newProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const projectName = newProjectInput.value;
  const project = createProject(projectName);

  newProjectInput.value = null;
  projects.push(project);

  save();
  render();
});

//add new task
newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (selectedProjectId == "null" || selectedProjectId === null) {
    alert("Please select a project to add the new task.");
    return;
  }

  const taskName = newTaskInput.value;
  const taskDate = newTaskDate.value;
  const taskNote = newTaskNote.value;
  let taskPriority = "";

  for (let i = 0; i < newTaskPriority.length; i++) {
    if (newTaskPriority[i].checked) {
      taskPriority = newTaskPriority[i].value;
    }
  }

  if (taskName == null || taskName === "") return;

  const task = createTask(taskName, taskNote, taskDate, taskPriority);
  newTaskInput.value = null;
  newTaskNote.value = null;

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );
  selectedProject.tasks.push(task);

  save();
  render();
});

//save project lists and selected project id
function save() {
  localStorage.setItem("project.lists", JSON.stringify(projects));
  localStorage.setItem("project.selectedListId", selectedProjectId);
}

//render content
function render() {
  clearElement(projectContainer);
  renderProjectLists(projects, selectedProjectId, projectContainer);

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  //check if having selected project to display the project to do
  if (selectedProjectId == "null" || selectedProjectId === null) {
    projectDisplayContainer.style.display = "none";
  } else {
    projectDisplayContainer.style.display = "";
    projectTitleElement.innerText = selectedProject.name;

    renderTaskCount(selectedProject, tasksCountElement);
    clearElement(tasksContainer);
    renderTasks(selectedProject, tasksContainer);
  }
}

render();

