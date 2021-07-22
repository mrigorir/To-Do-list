/**
 * @jest-environment jsdom
 */

const LocalStorage = require('../src/__mocks__/localStorage.js');

describe('edit', () => {
  document.body.innerHTML = `${+'<ul class="list">'
  }<li data-id="0" class="item">`
   + '<input class="checkbox" type="checkbox">'
   + '<label class="text" contenteditable=true>Find my brain</label>'
   + '<i class="fas fa-trash-alt remove"></i>'
   + '</li>'
   + '</ul>';

  const listTask = [
    {
      description: 'Find my brain',
      status: false,
      index: 0,
    },
  ];

  const localStorage = new LocalStorage();
  localStorage.setDataLocalStorage(listTask);

  const refreshDescriptions = (string) => {
    const descriptionLabel = document.querySelector('.text');
    const listTasks = localStorage.getDataLocalStorage();
    const id = parseInt(descriptionLabel.parentElement.dataset.id, 10);
    listTasks[id].description = string;
    document.querySelector('.text').textContent = string;
    localStorage.setDataLocalStorage(listTasks);
    return descriptionLabel.textContent;
  };

  test('check edit in HTML', () => {
    expect(refreshDescriptions('code')).toBe('code');
  });

  test('check edit in localStorage', () => {
    expect(localStorage.getDataLocalStorage()[0].description).toBe('code');
  });
});