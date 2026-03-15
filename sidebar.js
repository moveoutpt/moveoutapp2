// Sidebar HTML injetado em todas as páginas PT
function renderSidebar(activePage) {
  const links = [
    { href: 'index.html', icon: `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>`, label: 'Dashboard', page: 'dashboard' },
    { href: 'agenda.html', icon: `<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>`, label: 'Agenda', page: 'agenda' },
    { href: 'clientes.html', icon: `<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><path d="M16 3a4 4 0 0 1 0 8"/><path d="M21 21v-2a4 4 0 0 0-3-4"/>`, label: 'Clientes', page: 'clientes' },
    { href: 'treinos.html', icon: `<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/>`, label: 'Treinos', page: 'treinos' },
    { href: 'exercicios.html', icon: `<path d="M6.5 6.5h11M6.5 12h11M6.5 17.5h7M3 6.5h1M3 12h1M3 17.5h1"/>`, label: 'Biblioteca', page: 'exercicios', pt_only: true },
    { href: 'programas.html', icon: `<path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M9 12l2 2 4-4"/>`, label: 'Programas', page: 'programas' },
    { href: 'spots.html', icon: `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>`, label: 'Spots Outdoor', page: 'spots' },
  ];

  const navHTML = links.map(l => `
    <a href="${l.href}" class="nav-item${activePage === l.page ? ' active' : ''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${l.icon}</svg>
      <span>${l.label}${l.pt_only ? ' <span style="font-size:9px;background:var(--green-light);color:var(--green);padding:1px 5px;border-radius:4px;margin-left:2px">PT</span>' : ''}</span>
    </a>
  `).join('');

  return `
  <aside class="sidebar" id="sidebar">
    <div class="logo-area">
      <div class="logo-icon">
        <svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div>
        <div class="logo-name">MOVE OUT</div>
        <div class="logo-sub">Treino Outdoor</div>
      </div>
    </div>
    <nav class="nav">${navHTML}</nav>
    <div class="user-area" onclick="signOut()">
      <div class="user-avatar">M</div>
      <div>
        <div class="user-name">Miguel</div>
        <div class="user-role">Treinador PT</div>
      </div>
    </div>
  </aside>`;
}
