import { eventType } from './Utils';

const registerToggle = () => {
  const type = eventType();
  const button = document.getElementById('projects-btn');
  const dropdown = document.querySelector('.dropdown-custom');
  const listener = () => dropdown.classList.toggle('is-open');

  button.addEventListener(type, listener);
};

export { registerToggle };
