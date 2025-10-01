// === CONFIGURAÇÃO ===
const tabsConfig = [
    { title: "OUTUBRO 2025", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=497698072&single=true&output=csv" },
    { title: "NOVEMBRO 2025", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1388325361&single=true&output=csv" },
    { title: "DEZEMBRO 2025", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1625844249&single=true&output=csv" },
    { title: "JANEIRO 2026", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1334575958&single=true&output=csv" },
    { title: "FEVEREIRO 2026", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1388173184&single=true&output=csv" },
    // { title: "SETEMBRO 2025", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1667330725&single=true&output=csv" },
    // { title: "AGOSTO 2025", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=589847056&single=true&output=csv" }
];

const sheetsData = {};

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("sheets-container");

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
        block.querySelector(`[data-search="${idx}"]`).addEventListener("input", () => render(idx));
        block.querySelector(`[data-clear="${idx}"]`).addEventListener("click", () => {
            block.querySelector(`[data-search="${idx}"]`).value = "";
            render(idx);
        });

        // Carregar CSV dessa aba
        loadSheet(idx, tab.url);
    });

    // Eventos dos botões de PDF
    document.querySelectorAll(".pdf-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const pdf = btn.dataset.pdf;
            window.open(pdf, "_blank");
        });
    });
});

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
    headers.forEach(h => {
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
    const q = document.querySelector(`[data-search="${idx}"]`).value.toLowerCase();
    let rows = data.rows.filter(r =>
        data.headers.some(h => String(r[h] || "").toLowerCase().includes(q))
    );
    if (data.sort.key) {
        const { key, dir } = data.sort;
        rows.sort((a, b) => String(a[key]).localeCompare(String(b[key]), "pt-BR") * dir);
    }
    paintBody(idx, rows);
    document.getElementById(`counter-${idx}`).textContent = `${rows.length} / ${data.rows.length}`;
}

function paintBody(idx, rows) {
    const tbody = document.getElementById(`tbody-${idx}`);
    const { headers } = sheetsData[idx];
    tbody.innerHTML = "";
    rows.forEach(r => {
        const tr = document.createElement("tr");
        headers.forEach(h => {
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