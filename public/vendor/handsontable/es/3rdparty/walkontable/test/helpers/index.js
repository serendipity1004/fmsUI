/* eslint-disable import/no-unresolved */
import window from 'window';
import * as common from './common';

// Export all helpers to the window.
Object.keys(common).forEach(function (key) {
  window[key] = common[key];
});