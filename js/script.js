document.addEventListener('DOMContentLoaded', () => {
    // Fungsi untuk mengelola transisi halaman
    const handlePageTransition = (targetPage) => {
        // Tambahkan kelas untuk memicu animasi "keluar" pada halaman saat ini
        document.body.classList.remove('page-transition-out');
        document.body.classList.add('page-transition-in');

        // Setelah animasi transisi "keluar" selesai, baru navigasi ke halaman baru
        // Durasi timeout harus sesuai dengan --transition-duration-page di CSS (1000ms = 1 detik)
        setTimeout(() => {
            window.location.href = targetPage;
        }, 1000); 
    };

    // Menangani klik pada semua tautan navigasi dan tombol yang memiliki atribut data-page
    document.querySelectorAll('a.nav-link, a.button[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetPage = e.currentTarget.getAttribute('href');

            // Mencegah navigasi default browser
            e.preventDefault(); 
            
            // Cek apakah link mengarah ke halaman yang sama atau anchor link
            // Jika ya, tidak perlu transisi halaman penuh, cukup scroll ke atas atau lakukan efek lain jika ada
            if (window.location.pathname.endsWith(targetPage) || targetPage.startsWith('#')) {
                console.log('Already on this page or is an anchor link. No full page transition needed.');
                // Opsional: Jika ada bagian di halaman yang ingin di-scroll ke atas, bisa tambahkan di sini
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            // Panggil fungsi transisi halaman
            handlePageTransition(targetPage);
        });
    });

    // Mengatur kelas 'active' pada tautan navigasi berdasarkan URL saat ini
    const setActiveNavLink = () => {
        const currentPath = window.location.pathname.split('/').pop(); // Ambil nama file dari URL
        
        document.querySelectorAll('.nav-link').forEach(link => {
            // Cek jika href link cocok dengan nama file saat ini
            // Tambahan kondisi untuk 'index.html' jika path kosong
            if (link.getAttribute('href') === currentPath || (currentPath === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Panggil fungsi set active nav link saat DOM dimuat dan saat popstate (misal, tombol back/forward browser)
    setActiveNavLink();
    window.addEventListener('popstate', setActiveNavLink);


    // Memicu animasi "masuk" halaman saat DOM sepenuhnya dimuat
    // Ini menghilangkan kelas 'page-transition-in' yang ada di body (dari halaman sebelumnya)
    // dan menambahkan 'page-transition-out' untuk memulai animasi masuk
    document.body.classList.remove('page-transition-in');
    document.body.classList.add('page-transition-out');

    // Catatan: Efek 'fade-in-text', 'fade-in-button', 'fade-in-element'
    // yang memiliki delay, sudah dihandle oleh CSS dengan `animation-delay`
    // sehingga tidak perlu JavaScript khusus untuk memicu mereka setelah page load.
    // Jika ada animasi on-scroll di masa depan, Anda bisa tambahkan Intersection Observer di sini.
});