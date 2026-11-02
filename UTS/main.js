/**
 * WashFlow - Main Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Inisialisasi Tooltip Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // 2. Sidebar Toggle (Desktop & Mobile)
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function (e) {
            e.preventDefault();
            if (window.innerWidth < 992) {
                sidebar.classList.toggle('mobile-open');
                if (overlay) overlay.classList.toggle('active');
            } else {
                document.body.classList.toggle('sidebar-collapsed');
                // Simpan preferensi sidebar ke localStorage
                const isCollapsed = document.body.classList.contains('sidebar-collapsed');
                localStorage.setItem('wf_sidebar_collapsed', isCollapsed ? '1' : '0');
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function () {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
        });
    }

    // Restore preferensi sidebar
    if (localStorage.getItem('wf_sidebar_collapsed') === '1' && window.innerWidth >= 992) {
        document.body.classList.add('sidebar-collapsed');
    }

    // 3. Jam Digital Real-time di Topbar
    const liveClock = document.getElementById('liveClock');
    if (liveClock) {
        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            liveClock.textContent = `${hours}:${minutes}:${seconds} WIB`;
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    // 4. Live Table Search Filter (Client-side)
    const tableSearchInputs = document.querySelectorAll('[data-table-search]');
    tableSearchInputs.forEach(function (input) {
        const targetTableSelector = input.getAttribute('data-table-search');
        const targetTable = document.querySelector(targetTableSelector);

        if (targetTable) {
            input.addEventListener('keyup', function () {
                const term = this.value.toLowerCase().trim();
                const rows = targetTable.querySelectorAll('tbody tr');

                rows.forEach(function (row) {
                    const text = row.textContent.toLowerCase();
                    if (text.indexOf(term) > -1) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        }
    });

    // 5. Konfirmasi Dialog Global (Aman dari aksi tidak sengaja)
    document.querySelectorAll('[data-confirm]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            const message = this.getAttribute('data-confirm') || 'Apakah Anda yakin ingin melanjutkan tindakan ini?';
            if (!confirm(message)) {
                e.preventDefault();
                return false;
            }
        });
    });

    // 6. Format Input Plat Nomor Otomatis Huruf Kapital
    const plateInputs = document.querySelectorAll('.input-plat');
    plateInputs.forEach(function (input) {
        input.addEventListener('input', function () {
            this.value = this.value.toUpperCase();
        });
    });
});

/**
 * Format Rupiah Helper untuk JS
 */
function formatRupiahJs(number) {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(number);
}
