/* WashFlow Frontend — data dummy (localStorage) + layout bersama */
const SEED = {
  layanan: [
    [1,'Cuci Reguler Mobil','Mobil',45000,30,'Cuci bodi luar, semprot kolong, semir ban & vacuum.'],
    [2,'Cuci Salju + Kolong Mobil','Mobil',65000,45,'Cuci salju pH balance, kolong hidrolik, vacuum wangi.'],
    [3,'Cuci Komplit + Wax Mobil','Mobil',95000,60,'Cuci salju, vacuum menyeluruh, finishing carnauba wax.'],
    [4,'Salon Interior Mobil','Mobil',250000,90,'Deep cleaning jok, plafon, karpet & fogging.'],
    [5,'Cuci Reguler Motor','Motor',20000,20,'Cuci bodi luar, rantai & semir ban.'],
    [6,'Cuci Salju Motor','Motor',25000,25,'Cuci salju bodi dan mesin, semir ban.'],
    [7,'Cuci Express Motor','Motor',15000,15,'Cuci cepat bodi luar.']
  ].map(a => ({id:a[0],nama:a[1],jenis:a[2],harga:a[3],durasi:a[4],deskripsi:a[5]})),
  pelanggan: [
    [1,'Rian Pratama','081211112222',25,5],[2,'Dewi Lestari','081322223333',12,3],
    [3,'Hendro Wijaya','081533334444',40,8],[4,'Nadia Maharani','081644445555',8,2]
  ].map(a => ({id:a[0],nama:a[1],telp:a[2],poin:a[3],kunjungan:a[4]})),
  antrean: [
    {id:1,kode:'WF-001',plat:'B 1234 ABC',nama:'Rian Pratama',idLayanan:2,harga:65000,status:'dicuci',waktu:'08:15'},
    {id:2,kode:'WF-002',plat:'B 4567 XYZ',nama:'Dewi Lestari',idLayanan:5,harga:20000,status:'menunggu',waktu:'08:30'},
    {id:3,kode:'WF-003',plat:'D 8890 KL',nama:'Hendro Wijaya',idLayanan:3,harga:95000,status:'selesai',waktu:'07:50'}
  ]
};
const DB = {
  get() { try { const d = JSON.parse(localStorage.getItem('wf_data')); if (d) return d; } catch (e) {}
          this.set(SEED); return JSON.parse(JSON.stringify(SEED)); },
  set(d) { localStorage.setItem('wf_data', JSON.stringify(d)); },
  reset() { localStorage.removeItem('wf_data'); }
};
const rp = n => 'Rp ' + new Intl.NumberFormat('id-ID').format(n);
const STATUS = {menunggu:['Menunggu','warning'], dicuci:['Sedang Dicuci','info'], selesai:['Selesai','success'], dibayar:['Dibayar','secondary']};
const badge = s => `<span class="badge bg-${STATUS[s][1]}">${STATUS[s][0]}</span>`;
const layananOf = (d, id) => d.layanan.find(l => l.id == id) || {nama:'-'};

const Layout = {
  mount(title, key) {
    const u = JSON.parse(sessionStorage.getItem('wf_user') || 'null');
if (!u) { location.href = 'login.html'; return; }
    const menu = [['dashboard','speedometer2','Dashboard'],['antrean','list-task','Antrean Kendaraan'],
      ['registrasi','plus-circle-dotted','Input Kendaraan'],['kasir','cash-coin','Kasir & Pembayaran'],
      ['pelanggan','people','Pelanggan'],['layanan','tags','Paket Layanan']];
    const tgl = new Date().toLocaleDateString('id-ID', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
    document.title = title + ' — WashFlow';
    document.getElementById('root').innerHTML = `
    <div class="sidebar-overlay"></div>
    <div id="wrapper">
      <aside id="sidebar">
        <div class="sidebar-brand"><a href="dashboard.html" class="brand-logo"><i class="bi bi-water text-info fs-3"></i><span class="brand-text">Wash<span>Flow</span></span></a></div>
        <div class="sidebar-menu">
          <div class="menu-header">Menu</div>
          ${menu.map(m => `<a href="${m[0]}.html" class="nav-link ${m[0]===key?'active':''}"><i class="bi bi-${m[1]}"></i><span class="nav-text">${m[2]}</span></a>`).join('')}
          <div class="menu-header">Portal Pelanggan</div>
          <a href="cek-status.html" target="_blank" class="nav-link"><i class="bi bi-qr-code-scan"></i><span class="nav-text">Cek Status Publik</span></a>
        </div>
        <div class="sidebar-footer d-flex align-items-center justify-content-between">
          <div class="text-white small fw-bold text-truncate">${u.nama}<div class="text-info fw-normal">${u.role}</div></div>
          <a href="login.html" data-logout class="btn btn-sm btn-outline-light border-0" data-confirm="Yakin ingin keluar?"><i class="bi bi-box-arrow-right fs-5"></i></a>
        </div>
      </aside>
      <div id="content-wrapper">
        <header id="topbar">
          <div class="d-flex align-items-center gap-3">
            <button id="sidebarToggle" class="btn btn-light btn-sm border-0 fs-5 p-2"><i class="bi bi-list"></i></button>
            <span class="text-muted small d-none d-md-inline"><i class="bi bi-calendar3 me-1"></i>${tgl} • <b id="liveClock" class="text-primary"></b></span>
          </div>
          <a href="registrasi.html" class="btn btn-sm btn-primary-wf"><i class="bi bi-plus-lg"></i> Input Kendaraan</a>
        </header>
        <main id="main-content"><div><h4 class="fw-bold mb-3">${title}</h4><div id="page"></div></div></main>
        <footer class="bg-white border-top py-3 px-4 text-muted small">WashFlow &copy; 2026 — Tampilan Frontend (HTML, CSS, JavaScript)</footer>
      </div>
    </div>`;
    document.querySelector('[data-logout]').addEventListener('click', () => sessionStorage.removeItem('wf_user'));
    return document.getElementById('page');
  }
};
