// Cole aqui o link CSV publicado do Google Sheets
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?output=csv";

let originalRows = [];
let headers = [];
let sortState = { key: null, dir: 1 };

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("q").addEventListener("input", render);
    document.getElementById("btn-clear").addEventListener("click", () => {
        document.getElementById("q").value = "";
        render();
    });
    loadSheet();
});

function loadSheet() {
    if (!SHEET_CSV_URL) {
        setStatus("⚠️ Defina SHEET_CSV_URL em app.js", "warn");
        return;
    }
    setStatus("Carregando dados...");
    Papa.parse(SHEET_CSV_URL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            headers = results.meta.fields || [];
            originalRows = results.data;
            if (!headers.length) {
                setStatus("Planilha vazia ou sem cabeçalhos", "warn");
                return;
            }
            buildHeader();
            render();
            setStatus(`Pronto. ${originalRows.length} registros.`);
        },
        error: () => setStatus("Erro ao carregar planilha", "error"),
    });
}

function buildHeader() {
    const tr = document.getElementById("table-head");
    tr.innerHTML = "";
    headers.forEach(h => {
        const th = document.createElement("th");
        th.textContent = h;
        const sortSpan = document.createElement("span");
        sortSpan.className = "sort";
        sortSpan.textContent = "↕";
        th.appendChild(sortSpan);
        th.addEventListener("click", () => toggleSort(h));
        tr.appendChild(th);
    });
}

function toggleSort(key) {
    if (sortState.key === key) {
        sortState.dir *= -1;
    } else {
        sortState.key = key;
        sortState.dir = 1;
    }
    render();
}

function render() {
    const q = document.getElementById("q").value.toLowerCase();
    let rows = originalRows.filter(r =>
        headers.some(h => String(r[h] || "").toLowerCase().includes(q))
    );
    if (sortState.key) {
        const { key, dir } = sortState;
        rows.sort((a, b) => String(a[key]).localeCompare(String(b[key]), "pt-BR") * dir);
    }
    paintBody(rows);
    document.getElementById("counter").textContent = `${rows.length} / ${originalRows.length}`;
}

function paintBody(rows) {
    const tbody = document.getElementById("table-body");
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

function setStatus(msg, kind) {
    const el = document.getElementById("status");
    el.textContent = msg;
    el.className = `status ${kind || ""}`;
}
