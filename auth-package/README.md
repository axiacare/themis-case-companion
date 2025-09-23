# Pacote de Autenticação Padronizado - AxiaCare

Este pacote contém todos os componentes necessários para implementar autenticação padronizada entre suas diferentes soluções.

## 📁 Estrutura do Pacote

```
auth-package/
├── contexts/
│   ├── AdminAuthContext.tsx     # Contexto de autenticação admin
│   └── TeamAuthContext.tsx      # Contexto de autenticação por equipe
├── components/
│   ├── AdminLogin.tsx           # Componente de login admin
│   ├── ProtectedRoute.tsx       # HOC para proteger rotas
│   └── StandardHeader.tsx       # Header padronizado
├── pages/
│   └── Access.tsx               # Página de acesso (login + registro)
├── config/
│   └── auth-config.ts           # Configurações centralizadas
└── README.md                    # Este arquivo
```

## 🚀 Como Implementar em Nova Aplicação

### 1. Copiar Arquivos
Copie todos os arquivos para seu projeto mantendo a estrutura de pastas:
- `/src/contexts/`
- `/src/components/`
- `/src/pages/`

### 2. Instalar Dependências
Certifique-se de ter as dependências necessárias:
```bash
# UI Components (shadcn)
npm install @radix-ui/react-tabs @radix-ui/react-checkbox

# Routing
npm install react-router-dom

# Supabase (se usar autenticação por equipe)
npm install @supabase/supabase-js
```

### 3. Configurar Contextos no App Principal

```tsx
// App.tsx ou main.tsx
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import { TeamAuthProvider } from '@/contexts/TeamAuthContext';

function App() {
  return (
    <AdminAuthProvider>
      <TeamAuthProvider>
        {/* Seu app aqui */}
      </TeamAuthProvider>
    </AdminAuthProvider>
  );
}
```

### 4. Configurar Rotas

```tsx
// Router configuration
import { Routes, Route } from 'react-router-dom';
import Access from '@/pages/Access';
import AdminLogin from '@/components/AdminLogin';
import ProtectedRoute from '@/components/ProtectedRoute';

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/acesso" element={<Access />} />
  <Route path="/admin" element={<AdminLogin />} />
  <Route 
    path="/central-equipe" 
    element={
      <ProtectedRoute>
        <TeamDashboard />
      </ProtectedRoute>
    } 
  />
</Routes>
```

### 5. Usar Header Padronizado

```tsx
// Em qualquer página
import StandardHeader from '@/components/StandardHeader';

<StandardHeader
  logoSrc="/seu-logo.png"
  solutionName="Nome da Sua Solução™"
  solutionDescription="Descrição da sua solução"
  companyLogoSrc="/logo-empresa.png"
  showAdminButton={true}
  showAccessButton={true}
/>
```

## ⚙️ Configurações Necessárias

### 1. AdminAuthContext (linhas 24-27)
```tsx
const ADMIN_CREDENTIALS = {
  username: 'seu.admin', // ALTERE AQUI
  password: 'sua_senha_admin_2025@' // ALTERE AQUI
};
```

### 2. Rotas de Redirecionamento
Ajuste as rotas nos arquivos:
- `TeamAuthContext.tsx` linha 98: `window.location.href = '/central-equipe';`
- `ProtectedRoute.tsx` linha 22: `navigate("/acesso");`
- `Access.tsx` linha 67: `navigate("/central-equipe");`

### 3. Logos e Branding
Substitua os caminhos das imagens:
- Logo principal da solução
- Logo da empresa/marca
- Textos e descrições

### 4. Supabase (se usar autenticação por equipe)
Certifique-se de ter as funções no Supabase:
- `verify_team_login(p_team_id, p_password)`
- `set_team_context(p_team_id)`

## 🎨 Classes CSS Necessárias

Certifique-se de ter essas classes no seu `index.css`:
```css
.header-sticky { /* configurações do header */ }
.gradient-secondary { /* gradiente de fundo */ }
.shadow-elegant { /* sombra elegante */ }
.transition-smooth { /* transição suave */ }
.gradient-primary { /* gradiente primário */ }
.shadow-button { /* sombra do botão */ }
.transition-bounce { /* transição com bounce */ }
```

## 🔒 Segurança

### Admin Auth
- Credenciais hardcoded (para ambientes simples)
- Persistência em localStorage
- Logout limpa dados

### Team Auth
- Autenticação via Supabase
- Senhas hasheadas no banco
- RLS (Row Level Security) habilitado
- Persistência em sessionStorage
- Context de equipe para isolamento

## 📱 Responsividade

Todos os componentes são totalmente responsivos:
- Breakpoints: `sm`, `md`, `lg`
- Layout flex adaptivo
- Textos escaláveis
- Botões com estados apropriados

## 🛠️ Customização

### Estilos
Use o sistema de design tokens do Tailwind para manter consistência:
- `text-primary`, `bg-primary`
- `text-muted-foreground`
- `border-border`

### Funcionalidades
- Adicione validações extras nos formulários
- Implemente recuperação de senha
- Adicione autenticação 2FA
- Integre com outros provedores

## 📞 Suporte

Para dúvidas sobre implementação, consulte:
1. Este README
2. Comentários nos códigos (marcados com `// CONFIGURAR:`)
3. Documentação do Supabase (para auth por equipe)

---

**Versão:** 1.0  
**Última atualização:** Janeiro 2025  
**Compatível com:** React 18+, TypeScript, Tailwind CSS, shadcn/ui