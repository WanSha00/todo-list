const projectContainer = document.querySelector(".project-list");
const newProjectForm = document.querySelector("[data-new-project-form]");
const newProjectInput = document.querySelector(".new-project-input");
const deleteProjectButton = document.querySelector(".btn-delete-project");
const newProjectButton = document.querySelector(".btn-new-project");

const projectDisplayContainer = document.querySelector(".todo-content");
const projectTitleElement = document.querySelector(".todo-title");
const tasksCountElement = document.querySelector(".task-count");
const tasksContainer = document.querySelector(".all-tasks");
const taskDeleteButton = document.querySelector(".btn-delete-complete");

const taskTemplate = document.getElementById("task-template");

const newTaskForm = document.querySelector(".new-task-form");
const newTaskInput = document.querySelector(".new-task-title-input");
const newTaskDate = document.querySelector(".new-task-date");
const newTaskNote = document.querySelector(".new-task-details");
const newTaskPriority = document.getElementsByName("create-new-priority");
const newTaskButton = document.querySelector("#btn-add-task");

const editTaskForm = document.querySelector(".edit-task-form");
const editTaskInput = document.querySelector(".edit-task-title-input");
const editTaskDate = document.querySelector(".edit-task-date");
const editTaskNote = document.querySelector(".edit-task-details");
const editTaskPriority = document.getElementsByName("edit-priority");
const editTaskButton = document.querySelector("#btn-edit-task");

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
    renderTaskCount(selectedProject);
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

function disableMode() {
  deleteProjectButton.disabled = true;
  taskDeleteButton.disabled = true;
  newProjectButton.disabled = true;
  newTaskButton.disabled = true;

  let deleteTaskButtons = document.querySelectorAll(".btn-task-delete");
  deleteTaskButtons.forEach((btn) => (btn.disabled = true));

  let checkbox = document.getElementsByTagName("input");
  for (i = 0; i < checkbox.length; i++) {
    if (checkbox[i].type == "checkbox") {
      checkbox[i].disabled = true;
    }
  }
}

function enableMode() {
  deleteProjectButton.disabled = false;
  taskDeleteButton.disabled = false;
  newProjectButton.disabled = false;
  newTaskButton.disabled = false;

  let deleteTaskButtons = document.querySelectorAll(".btn-task-delete");
  deleteTaskButtons.forEach((btn) => (btn.disabled = false));

  let checkbox = document.getElementsByTagName("input");
  for (i = 0; i < checkbox.length; i++) {
    if (checkbox[i].type == "checkbox") {
      checkbox[i].disabled = false;
    }
  }
}

function editMode(selectedTask) {
  projectContainer.classList.add("project-list-none");

  const editContainer = document.querySelector(".edit-task-container");
  const newContainer = document.querySelector(".newtask");

  editContainer.classList.remove("edit-not-active");
  newContainer.classList.add("new-not-active");

  //populate with edit inputs
  editTaskInput.value = selectedTask.name;
  editTaskNote.value = selectedTask.notes;
  editTaskDate.value = selectedTask.dueDate;

  for (i = 0; i < editTaskPriority.length; i++) {
    if (editTaskPriority[i].value == selectedTask.priority) {
      editTaskPriority[i].checked = true;
    }
  }
}

function exitEditMode() {
  const editContainer = document.querySelector(".edit-task-container");
  const newContainer = document.querySelector(".newtask");

  editContainer.classList.add("edit-not-active");
  newContainer.classList.remove("new-not-active");

  enableMode();

  projectContainer.classList.remove("project-list-none");
}

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

    editMode(selectedTask);

    //submit edit details
    editTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const taskName = editTaskInput.value;
      const taskDate = editTaskDate.value;
      const taskNote = editTaskNote.value;

      let taskPriority = "";

      for (i = 0; i < editTaskPriority.length; i++) {
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
      exitEditMode();
      render();
      
    });

    //cancel edit button
    const cancelEditButton = document.querySelector("#btn-cancel-edit-task");
    cancelEditButton.addEventListener("click", () => {
      exitEditMode();
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

  for (i = 0; i < newTaskPriority.length; i++) {
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

//create new project
function createProject(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [],
  };
}

//create new task
function createTask(name, notes, date, priority) {
  return {
    id: Date.now().toString(),
    name: name,
    complete: false,
    dueDate: date,
    notes: notes,
    priority: priority,
  };
}

//save project lists and selected project id
function save() {
  localStorage.setItem("project.lists", JSON.stringify(projects));
  localStorage.setItem("project.selectedListId", selectedProjectId);
}

//render content
function render() {
  clearElement(projectContainer);
  renderProjectLists();

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  //check if having selected project to display the project to do
  if (selectedProjectId == "null" || selectedProjectId === null) {
    projectDisplayContainer.style.display = "none";
  } else {
    projectDisplayContainer.style.display = "";
    projectTitleElement.innerText = selectedProject.name;
    renderTaskCount(selectedProject);
    clearElement(tasksContainer);
    renderTasks(selectedProject);
  }
}

//render task
function renderTasks(selectedProject) {
  selectedProject.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);

    const taskRow = taskElement.querySelector(".task-row");

    if (task.priority == "low") {
      taskRow.classList.add("task-low");
    } else if (task.priority == "medium") {
      taskRow.classList.add("task-medium");
    } else {
      taskRow.classList.add("task-high");
    }

    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.complete;

    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);

    const date = taskElement.querySelector(".task-date");
    date.append(task.dueDate);

    const priority = taskElement.querySelector(".task-priority");
    priority.append(task.priority);

    const notes = taskElement.querySelector(".task-notes");
    notes.append(task.notes);

    const detailsButton = taskElement.querySelector(".btn-task-details");
    detailsButton.id = "details-" + task.id;

    const editButton = taskElement.querySelector(".btn-task-edit");
    editButton.id = "edit-" + task.id;

    const deleteButton = taskElement.querySelector(".btn-task-delete");
    deleteButton.id = "delete-" + task.id;

    const detailsRow = taskElement.querySelector(".task-details-row");
    detailsRow.id = "row-" + task.id;

    tasksContainer.appendChild(taskElement);
  });
}

function renderTaskCount(selectedProject) {
  const incompleteTaskCount = selectedProject.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  tasksCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

function renderProjectLists() {
  //render each project
  projects.forEach((project) => {
    const projElement = document.createElement("li");

    projElement.dataset.projId = project.id;
    projElement.classList.add("project-list-name");
    projElement.innerText = project.name;

    if (project.id === selectedProjectId) {
      projElement.classList.add("active-project");
    }

    projectContainer.appendChild(projElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();

