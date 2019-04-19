
// switchDoc
var doc_nav = document.getElementById("doc-nav");
var doc_btns = doc_nav.getElementsByClassName("doc-btn");
for (var i = 0; i < doc_btns.length; i++) {
  doc_btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  if (current.length > 0) {
    current[0].className = current[0].className.replace(" active", "");
  }
  this.className += " active";
  });
};


// switchTheme
var theme_nav = document.getElementById("theme-nav");
var theme_btns = theme_nav.getElementsByClassName("theme-btn");
for (var i = 0; i < theme_btns.length; i++) {
  theme_btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  if (current.length > 0) {
    current[0].className = current[0].className.replace(" active", "");
  }
  this.className += " active";
  });
};


// switchPage
var menu_nav = document.getElementById("menu-nav");
var menu_btns = menu_nav.getElementsByClassName("menu-btn");
for (var i = 0; i < menu_btns.length; i++) {
  menu_btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  if (current.length > 0) {
    current[0].className = current[0].className.replace(" active", "");
  }
  this.className += " active";
  });
};
