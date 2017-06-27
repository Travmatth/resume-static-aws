/* @flow */
import { registerToggle } from 'common/js/utils';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    registerToggle();
  });
}
