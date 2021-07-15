// Imports
import './style.css';
import { Sort, DnD } from './modules/drag&sort.js';
import { Task } from './modules/tasks.js';
import { Status } from './modules/status.js';
// Variables
const list = document.getElementById('list');
let tasks = [
  {
    description: 'Clean my room.',
    completed: false,
    index: 0,
  },
  {
    description: 'Eat dinner.',
    completed: false,
    index: 1,
  },
  {
    description: 'Get a developer job.',
    completed: false,
    index: 2,
  },
];
// Functions
const displayTask = (tasks) => {
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.setAttribute('draggable', 'true');
    li.dataset.id = `${task.index}`;
    li.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'p-3', 'border-top', 'draggables');
    li.innerHTML = `<div class="d-flex align-items-center">
                      <input type="checkbox" class="me-2 check" data-id="${task.index}">
                      <span class="border-0" contenteditable="true"> ${task.description} </span>
                    </div> 
                    <i class="fas fa-ellipsis-v"></i>`;
    list.appendChild(li);
  });
};

list.addEventListener('click', (e) => {
  if (e.target.classList.contains('check')) {
    if (e.target.checked) {
      Status.toggleLine(e);
      tasks[parseInt(e.target.dataset.id, 10)].completed = true;
      Status.checkAttribute(e);
    } else {
      Status.toggleLine(e);
      tasks[parseInt(e.target.dataset.id, 10)].completed = false;
      Status.checkAttribute(e);
    }
    localStorage.setItem('tasksList', JSON.stringify(tasks));
  }
});

const loadList = () => {
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

      const listItems = [...list.children];
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

document.addEventListener('DOMContentLoaded', () => {
  console.log(JSON.parse(localStorage.getItem('tasksList')) !== null);
  if (JSON.parse(localStorage.getItem('tasksList')) !== null) {
    tasks = JSON.parse(localStorage.getItem('tasksList'));
  }
  Sort.sortTask(tasks);
  displayTask(tasks);
  loadList();
  localStorage.setItem('tasksList', JSON.stringify(tasks));
});
