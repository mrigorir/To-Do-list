/**
 * @jest-environment jsdom
 */

const Task = require('../src/__mocks__/task');
const LocalStorage = require('../src/__mocks__/localStorage');

describe('add', () => {
  document.body.innerHTML = '<form role="form" class=" border-top d-flex align-items-center justify-content-between p-3" id="form">'
     + '<input type="text" name="task" id="task" class="border-0" value="Plop">'
     + '</form>'
     + '<ul class="list"></ul>';
  const event = {
    keyCode: 13,
  };

  const localStorage = new LocalStorage();

  const renderTaskDom = () => {
    const listTasks = localStorage.getDataLocalStorage();
    const container = document.querySelector('.list');
    const input = document.querySelector('.border-0');
    const task = document.createElement('li');
    task.classList.add('item');
    task.dataset.id = listTasks.length;
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    const label = document.createElement('label');
    label.textContent = input.value;
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-trash-alt', 'remove');

    task.appendChild(checkBox);
    task.appendChild(label);
    task.appendChild(icon);
    container.appendChild(task);
  };

  const checkElementsInTaskDOM = () => {
    const task = document.querySelector('.item');
    const childrenTask = [...task.children];
    const checkBox = childrenTask[0];
    const label = childrenTask[1];
    const icon = childrenTask[2];
    return [checkBox, label, icon, task];
  };

  const add = (event) => {
    if (event.keyCode === 13) {
      const listTasks = localStorage.getDataLocalStorage();
      const input = document.querySelector('.border-0');
      const inputValue = input.value;
      const newTask = new Task(inputValue, false, listTasks.length);
      listTasks.push(newTask);
      localStorage.setDataLocalStorage(listTasks);
      input.value = '';
      renderTaskDom();
      return listTasks;
    }
    return false;
  };

  const addFunction = add(event);

  test('add an element to task list', () => {
    expect(addFunction.length === 1).toBeTruthy();
  });

  test('index starts at 0', () => {
    expect(addFunction[addFunction.length - 1].index).toBe(0);
  });

  test('check object', () => {
    expect(addFunction).toEqual([
      {
        description: 'Plop',
        status: false,
        index: 0,
      },
    ]);
  });

  test('print task on HTML', () => {
    expect(checkElementsInTaskDOM()[3]).toBeDefined();
  });

  test('test localStorage get method', () => {
    expect(localStorage.getDataLocalStorage()).toEqual([
      {
        description: 'Plop',
        status: false,
        index: 0,
      },
    ]);
  });
});

describe('remove', () => {
  document.body.innerHTML = '<form role="form" class=" border-top d-flex align-items-center justify-content-between p-3" id="form">'
    + '<input type="text" name="task" id="task" class="border-0" value="Plop">'
    + '</form>'
    + '<ul class="list">'
    + '<li data-id="0" class="item"><i class="fas fa-trash-alt remove"></i></li>'
    + '<li data-id="1" class="item"><i class="fas fa-trash-alt remove"></i></li>'
    + '<li data-id="2" class="item"><i class="fas fa-trash-alt remove"></i></li>'
    + '</ul>';
  const listTask = [
    {
      description: 'suka',
      status: false,
      index: 0,
    },
    {
      description: 'energy bloom',
      status: true,
      index: 1,
    },
    {
      description: 'elden ring',
      status: false,
      index: 2,
    },
  ];
  const localStorage = new LocalStorage();
  localStorage.setDataLocalStorage(listTask);

  const update = (list) => {
    localStorage.setDataLocalStorage(list);
    const firstArray = [];
    const secondArray = [];
    for (let i = 0; i <= list.length; i += 1) {
      firstArray.push(i);
    }
    list.forEach((element) => secondArray.push(element.index));

    const difference = firstArray.filter((x) => secondArray.indexOf(x) === -1);
    const templateString = `li[data-id="${difference[0]}"]`;
    const element = document.querySelector(templateString);
    element.remove();
  };

  const checkNumberTask = () => [...document.querySelector('.list').children].length;

  const element = document.querySelector('li[data-id="0"] .remove');

  const removeTask = (element) => {
    const isRemoveIcon = element.classList.contains('remove');
    if (isRemoveIcon) {
      const listTasks = localStorage.getDataLocalStorage();
      const id = parseInt(element.parentElement.dataset.id, 10);
      listTasks.splice(id, 1);
      update(listTasks);
      return listTasks;
    }
    return false;
  };

  test('remove an item from the tasks list', () => {
    expect(removeTask(element)).toHaveLength(2);
  });

  test('remove an item from the HTML', () => {
    expect(checkNumberTask()).toBe(2);
  });

  test('test localStorage get function', () => {
    expect(localStorage.getDataLocalStorage()).toEqual([
      {
        description: 'energy bloom',
        status: true,
        index: 1,
      },
      {
        description: 'elden ring',
        status: false,
        index: 2,
      },
    ]);
  });
});
