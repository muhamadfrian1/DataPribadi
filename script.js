// Data keahlian. Ubah nama dan angka (0-100) di sini, tampilannya dibuat otomatis.
var skillGroups = [
  {
    title: "Web",
    items: [
      { name: "HTML", level: 85 },
      { name: "CSS", level: 80 },
      { name: "JavaScript", level: 70 },
      { name: "PHP", level: 60 }
    ]
  },
  {
    title: "Basis data",
    items: [
      { name: "Query SQL", level: 75 },
      { name: "Desain basis data (ERD)", level: 70 },
      { name: "MySQL", level: 70 }
    ]
  },
  {
    title: "Statistika",
    items: [
      { name: "Statistika deskriptif", level: 75 },
      { name: "Probabilitas", level: 65 },
      { name: "Analisis data", level: 60 }
    ]
  }
];

// Tampilkan keahlian per kelompok beserta bar-nya
(function renderSkills() {
  var box = document.getElementById("skills");

  skillGroups.forEach(function (group) {
    var wrap = document.createElement("div");
    wrap.className = "skill-group";

    var title = document.createElement("h3");
    title.textContent = group.title;
    wrap.appendChild(title);

    var list = document.createElement("div");
    list.className = "skills";

    group.items.forEach(function (s) {
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
      list.appendChild(row);

      // Isi bar setelah elemen tampil supaya animasinya berjalan
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { fill.style.width = s.level + "%"; });
      });
    });

    wrap.appendChild(list);
    box.appendChild(wrap);
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
