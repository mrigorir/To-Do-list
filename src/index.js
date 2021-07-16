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
let index_pos = 0;


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = document.getElementById('newTask').value;
  const add_task = new Task(newTask, false, index_pos);
  tasks.push(add_task);
  Task.displayTask(newTask, index_pos, list);
  e.target.reset();
  index_pos++;
  Task.edit(tasks, list)
  localStorage.setItem('tasksList', JSON.stringify(tasks));
  //location.reload();
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

list.addEventListener('click', (e) => {
  let span, trash;
  if ( e.target.classList.contains('border-0') || e.target.classList.contains('check')) {
    span = e.target;
    trash = span.parentNode.parentNode.childNodes[2].childNodes[1];
    trash.classList.toggle('d-none');
  }
});

list.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    e.target.parentElement.parentElement.remove();
    pos = Array.prototype.indexOf.call(list.childNodes, e.target.parentElement.parentElement);
    Task.removeSelectedItem(tasks, pos);
    index_pos = tasks.length;
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
    index_pos = tasks.length;
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


//Functions
const displayOnLoad = (tasks, list) => {
  list.innerHTML = '';
  tasks.forEach(task => {
    Task.displayTask(task.description, task.index, list);
  });
}

const loadStorage = (tasksOnStorage) => {
  if ( tasksOnStorage !== null) {
    tasks = JSON.parse(localStorage.getItem('tasksList'));
    index_pos = tasks.length;
  } else {
    index_pos = 0;
  }
}


