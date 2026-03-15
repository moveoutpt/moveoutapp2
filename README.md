# MoveOut App — Guia de Publicação

## Ficheiros do Projeto

```
moveout/
├── index.html          → Dashboard
├── login.html          → Login
├── agenda.html         → Agenda de sessões
├── clientes.html       → Gestão de clientes
├── treinos.html        → Builder de treinos
├── exercicios.html     → Biblioteca de exercícios (só PT)
├── programas.html      → Programas on demand
├── spots.html          → Spots outdoor Portugal
├── css/app.css         → Estilos partilhados
├── js/app.js           → Lógica + Supabase
├── js/sidebar.js       → Sidebar partilhada
└── supabase-schema.sql → Base de dados (cola no Supabase)
```

---

## PASSO 1 — Criar Base de Dados (Supabase)

1. Vai a https://supabase.com e cria conta (grátis)
2. Cria um novo projeto (ex: "moveout")
3. Em **SQL Editor**, cola o conteúdo de `supabase-schema.sql` e clica Run
4. Em **Project Settings → API** copia:
   - Project URL
   - anon public key
5. Em `js/app.js` substitui nas primeiras linhas:
   ```js
   const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';
   const SUPABASE_KEY = 'SUA_ANON_KEY';
   ```

---

## PASSO 2 — Criar Conta no Supabase Auth

1. Em **Authentication → Users** clica "Invite User"
2. Usa o teu email (moveoutpt@gmail.com)
3. Aceita o email e define a password

---

## PASSO 3 — Publicar no Vercel

**Opção A — Upload direto (mais fácil):**
1. Vai a https://vercel.com e cria conta grátis
2. Clica "Add New → Project"
3. Arrasta a pasta `moveout/` para o Vercel
4. Clica Deploy
5. Tens o link `moveout-xxx.vercel.app` em 1 minuto!

**Opção B — Via GitHub (recomendado para updates):**
1. Cria conta em https://github.com
2. Cria repositório novo (ex: "moveout-app")
3. Faz upload de todos os ficheiros
4. Liga o repo ao Vercel — cada push atualiza a app automaticamente

---

## PASSO 4 — Domínio próprio (opcional)

No Vercel podes ligar um domínio próprio tipo `app.moveout.pt`
- Compra o domínio em registobr.pt ou namecheap.com (~10€/ano)
- Em Vercel → Domains, adiciona o domínio e segue as instruções DNS

---

## Modo Demo (sem Supabase)

A app funciona em modo demo sem configurar o Supabase.
Os dados ficam só em memória durante a sessão (perdem-se ao fechar).
Útil para testar antes de configurar tudo.
