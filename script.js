// Data keahlian. Ubah angka dan nama di sini, daftarnya dibuat otomatis.
var skills = [
  { name: "Figma", level: 92 },
  { name: "HTML & CSS", level: 90 },
  { name: "JavaScript", level: 78 },
  { name: "Riset pengguna", level: 70 }
];

// 1. Tampilkan daftar keahlian beserta bar-nya
(function renderSkills() {
  var box = document.getElementById("skills");
  skills.forEach(function (s) {
    var row = document.createElement("div");
    row.className = "skill";

    var name = document.createElement("span");
    name.className = "skill-name";
    name.textContent = s.name;

    var bar = document.createElement("div");
    bar.className = "bar";
    var fill = document.createElement("span");
    bar.appendChild(fill);

    var pct = document.createElement("span");
    pct.className = "pct";
    pct.textContent = s.level + "%";

    row.appendChild(name);
    row.appendChild(bar);
    row.appendChild(pct);
    box.appendChild(row);

    // Isi bar setelah elemen tampil supaya animasinya berjalan
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { fill.style.width = s.level + "%"; });
    });
  });
})();

// 2. Tombol salin email
(function copyEmail() {
  var btn = document.getElementById("copy-btn");
  var emailEl = document.getElementById("email");

  function flash(label) {
    btn.textContent = label;
    setTimeout(function () { btn.textContent = "Salin"; }, 1500);
  }

  function selectText() {
    var range = document.createRange();
    range.selectNodeContents(emailEl);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    flash("Pilih lalu salin");
  }

  btn.addEventListener("click", function () {
    try {
      navigator.clipboard.writeText(emailEl.textContent).then(function () {
        flash("Tersalin");
      }, selectText);
    } catch (e) {
      selectText();
    }
  });
})();

// 3. Tombol ganti tema terang/gelap, pilihan diingat di browser
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
