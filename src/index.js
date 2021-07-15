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
list.addEventListener('change', (e) => {
  const pos = Array.prototype.indexOf.call(list.childNodes, e.target.parentNode.parentNode);
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
  if (JSON.parse(localStorage.getItem('tasksList')) !== null) {
    tasks = JSON.parse(localStorage.getItem('tasksList'));
  }
  Sort.sortTask(tasks);
  Task.displayTask(tasks, list);
  loadList();
});
