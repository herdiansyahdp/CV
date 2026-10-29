(() => {
  'use strict';

  // 1. Tandai halaman aktif di navbar berdasarkan atribut data-page pada body.
  const currentPage = document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // 2. Tahun footer otomatis mengikuti tahun sekarang.
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  // 3. Dark mode. Pilihan tema disimpan di localStorage browser.
  const themeButtons = document.querySelectorAll('[data-theme-toggle]');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('portfolio-theme');
  const initialTheme = savedTheme === 'dark' || savedTheme === 'light'
    ? savedTheme
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function applyTheme(theme) {
    root.setAttribute('data-bs-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    themeButtons.forEach((button) => {
      const icon = button.querySelector('[data-theme-icon]');
      const label = button.querySelector('[data-theme-label]');
      if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
      if (label) label.textContent = theme === 'dark' ? 'Mode terang' : 'Mode gelap';
      button.setAttribute('aria-label', theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    });
  }
  applyTheme(initialTheme);
  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  });

  // 4. Efek teks berganti di hero. Dinonaktifkan jika pengguna memilih reduced motion.
  const typedNode = document.getElementById('typedRole');
  const roles = ['membangun web', 'memecahkan masalah', 'belajar hal baru'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typedNode && !reduceMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;
    const typeTick = () => {
      const word = roles[roleIndex];
      if (deleting) {
        charIndex -= 1;
        typedNode.textContent = word.slice(0, Math.max(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          window.setTimeout(typeTick, 350);
          return;
        }
        window.setTimeout(typeTick, 45);
      } else {
        const nextWord = roles[roleIndex];
        charIndex += 1;
        typedNode.textContent = nextWord.slice(0, charIndex);
        if (charIndex >= nextWord.length) {
          deleting = true;
          window.setTimeout(typeTick, 1500);
          return;
        }
        window.setTimeout(typeTick, 70);
      }
    };
    window.setTimeout(typeTick, 1800);
  }

  // 5. Filter kategori proyek di blog.html.
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectItems = document.querySelectorAll('.project-item[data-category]');
  const projectCount = document.getElementById('projectCount');
  const emptyFilter = document.getElementById('emptyFilter');
  if (filterButtons.length && projectItems.length) {
    const filterProjects = (category) => {
      let visible = 0;
      projectItems.forEach((item) => {
        const show = category === 'all' || item.dataset.category === category;
        item.hidden = !show;
        if (show) visible += 1;
      });
      filterButtons.forEach((button) => {
        const active = button.dataset.filter === category;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      if (projectCount) projectCount.textContent = `Menampilkan ${visible} item`;
      if (emptyFilter) emptyFilter.classList.toggle('d-none', visible !== 0);
    };
    filterButtons.forEach((button) => button.addEventListener('click', () => filterProjects(button.dataset.filter)));
    filterProjects('all');
  }

  // 6. Salin email ke clipboard. Ganti alamat contoh di kontak.html.
  document.querySelectorAll('[data-copy-email]').forEach((button) => {
    button.addEventListener('click', async () => {
      const email = button.dataset.copyEmail;
      const feedback = document.getElementById('copyFeedback');
      try {
        await navigator.clipboard.writeText(email);
        if (feedback) feedback.textContent = 'Email berhasil disalin.';
      } catch (error) {
        if (feedback) feedback.textContent = `Salin email ini secara manual: ${email}`;
      }
    });
  });

  // 7. Form kontak hanya menyiapkan email; tidak mengirim ke server/database.
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
      contactForm.classList.add('was-validated');
      if (!contactForm.checkValidity()) return;

      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const subject = String(formData.get('subject') || '').trim();
      const message = String(formData.get('message') || '').trim();
      const destination = 'nama@email.com'; // TODO: ganti dengan email kamu.
      const mailSubject = encodeURIComponent(`[Portfolio] ${subject}`);
      const mailBody = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\n${message}`);
      const status = document.getElementById('formStatus');
      if (status) status.textContent = 'Membuka aplikasi email. Pesan belum terkirim sampai kamu menekan tombol Send/Kirim.';
      window.location.href = `mailto:${destination}?subject=${mailSubject}&body=${mailBody}`;
    });
  }

  // 8. Indikator progress scroll di bagian atas halaman.
  const progress = document.getElementById('topProgress');
  if (progress) {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }
})();
