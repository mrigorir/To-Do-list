class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  static displayTask = (tasks, list) => {
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.setAttribute('draggable', 'true');
      li.dataset.id = `${task.index}`;
      li.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'p-3', 'border-top', 'draggables');
      li.innerHTML = `<div class="d-flex align-items-center">
                        <input type="checkbox" class="me-2 check">
                        <span class="border-0" contenteditable="true"> ${task.description} </span>
                      </div> 
                      <i class="fas fa-ellipsis-v"></i>`;
      list.appendChild(li);
    });
  };
}

export { Task };