-- Atualizar senha da equipe unimed236 para teste
UPDATE teams 
SET password_hash = 'unimed236' 
WHERE team_id = 'unimed236';