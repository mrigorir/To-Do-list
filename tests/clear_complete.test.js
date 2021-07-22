/**
 * @jest-environment jsdom
 */
 const LocalStorage = require('../src/__mocks__/localStorage');
 
 describe('Update checkbox and task status', () => {
   // Arrange --------------------------------------------------------------------------->
   document.body.innerHTML = 
       '<ul class="list">'
     + '<li data-id="0" class="item">'
     + '<input class="checkbox" type="checkbox">'
     + '<label class="text" contenteditable=true>Camp</label>'
     + '<i class="fas fa-trash-alt remove"></i>'
     + '</li>'
     + '</ul>';
 
   const localStorage = new LocalStorage();
   const listTask = [
     {
       description: 'Camp',
       status: false,
       index: 0,
     },
   ];
   localStorage.setDataLocalStorage(listTask);
   const checkBox = document.querySelector('.checkbox');
 
   const getStatusCheckBoxDom = () => checkBox.checked;
 
   const refreshStatus = (element) => {
     const isCheckBox = element.classList.contains('checkbox');
     if (isCheckBox) {
       const listTasks = localStorage.getDataLocalStorage();
       const id = parseInt(element.parentElement.dataset.id, 10);
       if (!element.checked) {
         listTasks[id].status = true;
         element.nextElementSibling.classList.add('completed');
         element.setAttribute('checked', 'true');
       } else {
         listTasks[id].status = false;
         element.nextElementSibling.classList.remove('completed');
         element.removeAttribute('checked');
       }
       localStorage.setDataLocalStorage(listTasks);
     }
   };
 
   refreshStatus(checkBox);
 
   test('checked attribute = true', () => {
     expect(localStorage.getDataLocalStorage()).toEqual([
       {
         description: 'Camp',
         status: true,
         index: 0,
       },
     ]);
   });
 
   test('change checked status in HTML', () => {
     expect(getStatusCheckBoxDom()).toBeTruthy();
   });
 });
 
 describe('remove checked tasks', () => {
  ​
     document.body.innerHTML = 
         '<ul class="list">'
       + '<li data-id="0" class="item">'
       + '<input class="checkBox" type="checkbox">'
       + '<label class="text">Camp</label>'
       + '<i class="fas fa-trash-alt remove"></i>'
       + '</li>'
       + '<li data-id="1" class="item">'
       + '<input class="checkBox" type="checkbox" checked="true">'
       + '<label class="text">Find food</label>'
       + '<i class="fas fa-trash-alt remove"></i>'
       + '</li>'
       + '<li data-id="2" class="item">'
       + '<input class="checkBox" type="checkbox" checked="true">'
       + '<label class="text">Walk</label>'
       + '<i class="fas fa-trash-alt remove"></i>'
       + '</li>'
       + '</ul>';
   
     const localStorage = new LocalStorage();
     const listTask = [
       {
         description: 'Camp',
         status: false,
         index: 0,
       },
       {
         description: 'Find food',
         status: true,
         index: 1,
       },
       {
         description: 'Walk',
         status: true,
         index: 2,
       },
     ];
     localStorage.setDataLocalStorage(listTask);
   
     const update = (list) => {
       localStorage.setDataLocalStorage(list);
   
       const firstArrayIndex = [];
       const secondArrayIndex = [];
       for (let i = 0; i < listTask.length; i += 1) {
         firstArrayIndex.push(i);
       }
       list.forEach((element) => secondArrayIndex.push(element.index));
   
       const difference = firstArrayIndex.filter((x) => secondArrayIndex.indexOf(x) === -1);
       difference.forEach((index) => {
         const identifier = `li[data-id="${index}"]`;
         document.querySelector(identifier).remove();
       });
     };
   
     const getTaskDomLength = () => {
       const tasksDom = [...document.querySelectorAll('.item')];
       return tasksDom.length;
     };
   
     const removeTaskChecked = () => {
       const listTasks = localStorage.getDataLocalStorage();
       if (listTasks !== []) {
         const newListTask = listTasks.filter((task) => task.status === false);
         update(newListTask);
       }
     };
   
     removeTaskChecked();
   
     test('remove from localStorage', () => {
       expect(localStorage.getDataLocalStorage()).toEqual([
         {
           description: 'Camp',
           status: false,
           index: 0,
         },
       ]);
     });
   
     test('remove from HTML', () => {
       expect(getTaskDomLength()).toBe(1);
     });
   });
 