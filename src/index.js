 import { openProjectForm, createTodayTaskArray, createWeekTaskArray } from "./modules/addTasks";
import { changeStatus } from "./modules/modifyTasks";
import {
  listAllTasks,
  listTodayTasks,
  listWeekTasks,
} from "./modules/listTasks";

let taskArray = [];

// get DOM Elements
const addProjectButton = document.querySelector(".add-new-task");

const allTasks = document.getElementById("all-tasks");
const today = document.getElementById("today");
const week = document.getElementById("week");

// add Event Listeners
addProjectButton.addEventListener("click", openProjectForm);

allTasks.addEventListener("click", listAllTasks);
today.addEventListener("click", listTodayTasks);
week.addEventListener("click", listWeekTasks);

function renderTaskList() {
  const listElements = document.querySelectorAll("tr");
  for (let i = 0; i < listElements.length; i++) {
    listElements[i].addEventListener("click", changeStatus);
  }
}

const clearButton = document.querySelector(".clear-tasks");

clearButton.addEventListener("click", clearTasks);

function clearTasks() {
  let newArray = [];
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].striked === false) {
      newArray.push({
        title: taskArray[i].title,
        description: taskArray[i].description,
        priority: taskArray[i].priority,
        date: taskArray[i].date,
        striked: taskArray[i].striked,
      });
    }

  }
  
  taskArray = newArray;
  
  listAllTasks();
  createTodayTaskArray();
  createWeekTaskArray();

  renderAfterClear();
}

function renderAfterClear() {
  if (allTasks.style.color === "red") {
    listAllTasks();
  } else if (today.style.color === "red") {
    listTodayTasks();
  } else if (week.style.color === "red") {
    listWeekTasks();
  }
}

// store taskArray in local storage

function storeLocal() {
  let jsontaskArray = JSON.stringify(taskArray);

  window.localStorage.setItem("taskArray", jsontaskArray);
}

// load from storage

(function loadStorage() {
  let getItem = localStorage.getItem("taskArray");

  let item = JSON.parse(getItem);
  if (!item) {
    return;
  } else {
    taskArray = item;
    listAllTasks();
    createTodayTaskArray();
    createWeekTaskArray();
    
  }
})();



export { renderTaskList, storeLocal, allTasks, today, week, taskArray };
