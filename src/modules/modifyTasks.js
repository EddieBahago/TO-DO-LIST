import {
  createWeekTaskArray,
  taskArray,
  createTodayTaskArray,
} from "./addTasks";

function changeStatus(e) {
  let indexNum = Number(e.target.parentNode.id);
  if (e.target.parentNode.classList.value !== "striked") {
    e.target.parentNode.classList.add("striked");
    taskArray[indexNum].striked = true;
    createTodayTaskArray();
    createWeekTaskArray();
  } else {
    e.target.parentNode.classList.remove("striked");
    taskArray[indexNum].striked = false;
    createTodayTaskArray();
    createWeekTaskArray();
  }
}

export { changeStatus };
