// import _ from 'lodash';
import './style.css';

const list = document.getElementById('list');
const tasks = [
  {
    description: 'Clean my room.',
    completed: false,
    index: 1,
  },
  {
    description: 'Eat dinner.',
    completed: false,
    index: 3,
  },
  {
    description: 'Get a developer job.',
    completed: false,
    index: 2,
  },
];

const sortTask = (arr) => {
  arr.sort((a, b) => ((a.index > b.index) ? 1 : -1));
};

const createTask = (tasks) => {
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'p-3', 'border-top');
    li.innerHTML = `<div class="d-flex align-items-center">
                      <span class="me-2 square"></span>
                      <span> ${task.description} </span>
                    </div> 
                    <i class="fas fa-ellipsis-v"></i>`;
    list.appendChild(li);
  });
};

const addTask = (tasks) => {
  sortTask(tasks);
  createTask(tasks);
};

addTask(tasks);