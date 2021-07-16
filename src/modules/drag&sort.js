let element;

class Sort {
  static sortTask = (arr) => {
    arr.sort((a, b) => ((a.index > b.index) ? 1 : -1));
  };
}

class DnD {
  static dragStart = (event) => {
    event.currentTarget.classList.add('dragging');
    element = event.currentTarget;
    event.dataTransfer.setData('text/html', element.innerHTML);
  }

   static drop = (event) => {
     event.stopPropagation();
     if (event.currentTarget !== element) {
       element.innerHTML = event.currentTarget.innerHTML;
       event.currentTarget.innerHTML = event.dataTransfer.getData('text/html');
     }
   }

   static dragOver = (event) => {
     event.target.classList.remove('dragging');
   }
}

export { Sort, DnD };