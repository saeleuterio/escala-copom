# Documentação Técnica - Sistema COPOM

## 📋 Índice Técnico

- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Componentes](#componentes)
- [API Reference](#api-reference)
- [Estados da Aplicação](#estados-da-aplicação)
- [Performance](#performance)
- [Segurança](#segurança)
- [Troubleshooting](#troubleshooting)
- [Deploy e Configuração](#deploy-e-configuração)

## 🏗 Arquitetura do Sistema

### Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT-SIDE SPA                      │
├─────────────────────────────────────────────────────────┤
│  HTML Structure    │  CSS Styling    │  JS Logic        │
│  - Semantic        │  - CSS Grid     │  - Event Driven  │
│  - Accessible      │  - Flexbox      │  - State Mgmt    │
│  - Responsive      │  - Custom Props │  - Data Parsing  │
└─────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   EXTERNAL APIs   │
                    │ ┌───────────────┐ │
                    │ │ Google Sheets │ │
                    │ │     (CSV)     │ │
                    │ └───────────────┘ │
                    │ ┌───────────────┐ │
                    │ │ Google Drive  │ │
                    │ │     (PDFs)    │ │
                    │ └───────────────┘ │
                    └───────────────────┘
```

### Padrão Arquitetural
- **Single Page Application (SPA)** com JavaScript vanilla
- **Data-driven rendering** baseado em estado
- **Event-driven interactions** para responsividade
- **External data integration** via CSV parsing

### Fluxo de Dados
```
Google Sheets → CSV Export → Papa Parse → JavaScript Objects → DOM Rendering
     ↓              ↓            ↓              ↓              ↓
  Fonte de       Formato      Biblioteca    Estado da      Interface
   Dados        Padrão       de Parse      Aplicação        Visual
```

## 🧩 Componentes

### 1. Navigation Component (PDF Container)

**Localização**: `index.html` linhas 23-35  
**Responsabilidade**: Links para documentos PDF

```html
<nav class="pdf-container container">
    <img src="./img/copom.png" alt="Logo COPOM" class="logo">
    <div class="pdf-buttons">
        <!-- Botões PDF -->
    </div>
    <img src="./img/copom.png" alt="Logo COPOM" class="logo">
</nav>
```

**Características:**
- Layout flexível responsivo
- Botões com gradientes CSS
- Logo institucional bilateral
- Eventos de clique para abertura segura de PDFs

### 2. Sheet Block Component

**Criação**: Dinâmica via `app.js`  
**Responsabilidade**: Renderização de tabelas por mês

```javascript
const block = document.createElement("section");
block.className = "sheet-block";
block.innerHTML = `
    <h2>${tab.title}</h2>
    <div class="toolbar">...</div>
    <div class="status">...</div>
    <div class="table-wrap">...</div>
`;
```

### 3. Toolbar Component

**Elementos**:
- Input de pesquisa com filtro em tempo real
- Botão de limpeza de filtros  
- Contador de registros (atual/total)

### 4. Table Component

**Features**:
- Headers clicáveis para ordenação
- Sticky header durante scroll
- Zebra striping alternado
- Hover effects para melhor UX

## 📚 API Reference

### Configuração Principal

#### `tabsConfig`
```javascript
const tabsConfig = [
    {
        title: string,    // Nome exibido da aba
        url: string      // URL do CSV público do Google Sheets
    }
];
```

**Exemplo de URL correta**:
```
https://docs.google.com/spreadsheets/d/e/2PACX-[ID]/pub?gid=[GID]&single=true&output=csv
```

### Funções Principais

#### `loadSheet(idx, url)`
**Propósito**: Carrega e processa dados CSV de uma aba específica

**Parâmetros**:
- `idx` (number): Índice da aba no array tabsConfig
- `url` (string): URL do CSV do Google Sheets

**Implementação**:
```javascript
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
        error: () => setStatus(idx, "Erro ao carregar")
    });
}
```

#### `buildHeader(idx)`
**Propósito**: Constrói cabeçalho clicável da tabela

**Funcionalidades**:
- Cria elementos `<th>` para cada coluna
- Adiciona indicadores de ordenação (↕)
- Vincula eventos de clique para `toggleSort()`

#### `toggleSort(idx, key)`
**Propósito**: Alterna ordenação por coluna específica

**Lógica de Ordenação**:
```javascript
function toggleSort(idx, key) {
    const s = sheetsData[idx].sort;
    if (s.key === key) {
        s.dir *= -1;  // Inverte direção (ASC ↔ DESC)
    } else {
        s.key = key;  // Nova coluna
        s.dir = 1;    // Sempre inicia ascendente
    }
    render(idx);
}
```

#### `render(idx)`
**Propósito**: Renderiza dados com filtros e ordenação aplicados

**Pipeline de Processamento**:
1. Obtém query de pesquisa do input
2. Filtra registros que contenham a query
3. Aplica ordenação se definida
4. Chama `paintBody()` com dados processados
5. Atualiza contador de registros

**Implementação de Filtro**:
```javascript
let rows = data.rows.filter(r =>
    data.headers.some(h => 
        String(r[h] || "").toLowerCase().includes(q)
    )
);
```

#### `paintBody(idx, rows)`
**Propósito**: Renderiza linhas da tabela no DOM

**Otimizações**:
- Limpa tbody existente com `innerHTML = ""`
- Cria elementos em lote para melhor performance
- Preserva ordem das colunas conforme headers

## 🔄 Estados da Aplicação

### Estrutura do Estado Global

```javascript
const sheetsData = {
    [idx]: {
        headers: string[],     // Nomes das colunas da planilha
        rows: object[],        // Array de objetos com dados das linhas
        sort: {
            key: string|null,  // Coluna atualmente ordenada
            dir: number        // Direção: 1=ASC, -1=DESC
        }
    }
};
```

### Ciclo de Vida dos Dados

```
Inicialização → Carregamento → Processamento → Renderização → Interação
     ↓              ↓              ↓              ↓            ↓
DOMContentLoaded → loadSheet() → Papa.parse() → render() → Event Handler
     ↓              ↓              ↓              ↓            ↓
setupContainers  Papa.download  sheetsData[]   DOM Update  State Update
```

### Gerenciamento de Estado

**Estado Local (por aba)**:
- Query de pesquisa (input value)
- Status de carregamento
- Dados filtrados/ordenados

**Estado Global (aplicação)**:
- Dados brutos das planilhas
- Configuração de ordenação
- Configuração das abas

## ⚡ Performance

### Otimizações Implementadas

#### 1. Carregamento de Dados
```javascript
// Carregamento paralelo de múltiplas planilhas
tabsConfig.forEach((tab, idx) => {
    loadSheet(idx, tab.url); // Execução paralela
});
```

#### 2. Processamento de Dados
```javascript
// Filtro otimizado com early exit
rows.filter(r => 
    !query || headers.some(h => 
        String(r[h] || "").toLowerCase().includes(query)
    )
);

// Ordenação localizada para português brasileiro
rows.sort((a, b) => 
    String(a[key]).localeCompare(String(b[key]), "pt-BR") * dir
);
```

#### 3. Manipulação DOM
- **Batch operations**: Todas as alterações DOM em lote
- **Event delegation**: Um listener por container
- **Minimal reflow**: Uso de `innerHTML` para reconstrução completa

#### 4. CSS Performance
```css
/* Hardware acceleration */
.pdf-btn:hover {
    transform: scale(1.03);  /* GPU accelerated */
}

/* CSS containment */
.table-wrap {
    contain: layout style;
}
```

### Métricas de Performance Esperadas

| Métrica | Valor Alvo | Observações |
|---------|------------|-------------|
| First Contentful Paint | < 1.5s | HTML/CSS base |
| Time to Interactive | < 3s | Incluindo Papa Parse |
| CSV Load Time | < 2s | Por planilha |
| Search Response | < 50ms | Filtro em tempo real |
| Sort Response | < 100ms | Ordenação de colunas |

## 🔒 Segurança

### Medidas de Segurança Implementadas

#### 1. Prevenção XSS
```javascript
// Uso seguro de textContent em vez de innerHTML
td.textContent = r[h] || "";  // Previne XSS automaticamente

// Sanitização manual quando necessário
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

#### 2. Segurança de Links Externos
```javascript
// Abertura segura de PDFs
window.open(pdf, "_blank", "noopener,noreferrer");
```

#### 3. Validação de Dados
```javascript
// Validação de headers
const headers = (results.meta.fields || []).filter(h => h && h.trim());

// Validação de linhas não vazias
const rows = (results.data || []).filter(row => 
    Object.values(row).some(value => value && String(value).trim())
);
```

#### 4. Recursos Externos Confiáveis
- **Papa Parse**: CDN oficial (jsdelivr.net)
- **Google Sheets**: URLs HTTPS oficiais
- **Fonts**: System fonts (sem CDN externo)

### Considerações de Privacidade

- **Dados públicos**: Apenas planilhas públicas do Google Sheets
- **Sem tracking**: Nenhum analytics ou tracking implementado
- **Sem armazenamento**: Dados mantidos apenas em memória
- **HTTPS**: Todas as comunicações criptografadas

## 🐛 Troubleshooting

### Problemas Comuns e Soluções

#### 1. "Erro ao carregar" em uma aba

**Possíveis Causas**:
- URL do Google Sheets incorreta
- Planilha não publicada como CSV
- CORS issues
- Conectividade de rede

**Diagnóstico**:
```javascript
// Adicionar ao início de loadSheet() para debug
console.log('Tentando carregar:', url);

// Verificar resposta da requisição
Papa.parse(url, {
    // ... configurações
    error: (error) => {
        console.error('Erro Papa Parse:', error);
        setStatus(idx, "Erro ao carregar");
    }
});
```

**Soluções**:
1. Verificar formato da URL:
   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-{ID}/pub?gid={GID}&single=true&output=csv
   ```

2. Republicar planilha:
   - Google Sheets → File → Publish to the web
   - Selecionar aba específica
   - Format: CSV

#### 2. Dados carregam mas tabela fica vazia

**Possíveis Causas**:
- Headers com nomes inválidos
- Dados em formato inesperado
- Caracteres especiais nos headers

**Diagnóstico**:
```javascript
// Adicionar logs em handleLoadSuccess()
console.log('Headers encontrados:', headers);
console.log('Primeira linha:', rows[0]);
console.log('Total de linhas:', rows.length);
```

**Soluções**:
1. Verificar se headers têm nomes válidos (sem espaços extras)
2. Certificar que primeira linha contém headers
3. Verificar se há dados nas linhas seguintes

#### 3. Pesquisa não funciona

**Possíveis Causas**:
- Event listeners não anexados
- Query de pesquisa mal formada
- Dados com tipos inconsistentes

**Diagnóstico**:
```javascript
// Verificar se event listener está funcionando
document.querySelector('[data-search="0"]').addEventListener('input', (e) => {
    console.log('Pesquisando:', e.target.value);
});
```

#### 4. PDFs não abrem

**Possíveis Causas**:
- URLs do Google Drive incorretas
- Permissões de compartilhamento
- Bloqueador de pop-ups

**Soluções**:
1. Verificar formato da URL do Google Drive:
   ```
   https://drive.google.com/file/d/{FILE_ID}/view?usp=sharing
   ```

2. Configurar compartilhamento como "Anyone with the link can view"

#### 5. Layout quebrado em mobile

**Possíveis Causas**:
- Viewport meta tag ausente
- CSS media queries não aplicadas
- Elementos com largura fixa

**Verificação**:
```html
<!-- Verificar se está presente no <head> -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### Debug Mode

Para ativar modo de debug, adicionar no início do `app.js`:

```javascript
const DEBUG = true;

function debugLog(...args) {
    if (DEBUG) {
        console.log('[COPOM DEBUG]', new Date().toLocaleTimeString(), ...args);
    }
}

// Usar ao longo do código
debugLog('Carregando aba:', idx, url);
debugLog('Dados recebidos:', results.data.length, 'registros');
```

## 🚀 Deploy e Configuração

### Hospedagem Recomendada

#### GitHub Pages (Recomendado)

**Vantagens**:
- Gratuito para repositórios públicos
- Deploy automático
- HTTPS incluído
- Integração com Git

**Configuração**:
1. Upload dos arquivos para repositório GitHub
2. Settings → Pages → Source: "Deploy from a branch"
3. Branch: main, folder: / (root)
4. Site disponível em `https://username.github.io/repository-name`

#### Netlify

**Vantagens**:
- Deploy via drag & drop
- Domínio personalizado gratuito
- Continuous deployment

**Configuração**:
1. Arrastar pasta do projeto para Netlify
2. Configurar domínio personalizado se desejado
3. Deploy automático a cada git push (se conectado)

#### Vercel

**Vantagens**:
- Performance otimizada
- Deploy automático via Git
- Analytics incluído

**Configuração**:
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ]
}
```

### Configuração de Domínio Personalizado

#### Para GitHub Pages

1. Adicionar arquivo `CNAME` na raiz:
   ```
   copom.exemplo.com
   ```

2. Configurar DNS no provedor:
   ```
   Type: CNAME
   Name: copom (ou subdomain desejado)
   Value: username.github.io
   ```

### Variáveis de Ambiente

Para diferentes ambientes (dev/prod), criar arquivo `config.js`:

```javascript
const CONFIG = {
    development: {
        DEBUG: true,
        CSV_CACHE_TIME: 0
    },
    production: {
        DEBUG: false,
        CSV_CACHE_TIME: 300000 // 5 minutos
    }
};

const ENV = CONFIG[window.location.hostname.includes('localhost') ? 'development' : 'production'];
```

### Monitoramento e Analytics

#### Google Analytics (Opcional)

```html
<!-- Adicionar no <head> do index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Error Tracking

```javascript
// Adicionar ao app.js para tracking de erros
window.addEventListener('error', (e) => {
    console.error('Erro da aplicação:', e);
    
    // Enviar para serviço de monitoramento se configurado
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error.message,
            'fatal': false
        });
    }
});
```

### Otimizações de Produção

#### Minificação (Opcional)

```javascript
// Para minificar os arquivos
// CSS: csso styles.css --output styles.min.css  
// JS: terser app.js --output app.min.js
```

#### Cache Headers

Se usando servidor próprio, configurar headers de cache:

```nginx
# nginx.conf
location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(html)$ {
    expires 1h;
    add_header Cache-Control "public";
}
```

### Backup e Versionamento

#### Estratégia de Backup

1. **Código fonte**: Git repository (GitHub)
2. **Dados**: Google Sheets (backup automático)
3. **Documentos PDF**: Google Drive (backup automático)

#### Controle de Versão

```bash
# Tag de releases
git tag -a v1.0.0 -m "Release inicial"
git push origin v1.0.0

# Branch de desenvolvimento
git checkout -b develop
git push -u origin develop
```

---

*Documentação técnica mantida por: Saulo Eleutério*  
*Última atualização: Agosto 2025*  
*Versão do sistema: 1.0.0*