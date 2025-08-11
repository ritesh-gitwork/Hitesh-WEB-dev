const fs = require("fs");
const filepath = "./tasks.json";

// function to load task

const loadTasks = () => {
  try {
    const dataRead = fs.readFileSync(filepath); // data read krega
    const dataJSON = dataRead.toString(); //convert to string
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

// task save krne ka function
// JSON.stringify(value, replacer, space)

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(filepath, dataJSON);
};

// add task

const addTask = (task) => {
  if (!task) {
    console.log("plase provide a task");
    return;
  }

  const tasks = loadTasks(); //get current task
  tasks.push({ task }); // add new task
  saveTasks(tasks); //save updated task
  console.log("task added:", task); //confirm
};

// list of taskssss

const listTasks = () => {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("no tasks found");
    return;
  }

  tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));
};

// remove tasks by number

const removeTask = (index) => {
  const tasks = loadTasks();
  if (isNaN(index) || index < 1 || index > tasks.length) {
    console.log("Invalid task number!");
    return;
  }

  //   array.splice(startIndex, deleteCount);
  //
  const removed = tasks.splice(index - 1, 1);
  saveTasks(tasks);
  console.log(`Removed task: ${removed[0].task}`);
};

// process.argv is an array in Node.js
// It stores the command-line arguments you type when running the file.

const command = process.argv[2]; //your commant
const argument = process.argv[3]; // your argument

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("Command not found! Use: add, list, or remove");
}
