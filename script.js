// Tombol ganti tema terang/gelap, pilihan diingat di browser
(function themeToggle() {
  var root = document.documentElement;
  var btn = document.getElementById("theme-btn");

  try {
    var saved = localStorage.getItem("tema");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}

  btn.addEventListener("click", function () {
    var current = root.getAttribute("data-theme");
    if (!current) {
      current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    var next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("tema", next); } catch (e) {}
  });
})();
