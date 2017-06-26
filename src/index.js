/* @flow */
import { registerToggle } from 'common/js/utils';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('projects-btn');
  const target = document.querySelector('.dropdown');

  registerToggle(button, target);
});
