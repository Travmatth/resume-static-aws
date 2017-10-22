import { registerToggle } from 'common/js/Handlers';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => registerToggle());
  document.body.addEventListener('touchstart', () => {}, false);
}
