# Portfolio Dashboard

Uma aplicação Next.js moderna para gerenciar projetos de portfólio, com autenticação simplificada e interface administrativa.

![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)

## 🚀 Funcionalidades

- ✨ Dashboard administrativo para gerenciamento de projetos
- � Autenticação simplificada e segura
- 🏷️ Sistema de tags para categorização
- 🔗 Links para site e GitHub de cada projeto
- 🎨 Interface responsiva e moderna
- 📱 Layout otimizado para mobile

## 🛠️ Começando

### Pré-requisitos

- Node.js 18.x ou superior
- NPM ou Yarn

### Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd portfolio
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

Este projeto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimizar e carregar a fonte [Geist](https://vercel.com/font).

## � Sistema de Autenticação

O projeto utiliza um sistema de autenticação simplificado e seguro:

### Credenciais de Acesso
- **Email:** andrewluizporto@hotmail.com
- **Senha:** Definida no sistema

### Características
- Autenticação baseada em sessão
- Proteção de rotas administrativas
- Validação de credenciais no servidor
- Feedback de erros em tempo real

### Fluxo de Autenticação
1. Acesse `/login`
2. Insira as credenciais
3. Redirecionamento automático para o dashboard
4. Sessão mantida até logout ou fechamento do navegador

## 📱 Uso do Dashboard

O dashboard pode ser acessado em `/dashboard` após autenticação e permite:

### Gerenciamento de Projetos
- **Listagem:** Visualização de todos os projetos cadastrados
- **Adição:** Formulário completo para novos projetos
- **Remoção:** Exclusão segura de projetos existentes

### Campos do Projeto
- Nome do projeto (obrigatório)
- Descrição (obrigatório)
- Link do site (opcional)
- Link do GitHub (opcional)
- Tags (separadas por vírgula)
- URL da imagem
- Tamanho do card (small, medium, large)
- Cor do card (blue, purple, orange, etc)

### Interface
- Design responsivo
- Feedback visual de ações
- Validação em tempo real
- Preview de dados
- Sistema de mensagens de erro/sucesso

## 🎨 Componentes e Estilos

### Design System
- Cores consistentes
- Tipografia Geist
- Componentes reutilizáveis
- Gradientes modernos
- Animações suaves

### Responsividade
- Mobile-first
- Breakpoints flexíveis
- Layout adaptativo
- Imagens otimizadas

## 🔧 Tecnologias Principais

### Frontend
- Next.js 14 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Geist UI

### Dados
- API Routes
- REST endpoints
- Validação de dados
- Tipagem forte

### Performance
- Server Components
- Otimização de imagens
- Lazy loading
- Cache strategies

### Gerenciar Projetos
- Visualizar todos os projetos
- Excluir projetos
- Ver prévia das imagens
- Gerenciar tags

## 🎨 Componentes

### HeroSection
Componente principal da página inicial com:
- Avatar otimizado com next/image
- Posicionamento responsivo
- Fallback para imagem padrão
- Animações suaves de entrada
- Botões de chamada para ação

### ProjectCard
Componente reutilizável para exibição de projetos com:
- Imagem com fallback
- Efeitos de hover
- Links para site e GitHub
- Exibição de tags
- Animações suaves

### Personalização
O componente `ProjectCard` aceita as seguintes props:
```typescript
interface Project {
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
  color?: 'blue' | 'purple' | 'orange';
  size?: 'small' | 'medium' | 'large';
}
```

## 📁 Estrutura do Projeto

```
portfolio/
├── .env                      # Variáveis de ambiente
├── app/
│   ├── api/
│   │   └── portfolio/
│   │       └── route.ts      # API endpoints do portfólio
│   ├── dashboard/
│   │   └── page.tsx         # Página do dashboard
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial
├── assets/                  # Arquivos estáticos
├── Components/
│   ├── portfolio/
│   │   ├── HeroSection.tsx  # Seção hero da página inicial
│   │   ├── ProjectCard.tsx  # Card de projeto reutilizável
│   │   └── SkillsSection.tsx# Seção de habilidades
│   │   └── ContactSection.tsx# Seção de contato
│   └── ui/
│       └── button.tsx       # Componente de botão reutilizável
├── lib/
│   ├── firebase.ts         # Configuração do Firebase
│   └── utils.ts            # Funções utilitárias
├── public/                 # Arquivos públicos estáticos
├── components.json         # Configuração de componentes
├── eslint.config.mjs      # Configuração do ESLint
├── next.config.ts         # Configuração do Next.js
├── postcss.config.mjs     # Configuração do PostCSS
├── tsconfig.json          # Configuração do TypeScript
├── package.json           # Dependências e scripts
├── CONTRIBUTING.md        # Guia de contribuição
├── LICENSE               # Licença MIT
└── README.md             # Documentação principal
```

## 🔧 Tecnologias Utilizadas

- **Next.js 16.0.0**: Framework React com SSR
- **Firebase 10.6.0**: Backend e banco de dados
- **TailwindCSS**: Estilização
- **TypeScript**: Tipagem estática
- **Lucide React**: Ícones
- **React Hook Form**: Gerenciamento de formulários

## 🚀 Deploy

O projeto pode ser facilmente deployado na [Vercel](https://vercel.com):

1. Faça push do seu código para o GitHub
2. Importe o projeto na Vercel
3. Configure as variáveis de ambiente
4. Deploy!

## ✨ Próximos Passos

- [x] Implementar regras de segurança do Firebase
- [x] Otimizar componentes de imagem com next/image
- [x] Melhorar feedback visual de operações
- [x] Implementar autenticação de usuários
- [ ] Adicionar edição de projetos
- [ ] Implementar ordenação de projetos
- [ ] Adicionar filtros por tags
- [ ] Implementar preview em tempo real
- [ ] Adicionar testes automatizados

## 📫 Contato

Se você tiver alguma dúvida ou sugestão, não hesite em abrir uma issue ou enviar um pull request.
