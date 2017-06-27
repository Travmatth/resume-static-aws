import { eventType } from './utils';

const registerToggle = () => {
  const button = document.getElementById('projects-btn');
  const target = document.querySelector('.dropdown');

  button.addEventListener(eventType(), () => {
    target.classList.toggle('is-open');
  });
};

export { registerToggle };
