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
 
 