-- Adicionar novos campos à tabela teams
ALTER TABLE public.teams 
ADD COLUMN cnpj TEXT,
ADD COLUMN responsible_name TEXT,
ADD COLUMN email TEXT,
ADD COLUMN phone TEXT,
ADD COLUMN terms_document_url TEXT;

-- Criar bucket para armazenar termos de aceite
INSERT INTO storage.buckets (id, name, public) VALUES ('terms', 'terms', false);

-- Políticas de storage para termos de aceite
-- Admins podem visualizar todos os documentos
CREATE POLICY "Admins can view all terms documents"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'terms' AND 
  (get_current_team_id() IS NULL OR get_current_team_id() = '')
);

-- Admins podem fazer upload de documentos
CREATE POLICY "Admins can upload terms documents"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'terms' AND 
  (get_current_team_id() IS NULL OR get_current_team_id() = '')
);

-- Equipes podem visualizar apenas seus próprios documentos
CREATE POLICY "Teams can view their own terms documents"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'terms' AND 
  get_current_team_id() IS NOT NULL AND 
  get_current_team_id() != '' AND
  (storage.foldername(name))[1] = get_current_team_id()
);

-- Admins podem atualizar documentos
CREATE POLICY "Admins can update terms documents"
ON storage.objects
FOR UPDATE
TO public
USING (
  bucket_id = 'terms' AND 
  (get_current_team_id() IS NULL OR get_current_team_id() = '')
);

-- Admins podem deletar documentos
CREATE POLICY "Admins can delete terms documents"
ON storage.objects
FOR DELETE
TO public
USING (
  bucket_id = 'terms' AND 
  (get_current_team_id() IS NULL OR get_current_team_id() = '')
);