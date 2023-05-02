
var menuButton = document.getElementById("menuButton");
var mainMenu = document.getElementById("mainMenu");

menuButton.addEventListener("click", function() {
  mainMenu.classList.toggle("open");
});
