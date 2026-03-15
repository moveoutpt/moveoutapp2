// ── SUPABASE CONFIG ──
// Substitui com as tuas credenciais em https://supabase.com → Project Settings → API
const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';
const SUPABASE_KEY = 'SUA_ANON_KEY';

// ── SUPABASE CLIENT ──
let supabase = null;
function getSupabase() {
  if (!supabase && window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
  return supabase;
}

// ── AUTH ──
async function getCurrentUser() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data: { user } } = await sb.auth.getUser();
  return user;
}

async function signIn(email, password) {
  const sb = getSupabase();
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function signOut() {
  const sb = getSupabase();
  await sb.auth.signOut();
  window.location.href = '/login.html';
}

// ── AUTH GUARD (coloca no topo de cada página protegida) ──
async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = '/login.html';
    return null;
  }
  return user;
}

// ── DB HELPERS ──
const db = {
  // CLIENTES
  async getClientes() {
    const sb = getSupabase();
    const { data, error } = await sb.from('clientes').select('*').order('nome');
    if (error) throw error;
    return data;
  },
  async createCliente(cliente) {
    const sb = getSupabase();
    const { data, error } = await sb.from('clientes').insert(cliente).select().single();
    if (error) throw error;
    return data;
  },
  async updateCliente(id, updates) {
    const sb = getSupabase();
    const { data, error } = await sb.from('clientes').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async deleteCliente(id) {
    const sb = getSupabase();
    const { error } = await sb.from('clientes').delete().eq('id', id);
    if (error) throw error;
  },

  // TREINOS
  async getTreinos(clienteId = null) {
    const sb = getSupabase();
    let q = sb.from('treinos').select('*, clientes(nome)').order('created_at', { ascending: false });
    if (clienteId) q = q.eq('cliente_id', clienteId);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  },
  async createTreino(treino) {
    const sb = getSupabase();
    const { data, error } = await sb.from('treinos').insert(treino).select().single();
    if (error) throw error;
    return data;
  },
  async updateTreino(id, updates) {
    const sb = getSupabase();
    const { data, error } = await sb.from('treinos').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  // SESSÕES (AGENDA)
  async getSessoes(mes = null, ano = null) {
    const sb = getSupabase();
    let q = sb.from('sessoes').select('*, clientes(nome, avatar_initials, avatar_color)').order('data_hora');
    if (mes !== null && ano !== null) {
      const start = new Date(ano, mes, 1).toISOString();
      const end = new Date(ano, mes + 1, 0, 23, 59).toISOString();
      q = q.gte('data_hora', start).lte('data_hora', end);
    }
    const { data, error } = await q;
    if (error) throw error;
    return data;
  },
  async createSessao(sessao) {
    const sb = getSupabase();
    const { data, error } = await sb.from('sessoes').insert(sessao).select().single();
    if (error) throw error;
    return data;
  },
  async updateSessao(id, updates) {
    const sb = getSupabase();
    const { data, error } = await sb.from('sessoes').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  // EXERCÍCIOS
  async getExercicios(categoria = null) {
    const sb = getSupabase();
    let q = sb.from('exercicios').select('*').order('nome');
    if (categoria) q = q.eq('categoria', categoria);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  },
  async createExercicio(ex) {
    const sb = getSupabase();
    const { data, error } = await sb.from('exercicios').insert(ex).select().single();
    if (error) throw error;
    return data;
  },

  // PROGRAMAS
  async getProgramas() {
    const sb = getSupabase();
    const { data, error } = await sb.from('programas').select('*').order('ordem');
    if (error) throw error;
    return data;
  },
};

// ── UI HELPERS ──
function toast(msg, type = 'success') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.style.background = type === 'error' ? 'var(--danger)' : 'var(--green)';
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
}

function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});

function getUrlParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
}

// ── ACTIVE NAV LINK ──
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(el => {
    const href = el.getAttribute('href');
    if (href && path === href.split('/').pop()) el.classList.add('active');
  });
});
