-- MOVE OUT APP — Supabase Schema
-- Cola isto no SQL Editor do teu projeto Supabase

-- Tabela de clientes
create table clientes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  nome text not null,
  email text,
  telefone text,
  objetivo text,
  sessoes_semana int default 2,
  status text default 'ativo' check (status in ('ativo','inativo')),
  lesoes text,
  treinos_total int default 0,
  avatar_initials text,
  avatar_color text default '#D8F3DC',
  avatar_text text default '#1B4332',
  notion_url text,
  pt_id uuid references auth.users(id)
);

-- Tabela de treinos
create table treinos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  nome text not null,
  cliente_id uuid references clientes(id) on delete cascade,
  tipo text,
  semana text,
  duracao text,
  notas text,
  status text default 'rascunho' check (status in ('rascunho','publicado','concluido')),
  blocos jsonb default '[]',
  pt_id uuid references auth.users(id)
);

-- Tabela de sessões (agenda)
create table sessoes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  data_hora timestamptz not null,
  cliente_id uuid references clientes(id) on delete cascade,
  tipo text default 'Treino PT 1:1',
  local text,
  notion_url text,
  status text default 'agendada' check (status in ('agendada','concluida','cancelada')),
  notas text,
  pt_id uuid references auth.users(id)
);

-- Tabela de exercícios (biblioteca)
create table exercicios (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  nome text not null,
  categoria text,
  nivel text default 'Iniciante',
  video_url text,
  descricao text,
  tags text[] default '{}',
  pt_id uuid references auth.users(id)
);

-- Tabela de programas
create table programas (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  nome text not null,
  descricao text,
  duracao text,
  nivel text,
  tipo text default 'gratuito' check (tipo in ('gratuito','premium')),
  preco numeric(10,2),
  video_url text,
  tags text[] default '{}',
  ordem int default 0,
  pt_id uuid references auth.users(id)
);

-- Row Level Security (protege os dados)
alter table clientes enable row level security;
alter table treinos enable row level security;
alter table sessoes enable row level security;
alter table exercicios enable row level security;
alter table programas enable row level security;

-- PT vê só os seus dados
create policy "PT acesso próprio - clientes" on clientes for all using (auth.uid() = pt_id);
create policy "PT acesso próprio - treinos" on treinos for all using (auth.uid() = pt_id);
create policy "PT acesso próprio - sessoes" on sessoes for all using (auth.uid() = pt_id);
create policy "PT acesso próprio - exercicios" on exercicios for all using (auth.uid() = pt_id);
create policy "PT acesso próprio - programas" on programas for all using (auth.uid() = pt_id);
