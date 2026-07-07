// === CONFIGURAÇÃO ===
const tabsConfig = [
  {
    title: "JULHO 2026",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1070617881&single=true&output=csv",
  },
  {
    title: "AGOSTO 2026",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=604179724&single=true&output=csv",
  },
  {
    title: "SETEMBRO 2026",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=2132124606&single=true&output=csv",
  },
  // { title: "JUNHO 2026", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=733717061&single=true&output=csv",},
  // { title: "MAIO 2026" , url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1048300232&single=true&output=csv",},
  // { title: "ABRIL 2026", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1236401774&single=true&output=csv",},
  // { title: "MARÇO 2026", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1907475466&single=true&output=csv",},
  // { title: "FEVEREIRO 2026", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1388173184&single=true&output=csv" },
  // { title: "JANEIRO 2026", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1334575958&single=true&output=csv" },
  // { title: "DEZEMBRO 2025", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1625844249&single=true&output=csv" },
  // { title: "NOVEMBRO 2025", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1388325361&single=true&output=csv" },
  // { title: "OUTUBRO 2025", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=497698072&single=true&output=csv" },
  // { title: "SETEMBRO 2025", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1667330725&single=true&output=csv" },
  // { title: "AGOSTO 2025", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=589847056&single=true&output=csv" }
];

const sheetsData = {};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("sheets-container");

  // === RELÓGIO E TEMPERATURA ===
  updateClock();
  setInterval(updateClock, 1000);
  fetchWeather();
  setInterval(fetchWeather, 60000); // Atualizar a cada 1 minuto

  // Criar containers para cada aba
  tabsConfig.forEach((tab, idx) => {
    const block = document.createElement("section");
    block.className = "sheet-block";
    block.innerHTML = `
    <h2>${tab.title}</h2>
    <div class="toolbar">
        <input type="search" placeholder="Filtrar..." data-search="${idx}" />
        <button data-clear="${idx}">Limpar</button>
        <span class="counter" id="counter-${idx}"></span>
    </div>
    <div class="status" id="status-${idx}">Carregando...</div>
    <div class="table-wrap">
        <table>
        <thead><tr id="thead-${idx}"></tr></thead>
        <tbody id="tbody-${idx}"></tbody>
        </table>
    </div>
    `;
    container.appendChild(block);

    // Eventos de busca/limpar
    block
      .querySelector(`[data-search="${idx}"]`)
      .addEventListener("input", () => render(idx));
    block
      .querySelector(`[data-clear="${idx}"]`)
      .addEventListener("click", () => {
        block.querySelector(`[data-search="${idx}"]`).value = "";
        render(idx);
      });

    // Carregar CSV dessa aba
    loadSheet(idx, tab.url);
  });
});

// === FUNÇÕES DO RELÓGIO E TEMPERATURA ===
function updateClock() {
  const now = new Date();

  // Formatar hora
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;

  // Formatar data em português
  const dayNames = [
    "DOMINGO",
    "SEGUNDA-FEIRA",
    "TERÇA-FEIRA",
    "QUARTA-FEIRA",
    "QUINTA-FEIRA",
    "SEXTA-FEIRA",
    "SÁBADO",
  ];
  const dayName = dayNames[now.getDay()];
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const dateString = `${dayName}, ${day}/${month}/${year}`;

  // Atualizar elementos
  const timeElement = document.getElementById("clock-time");
  const dateElement = document.getElementById("clock-date");

  if (timeElement) timeElement.textContent = timeString;
  if (dateElement) dateElement.textContent = dateString;
}

function fetchWeather() {
  // Usando Open-Meteo API (gratuita, sem autenticação)
  // Coordenadas de Araçatuba/SP: -21.7964, -50.4331
  const lat = -21.2089;
  const lng = -50.4328;

  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m&timezone=America/Sao_Paulo`,
  )
    .then((response) => response.json())
    .then((data) => {
      const temp = Math.round(data.current.temperature_2m);
      const tempElement = document.getElementById("weather-temp");
      if (tempElement) {
        tempElement.textContent = `${temp}°C`;
      }
    })
    .catch((error) => {
      console.log("Erro ao buscar temperatura:", error);
      const tempElement = document.getElementById("weather-temp");
      if (tempElement) {
        tempElement.textContent = "N/A°C";
      }
    });
}

// === FUNÇÕES DAS TABELAS ===
function loadSheet(idx, url) {
  Papa.parse(url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      const headers = results.meta.fields || [];
      const rows = results.data || [];
      sheetsData[idx] = { headers, rows, sort: { key: null, dir: 1 } };
      buildHeader(idx);
      render(idx);
      setStatus(idx, `${rows.length} registros.`);
    },
    error: () => setStatus(idx, "Erro ao carregar"),
  });
}

function buildHeader(idx) {
  const { headers } = sheetsData[idx];
  const tr = document.getElementById(`thead-${idx}`);
  tr.innerHTML = "";
  headers.forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    const sortSpan = document.createElement("span");
    sortSpan.className = "sort";
    sortSpan.textContent = "↕";
    th.appendChild(sortSpan);
    th.addEventListener("click", () => toggleSort(idx, h));
    tr.appendChild(th);
  });
}

function toggleSort(idx, key) {
  const s = sheetsData[idx].sort;
  if (s.key === key) {
    s.dir *= -1;
  } else {
    s.key = key;
    s.dir = 1;
  }
  render(idx);
}

function render(idx) {
  const data = sheetsData[idx];
  const q = document
    .querySelector(`[data-search="${idx}"]`)
    .value.toLowerCase();
  let rows = data.rows.filter((r) =>
    data.headers.some((h) =>
      String(r[h] || "")
        .toLowerCase()
        .includes(q),
    ),
  );
  if (data.sort.key) {
    const { key, dir } = data.sort;
    rows.sort(
      (a, b) => String(a[key]).localeCompare(String(b[key]), "pt-BR") * dir,
    );
  }
  paintBody(idx, rows);
  document.getElementById(`counter-${idx}`).textContent =
    `${rows.length} / ${data.rows.length}`;
}

function paintBody(idx, rows) {
  const tbody = document.getElementById(`tbody-${idx}`);
  const { headers } = sheetsData[idx];
  tbody.innerHTML = "";
  rows.forEach((r) => {
    const tr = document.createElement("tr");
    headers.forEach((h) => {
      const td = document.createElement("td");
      td.textContent = r[h] || "";
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function setStatus(idx, msg) {
  document.getElementById(`status-${idx}`).textContent = msg;
}
