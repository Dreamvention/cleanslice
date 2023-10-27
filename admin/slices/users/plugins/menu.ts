export default defineNuxtPlugin((nuxtApp) => {
  const menu = useMenu();
  menu.addItem("Home");
});
