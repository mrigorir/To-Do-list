/**
 * @jest-environment jsdom
 */

 const Task = require('./task.js');
 const LocalStorage = require('./localStorage.js');
 
 describe('add', () => {
   // Arrange --------------------------------------------------------------------------->
   document.body.innerHTML = 
     '<form role="form" class=" border-top d-flex align-items-center justify-content-between p-3" id="form">'
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
 
   // Act --------------------------------------------------------------------------->
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
 
   //   Assert --------------------------------------------------------------------------->
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