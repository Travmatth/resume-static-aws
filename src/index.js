/* @flow */

//https://github.com/jgthms/bulma/issues/192
const registerNavDropdown = () => {
  const button = document.getElementById('projects-btn');
  const dropdown = document.querySelector('.dropdown');

  button.addEventListener('click', () => {
    dropdown.classList.toggle('is-open');
  });
};

document.addEventListener('DOMContentLoaded', registerNavDropdown);
