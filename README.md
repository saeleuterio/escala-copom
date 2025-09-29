# 🚔 Sistema de Alterações de Escala - COPOM

Sistema web para visualização e gerenciamento de alterações de escala do Centro de Operações da Polícia Militar (COPOM).

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

## 📋 Sobre o Projeto

Sistema desenvolvido para facilitar a consulta de alterações de escala dos policiais militares, permitindo filtrar, ordenar e visualizar dados de múltiplos meses de forma organizada e intuitiva.

### ✨ Funcionalidades

- 📊 Visualização de escalas por mês (Setembro a Dezembro 2025)
- 🔍 Sistema de busca/filtro em tempo real
- ↕️ Ordenação de colunas (ascendente/descendente)
- 📄 Acesso rápido a documentos PDF importantes
- 📱 Interface responsiva para desktop e mobile
- 📈 Contador de registros filtrados
- 🎨 Design moderno com tema verde institucional

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura da página
- **CSS3** - Estilização e responsividade
- **JavaScript (ES6+)** - Lógica da aplicação
- **PapaParse** - Parsing de arquivos CSV
- **Google Sheets** - Fonte de dados (CSV publicado)

## 📦 Estrutura do Projeto

```
copom-escalas/
│
├── index.html          # Página principal
├── app.js              # Lógica da aplicação
├── styles.css          # Estilos
├── img/
│   ├── favicon.png     # Ícone do site
│   └── copom.png       # Logo COPOM
└── README.md           # Documentação
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional para desenvolvimento)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/copom-escalas.git
cd copom-escalas
```

2. Abra o arquivo `index.html` diretamente no navegador ou use um servidor local:

**Opção 1: Abrir diretamente**
```bash
# No Windows
start index.html

# No Mac
open index.html

# No Linux
xdg-open index.html
```

**Opção 2: Servidor local (Python)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Acesse: `http://localhost:8000`

**Opção 3: Servidor local (Node.js)**
```bash
npx serve
```

## ⚙️ Configuração

### Adicionar ou Modificar Abas de Meses

No arquivo `app.js`, edite o array `tabsConfig`:

```javascript
const tabsConfig = [
    { 
        title: "JANEIRO 2026", 
        url: "URL_DO_CSV_PUBLICADO" 
    },
    // Adicione mais meses conforme necessário
];
```

### Como Obter URL do Google Sheets

1. Abra sua planilha no Google Sheets
2. Vá em **Arquivo** → **Compartilhar** → **Publicar na Web**
3. Selecione a aba específica
4. Escolha formato **CSV**
5. Clique em **Publicar**
6. Copie a URL gerada

### Adicionar Novos Botões PDF

No arquivo `index.html`, dentro da `<div class="pdf-buttons">`:

```html
<button class="pdf-btn" data-pdf="URL_DO_ARQUIVO">
    NOME DO BOTÃO
</button>
```

## 📊 Formato dos Dados CSV

O sistema espera arquivos CSV com cabeçalhos na primeira linha. Exemplo:

```csv
Nome,Matrícula,Unidade,Data,Observação
João Silva,123456,1º BPM,01/09/2025,Folga
Maria Santos,789012,2º BPM,02/09/2025,Serviço
```

## 🎨 Personalização

### Cores (variáveis CSS)

Edite as variáveis no arquivo `styles.css`:

```css
:root {
    --bg: #e0f8e9;           /* Cor de fundo */
    --card: #ffffff;          /* Cor dos cards */
    --text: #183322;          /* Cor do texto */
    --accent: #206e26;        /* Cor principal */
    --accent-2: #23c94f;      /* Cor secundária */
    /* ... outras variáveis */
}
```

### Logo

Substitua as imagens em `img/`:
- `copom.png` - Logo principal (recomendado: 200x200px)
- `favicon.png` - Ícone do navegador (recomendado: 32x32px)

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop**: Layout completo com todos os recursos
- **Tablet**: Layout adaptado para telas médias
- **Mobile**: Layout otimizado para dispositivos móveis

## 🔍 Funcionalidades Detalhadas

### Sistema de Busca

- Busca em todas as colunas simultaneamente
- Não diferencia maiúsculas de minúsculas
- Atualização em tempo real
- Contador de resultados filtrados

### Ordenação de Colunas

- Clique no cabeçalho da coluna para ordenar
- Primeiro clique: ordem crescente (A→Z)
- Segundo clique: ordem decrescente (Z→A)
- Indicador visual de ordenação ativo

### Carregamento de Dados

- Carregamento assíncrono via AJAX
- Indicador de status de carregamento
- Tratamento de erros
- Contagem total de registros

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Boas Práticas

- Mantenha o código limpo e comentado
- Teste em diferentes navegadores
- Otimize imagens antes de adicionar
- Mantenha a responsividade
- Documente mudanças significativas

## 🐛 Resolução de Problemas

### CSV não carrega

- Verifique se a URL está correta
- Certifique-se de que a planilha está publicada
- Verifique a conexão com a internet
- Confira o console do navegador (F12)

### Dados não aparecem

- Verifique se o CSV tem cabeçalhos
- Certifique-se de que o formato está correto
- Verifique se há caracteres especiais problemáticos

### Botões PDF não funcionam

- Verifique se as URLs dos arquivos são válidas
- Certifique-se de que os arquivos estão compartilhados publicamente
- Para Google Drive, use links de visualização, não de download

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Saulo Eleutério**

- GitHub: [@seueleuterio](https://github.com/seueleuterio)

## 📞 Suporte

Para suporte, entre em contato através do GitHub Issues ou pelo email institucional.

## 🔄 Atualizações

### Versão 1.0.0 (Setembro 2025)
- ✅ Lançamento inicial
- ✅ Sistema de abas por mês
- ✅ Busca e filtros
- ✅ Ordenação de colunas
- ✅ Interface responsiva
- ✅ Integração com Google Sheets

---

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!

**Desenvolvido com 💚 para a Polícia Militar**