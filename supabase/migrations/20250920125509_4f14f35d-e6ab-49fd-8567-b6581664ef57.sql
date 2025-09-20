-- Inserir a equipe unimed236 se ela não existir
INSERT INTO public.teams (team_id, team_name, password_hash)
VALUES ('unimed236', 'Unimed São Paulo', 'YWRtaW4=')
ON CONFLICT (team_id) DO NOTHING;