-- Inserir equipe de exemplo para testes (apenas se não existir)
-- Usar função administrativa que criamos

DO $$
BEGIN
  -- Verificar se já existe alguma equipe com ID 'unimed236'
  IF NOT EXISTS (SELECT 1 FROM teams WHERE team_id = 'unimed236') THEN
    -- Inserir equipe de exemplo diretamente (contexto de migração permite)
    INSERT INTO teams (
      team_id, 
      team_name, 
      password_hash, 
      cnpj, 
      responsible_name, 
      email, 
      phone
    ) VALUES (
      'unimed236',
      'Unimed Governador Valadares',
      encode(digest('unimed2024', 'sha256'), 'base64'), -- Hash SHA256 da senha 'unimed2024'
      '12.345.678/0001-90',
      'Dr. João Silva',
      'admin@unimedgv.com.br',
      '(33) 3271-2000'
    );
    
    RAISE NOTICE 'Equipe de exemplo criada: unimed236 / unimed2024';
  ELSE
    RAISE NOTICE 'Equipe unimed236 já existe';
  END IF;
END $$;