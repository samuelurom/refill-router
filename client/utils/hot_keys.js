// use Ctrl+Shift+B to toggle sidebars

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.shiftKey && event.key === "B") {
    toggleSidebar();
  }
});
function toggleSidebar() {
  const leftSidebar = document.getElementById("left-sidebar");
  const rightSidebar = document.getElementById("right-sidebar");
  const container = document.querySelector(".container");
  if (leftSidebar.style.display === "none") {
    leftSidebar.style.display = "block";
    rightSidebar.style.display = "block";
    container.style.gridTemplateColumns = "1fr 3fr 1fr";
  } else {
    leftSidebar.style.display = "none";
    rightSidebar.style.display = "none";
    container.style.gridTemplateColumns = "none";
  }
}
