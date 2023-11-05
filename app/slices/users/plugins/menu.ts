// Add an item to the common Menu

export default defineNuxtPlugin((nuxtApp) => {
  const menu = useMenu();
  menu.addItem('users');
});
