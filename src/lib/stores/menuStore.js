// src/lib/stores/menuStore.js
import { writable } from 'svelte/store';

export const menuState = writable({
  isWorkOpen: false,
  isAboutOpen: false,
  isClosing: false
});
