// === DATA ===
let currentRole = 'admin';
let selectedMethod = 'tatap';

const dosenMapping = {
  skripsi: 'Dr. Hj. Noorhapizah, M.Pd',
  proposal: 'Dr. Hj. Noorhapizah, M.Pd',
  matkul: 'Prof. Dr. H. Rusmansyah, M.Pd',
  ta: 'Dr. Ade Holis, M.Pd',
  penelitian: 'Dr. Syarifuddin, M.Pd',
  magang: 'Ibu Rizky Amelia, M.Pd',
  karier: 'Bapak Dedi Kuswanto, M.Si',
  organisasi: 'Bapak Faisal Anwar, M.Pd',
  media: 'Dr. Aslamiah, M.Pd, Ph.D',
  umum: 'Prof. Dr. H. Rusmansyah, M.Pd',
};

const konsultasiData = [
  { id:'K001', nim:'2110125110032', nama:'Ahmad Maulana', kategori:'Bimbingan Skripsi', topik:'Revisi metodologi BAB III', metode:'Tatap Muka', tanggal:'18 Jun 2025', dosen:'Dr. Hj. Noorhapizah', status:'pending' },
  { id:'K002', nim:'2110125110045', nama:'Siti Rahmawati', kategori:'Magang / PKL', topik:'Penentuan tempat PKL semester 7', metode:'Online', tanggal:'19 Jun 2025', dosen:'Ibu Rizky Amelia', status:'approved' },
  { id:'K003', nim:'2110125110018', nama:'Bagas Pramudita', kategori:'Bimbingan Proposal', topik:'Kerangka teori penelitian', metode:'Hybrid', tanggal:'20 Jun 2025', dosen:'Dr. Hj. Noorhapizah', status:'done' },
  { id:'K004', nim:'2110125110067', nama:'Nur Aini Fitriani', kategori:'Konsultasi Mata Kuliah', topik:'Pemahaman teori belajar konstruktivisme', metode:'Online', tanggal:'17 Jun 2025', dosen:'Prof. Dr. H. Rusmansyah', status:'rejected' },
  { id:'K005', nim:'2110125110089', nama:'Rizal Fauzi', kategori:'Konsultasi Penelitian', topik:'Validitas instrumen penelitian', metode:'Tatap Muka', tanggal:'21 Jun 2025', dosen:'Dr. Syarifuddin', status:'rescheduled' },
];

const mahasiswaData = [
  { nim:'2110125110032', nama:'Ahmad Maulana', prodi:'Teknologi Pendidikan', semester:7, email:'ahmad.m@mhs.ulm.ac.id' },
  { nim:'2110125110045', nama:'Siti Rahmawati', prodi:'Teknologi Pendidikan', semester:5, email:'siti.r@mhs.ulm.ac.id' },
  { nim:'2110125110018', nama:'Bagas Pramudita', prodi:'Teknologi Pendidikan', semester:7, email:'bagas.p@mhs.ulm.ac.id' },
  { nim:'2110125110067', nama:'Nur Aini Fitriani', prodi:'Teknologi Pendidikan', semester:3, email:'nuraini.f@mhs.ulm.ac.id' },
  { nim:'2110125110089', nama:'Rizal Fauzi', prodi:'Teknologi Pendidikan', semester:5, email:'rizal.f@mhs.ulm.ac.id' },
];

const dosenData = [
  { nip:'19780615200312001', nama:'Dr. Hj. Noorhapizah, M.Pd', bidang:'Metodologi Penelitian, Skripsi' },
  { nip:'19750920199903002', nama:'Prof. Dr. H. Rusmansyah, M.Pd', bidang:'Kurikulum & Pembelajaran' },
  { nip:'19820304200801003', nama:'Dr. Aslamiah, M.Pd, Ph.D', bidang:'Teknologi & Media Pembelajaran' },
  { nip:'19890112201403004', nama:'Ibu Rizky Amelia, M.Pd', bidang:'Magang & PKL' },
  { nip:'19860720201203005', nama:'Dr. Syarifuddin, M.Pd', bidang:'Penelitian & Pengembangan' },
];

const notifData = [
  { type:'success', icon:'fas fa-check-circle', text:'Pengajuan konsultasi Anda <strong>disetujui</strong> oleh Dr. Hj. Noorhapizah untuk tanggal 18 Juni 2025', time:'5 menit lalu', unread:true },
  { type:'info', icon:'fas fa-calendar', text:'Jadwal konsultasi Anda dengan Dr. Aslamiah dijadwalkan ulang ke 21 Juni 2025 pukul 10.00', time:'1 jam lalu', unread:true },
  { type:'teal', icon:'fas fa-file-alt', text:'Dokumen hasil konsultasi baru tersedia dari sesi Bimbingan Skripsi tanggal 10 Juni 2025', time:'Kemarin', unread:false },
  { type:'default', icon:'fas fa-bell', text:'Pengingat: Konsultasi besok dengan Prof. Dr. H. Rusmansyah pukul 09.00 WIB', time:'2 hari lalu', unread:false },
];

// === NAVIGATION ===
const navConfig = {
  admin: [
    { section: 'Utama', items: [
      { id:'dashboard', icon:'fas fa-th-large', label:'Dashboard' },
      { id:'konsultasi', icon:'fas fa-comments', label:'Semua Konsultasi', badge:'5' },
      { id:'notifikasi', icon:'fas fa-bell', label:'Notifikasi', badge:'2' },
    ]},
    { section: 'Manajemen', items: [
      { id:'mahasiswa', icon:'fas fa-user-graduate', label:'Data Mahasiswa' },
      { id:'dosen', icon:'fas fa-chalkboard-teacher', label:'Data Dosen' },
      { id:'kategori', icon:'fas fa-tags', label:'Kategori Konsultasi' },
      { id:'jadwal', icon:'fas fa-calendar-alt', label:'Jadwal Konsultasi' },
    ]},
    { section: 'Laporan', items: [
      { id:'laporan', icon:'fas fa-chart-bar', label:'Laporan & Statistik' },
    ]},
  ],
  dosen: [
    { section: 'Utama', items: [
      { id:'dashboard', icon:'fas fa-th-large', label:'Dashboard' },
      { id:'pengajuan', icon:'fas fa-inbox', label:'Pengajuan Masuk', badge:'3' },
      { id:'jadwal', icon:'fas fa-calendar-alt', label:'Jadwal Saya' },
      { id:'notifikasi', icon:'fas fa-bell', label:'Notifikasi', badge:'1' },
    ]},
    { section: 'Riwayat', items: [
      { id:'riwayat', icon:'fas fa-history', label:'Riwayat Konsultasi' },
      { id:'laporan', icon:'fas fa-chart-line', label:'Statistik Saya' },
    ]},
  ],
  mahasiswa: [
    { section: 'Utama', items: [
      { id:'dashboard', icon:'fas fa-th-large', label:'Dashboard' },
      { id:'ajukan', icon:'fas fa-plus-circle', label:'Ajukan Konsultasi' },
      { id:'status', icon:'fas fa-tasks', label:'Status Pengajuan' },
      { id:'notifikasi', icon:'fas fa-bell', label:'Notifikasi', badge:'2' },
    ]},
    { section: 'Riwayat', items: [
      { id:'riwayat', icon:'fas fa-history', label:'Riwayat Konsultasi' },
      { id:'jadwal', icon:'fas fa-calendar-alt', label:'Jadwal Saya' },
    ]},
  ],
};

const userConfig = {
  admin: { name:'Budi Santoso', role:'Administrator', avatar:'BS' },
  dosen: { name:'Dr. Hj. Noorhapizah', role:'Dosen Pembimbing', avatar:'NH' },
  mahasiswa: { name:'Ahmad Maulana', role:'Mahasiswa · Sem 7', avatar:'AM' },
};

// === AUTH LOGIC ===
let selectedRoleLogin = 'admin';
function selectRole(role, el) {
  selectedRoleLogin = role;
  document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function doLogin() {
  currentRole = selectedRoleLogin;
  document.getElementById('authPage').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');
  initApp();
}

function logout() {
  document.getElementById('authPage').classList.remove('hidden');
  document.getElementById('mainApp').classList.add('hidden');
}

// === FUNGSI MENU MOBILE ===
function toggleMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('mobile-open'); // Menambah/menghapus efek slide-in
}

// === ROUTING & RENDERER ===
function initApp() {
  const cfg = userConfig[currentRole];
  document.getElementById('sidebarName').textContent = cfg.name;
  document.getElementById('sidebarRole').textContent = cfg.role;
  document.getElementById('sidebarAvatar').textContent = cfg.avatar;
  document.getElementById('roleIndicator').textContent = '👤 ' + (currentRole === 'admin' ? 'Admin' : currentRole === 'dosen' ? 'Dosen' : 'Mahasiswa');
  buildNav();
  // Ubah fungsi showPage menjadi seperti ini:
function showPage(pageId) {
  document.querySelectorAll('.nav-item').forEach(i => { i.classList.toggle('active', i.dataset.page === pageId); });
  const titles = { dashboard:'Dashboard', konsultasi:'Semua Konsultasi', mahasiswa:'Data Mahasiswa', dosen:'Data Dosen', kategori:'Kategori Konsultasi', jadwal:'Jadwal Konsultasi', laporan:'Laporan & Statistik', notifikasi:'Notifikasi', pengajuan:'Pengajuan Masuk', riwayat:'Riwayat Konsultasi', ajukan:'Ajukan Konsultasi', status:'Status Pengajuan' };
  
  document.getElementById('pageTitle').textContent = titles[pageId] || pageId;
  document.getElementById('pageBreadcrumb').textContent = 'NARASA / ' + (titles[pageId] || pageId);
  
  const content = document.getElementById('pageContent');
  content.innerHTML = renderPage(pageId);
  
  if (pageId === 'dashboard') renderCharts();
  if (pageId === 'laporan') renderLaporanCharts();
  if (pageId === 'ajukan') { openModal('modalPengajuan'); showPage('dashboard'); }

  // LOGIKA BARU: Otomatis tutup sidebar di HP setelah menu diklik
  if (window.innerWidth <= 768) {
      document.querySelector('.sidebar').classList.remove('mobile-open');
  }
}
}

function buildNav() {
  const nav = document.getElementById('sidebarNav');
  nav.innerHTML = '';
  navConfig[currentRole].forEach(section => {
    const sec = document.createElement('div');
    sec.className = 'nav-section';
    sec.innerHTML = `<div class="nav-label">${section.section}</div>`;
    section.items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'nav-item';
      el.dataset.page = item.id;
      el.onclick = () => showPage(item.id);
      el.innerHTML = `<i class="${item.icon} nav-icon"></i><span>${item.label}</span>${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}`;
      sec.appendChild(el);
    });
    nav.appendChild(sec);
  });
}

function showPage(pageId) {
  document.querySelectorAll('.nav-item').forEach(i => { i.classList.toggle('active', i.dataset.page === pageId); });
  const titles = { dashboard:'Dashboard', konsultasi:'Semua Konsultasi', mahasiswa:'Data Mahasiswa', dosen:'Data Dosen', kategori:'Kategori Konsultasi', jadwal:'Jadwal Konsultasi', laporan:'Laporan & Statistik', notifikasi:'Notifikasi', pengajuan:'Pengajuan Masuk', riwayat:'Riwayat Konsultasi', ajukan:'Ajukan Konsultasi', status:'Status Pengajuan' };
  document.getElementById('pageTitle').textContent = titles[pageId] || pageId;
  document.getElementById('pageBreadcrumb').textContent = 'NARASA / ' + (titles[pageId] || pageId);
  const content = document.getElementById('pageContent');
  content.innerHTML = renderPage(pageId);
  if (pageId === 'dashboard') renderCharts();
  if (pageId === 'laporan') renderLaporanCharts();
  if (pageId === 'ajukan') { openModal('modalPengajuan'); showPage('dashboard'); }
}

function renderPage(page) {
  if (page === 'dashboard') return currentRole === 'admin' ? renderAdminDashboard() : currentRole === 'dosen' ? renderDosenDashboard() : renderMahasiswaDashboard();
  if (page === 'konsultasi' || page === 'riwayat' || page === 'status') return renderKonsultasiList();
  if (page === 'mahasiswa') return renderMahasiswaPage();
  if (page === 'dosen') return renderDosenPage();
  if (page === 'kategori') return renderKategoriPage();
  if (page === 'jadwal') return renderJadwalPage();
  if (page === 'laporan') return renderLaporanPage();
  if (page === 'notifikasi') return renderNotifikasiPage();
  if (page === 'pengajuan') return renderPengajuanDosenPage();
  return '<div class="empty-state"><i class="fas fa-tools"></i><p>Halaman ini sedang dalam pengembangan</p></div>';
}

function statusBadge(s) {
  const map = { pending:'badge-pending', approved:'badge-approved', rejected:'badge-rejected', done:'badge-done', rescheduled:'badge-rescheduled' };
  const label = { pending:'Menunggu', approved:'Disetujui', rejected:'Ditolak', done:'Selesai', rescheduled:'Dijadwal Ulang' };
  return `<span class="badge ${map[s]}">${label[s]}</span>`;
}

// ===============================================
// PARTISI HTML HALAMAN (DI-RENDER SEBAGAI STRING)
// ===============================================

// HALAMAN: DASHBOARD ADMIN
function renderAdminDashboard() {
  return `
  <div class="stat-grid">
    <div class="stat-card"><div class="stat-icon icon-blue"><i class="fas fa-user-graduate"></i></div><div class="label">Total Mahasiswa</div><div class="value">247</div><div class="trend trend-up"><i class="fas fa-arrow-up"></i> +12 bulan ini</div></div>
    <div class="stat-card"><div class="stat-icon icon-teal"><i class="fas fa-chalkboard-teacher"></i></div><div class="label">Total Dosen</div><div class="value">18</div><div class="trend trend-up"><i class="fas fa-arrow-up"></i> +2 semester ini</div></div>
    <div class="stat-card"><div class="stat-icon icon-green"><i class="fas fa-comments"></i></div><div class="label">Total Konsultasi</div><div class="value">1.284</div><div class="trend trend-up"><i class="fas fa-arrow-up"></i> +8.3% bulan ini</div></div>
    <div class="stat-card"><div class="stat-icon icon-amber"><i class="fas fa-clock"></i></div><div class="label">Konsultasi Aktif</div><div class="value">38</div><div class="trend trend-up"><i class="fas fa-arrow-up"></i> 5 baru hari ini</div></div>
    <div class="stat-card"><div class="stat-icon icon-teal"><i class="fas fa-check-double"></i></div><div class="label">Konsultasi Selesai</div><div class="value">1.091</div><div class="trend"><i class="fas fa-minus"></i> 84.9% completion rate</div></div>
  </div>
  <div class="grid-3">
    <div class="card">
      <div class="card-header"><h3>Konsultasi Bulanan</h3><span class="badge badge-teal">2025</span></div>
      <div class="card-body"><div style="position:relative;height:260px"><canvas id="chartBulanan" role="img" aria-label="Grafik konsultasi bulanan 2025">Data konsultasi per bulan.</canvas></div></div>
    </div>
    <div>
      <div class="card mb-2">
        <div class="card-header"><h3>Kategori Konsultasi</h3></div>
        <div class="card-body"><div style="position:relative;height:170px"><canvas id="chartKategori" role="img" aria-label="Distribusi kategori konsultasi">Distribusi kategori.</canvas></div></div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Aktivitas Terbaru</h3></div>
        <div class="card-body">
          ${konsultasiData.slice(0,3).map(k=>`
          <div class="flex items-center gap-2" style="margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid var(--border)">
            <div class="user-avatar" style="width:30px;height:30px;font-size:0.7rem">${k.nama.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
            <div style="flex:1"><p style="font-size:0.8rem;font-weight:600">${k.nama}</p><p class="text-sm">${k.kategori}</p></div>
            ${statusBadge(k.status)}
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><h3>Dosen Paling Aktif</h3></div>
      <div class="card-body">
        ${dosenData.map((d,i)=>`<div style="margin-bottom:12px"><div class="flex items-center justify-between mb-1"><span style="font-size:0.82rem;font-weight:500">${d.nama.split(',')[0]}</span><span class="text-sm">${[42,37,29,21,18][i]} konsultasi</span></div><div class="progress-bar"><div class="progress-fill" style="width:${[100,88,69,50,43][i]}%"></div></div></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Kalender Juni 2025</h3></div>
      <div class="card-body">${renderCalendar()}</div>
    </div>
  </div>`;
}

// HALAMAN: DASHBOARD DOSEN
function renderDosenDashboard() {
  return `
  <div class="stat-grid">
    <div class="stat-card"><div class="stat-icon icon-teal"><i class="fas fa-users"></i></div><div class="label">Total Mahasiswa Bimbingan</div><div class="value">32</div></div>
    <div class="stat-card"><div class="stat-icon icon-blue"><i class="fas fa-calendar-day"></i></div><div class="label">Konsultasi Hari Ini</div><div class="value">3</div></div>
    <div class="stat-card"><div class="stat-icon icon-green"><i class="fas fa-calendar-alt"></i></div><div class="label">Bulan Ini</div><div class="value">24</div></div>
    <div class="stat-card"><div class="stat-icon icon-amber"><i class="fas fa-hourglass-half"></i></div><div class="label">Menunggu Persetujuan</div><div class="value">5</div></div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><h3>Pengajuan Menunggu Persetujuan</h3><button class="btn btn-sm btn-teal" onclick="showPage('pengajuan')">Lihat Semua</button></div>
      <div class="card-body">
        ${konsultasiData.filter(k=>k.status==='pending').map(k=>`
        <div style="background:var(--bg);border-radius:8px;padding:12px;margin-bottom:8px">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="user-avatar" style="width:32px;height:32px;font-size:0.72rem">${k.nama.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
              <div><p style="font-size:0.82rem;font-weight:600">${k.nama}</p><p class="text-sm">${k.topik}</p></div>
            </div>
            <button class="btn btn-sm btn-teal" onclick="openModal('modalDetail')">Tinjau</button>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div>
      <div class="card mb-2">
        <div class="card-header"><h3>Jadwal Konsultasi Hari Ini</h3></div>
        <div class="card-body">
          <div style="background:var(--teal-soft);border-left:3px solid var(--teal);padding:10px;border-radius:0 8px 8px 0;margin-bottom:8px">
            <p style="font-size:0.82rem;font-weight:600">09.00 – Siti Rahmawati</p>
            <p class="text-sm">Magang / PKL · Online</p>
          </div>
          <div style="background:var(--bg);border-left:3px solid var(--border);padding:10px;border-radius:0 8px 8px 0;margin-bottom:8px">
            <p style="font-size:0.82rem;font-weight:600">13.00 – Ahmad Maulana</p>
            <p class="text-sm">Bimbingan Skripsi · Tatap Muka</p>
          </div>
          <div style="background:var(--bg);border-left:3px solid var(--border);padding:10px;border-radius:0 8px 8px 0">
            <p style="font-size:0.82rem;font-weight:600">15.30 – Bagas Pramudita</p>
            <p class="text-sm">Bimbingan Proposal · Hybrid</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Kalender Juni 2025</h3></div>
        <div class="card-body">${renderCalendar()}</div>
      </div>
    </div>
  </div>`;
}

// HALAMAN: DASHBOARD MAHASISWA
function renderMahasiswaDashboard() {
  return `
  <div class="stat-grid">
    <div class="stat-card"><div class="stat-icon icon-teal"><i class="fas fa-comments"></i></div><div class="label">Total Konsultasi</div><div class="value">12</div></div>
    <div class="stat-card"><div class="stat-icon icon-green"><i class="fas fa-check-circle"></i></div><div class="label">Disetujui</div><div class="value">8</div></div>
    <div class="stat-card"><div class="stat-icon icon-amber"><i class="fas fa-clock"></i></div><div class="label">Menunggu</div><div class="value">2</div></div>
    <div class="stat-card"><div class="stat-icon icon-blue"><i class="fas fa-flag-checkered"></i></div><div class="label">Selesai</div><div class="value">7</div></div>
  </div>
  <div style="background:linear-gradient(135deg,#0f172a,#0f4a43);border-radius:var(--radius);padding:1.5rem;margin-bottom:1rem;color:white;position:relative;overflow:hidden">
    <div style="position:absolute;right:-20px;top:-20px;width:120px;height:120px;border-radius:50%;background:rgba(20,184,166,0.2)"></div>
    <p style="font-size:0.78rem;color:rgba(255,255,255,0.6);margin-bottom:4px">Konsultasi Berikutnya</p>
    <h2 style="font-size:1.3rem;margin-bottom:4px">Bimbingan Skripsi</h2>
    <p style="font-size:0.88rem;color:rgba(255,255,255,0.7)">Rabu, 18 Juni 2025 · 09.00 WIB · Tatap Muka</p>
    <p style="font-size:0.82rem;color:rgba(255,255,255,0.6);margin-top:6px">Dosen: Dr. Hj. Noorhapizah, M.Pd</p>
    <button class="btn btn-sm" style="margin-top:12px;background:var(--teal);color:white;border:none" onclick="openModal('modalHasil')"><i class="fas fa-eye"></i> Lihat Detail</button>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><h3>Status Terbaru</h3><button class="btn btn-sm btn-teal" onclick="openModal('modalPengajuan')"><i class="fas fa-plus"></i> Ajukan</button></div>
      <div class="card-body">
        ${konsultasiData.slice(0,4).map(k=>`
        <div class="flex items-center gap-2" style="padding:8px 0;border-bottom:1px solid var(--border)">
          <i class="fas fa-circle" style="font-size:6px;color:${k.status==='approved'?'var(--success)':k.status==='pending'?'var(--warning)':k.status==='done'?'var(--teal)':'var(--danger)'}"></i>
          <div style="flex:1"><p style="font-size:0.82rem;font-weight:500">${k.kategori}</p><p class="text-sm">${k.tanggal}</p></div>
          ${statusBadge(k.status)}
        </div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Alur Pengajuan</h3></div>
      <div class="card-body">
        <div class="timeline">
          <div class="timeline-item"><div class="timeline-dot done"></div><div class="timeline-content"><p>Login & Buka Dashboard</p><span>Selesai</span></div></div>
          <div class="timeline-item"><div class="timeline-dot done"></div><div class="timeline-content"><p>Pilih Kategori Konsultasi</p><span>Sistem cocokkan dosen otomatis</span></div></div>
          <div class="timeline-item"><div class="timeline-dot done"></div><div class="timeline-content"><p>Isi Form & Upload Dokumen</p><span>Selesai</span></div></div>
          <div class="timeline-item"><div class="timeline-dot pending"></div><div class="timeline-content"><p>Menunggu Persetujuan Dosen</p><span>Dalam proses...</span></div></div>
          <div class="timeline-item"><div class="timeline-dot empty"></div><div class="timeline-content"><p>Sesi Konsultasi</p><span>Belum dimulai</span></div></div>
          <div class="timeline-item"><div class="timeline-dot empty"></div><div class="timeline-content"><p>Terima Hasil & Catatan Dosen</p><span>Belum</span></div></div>
        </div>
      </div>
    </div>
  </div>`;
}

// HALAMAN: DAFTAR KONSULTASI
function renderKonsultasiList() {
  return `
  <div class="card">
    <div class="card-header">
      <h3>Daftar Konsultasi</h3>
      <div class="flex gap-2">
        <button class="btn btn-sm btn-outline"><i class="fas fa-file-excel"></i> Export Excel</button>
        <button class="btn btn-sm btn-outline"><i class="fas fa-file-pdf"></i> Export PDF</button>
        ${currentRole === 'mahasiswa' ? `<button class="btn btn-sm btn-teal" onclick="openModal('modalPengajuan')"><i class="fas fa-plus"></i> Ajukan Baru</button>` : ''}
      </div>
    </div>
    <div class="card-body">
      <div class="search-row">
        <div class="search-input"><i class="fas fa-search"></i><input type="text" placeholder="Cari konsultasi..."></div>
        <select class="btn btn-outline" style="padding:8px 12px"><option>Semua Status</option><option>Menunggu</option><option>Disetujui</option><option>Selesai</option><option>Ditolak</option></select>
        <select class="btn btn-outline" style="padding:8px 12px"><option>Semua Kategori</option><option>Skripsi</option><option>Proposal</option><option>Magang</option></select>
      </div>
      <div class="table-container">
        <table>
          <thead><tr><th>ID</th><th>Mahasiswa</th><th>Kategori</th><th>Topik</th><th>Dosen</th><th>Metode</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            ${konsultasiData.map(k=>`<tr>
              <td><span class="badge badge-gray">${k.id}</span></td>
              <td><div class="flex items-center gap-2"><div class="user-avatar" style="width:28px;height:28px;font-size:0.65rem">${k.nama.split(' ').map(n=>n[0]).join('').slice(0,2)}</div><div><p style="font-weight:600;font-size:0.82rem">${k.nama}</p><p class="text-sm">${k.nim}</p></div></div></td>
              <td>${k.kategori}</td>
              <td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${k.topik}</td>
              <td>${k.dosen}</td>
              <td><span class="badge badge-gray">${k.metode}</span></td>
              <td>${k.tanggal}</td>
              <td>${statusBadge(k.status)}</td>
              <td><div class="flex gap-2">
                <button class="btn btn-ghost btn-sm" onclick="openModal('modalDetail')" title="Lihat"><i class="fas fa-eye"></i></button>
                ${currentRole!=='mahasiswa'?`<button class="btn btn-ghost btn-sm" onclick="openModal('modalHasil')" title="Isi Hasil"><i class="fas fa-edit"></i></button>`:''}
              </div></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

// HALAMAN: DATA MAHASISWA
function renderMahasiswaPage() {
  return `
  <div class="card">
    <div class="card-header"><h3>Data Mahasiswa</h3><button class="btn btn-sm btn-teal"><i class="fas fa-plus"></i> Tambah Mahasiswa</button></div>
    <div class="card-body">
      <div class="search-row"><div class="search-input"><i class="fas fa-search"></i><input type="text" placeholder="Cari mahasiswa..."></div></div>
      <div class="table-container">
        <table>
          <thead><tr><th>#</th><th>NIM</th><th>Nama</th><th>Program Studi</th><th>Semester</th><th>Email</th><th>Aksi</th></tr></thead>
          <tbody>
            ${mahasiswaData.map((m,i)=>`<tr>
              <td>${i+1}</td>
              <td><code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-size:0.78rem">${m.nim}</code></td>
              <td><div class="flex items-center gap-2"><div class="user-avatar" style="width:28px;height:28px;font-size:0.65rem">${m.nama.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>${m.nama}</div></td>
              <td>${m.prodi}</td>
              <td><span class="badge badge-teal">Semester ${m.semester}</span></td>
              <td>${m.email}</td>
              <td><div class="flex gap-2"><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button><button class="btn btn-ghost btn-sm" style="color:var(--danger)"><i class="fas fa-trash"></i></button></div></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

// HALAMAN: DATA DOSEN
function renderDosenPage() {
  return `
  <div class="card">
    <div class="card-header"><h3>Data Dosen</h3><button class="btn btn-sm btn-teal"><i class="fas fa-plus"></i> Tambah Dosen</button></div>
    <div class="card-body">
      <div class="table-container">
        <table>
          <thead><tr><th>#</th><th>NIP</th><th>Nama</th><th>Bidang Keahlian</th><th>Aksi</th></tr></thead>
          <tbody>
            ${dosenData.map((d,i)=>`<tr>
              <td>${i+1}</td>
              <td><code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-size:0.78rem">${d.nip}</code></td>
              <td><div class="flex items-center gap-2"><div class="user-avatar" style="width:28px;height:28px;font-size:0.65rem">${d.nama.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>${d.nama}</div></td>
              <td>${d.bidang}</td>
              <td><div class="flex gap-2"><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button><button class="btn btn-ghost btn-sm" style="color:var(--danger)"><i class="fas fa-trash"></i></button></div></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

// HALAMAN: KATEGORI
function renderKategoriPage() {
  const kategori = [
    { nama:'Bimbingan Skripsi', dosen:'Dr. Hj. Noorhapizah, M.Pd', tipe:'Akademik', total:42 },
    { nama:'Bimbingan Proposal', dosen:'Dr. Hj. Noorhapizah, M.Pd', tipe:'Akademik', total:28 },
    { nama:'Konsultasi Mata Kuliah', dosen:'Prof. Dr. H. Rusmansyah, M.Pd', tipe:'Akademik', total:35 },
    { nama:'Konsultasi Tugas Akhir', dosen:'Dr. Ade Holis, M.Pd', tipe:'Akademik', total:19 },
    { nama:'Konsultasi Penelitian', dosen:'Dr. Syarifuddin, M.Pd', tipe:'Akademik', total:24 },
    { nama:'Magang / PKL', dosen:'Ibu Rizky Amelia, M.Pd', tipe:'Non Akademik', total:31 },
    { nama:'Karier & Pengembangan Diri', dosen:'Bapak Dedi Kuswanto, M.Si', tipe:'Non Akademik', total:17 },
    { nama:'Organisasi & Kepemimpinan', dosen:'Bapak Faisal Anwar, M.Pd', tipe:'Non Akademik', total:9 },
    { nama:'Pengembangan Media Pembelajaran', dosen:'Dr. Aslamiah, M.Pd, Ph.D', tipe:'Non Akademik', total:21 },
    { nama:'Konsultasi Umum Mahasiswa', dosen:'Prof. Dr. H. Rusmansyah, M.Pd', tipe:'Non Akademik', total:13 },
  ];
  return `<div class="card"><div class="card-header"><h3>Kategori Konsultasi</h3><button class="btn btn-sm btn-teal"><i class="fas fa-plus"></i> Tambah Kategori</button></div><div class="card-body"><div class="table-container"><table><thead><tr><th>#</th><th>Kategori</th><th>Tipe</th><th>Dosen Bertanggung Jawab</th><th>Total Konsultasi</th><th>Aksi</th></tr></thead><tbody>
    ${kategori.map((k,i)=>`<tr><td>${i+1}</td><td><b>${k.nama}</b></td><td><span class="badge ${k.tipe==='Akademik'?'badge-teal':'badge-approved'}">${k.tipe}</span></td><td>${k.dosen}</td><td><b>${k.total}</b></td><td><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></td></tr>`).join('')}
  </tbody></table></div></div></div>`;
}

// HALAMAN: JADWAL KONSULTASI
function renderJadwalPage() {
  return `
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><h3>Kalender Juni 2025</h3></div>
      <div class="card-body">${renderCalendar()}</div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Jadwal Konsultasi</h3></div>
      <div class="card-body">
        ${konsultasiData.filter(k=>k.status!=='rejected').map(k=>`
        <div style="border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:8px">
          <div class="flex items-center justify-between">
            <div>
              <p style="font-size:0.85rem;font-weight:600">${k.nama}</p>
              <p class="text-sm">${k.kategori} · ${k.metode}</p>
              <p class="text-sm" style="margin-top:2px"><i class="fas fa-calendar" style="margin-right:4px"></i>${k.tanggal}</p>
            </div>
            ${statusBadge(k.status)}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

// HALAMAN: LAPORAN
function renderLaporanPage() {
  return `
  <div class="stat-grid">
    <div class="stat-card"><div class="stat-icon icon-teal"><i class="fas fa-chart-line"></i></div><div class="label">Total Konsultasi (2025)</div><div class="value">1.284</div></div>
    <div class="stat-card"><div class="stat-icon icon-green"><i class="fas fa-percentage"></i></div><div class="label">Tingkat Penyelesaian</div><div class="value">84.9%</div></div>
    <div class="stat-card"><div class="stat-icon icon-blue"><i class="fas fa-clock"></i></div><div class="label">Rata-rata Waktu Respons</div><div class="value">1.2 hari</div></div>
    <div class="stat-card"><div class="stat-icon icon-amber"><i class="fas fa-star"></i></div><div class="label">Kepuasan (avg)</div><div class="value">4.7/5</div></div>
  </div>
  <div class="grid-2">
    <div class="card"><div class="card-header"><h3>Konsultasi per Bulan</h3><button class="btn btn-sm btn-outline"><i class="fas fa-download"></i> Unduh</button></div><div class="card-body"><div style="position:relative;height:260px"><canvas id="chartLaporan" role="img" aria-label="Grafik konsultasi per bulan">Data per bulan.</canvas></div></div></div>
    <div class="card"><div class="card-header"><h3>Distribusi Kategori</h3></div><div class="card-body"><div style="position:relative;height:260px"><canvas id="chartLaporanPie" role="img" aria-label="Distribusi kategori konsultasi">Data kategori.</canvas></div></div></div>
  </div>
  <div class="card" style="margin-top:1rem">
    <div class="card-header"><h3>Rekap Konsultasi per Dosen</h3><div class="flex gap-2"><button class="btn btn-sm btn-outline"><i class="fas fa-file-excel"></i> Excel</button><button class="btn btn-sm btn-outline"><i class="fas fa-file-pdf"></i> PDF</button></div></div>
    <div class="card-body">
      <div class="table-container"><table><thead><tr><th>Dosen</th><th>Total</th><th>Selesai</th><th>Ditolak</th><th>Rata-rata/Bulan</th><th>Progress</th></tr></thead>
      <tbody>
        ${dosenData.map((d,i)=>{const t=[42,37,29,21,18][i];return`<tr><td>${d.nama.split(',')[0]}</td><td><b>${t}</b></td><td>${Math.floor(t*0.85)}</td><td>${Math.floor(t*0.05)}</td><td>${(t/6).toFixed(1)}</td><td><div class="progress-bar" style="width:120px"><div class="progress-fill" style="width:${[100,88,69,50,43][i]}%"></div></div></td></tr>`}).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

// HALAMAN: NOTIFIKASI
function renderNotifikasiPage() {
  return `
  <div class="card" style="max-width:700px">
    <div class="card-header"><h3>Notifikasi</h3><button class="btn btn-sm btn-ghost"><i class="fas fa-check-double"></i> Tandai semua dibaca</button></div>
    <div class="card-body">
      <div class="notif-list">
        ${notifData.map(n=>`
        <div class="notif-item ${n.unread?'notif-unread':''}">
          <div class="notif-icon ${n.type==='success'?'icon-green':n.type==='info'?'icon-blue':'icon-teal'}"><i class="${n.icon}"></i></div>
          <div class="notif-content">
            <p>${n.text}</p>
            <span><i class="fas fa-clock" style="margin-right:4px"></i>${n.time}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

// HALAMAN: PENGAJUAN (DOSEN)
function renderPengajuanDosenPage() {
  return `
  <div class="tabs">
    <div class="tab active">Menunggu Persetujuan (3)</div>
    <div class="tab">Disetujui (8)</div>
    <div class="tab">Perlu Tindak Lanjut (2)</div>
  </div>
  ${konsultasiData.filter(k=>k.status==='pending').map(k=>`
  <div class="card mb-2">
    <div class="card-body">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="user-avatar" style="width:44px;height:44px">${k.nama.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
          <div>
            <p style="font-weight:700">${k.nama}</p>
            <p class="text-sm">${k.nim}</p>
            <div class="flex gap-2" style="margin-top:4px">
              <span class="badge badge-teal">${k.kategori}</span>
              <span class="badge badge-gray">${k.metode}</span>
            </div>
          </div>
        </div>
        <div style="text-align:right">
          <p class="text-sm">Diajukan untuk</p>
          <p style="font-weight:600;font-size:0.88rem">${k.tanggal}</p>
          <div class="flex gap-2" style="margin-top:8px;justify-content:flex-end">
            <button class="btn btn-sm btn-danger" onclick=""><i class="fas fa-times"></i> Tolak</button>
            <button class="btn btn-sm btn-outline" onclick=""><i class="fas fa-calendar"></i> Jadwal Ulang</button>
            <button class="btn btn-sm btn-teal" onclick="openModal('modalDetail')"><i class="fas fa-check"></i> Setujui</button>
          </div>
        </div>
      </div>
      <div style="background:var(--bg);border-radius:8px;padding:10px;margin-top:10px">
        <p class="text-sm mb-1">Topik Konsultasi</p>
        <p style="font-size:0.85rem;font-weight:500">${k.topik}</p>
      </div>
    </div>
  </div>`).join('')}`;
}

// KOMPONEN: KALENDER
function renderCalendar() {
  const days = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
  const events = [3,10,14,18,20,21,25];
  let html = `<div class="flex items-center justify-between mb-2"><button class="btn btn-ghost btn-sm"><i class="fas fa-chevron-left"></i></button><span style="font-size:0.85rem;font-weight:600">Juni 2025</span><button class="btn btn-ghost btn-sm"><i class="fas fa-chevron-right"></i></button></div>`;
  html += `<div class="cal-header">${days.map(d=>`<div class="cal-day-label">${d}</div>`).join('')}</div>`;
  html += `<div class="calendar-grid">`;
  const startDay = 0; // June 2025 starts Sunday
  for (let i=0; i<startDay; i++) html += `<div class="cal-day other-month">${30-startDay+i+1}</div>`;
  for (let d=1; d<=30; d++) {
    const isToday = d===14;
    const hasEv = events.includes(d);
    html += `<div class="cal-day ${isToday?'today':''} ${hasEv&&!isToday?'has-event':''}">${d}</div>`;
  }
  html += `</div>`;
  return html;
}

// === INISIALISASI CHARTS ===
function renderCharts() {
  setTimeout(() => {
    const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
    const data = [78,92,105,88,112,134,98,116,142,89,107,123];
    const ctx = document.getElementById('chartBulanan');
    if (ctx) new Chart(ctx, {
      type:'bar',
      data:{ labels:months, datasets:[{ label:'Konsultasi', data, backgroundColor:'rgba(20,184,166,0.8)', borderRadius:6, borderSkipped:false }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false} }, scales:{ y:{grid:{color:'rgba(0,0,0,0.05)'},ticks:{font:{size:11}}}, x:{grid:{display:false},ticks:{font:{size:11}}} } }
    });
    const ctx2 = document.getElementById('chartKategori');
    if (ctx2) new Chart(ctx2, {
      type:'doughnut',
      data:{ labels:['Skripsi','Proposal','Matkul','Magang','Lainnya'], datasets:[{ data:[42,28,35,31,20], backgroundColor:['#14B8A6','#3b82f6','#22c55e','#f59e0b','#94a3b8'], borderWidth:0 }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{position:'bottom',labels:{boxWidth:10,font:{size:11}}} }, cutout:'65%' }
    });
  }, 100);
}

function renderLaporanCharts() {
  setTimeout(() => {
    const months = ['Jan','Feb','Mar','Apr','Mei','Jun'];
    const ctx = document.getElementById('chartLaporan');
    if (ctx) new Chart(ctx, {
      type:'line',
      data:{ labels:months, datasets:[{ label:'Konsultasi', data:[78,92,105,88,112,134], borderColor:'#14B8A6', backgroundColor:'rgba(20,184,166,0.1)', fill:true, tension:0.4, pointBackgroundColor:'#14B8A6', pointRadius:4 }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false} }, scales:{ y:{grid:{color:'rgba(0,0,0,0.05)'}}, x:{grid:{display:false}} } }
    });
    const ctx2 = document.getElementById('chartLaporanPie');
    if (ctx2) new Chart(ctx2, {
      type:'pie',
      data:{ labels:['Skripsi','Magang','Matkul','Proposal','Penelitian','Lainnya'], datasets:[{ data:[42,31,35,28,24,60], backgroundColor:['#14B8A6','#3b82f6','#22c55e','#f59e0b','#8b5cf6','#94a3b8'], borderWidth:2, borderColor:'#fff' }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{position:'right',labels:{boxWidth:12,font:{size:11}}} } }
    });
  }, 100);
}

// === UTILITY / LOGIKA UI MODAL ===
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(m => { m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); }); });

function matchDosen(val) {
  const dosen = dosenMapping[val] || '';
  const chip = document.getElementById('dosenChip');
  const input = document.getElementById('formDosen');
  if (dosen) {
    chip.style.display = 'inline-flex';
    document.getElementById('dosenChipName').textContent = dosen;
    input.style.display = 'none';
  } else {
    chip.style.display = 'none';
    input.style.display = 'block';
    input.value = '';
  }
}

function selectMethod(el, method) {
  selectedMethod = method;
  document.querySelectorAll('.method-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

function submitKonsultasi() {
  closeModal('modalPengajuan');
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#0f172a;color:white;padding:12px 20px;border-radius:10px;font-size:0.85rem;z-index:9999;display:flex;align-items:center;gap:10px;box-shadow:0 8px 32px rgba(0,0,0,0.3)';
  toast.innerHTML = '<i class="fas fa-check-circle" style="color:#14B8A6"></i> Pengajuan konsultasi berhasil dikirim!';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Tambahkan event listener untuk menampilkan nama file yang dipilih
document.addEventListener('change', function(e) {
  if(e.target.id === 'fileDokumen') {
      const fileName = e.target.files[0] ? e.target.files[0].name : '';
      document.getElementById('namaFileTerpilih').textContent = fileName;
  }
});

// Ubah fungsi submit
async function submitKonsultasi() {
  const topik = document.getElementById('formTopik').value;
  const deskripsi = document.getElementById('formDesc').value;
  const fileInput = document.getElementById('fileDokumen');
  
  if (!topik || fileInput.files.length === 0) {
      alert("Topik dan Dokumen wajib diisi!");
      return;
  }

  // Bungkus data ke dalam FormData
  const formData = new FormData();
  formData.append('topik', topik);
  formData.append('deskripsi', deskripsi);
  formData.append('metode', selectedMethod);
  formData.append('dokumen', fileInput.files[0]);

  try {
      // Kirim data ke PHP
      const response = await fetch('proses_pengajuan.php', {
          method: 'POST',
          body: formData
      });
      
      const result = await response.json();
      
      if(result.status === 'success') {
          closeModal('modalPengajuan');
          alert(result.pesan); // Tampilkan pesan sukses dari server
          
          // Reset form
          document.getElementById('formTopik').value = '';
          document.getElementById('formDesc').value = '';
          document.getElementById('namaFileTerpilih').textContent = '';
          fileInput.value = '';
      } else {
          alert(result.pesan);
      }
  } catch (error) {
      console.error('Error:', error);
      alert("Terjadi kesalahan pada server.");
  }
}

const carouselData = [
  {
    title: "Platform Konsultasi Digital Terintegrasi",
    desc: "Menghubungkan mahasiswa, dosen, dan program studi<br>dalam ekosistem konsultasi akademik yang cerdas."
  },
  {
    title: "Pantau Progres Akademikmu",
    desc: "Dapatkan arahan langsung dari dosen pembimbing<br>dan pantau status pengajuan secara real-time."
  },
  {
    title: "Jadwal Terkelola dengan Baik",
    desc: "Sistem penjadwalan cerdas yang menyesuaikan<br>waktu luang antara mahasiswa dan dosen."
  }
];

let currentCarousel = 0;
let carouselInterval;

function changeCarousel(index) {
  currentCarousel = index;
  const titleEl = document.getElementById('carouselTitle');
  const descEl = document.getElementById('carouselDesc');
  const dots = document.querySelectorAll('#carouselDots span');

  // Perbarui status titik (dot) yang aktif
  dots.forEach((dot, i) => {
    dot.className = i === index ? 'active' : '';
  });

  titleEl.style.opacity = '0';
  descEl.style.opacity = '0';
  
  setTimeout(() => {
    titleEl.innerHTML = carouselData[index].title;
    descEl.innerHTML = carouselData[index].desc;
    titleEl.style.opacity = '1';
    descEl.style.opacity = '1';
  }, 300);

  resetCarouselInterval();
}

function resetCarouselInterval() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(() => {
    let nextIndex = (currentCarousel + 1) % carouselData.length;
    changeCarousel(nextIndex);
  }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  resetCarouselInterval();
});