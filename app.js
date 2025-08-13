// === CONFIGURAÇÃO ===
// Cole aqui o link CSV gerado em "Arquivo → Publicar na Web" do Google Sheets.
// Exemplo de formato: https://docs.google.com/spreadsheets/d/ID/export?format=csv&gid=XXXX
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?output=csv";

// === ESTADO GLOBAL SIMPLES ===
let originalRows = []; // array de objetos (cada objeto = linha {coluna: valor})
let headers = [];      // nomes das colunas
let sortState = { key: null, dir: 1 }; // 1 asc, -1 desc

// === ELEMENTOS ===
const elHead = () => document.getElementById("table-head");
const elBody = () => document.getElementById("table-body");
const elStatus = () => document.getElementById("status");
const elCounter = () => document.getElementById("counter");
const elSearch = () => document.getElementById("q");
const elBtnClear = () => document.getElementById("btn-clear");

// === INICIALIZAÇÃO ===
document.addEventListener("DOMContentLoaded", async () => {
    attachUI();
    await loadSheet();
});

function attachUI() {
    elSearch().addEventListener("input", () => render());
    elBtnClear().addEventListener("click", () => {
        elSearch().value = "";
        render();
    });
}

// === CARREGAR CSV VIA PapaParse ===
async function loadSheet() {
    if (!SHEET_CSV_URL || !/^https?:\/\//i.test(SHEET_CSV_URL)) {
        setStatus("⚠️ Defina SHEET_CSV_URL em app.js com o link CSV publicado.", "warn");
        return;
    }
    setStatus("Carregando dados da planilha…");

    Papa.parse(SHEET_CSV_URL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        encoding: "UTF-8",
        complete: (results) => {
            const { data, errors, meta } = results;

            if (errors && errors.length) {
                console.error(errors);
                setStatus(`Ocorreram ${errors.length} erro(s) ao ler o CSV. Verifique o console.`, "error");
            }

            headers = meta && meta.fields ? meta.fields : Object.keys(data[0] || {});
            originalRows = Array.isArray(data) ? data.map(cleanRow) : [];
            if (!headers.length) {
                setStatus("A planilha parece vazia ou sem cabeçalhos.", "warn");
                return;
            }

            buildHeader();
            render();
            setStatus(`Pronto. Carregado ${originalRows.length} registro(s).`, "ok");
        },
        error: (err) => {
            console.error(err);
            setStatus("Não foi possível carregar a planilha. Confirme o link CSV publicado.", "error");
        },
    });
}

function cleanRow(row) {
    // Normaliza: converte valores nulos/undefined para string vazia
    const out = {};
    headers.forEach((h) => {
        const v = row[h];
        out[h] = v == null ? "" : String(v);
    });
    return out;
}

// === UI: CABEÇALHO / ORDENAÇÃO ===
function buildHeader() {
    const tr = elHead();
    tr.innerHTML = "";
    headers.forEach((h) => {
        const th = document.createElement("th");
        th.tabIndex = 0;
        th.setAttribute("role", "button");
        th.textContent = h;

        const sortSpan = document.createElement("span");
        sortSpan.className = "sort";
        sortSpan.textContent = "↕";
        th.appendChild(sortSpan);

        th.addEventListener("click", () => toggleSort(h));
        th.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleSort(h);
            }
        });
        tr.appendChild(th);
    });
}

function toggleSort(key) {
    if (sortState.key === key) {
        sortState.dir = -sortState.dir; // alterna asc/desc
    } else {
        sortState.key = key;
        sortState.dir = 1;
    }
    render();
}

// === RENDERIZAÇÃO ===
function render() {
    const q = elSearch().value.trim().toLowerCase();
    let rows = originalRows;

    if (q) {
        rows = rows.filter((r) =>
            headers.some((h) => String(r[h] || "").toLowerCase().includes(q))
        );
    }

    if (sortState.key) {
        const { key, dir } = sortState;
        rows = [...rows].sort((a, b) => compare(a[key], b[key]) * dir);
    }

    paintBody(rows);
    elCounter().textContent = `${rows.length} de ${originalRows.length} registro(s)`;
}

function compare(a, b) {
    // Tenta número, depois data, depois string
    const na = toNumber(a);
    const nb = toNumber(b);
    if (na != null && nb != null) return na - nb;

    const da = toDate(a);
    const db = toDate(b);
    if (da && db) return da - db;

    return String(a || "").localeCompare(String(b || ""), "pt-BR", { numeric: true, sensitivity: "base" });
}

function toNumber(x) {
    if (x == null) return null;
    // troca vírgula por ponto para decimais brasileiros
    const s = String(x).replace(/\./g, "").replace(",", ".");
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
}

function toDate(x) {
    if (!x) return null;
    // tenta formatos comuns do Sheets
    const s = String(x).trim();
    // ISO ou dd/mm/aaaa
    const iso = Date.parse(s);
    if (!Number.isNaN(iso)) return new Date(iso);

    const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if (m) {
        const [_, d, mo, y] = m;
        const year = y.length === 2 ? Number("20" + y) : Number(y);
        return new Date(year, Number(mo) - 1, Number(d));
    }
    return null;
}

function paintBody(rows) {
    const tbody = elBody();
    const frag = document.createDocumentFragment();
    tbody.innerHTML = "";

    for (const r of rows) {
        const tr = document.createElement("tr");
        for (const h of headers) {
            const td = document.createElement("td");
            td.textContent = r[h] ?? "";
            tr.appendChild(td);
        }
        frag.appendChild(tr);
    }
    tbody.appendChild(frag);
}

// === UTIL ===
function setStatus(msg, kind = "") {
    const el = elStatus();
    el.textContent = msg || "";
    el.classList.remove("ok", "warn", "error");
    if (kind) el.classList.add(kind);
}
