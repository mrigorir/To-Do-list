// Imports
import './style.css';
import { Sort, DnD } from './modules/drag&sort.js';
import { Task } from './modules/tasks.js';
import { Status } from './modules/status.js';

// Variables
const list = document.getElementById('list');
const form = document.getElementById('form');
const clearCompletedTasks = document.querySelector('.clear-tab');
let pos;
let tasks = [];
let indexPos = 0;

// Functions
const loadList = () => {
  const listItems = [...list.children];
  const items = document.querySelectorAll('.draggables');
  items.forEach((item) => {
    item.addEventListener('dragstart', (e) => {
      DnD.dragStart(e);
    });

    item.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    item.addEventListener('drop', (e) => {
      DnD.drop(e);
      tasks = [];
      listItems.forEach((item, index) => {
        const task = new Task(item.children[0].children[1].textContent, item.children[0].children[0].checked, index);
        tasks.push(task);
        localStorage.setItem('tasksList', JSON.stringify(tasks));
      });
    });

    item.addEventListener('dragend', (e) => {
      DnD.dragOver(e);
    });
  });
};

const displayOnLoad = (tasks, list) => {
  list.innerHTML = '';
  tasks.forEach((task) => {
    Task.displayTask(task.description, task.index, list);
  });
};

const loadStorage = (tasksOnStorage) => {
  if (tasksOnStorage !== null) {
    tasks = JSON.parse(localStorage.getItem('tasksList'));
    indexPos = tasks.length;
  } else {
    indexPos = 0;
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = document.getElementById('newTask').value;
  const addTask = new Task(newTask, false, indexPos);
  tasks.push(addTask);
  Task.displayTask(newTask, indexPos, list);
  e.target.reset();
  indexPos += 1;
  Task.edit(tasks, list);
  localStorage.setItem('tasksList', JSON.stringify(tasks));
  location.reload(); //eslint-disable-line
  loadList();
});

// Events
list.addEventListener('change', (e) => {
  pos = Array.prototype.indexOf.call(list.childNodes, e.target.parentNode.parentNode);
  if (e.target.classList.contains('check')) {
    if (e.target.checked) {
      Status.toggleLine(e);
      tasks[pos].completed = true;
      Status.checkAttribute(e);
    } else {
      Status.toggleLine(e);
      tasks[pos].completed = false;
      Status.checkAttribute(e);
    }
  }
  localStorage.setItem('tasksList', JSON.stringify(tasks));
});

list.addEventListener('click', (e) => {
  let span; let
    trash;
  if (e.target.classList.contains('border-0') || e.target.classList.contains('check')) {
    span = e.target;
    trash = span.parentNode.parentNode.childNodes[2].childNodes[1]; //eslint-disable-line
    trash.classList.toggle('d-none');
  }
});

list.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    e.target.parentElement.parentElement.remove();
    pos = Array.prototype.indexOf.call(list.childNodes, e.target.parentElement.parentElement);
    Task.removeSelectedItem(tasks, pos);
    indexPos = tasks.length;
    localStorage.setItem('tasksList', JSON.stringify(tasks));
    loadList();
    Task.edit(tasks, list);
  }
});

clearCompletedTasks.addEventListener('click', () => {
  if (tasks.length > 0) {
    tasks = Task.removeCompletedItem(tasks);
    tasks.forEach((task, index) => {
      task.index = index;
    });
    indexPos = tasks.length;
    displayOnLoad(tasks, list);
    localStorage.setItem('tasksList', JSON.stringify(tasks));
    loadList();
    Task.edit(tasks, list);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const tasksOnStorage = JSON.parse(localStorage.getItem('tasksList'));
  loadStorage(tasksOnStorage);
  localStorage.setItem('tasksList', JSON.stringify(tasks));
  Sort.sortTask(tasks);
  displayOnLoad(tasks, list);
  loadList();
  Task.edit(tasks, list);
});
