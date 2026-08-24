const factions = [
"Invincible","Hazbin Hotel","Skibidi Toilet","Dragon Ball","One Punch Man","Godzilla","The Amazing Digital Circus","Rick and Morty","Dandy's World","The Battle Cats","Murder Drones","Helluva Boss","Animal Hospital","The Boys","Chicken Gun","Countryballs","LEGO","Spider-Man","Batman","Blue Lock","One Piece","DOORS","FNaF","Poppy Playtime","Garten of Banban","DOOM","Deltarune","CountryHumans","Furry","Football","Street Fighter","Xbox","PlayStation","Minecraft","Roblox","Fortnite","Call of Duty","Star Wars","Basketball","God of War","Mario","Sonic","Mega Man","Human Beings","GameOverse","Gaslight District","Meta Runner","Little Runmo","Happy Tree Friends","Baldi's Basics","Granny","Naruto","Boruto","Beatbox Universe","GTA","Ahleles Ahlelas","SMG4","Free Fire","Marvel","DC","Coca-Cola","Pepsi","Brazil","Other Countries","Memes Wars","Strike Fortress Box","Pokémon","Counter-Strike","My Hero Academia","Jurassic Park","Siren Head","Cartoon Cat","Other Trevor Henderson Creatures","SCP Foundation","Backrooms Kane Pixels","Backrooms Wiki","Captain Underpants","Verity","The Long Horse","TikTok","YouTube Shorts","YouTube","Instagram","Plants vs. Zombies","Angry Birds","Peppa Pig","The Walten Files","The Mandela Catalogue","The Boiled One","Other Doctor Nowhere Creations","Other Analog Horrors","Forsaken","Die of Death","Gumball","Regular Show","Michael Jackson","Phonk","Funk","Sertanejo","Country","Rock","Metal","Eletrofunk","Pop","Other Music","Hatsune Miku","K-Pop","Among Us","Mundo Torajo","Balatro","Freak Circus","The Coffin of Andy and Leyley","Cuphead","Batatinha","Alan Becker","Doki Doki Literature Club","R.E.P.O.","Red Dead Redemption","Dead Rails","Eddsworld","JoJo's Bizarre Adventure","The Owl House","Gravity Falls","Adventure Time","BFDI","Team Fortress 2","Angel Hare","Pikuniku","Ben 10","Slendytubbies","Undertale","Hollow Knight","Bendy","Super Bear Adventure","South Park","The Simpsons","Family Guy","Talking Tom","Other Fandoms"
];

const factionBox = document.getElementById("factions");
factions.forEach((name, i) => {
  const a = document.createElement("a");
  a.href = "#";
  a.textContent = name;
  a.dataset.index = i;
  factionBox.appendChild(a);
});

const article = document.getElementById("article");
const tocList = document.getElementById("tocList");
const headings = article.querySelectorAll("h2");

headings.forEach((heading, index) => {
  const id = "section-" + (index + 1);
  heading.id = id;
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = "#" + id;
  a.textContent = heading.textContent;
  li.appendChild(a);
  tocList.appendChild(li);
});

document.getElementById("tocToggle").addEventListener("click", function () {
  const list = document.getElementById("tocList");
  const hidden = list.style.display === "none";
  list.style.display = hidden ? "" : "none";
  this.textContent = hidden ? "[hide]" : "[show]";
});

const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
function closeMenu() {
  sidebar.classList.remove("open");
  overlay.classList.remove("visible");
}
menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("visible");
});
overlay.addEventListener("click", closeMenu);

document.getElementById("fontButton").addEventListener("click", () => {
  document.body.classList.toggle("large-text");
});

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const results = document.getElementById("searchResults");

function searchArticle() {
  const q = searchInput.value.trim().toLowerCase();
  results.innerHTML = "";
  if (!q) {
    results.classList.remove("visible");
    return;
  }

  const matches = [];
  article.querySelectorAll("h2,h3,p,td,li").forEach(el => {
    if (matches.length >= 8) return;
    const text = el.textContent.trim();
    if (text.toLowerCase().includes(q)) {
      const parent = el.closest("section");
      const heading = parent ? parent.querySelector("h2") : null;
      matches.push({text, id: heading ? heading.id : ""});
    }
  });

  if (!matches.length) {
    results.innerHTML = '<div class="result">No results found.</div>';
  } else {
    matches.forEach(m => {
      const div = document.createElement("div");
      div.className = "result";
      const title = document.createElement("strong");
      title.textContent = m.id ? document.getElementById(m.id).textContent : "Article";
      const preview = document.createElement("div");
      preview.textContent = m.text.slice(0, 150) + (m.text.length > 150 ? "…" : "");
      div.append(title, preview);
      div.addEventListener("click", () => {
        if (m.id) document.getElementById(m.id).scrollIntoView({behavior:"smooth"});
        results.classList.remove("visible");
      });
      results.appendChild(div);
    });
  }
  results.classList.add("visible");
}

searchButton.addEventListener("click", searchArticle);
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") searchArticle();
});
document.addEventListener("click", e => {
  if (!results.contains(e.target) && e.target !== searchInput && e.target !== searchButton) {
    results.classList.remove("visible");
  }
});

document.querySelectorAll('a[href="#"]').forEach(a => {
  a.addEventListener("click", e => {
    if (!a.closest(".toc") && !a.closest(".search-results")) e.preventDefault();
  });
});
