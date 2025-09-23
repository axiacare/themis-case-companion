// Configurações centralizadas de autenticação
// Ajuste estes valores para cada aplicação

export const AUTH_CONFIG = {
  // Credenciais de Admin (altere para cada solução)
  admin: {
    username: 'admin.usuario', // ALTERE AQUI
    password: 'sua_senha_admin_2025@' // ALTERE AQUI
  },

  // Rotas de redirecionamento
  routes: {
    home: '/',
    access: '/acesso',
    admin: '/admin',
    teamDashboard: '/central-equipe'
  },

  // Configurações de persistência
  storage: {
    adminKey: 'admin_authenticated',
    teamKey: 'teamData'
  },

  // Branding (ajuste para cada solução)
  branding: {
    solutionName: 'SUA SOLUÇÃO™',
    solutionDescription: 'Descrição da sua solução',
    companyName: 'SUA EMPRESA',
    logos: {
      main: '/logo-principal.png',
      company: '/logo-empresa.png'
    }
  },

  // Mensagens padrão
  messages: {
    loginSuccess: 'Login realizado com sucesso!',
    loginError: 'Credenciais inválidas. Verifique o usuário e senha.',
    accessDenied: 'ID da equipe ou senha incorretos.',
    connectionError: 'Não foi possível validar as credenciais. Tente novamente.',
    restrictedAccess: 'Você precisa estar logado com sua equipe para acessar esta página.',
    incompleteData: 'Por favor, preencha todos os campos obrigatórios.',
    invalidEmail: 'Por favor, informe um email válido.',
    consentRequired: 'É necessário autorizar o contato para formalização.'
  },

  // Validações
  validation: {
    emailRegex: /\S+@\S+\.\S+/,
    passwordMinLength: 6,
    teamIdMinLength: 3
  }
};

// Funções utilitárias
export const getStorageKey = (type: 'admin' | 'team') => {
  return type === 'admin' ? AUTH_CONFIG.storage.adminKey : AUTH_CONFIG.storage.teamKey;
};

export const getRedirectRoute = (type: 'home' | 'access' | 'admin' | 'teamDashboard') => {
  return AUTH_CONFIG.routes[type];
};

export const getBrandingConfig = () => {
  return AUTH_CONFIG.branding;
};

export const getValidationConfig = () => {
  return AUTH_CONFIG.validation;
};