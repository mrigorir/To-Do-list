class Status {
  static toggleLine = (event) => {
    event.target.nextElementSibling.classList.toggle('line');
  }

  static checkAttribute = (event) => {
    if (event.target.checked) {
      event.target.setAttribute('checked', 'true');
    } else {
      event.target.removeAttribute('checked');
    }
  }
}

export { Status };