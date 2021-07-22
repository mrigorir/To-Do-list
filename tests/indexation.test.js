/**
 * @jest-environment jsdom
 */
 const LocalStorage = require('../src/__mocks__/localStorage');
 const Task = require('../src/__mocks__/task');
 
 describe('update index', () => {
   document.body.innerHTML =
      '<ul class="list">'
    + '<li data-id="0" class="item">'
    + '<input class="checkbox" type="checkbox">'
    + '<label class="text" contenteditable=true>Look for food</label>'
    + '<i class="fas fa-trash-alt remove"></i>'
    + '</li>'
    + '<li data-id="1" class="item">'
    + '<input class="checkbox" type="checkbox">'
    + '<label class="text" contenteditable=true>Go shopping</label>'
    + '<i class="fas fa-trash-alt remove"></i>'
    + '</li>'
    + '</ul>';
 
   const localStorage = new LocalStorage();
 
   const refreshInformation = () => {
     const listTasks = [];
     const container = document.querySelector('.list');
     const items = [...container.children];
     items.forEach((item, index) => {
       const newTask = new Task(item.children[1].textContent, item.children[0].checked, index);
       listTasks.push(newTask);
     });
 
     localStorage.setDataLocalStorage(listTasks);
   };
   refreshInformation();
   test('update id in localStorage', () => {
     expect(localStorage.getDataLocalStorage()).toEqual([
       {
         description: 'Look for food',
         status: false,
         index: 0,
       },
       {
         description: 'Go shopping',
         status: false,
         index: 1,
       },
     ]);
   });
 });