const taskTemplate = document.getElementById("task-template");
const deleteProjectButton = document.querySelector(".btn-delete-project");
const taskDeleteButton = document.querySelector(".btn-delete-complete");
const newProjectButton = document.querySelector(".btn-new-project");
const newTaskButton = document.querySelector("#btn-add-task");
const editTaskInput = document.querySelector(".edit-task-title-input");
const editTaskDate = document.querySelector(".edit-task-date");
const editTaskNote = document.querySelector(".edit-task-details");
const editTaskPriority = document.getElementsByName("edit-priority");

export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

//create new project
export function createProject(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [],
  };
}

//create new task
export function createTask(name, notes, date, priority) {
  return {
    id: Date.now().toString(),
    name: name,
    complete: false,
    dueDate: date,
    notes: notes,
    priority: priority,
  };
}

export function renderProjectLists(
  projects,
  selectedProjectId,
  projectContainer
) {
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

export function renderTaskCount(selectedProject, tasksCountElement) {
  const incompleteTaskCount = selectedProject.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  tasksCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

//render task
export function renderTasks(selectedProject, tasksContainer) {
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

export function disableMode() {
  deleteProjectButton.disabled = true;
  taskDeleteButton.disabled = true;
  newProjectButton.disabled = true;
  newTaskButton.disabled = true;

  let deleteTaskButtons = document.querySelectorAll(".btn-task-delete");
  deleteTaskButtons.forEach((btn) => (btn.disabled = true));

  let checkbox = document.getElementsByTagName("input");
  for (let i = 0; i < checkbox.length; i++) {
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
  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i].type == "checkbox") {
      checkbox[i].disabled = false;
    }
  }
}

export function editMode(selectedTask, projectContainer) {
  projectContainer.classList.add("project-list-none");

  const editContainer = document.querySelector(".edit-task-container");
  const newContainer = document.querySelector(".newtask");

  editContainer.classList.remove("edit-not-active");
  newContainer.classList.add("new-not-active");

  //populate with edit inputs
  editTaskInput.value = selectedTask.name;
  editTaskNote.value = selectedTask.notes;
  editTaskDate.value = selectedTask.dueDate;

  for (let i = 0; i < editTaskPriority.length; i++) {
    if (editTaskPriority[i].value == selectedTask.priority) {
      editTaskPriority[i].checked = true;
    }
  }
}

export function exitEditMode(projectContainer) {
  const editContainer = document.querySelector(".edit-task-container");
  const newContainer = document.querySelector(".newtask");

  editContainer.classList.add("edit-not-active");
  newContainer.classList.remove("new-not-active");

  enableMode();

  projectContainer.classList.remove("project-list-none");
}
