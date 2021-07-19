class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  static displayTask = (task, index, list) => {
    const li = document.createElement('li');
    li.setAttribute('draggable', 'true');
    li.dataset.id = `${index}`;
    li.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'p-3', 'border-top', 'draggables');
    li.innerHTML = `<div class="d-flex align-items-center">
                      <input type="checkbox" class="me-2 check" data-id="${index}">
                      <span class="border-0" contenteditable="true"> ${task} </span>
                    </div>
                    <div class="d-flex">
                      <i class="fas fa-trash-alt remove trash me-2 d-none text-danger" data-id="${index}"></i>
                      <i class="fas fa-ellipsis-v ellipsis text-primary"></i>
                    </div>`;
    list.appendChild(li);
  };

  static removeCompletedItem = (tasks) => {
    const newtasks = tasks.filter((task) => task.completed === false);
    return newtasks;
  };

  static removeSelectedItem = (tasks, index) => {
    tasks.splice(parseInt(index, 10), 1);
    tasks.forEach((task, index) => {
      task.index = index;
    });
  };

  static edit = (tasks, list) => {
    const editableItems = document.querySelectorAll('#list span');

    editableItems.forEach((item) => {
      item.addEventListener('keyup', (e) => {
        const pos = Array.prototype.indexOf.call(list.childNodes, e.target.parentNode.parentNode);
        tasks[pos].description = item.textContent;
        localStorage.setItem('tasksList', JSON.stringify(tasks));
      });
    });
  };
}

export { Task };
