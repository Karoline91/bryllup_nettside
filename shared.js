// Shared header and navigation for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Create and insert header
    const header = document.createElement('div');
    header.className = 'top-banner';
    header.innerHTML = `
        <div class="header-content">
            <img src="Paviljong Torshov (1).png" alt="Paviljong Torshov" class="header-paviljong">
            <div class="header-text">
                <div class="top-names">Karoline & Torkil</div>
                <div class="top-date">13. juni 2026, Oslo</div>
            </div>
        </div>
    `;
    document.body.insertBefore(header, document.body.firstChild);

    // Create and insert navigation
    const nav = document.createElement('nav');
    nav.innerHTML = `
        <button class="mobile-menu-toggle" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <div class="nav-links">
            <a href="index.html">Hjem</a>
            <a href="program.html">Program</a>
            <a href="onskeliste.html">Ønskeliste</a>
            <a href="sporsmal.html">Spørsmål og svar</a>
            <a href="rsvp.html">RSVP</a>
        </div>
    `;
    document.body.insertBefore(nav, header.nextSibling);

    // Set active page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = nav.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Mobile menu functionality
    const mobileToggle = nav.querySelector('.mobile-menu-toggle');
    const navLinks = nav.querySelector('.nav-links');
    
    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on a link
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
}); 