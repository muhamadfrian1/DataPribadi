// Data keahlian. Ubah atau tambah nama di sini, tampilannya dibuat otomatis.
var skillGroups = [
  { title: "Web", items: ["HTML", "CSS", "JavaScript", "PHP"] },
  { title: "Basis data", items: ["Query SQL", "Desain basis data (ERD)", "MySQL"] },
  { title: "Statistika", items: ["Statistika deskriptif", "Probabilitas", "Analisis data"] }
];

// Tampilkan keahlian per kelompok
(function renderSkills() {
  var box = document.getElementById("skills");

  skillGroups.forEach(function (group) {
    var wrap = document.createElement("div");
    wrap.className = "skill-group";

    var title = document.createElement("h3");
    title.textContent = group.title;
    wrap.appendChild(title);

    var chips = document.createElement("div");
    chips.className = "chips";
    group.items.forEach(function (name) {
      var chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = name;
      chips.appendChild(chip);
    });

    wrap.appendChild(chips);
    box.appendChild(wrap);
  });
})();

// Tombol salin email
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
