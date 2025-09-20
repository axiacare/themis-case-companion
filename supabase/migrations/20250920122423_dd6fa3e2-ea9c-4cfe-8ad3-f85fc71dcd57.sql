-- Criar tabela de equipes com segurança total
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id TEXT NOT NULL UNIQUE,
  team_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  webhook_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para dados de casos (exemplo de dados isolados por equipe)
CREATE TABLE public.cases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id TEXT NOT NULL,
  case_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (team_id) REFERENCES public.teams(team_id) ON DELETE CASCADE
);

-- Criar tabela para configurações de equipe
CREATE TABLE public.team_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id TEXT NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (team_id) REFERENCES public.teams(team_id) ON DELETE CASCADE
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_settings ENABLE ROW LEVEL SECURITY;

-- Função para obter o team_id atual da sessão
CREATE OR REPLACE FUNCTION public.get_current_team_id()
RETURNS TEXT AS $$
BEGIN
  RETURN current_setting('app.current_team_id', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Políticas RLS para isolamento total de dados por equipe
-- Teams: cada equipe só pode ver e modificar seus próprios dados
CREATE POLICY "Teams can only access their own data" 
ON public.teams 
FOR ALL 
USING (team_id = public.get_current_team_id());

-- Cases: isolamento absoluto por team_id
CREATE POLICY "Cases are completely isolated by team" 
ON public.cases 
FOR ALL 
USING (team_id = public.get_current_team_id());

-- Team Settings: isolamento absoluto por team_id
CREATE POLICY "Team settings are completely isolated by team" 
ON public.team_settings 
FOR ALL 
USING (team_id = public.get_current_team_id());

-- Função para definir o contexto da equipe atual
CREATE OR REPLACE FUNCTION public.set_team_context(p_team_id TEXT)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_team_id', p_team_id, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cases_updated_at
  BEFORE UPDATE ON public.cases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_settings_updated_at
  BEFORE UPDATE ON public.team_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir equipe de exemplo unimed236
INSERT INTO public.teams (team_id, team_name, password_hash, webhook_url) 
VALUES ('unimed236', 'Unimed 236', '$2b$10$example.hash.for.admin.password', NULL);

-- Criar configurações iniciais para a equipe
INSERT INTO public.team_settings (team_id, settings) 
VALUES ('unimed236', '{"initialized": true, "created_by": "system"}');