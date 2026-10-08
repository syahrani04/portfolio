const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const D = DATA;

document.title = D.nama + " | Portofolio Syahrani";
$("logo").textContent = "Portofolio Syahrani";
$("h-nama").textContent = D.nama;
$("h-peran").textContent = D.peran;
$("h-ringkas").textContent = D.ringkas;
$("avatar").innerHTML = D.foto ? '<img src="' + esc(D.foto) + '" alt="Foto ' + esc(D.nama) + '">' : esc(D.inisial);
$("tentang-teks").textContent = D.tentang;
$("keahlian-list").innerHTML = D.keahlian.map(k => '<div class="skill"><h3>' + esc(k.judul) + '</h3><div class="chips">' + k.item.map(i => '<span class="chip">' + esc(i) + '</span>').join("") + '</div></div>').join("");
$("timeline").innerHTML = D.pengalaman.map(p => '<li><b>' + esc(p.judul) + '</b><small>' + esc(p.periode) + '</small><p>' + esc(p.deskripsi) + '</p></li>').join("");
$("c-email").textContent = D.email; $("c-email").href = "mailto:" + D.email; $("c-wa").href = "https://wa.me/" + D.whatsapp;
$("c-gh").href = D.github; $("c-in").href = D.linkedin;
$("footer").textContent = "© " + new Date().getFullYear() + " " + D.nama;

const cats = ["Semua"].concat(D.proyek.map(p => p.kategori).filter((v, i, a) => a.indexOf(v) === i));
let active = "Semua";
function renderProyek() {
  $("filters").innerHTML = cats.map(c => '<button type="button" aria-pressed="' + (c === active) + '" data-c="' + esc(c) + '">' + esc(c) + '</button>').join("");
  $("grid").innerHTML = D.proyek.filter(p => active === "Semua" || p.kategori === active).map(p =>
    '<article class="card"><h3>' + esc(p.judul) + '</h3><p>' + esc(p.deskripsi) + '</p><div class="chips"><span class="chip">' + esc(p.teknologi) + '</span></div><a href="' + esc(p.link) + '">Lihat detail</a></article>').join("");
}
$("filters").addEventListener("click", e => { const b = e.target.closest("button"); if (b) { active = b.dataset.c; renderProyek(); } });
renderProyek();

$("theme").addEventListener("click", () => {
  const r = document.documentElement, t = r.getAttribute("data-theme");
  const dark = t === "dark" || (!t && matchMedia("(prefers-color-scheme: dark)").matches);
  r.setAttribute("data-theme", dark ? "light" : "dark");
});
