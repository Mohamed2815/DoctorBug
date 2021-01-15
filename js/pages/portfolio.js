// Add Color Class On body
window.onload = function () {
  document.body.setAttribute("class", "portfolio-body");
};

// Add & Remove Class Active From Elements
let navLinks = document.querySelectorAll(".links ul li");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((navLink) => navLink.classList.remove("active"));
    this.classList.add("active");
  });
});

// Navbar Toggler
let navToggleButtom = document.querySelector(".toggler"),
  linksElement = document.querySelector(".links"),
  navWrapper = document.querySelector(".nav-wrapper");

navToggleButtom.onclick = function () {
  this.classList.toggle("clicked");
  this.classList.toggle("close");
  linksElement.classList.toggle("opened");
  navWrapper.classList.toggle("nav-opened");
};
