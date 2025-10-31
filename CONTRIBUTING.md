# Contribuindo para o Portfolio Dashboard

Ficamos muito felizes que você está interessado em contribuir com o projeto! Este documento fornece algumas diretrizes para ajudar no processo.

## Como Contribuir

1. Fork o projeto
2. Clone seu fork:
```bash
git clone https://github.com/seu-usuario/portfolio.git
cd portfolio
```

3. Crie uma branch para sua feature:
```bash
git checkout -b feature/nome-da-feature
```

4. Faça suas alterações e commits:
```bash
git commit -m 'Adiciona nova feature'
```

5. Push para sua branch:
```bash
git push origin feature/nome-da-feature
```

6. Abra um Pull Request

## Diretrizes de Desenvolvimento

### Padrões de Código

- Use TypeScript sempre que possível
- Siga o padrão de estilo do Prettier
- Mantenha os componentes pequenos e reutilizáveis
- Documente props de componentes com interfaces TypeScript
- Use comentários para explicar lógica complexa

### Commits

- Use mensagens de commit claras e descritivas
- Prefixe seus commits com o tipo:
  - `feat:` para novas features
  - `fix:` para correções de bugs
  - `docs:` para mudanças na documentação
  - `style:` para mudanças que não afetam o código
  - `refactor:` para refatorações
  - `test:` para adição ou modificação de testes

### Pull Requests

- Descreva claramente as mudanças feitas
- Referencie issues relacionadas
- Inclua screenshots para mudanças visuais
- Certifique-se que os testes passam
- Mantenha o PR focado em uma única mudança

## Reportando Bugs

Use o sistema de issues do GitHub e inclua:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots se relevante
- Informações do ambiente (navegador, OS, etc)

## Sugerindo Melhorias

Para sugerir melhorias:

1. Verifique se já não existe uma issue similar
2. Crie uma nova issue com:
   - Descrição clara da melhoria
   - Motivação e contexto
   - Exemplos de uso se possível

## Estrutura do Projeto

```
portfolio/
├── .env                      # Variáveis de ambiente
├── app/
│   ├── api/                 # Endpoints da API
│   ├── dashboard/           # Página do dashboard
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página inicial
├── assets/                 # Arquivos estáticos
├── Components/             # Componentes React
│   ├── portfolio/         # Componentes específicos do portfólio
│   └── ui/               # Componentes de UI reutilizáveis
├── lib/                  # Bibliotecas e utilitários
│   ├── firebase.ts      # Configuração do Firebase
│   └── utils.ts         # Funções utilitárias
└── public/              # Arquivos públicos estáticos
```

## Setup de Desenvolvimento

1. Instale as dependências:
```bash
npm install
```

2. Configure o ambiente:
```bash
cp .env.example .env.local
```

3. Configure suas credenciais do Firebase no `.env.local`

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Recursos Úteis

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Firebase](https://firebase.google.com/docs)
- [Guia do TailwindCSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)