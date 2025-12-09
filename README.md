# 📊 Alterações de Escala - COPOM

## 📋 Sobre o Projeto

Sistema web para visualização e consulta das **Alterações de Escala do Centro de Operações da Polícia Militar (COPOM)** - CPI-10. A aplicação importa dados diretamente de planilhas do Google Sheets publicadas como CSV, oferecendo busca, filtros e ordenação em tempo real para múltiplos meses.

![Screenshot do Sistema](./img/screenshot.png)

## ✨ Funcionalidades Principais

### 📅 Múltiplas Abas Mensais

- **Visualização por Mês**: Abas separadas para cada período (Dezembro 2025, Janeiro 2026, etc.)
- **Importação Automática**: Carrega dados diretamente do Google Sheets
- **Atualização Dinâmica**: Sincroniza automaticamente com as planilhas

### 🔍 Busca e Filtros Avançados

- **Busca em Tempo Real**: Filtra instantaneamente em todas as colunas
- **Contador Dinâmico**: Mostra registros filtrados / total
- **Botão Limpar**: Reseta filtros rapidamente
- **Case-insensitive**: Busca sem diferenciar maiúsculas/minúsculas

### 🔄 Ordenação Inteligente

- **Clique para Ordenar**: Clique em qualquer cabeçalho de coluna
- **Ordem Crescente/Decrescente**: Alterna entre ASC e DESC
- **Indicador Visual**: Símbolo ↕ mostra possibilidade de ordenação
- **Ordenação em Português**: Respeita acentuação e caracteres especiais

### 🔗 Links de Acesso Rápido

Barra de navegação com 14 links diretos:

- Férias 2026
- POP COPOM
- Diretriz SisCOPOM
- Ordens de Serviço
- Minha Área SP - SEI
- Lista Telefônica
- Passo a passo Assinatura DEJEM
- Controle de Escalas DEJEM
- CPI - Escala Oficial Superior
- Numerador 2025
- Ocorrências Policiamento Ambiental
- Ramais Policiamento Ambiental
- E mais...

## 🛠️ Tecnologias Utilizadas

### Frontend

- **HTML5**: Estrutura semântica e acessível
- **CSS3**:
  - Variáveis CSS para tema verde/floresta
  - Layout responsivo com flexbox
  - Animações neon piscantes no header
  - Grid de fundo animado
  - Hover effects e transições suaves
- **JavaScript ES6+**:
  - Manipulação DOM otimizada
  - Programação orientada a eventos
  - Funções modulares e reutilizáveis

### Bibliotecas

- **PapaParse 5.4.1**: Parser CSV robusto
  - Download direto de URLs
  - Detecção automática de headers
  - Skip de linhas vazias
  - Tratamento de erros

### Integração

- **Google Sheets**: Base de dados
  - Publicação como CSV
  - URLs públicas por aba (gid)
  - Atualização em tempo real

## 📁 Estrutura do Projeto

```
escalas-copom/
│
├── index.html          # Página principal
├── styles.css          # Estilos e animações
├── app.js              # Lógica e importação CSV
├── README.md           # Documentação
│
└── img/
    ├── favicon.png           # Ícone da página
    ├── LOGO COPOM BRANCO.png # Logo COPOM (usado 2x)
    └── screenshot.png        # Screenshot do projeto
```

## 🚀 Como Usar

### Instalação Local

#### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/escalas-copom.git
cd escalas-copom
```

#### 2. Abra o sistema

**Opção A: Servidor Local (Recomendado)**

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js
npx http-server

# Com PHP
php -S localhost:8000
```

**Opção B: Abrir Diretamente**

- Dê um duplo clique em `index.html`
- ⚠️ Alguns navegadores podem bloquear requisições de arquivos locais

#### 3. Acesse no navegador

```
http://localhost:8000
```

### Configuração do Google Sheets

#### Como Publicar uma Planilha como CSV

1. **Abra sua planilha no Google Sheets**

2. **Publique na Web:**
   - Clique em "Arquivo" → "Compartilhar" → "Publicar na Web"
   - Escolha a aba específica que deseja publicar
   - Selecione formato: **Valores separados por vírgula (.csv)**
   - Clique em "Publicar"

3. **Copie a URL gerada:**

   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-[ID]/pub?gid=[GID]&single=true&output=csv
   ```

4. **Adicione no `app.js`:**

   ```javascript
   const tabsConfig = [
       { 
           title: "DEZEMBRO 2025", 
           url: "SUA_URL_AQUI" 
       },
       // ... mais abas
   ];
   ```

#### Estrutura da Planilha

A planilha deve ter:

- **Primeira linha**: Cabeçalhos (nomes das colunas)
- **Linhas seguintes**: Dados
- **Sem linhas vazias** no meio dos dados

Exemplo:

```
Nome    | Função  | Horário | Data
--------|---------|---------|----------
João    | ATCPO   | 08-16h  | 01/12/25
Maria   | TELE    | 16-00h  | 01/12/25
```

### Adicionando Novas Abas

1. **Edite o arquivo `app.js`**

2. **Adicione no array `tabsConfig`:**

   ```javascript
   const tabsConfig = [
       { title: "DEZEMBRO 2025", url: "URL_DA_ABA_1" },
       { title: "JANEIRO 2026", url: "URL_DA_ABA_2" },
       { title: "NOVO MÊS", url: "URL_DA_NOVA_ABA" }, // ← Nova aba
   ];
   ```

3. **Para comentar/desabilitar uma aba:**

   ```javascript
   // { title: "NOVEMBRO 2025", url: "..." }, // ← Aba desabilitada
   ```

### Atualizando Links da Navegação

Edite o `index.html` na seção `<nav class="nav-links">`:

```html
<a href="URL_DO_DOCUMENTO" target="_blank" class="nav-link">
    NOME DO LINK
</a>
```

Para desabilitar temporariamente:

```html
<!-- <a href="URL" target="_blank" class="nav-link">LINK</a> -->
```

## 🎨 Design e Interface

### Paleta de Cores - Tema Verde/Floresta

```css
/* Cores Principais */
--bg: #e0f8e9           /* Fundo verde claro */
--card: #ffffff         /* Cards brancos */
--text: #183322         /* Texto verde escuro */
--accent: #206e26       /* Verde principal */
--accent-bright: #7ed321 /* Verde neon */

/* Cores de Estado */
--success: #4d8d5f      /* Verde sucesso */
--warning: #c9d9a4      /* Amarelo aviso */
--error: #e6b3b3        /* Vermelho erro */

/* Tons de Fundo */
--row: #f0f6f2          /* Linha clara */
--row-alt: #e2ece5      /* Linha alternada */
--row-hover: #91a095    /* Linha hover */
```

### Animações Especiais

#### 1. Efeito Neon Piscante (Header)

```css
/* Brilho pulsante no título */
@keyframes neonGlow {
    0%, 100% { text-shadow: suave }
    50% { text-shadow: intenso }
}
```

#### 2. Grid Animado de Fundo

```css
/* Grid se movendo diagonalmente */
@keyframes gridMove {
    0% { transform: translate(0, 0) }
    100% { transform: translate(50px, 50px) }
}
```

#### 3. Logo com Glow Effect

```css
/* Logos brilham suavemente */
@keyframes logoGlow {
    0%, 100% { filter: brilho suave }
    50% { filter: brilho intenso }
}
```

#### 4. Background Pulsante

```css
/* Fundo do header pulsa */
@keyframes backgroundGlow {
    0%, 100% { box-shadow: normal }
    50% { box-shadow: intenso }
}
```

### Elementos Interativos

- **Hover em Links**: Fundo escurece + linha verde aparece
- **Hover em Linhas**: Background verde claro
- **Colunas Clicáveis**: Cursor pointer + ordenação
- **Botões**: Gradiente verde + hover brightening

### Responsividade

#### Desktop (1200px+)

- Layout completo horizontal
- Logos grandes (70px)
- Links em linha única
- Fonte padrão

#### Tablet (768px)

- Logos médios (55px)
- Links em coluna vertical
- Espaçamento reduzido
- Fonte reduzida

#### Mobile (480px)

- Header empilhado (coluna)
- Logos pequenos (50px)
- Toolbar vertical
- Botões full-width
- Fonte mínima

## 🔧 Funcionamento Técnico

### Fluxo de Dados

```
1. Página carrega
   ↓
2. app.js executa
   ↓
3. Para cada aba em tabsConfig:
   ├─ Cria seção HTML
   ├─ Adiciona eventos (busca, limpar, ordenar)
   └─ Chama loadSheet(idx, url)
      ↓
4. loadSheet usa PapaParse:
   ├─ Baixa CSV da URL
   ├─ Parse automático
   ├─ Detecta headers
   └─ Armazena em sheetsData[idx]
      ↓
5. buildHeader(idx):
   ├─ Cria <th> para cada coluna
   └─ Adiciona evento de ordenação
      ↓
6. render(idx):
   ├─ Aplica filtros
   ├─ Aplica ordenação
   ├─ Renderiza <tbody>
   └─ Atualiza contador
```

### Estrutura de Dados

```javascript
// Configuração das abas
tabsConfig = [
    { 
        title: "DEZEMBRO 2025",
        url: "https://docs.google.com/...csv"
    }
]

// Dados carregados
sheetsData = {
    0: {
        headers: ["Nome", "Função", "Horário"],
        rows: [
            { Nome: "João", Função: "ATCPO", Horário: "08-16h" },
            { Nome: "Maria", Função: "TELE", Horário: "16-00h" }
        ],
        sort: { 
            key: "Nome",  // Coluna atual
            dir: 1        // 1=ASC, -1=DESC
        }
    }
}
```

### Funções Principais

#### `loadSheet(idx, url)`

- Baixa CSV usando PapaParse
- Armazena dados em `sheetsData[idx]`
- Chama `buildHeader()` e `render()`

#### `buildHeader(idx)`

- Cria cabeçalhos da tabela
- Adiciona ícone de ordenação
- Configura eventos de clique

#### `toggleSort(idx, key)`

- Alterna direção se mesma coluna
- Define nova coluna se diferente
- Chama `render()` para atualizar

#### `render(idx)`

- Obtém termo de busca
- Filtra linhas (busca em todas colunas)
- Aplica ordenação se ativa
- Chama `paintBody()` para renderizar
- Atualiza contador

#### `paintBody(idx, rows)`

- Limpa tbody
- Cria `<tr>` para cada linha
- Cria `<td>` para cada coluna
- Insere no DOM

## 📊 Casos de Uso

### Para Gestores de Escala

- Visualizar alterações de múltiplos meses
- Buscar rapidamente por nome de PM
- Ordenar por função, horário ou data
- Exportar visualmente (print)

### Para Policiais

- Consultar própria escala
- Verificar trocas e substituições
- Acessar documentos relacionados
- Ver histórico de meses anteriores

### Para Supervisores

- Acompanhar preenchimento de escalas
- Identificar padrões de trocas
- Validar alterações documentadas
- Gerar relatórios visuais

## 🐛 Solução de Problemas

### Tabela não carrega / "Erro ao carregar"

**Causas possíveis:**

1. URL do CSV incorreta
2. Planilha não publicada corretamente
3. Problemas de CORS
4. Planilha privada

**Soluções:**

1. Verifique se a URL termina com `&output=csv`
2. Republique a planilha como CSV
3. Use servidor local (não arquivo local)
4. Torne a planilha pública ou "qualquer pessoa com o link"

### Dados aparecem incorretamente

**Causas:**

1. Planilha com formatação especial
2. Headers duplicados
3. Células vazias no meio dos dados

**Soluções:**

1. Use apenas texto simples na planilha
2. Garanta nomes únicos de colunas
3. Remova linhas completamente vazias

### Busca não funciona

**Verificar:**

1. Console do navegador (F12) por erros
2. Se o termo de busca está correto
3. Se há dados na tabela

### Ordenação não funciona

**Verificar:**

1. Se clicou no `<th>` (cabeçalho)
2. Console por erros JavaScript
3. Se há dados para ordenar

### Links da navegação não funcionam

**Soluções:**

1. Verifique se URLs estão corretas
2. Teste URLs diretamente no navegador
3. Confirme que arquivos do Drive estão públicos
4. Verifique atributo `target="_blank"`

## 📱 Compatibilidade

### Navegadores Suportados

- ✅ Chrome 90+ (Recomendado)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Requisitos

- JavaScript habilitado
- Conexão com internet (para carregar CSVs)
- Resolução mínima: 360px

### Limitações

- Planilhas devem ser públicas ou compartilhadas
- Máximo recomendado: 1000 linhas por aba
- Atualização não é automática (requer F5)

## 🚀 Melhorias Futuras

- [ ] Auto-refresh a cada X minutos
- [ ] Exportar para Excel/PDF
- [ ] Filtros avançados por coluna
- [ ] Destacar alterações recentes
- [ ] Notificações de novas alterações
- [ ] Comparação entre meses
- [ ] Histórico de versões
- [ ] Modo escuro
- [ ] Paginação para grandes volumes
- [ ] Estatísticas (dashboard)
- [ ] Busca avançada com operadores
- [ ] Favoritar registros
- [ ] Comentários e anotações
- [ ] PWA (funcionar offline)
- [ ] Sincronização bidirecional

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Diretrizes

- Mantenha o código limpo e comentado
- Teste em múltiplos navegadores
- Siga o padrão de design existente
- Atualize a documentação
- Otimize para performance

## 📄 Licença

Este projeto é de uso interno da **Polícia Militar do Estado de São Paulo - COPOM/CPI-10**.

Todos os direitos reservados.

## ⚠️ Avisos Importantes

- Sistema de uso exclusivo da corporação
- Não compartilhe links públicos externamente
- Mantenha planilhas sempre atualizadas
- Verifique dados antes de publicar
- Respeite protocolos de segurança da informação

---

## 👨‍💻 Desenvolvedor

**Saulo Eleutério**

- **Unidade**: COPOM Araçatuba - CPI-10
- **Email**: <sauloeleuterio@policiamilitar.sp.gov.br>
- **Telefone**: (18) 98804-0181

---

## 🙏 Agradecimentos

Agradecimento especial a:

- **Equipe COPOM/CPI-10** pelo suporte e feedback
- **Google Sheets** pela plataforma de dados
- **PapaParse** pela biblioteca CSV
- Todos os policiais que contribuem com dados

---

## 📞 Suporte Técnico

### Para dúvidas sobre o sistema

- **Email**: <sauloeleuterio@policiamilitar.sp.gov.br>
- **Telefone/WhatsApp**: (18) 98804-0181
- **Horário**: Segunda a Sexta, 8h às 18h

---

<div align="center">

### 📊 Sistema de Alterações de Escala - COPOM

**© 2025 | Desenvolvido por Saulo Eleutério**

*"Organização e transparência nas escalas operacionais"*

[![COPOM](https://img.shields.io/badge/COPOM-CPI--10-green?style=for-the-badge)]()
[![PM-SP](https://img.shields.io/badge/PM-SP-blue?style=for-the-badge)]()
[![Status](https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge)]()
[![Google Sheets](https://img.shields.io/badge/Database-Google%20Sheets-brightgreen?style=for-the-badge)]()
[![PapaParse](https://img.shields.io/badge/Parser-PapaParse-orange?style=for-the-badge)]()

---

**Sistema desenvolvido para uso interno do COPOM - Araçatuba/SP**

*Polícia Militar do Estado de São Paulo*

**Versão**: 2025.11.27

</div>
