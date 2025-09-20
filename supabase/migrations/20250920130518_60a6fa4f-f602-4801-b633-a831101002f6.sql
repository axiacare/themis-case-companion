-- Atualizar a equipe unimed236 com o nome correto
UPDATE public.teams 
SET team_name = 'Unimed São Paulo' 
WHERE team_id = 'unimed236';

-- Criar políticas especiais para admin (quando não há contexto de equipe)
-- Permitir acesso total às equipes quando não há contexto
CREATE POLICY "Allow admin access to teams when no team context"
ON public.teams
FOR ALL
TO public
USING (get_current_team_id() IS NULL OR get_current_team_id() = '');

-- Permitir acesso total aos casos quando não há contexto
CREATE POLICY "Allow admin access to cases when no team context"
ON public.cases
FOR ALL
TO public
USING (get_current_team_id() IS NULL OR get_current_team_id() = '');

-- Permitir acesso total às configurações quando não há contexto
CREATE POLICY "Allow admin access to team_settings when no team context"
ON public.team_settings
FOR ALL
TO public
USING (get_current_team_id() IS NULL OR get_current_team_id() = '');