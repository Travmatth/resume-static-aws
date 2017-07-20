import { registerToggle } from 'common/js/handlers';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => registerToggle());
  document.body.addEventListener('touchstart', () => {}, false);
}
