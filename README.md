# Alterações de Escala - COPOM

Sistema web para consulta de alterações de escala do COPOM, integrando dados do Google Sheets com interface responsiva e funcionalidades de pesquisa avançada.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Recursos](#recursos)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Documentação Técnica](#documentação-técnica)
- [Responsividade](#responsividade)
- [Contribuição](#contribuição)

## 🎯 Visão Geral

O sistema permite a visualização de alterações de escala organizadas por mês, com dados importados diretamente do Google Sheets. Oferece funcionalidades de:

- **Visualização multi-mês**: Dados de Agosto a Dezembro 2025
- **Pesquisa em tempo real**: Filtro instantâneo em todos os campos
- **Ordenação inteligente**: Clique nos cabeçalhos para ordenar
- **Acesso direto a PDFs**: Links para escalas e documentos oficiais
- **Interface responsiva**: Adaptada para desktop e mobile

## ✨ Recursos

### Funcionalidades Principais
- ✅ **Carregamento dinâmico** de dados via CSV do Google Sheets
- ✅ **Pesquisa global** em tempo real
- ✅ **Ordenação por colunas** com indicadores visuais
- ✅ **Contador de registros** filtrados/total
- ✅ **Links diretos para PDFs** no Google Drive
- ✅ **Design responsivo** para todos os dispositivos
- ✅ **Interface limpa** e intuitiva

### Documentos Disponíveis
- **Escalas INPO**: Setembro e Outubro 2025
- **Férias 2025**: Calendário completo
- **EAP 2025**: Escala de Atividades Programadas

## 🛠 Tecnologias

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com CSS Grid/Flexbox
- **JavaScript ES6+** - Lógica da aplicação
- **Papa Parse** - Parser CSV para JavaScript

### Integração
- **Google Sheets API** - Fonte de dados via CSV público
- **Google Drive** - Hospedagem de documentos PDF

### Design
- **Design System** personalizado com variáveis CSS
- **Tipografia** system fonts para melhor performance
- **Cores** temáticas verdes institucionais

## 📁 Estrutura do Projeto

```
copom-escalas/
├── index.html          # Estrutura principal da página
├── styles.css          # Estilos e design system
├── app.js              # Lógica da aplicação
├── img/
│   ├── favicon.png     # Ícone do site
│   └── copom.png       # Logo institucional
├── README.md           # Este arquivo
└── DOCS_TECNICAS.md    # Documentação técnica detalhada
```

## ⚙️ Configuração

### 1. Google Sheets Setup

O arquivo `app.js` contém a configuração das abas:

```javascript
const tabsConfig = [
    { 
        title: "AGOSTO 2025", 
        url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=589847056&single=true&output=csv" 
    },
    { 
        title: "SETEMBRO 2025", 
        url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1CA6n--CWez-WSpU2iywOGZozDaAlWMjuYxlmHxnBRnS4VImWZCIlOMjd1EbPxYj9OTVPHBQ8oiPG/pub?gid=1667330725&single=true&output=csv" 
    }
    // ... outras abas
];
```

### 2. Configuração dos PDFs

Os botões de PDF são configurados no HTML:

```html
<button class="pdf-btn" data-pdf="https://drive.google.com/file/d/ID_DO_ARQUIVO/view">
    NOME DO DOCUMENTO
</button>
```

### 3. Personalização Visual

As cores podem ser ajustadas no arquivo `styles.css`:

```css
:root {
    --bg: #e0f8e9;         /* Cor de fundo */
    --accent: #206e26;      /* Cor principal */
    --accent-2: #23c94f;    /* Cor secundária */
    /* ... outras variáveis */
}
```

## 🚀 Como Usar

### Para Usuários

1. **Navegação**: Cada mês possui sua própria seção
2. **Pesquisa**: Digite no campo "Filtrar..." para buscar em todos os campos
3. **Ordenação**: Clique nos cabeçalhos das colunas para ordenar
4. **Limpar**: Use o botão "Limpar" para resetar filtros
5. **PDFs**: Clique nos botões superiores para acessar documentos

### Para Administradores

#### Adicionar Nova Aba (Mês)
1. Publique a nova aba do Google Sheets como CSV
2. Adicione a configuração em `tabsConfig` no `app.js`:

```javascript
{ 
    title: "JANEIRO 2026", 
    url: "https://docs.google.com/spreadsheets/d/.../output=csv" 
}
```

#### Adicionar Novo PDF
Inclua um novo botão no HTML:

```html
<button class="pdf-btn" data-pdf="URL_DO_NOVO_PDF">
    NOME DO DOCUMENTO
</button>
```

#### Atualizar Dados
- Modifique diretamente o Google Sheets
- Os dados são atualizados automaticamente no site

## 📖 Documentação Técnica

Para informações técnicas detalhadas, consulte o arquivo [`DOCS_TECNICAS.md`](./DOCS_TECNICAS.md), que inclui:

- Arquitetura do sistema
- API Reference completa
- Estados da aplicação
- Otimizações de performance
- Considerações de segurança
- Guia de troubleshooting
- Instruções de deploy

## 📱 Responsividade

### Breakpoints

- **Desktop**: > 768px - Layout completo
- **Tablet**: 481px - 768px - Layout adaptado  
- **Mobile**: ≤ 480px - Layout otimizado para toque

### Adaptações Mobile

- **PDF Buttons**: Stack vertical em telas pequenas
- **Tabelas**: Scroll horizontal para preservar dados
- **Logo**: Redimensionamento proporcional
- **Tipografia**: Escalonamento com `clamp()`

## 🔧 Manutenção

### Checklist Mensal
- [ ] Verificar funcionamento de todos os CSVs
- [ ] Testar responsividade em dispositivos
- [ ] Verificar velocidade de carregamento
- [ ] Atualizar documentação se necessário

### Checklist Trimestral
- [ ] Audit de dependências (Papa Parse)
- [ ] Teste em diferentes browsers
- [ ] Review de acessibilidade
- [ ] Backup completo do projeto

## 🤝 Contribuição

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrões de Código

- **JavaScript**: ES6+, camelCase para variáveis
- **CSS**: Variáveis CSS, nomenclatura consistente
- **HTML**: Semântico, acessível
- **Commits**: Mensagens descritivas e concisas

## 🌐 Deploy

### Hospedagem Recomendada

#### GitHub Pages (Recomendado)
1. Faça upload dos arquivos para o repositório
2. Vá em Settings > Pages
3. Selecione source: Deploy from a branch
4. Escolha branch: main
5. Site estará disponível em `https://seu-usuario.github.io/nome-repositorio`

#### Alternativas
- **Netlify**: Drag & drop da pasta
- **Vercel**: Deploy automático via Git
- **Servidor próprio**: Upload via FTP

### Configuração de Domínio Personalizado

Se desejar usar um domínio próprio:
1. Adicione arquivo `CNAME` na raiz com seu domínio
2. Configure DNS no seu provedor
3. Aguarde propagação (24-48h)

## 📄 Licença

Este projeto é de uso interno do COPOM. Todos os direitos reservados.

## 👨‍💻 Desenvolvedor

**Saulo Eleutério**
- Desenvolvimento e manutenção do sistema
- Design da interface e experiência do usuário
- Integração com Google Sheets e Drive

## 📞 Suporte

Para suporte técnico ou dúvidas:
- Consulte a [Documentação Técnica](./DOCS_TECNICAS.md)
- Verifique a seção de [Troubleshooting](./DOCS_TECNICAS.md#troubleshooting)
- Entre em contato com o desenvolvedor

---

*Sistema desenvolvido para otimizar a consulta e gestão de escalas do COPOM*  
*Última atualização: Agosto 2025*