document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('background-music');
    const mainContentArea = document.getElementById('content');
    const transitionDuration = 1000;

    // --- AUDIO MANAGEMENT ---
    const initializeAudio = () => {
        if (backgroundMusic) {
            backgroundMusic.volume = 0.4;
            backgroundMusic.loop = true;

            // Coba play otomatis
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay diblokir, menunggu interaksi user:", error);
                });
            }

            // Backup: play saat user pertama kali berinteraksi
            const enableAudioOnFirstInteraction = () => {
                if (backgroundMusic.paused) {
                    backgroundMusic.play().catch(error => {
                        console.log("Gagal memutar audio:", error);
                    });
                }
                document.removeEventListener('click', enableAudioOnFirstInteraction);
                document.removeEventListener('keydown', enableAudioOnFirstInteraction);
            };

            document.addEventListener('click', enableAudioOnFirstInteraction);
            document.addEventListener('keydown', enableAudioOnFirstInteraction);
        }
    };

    // --- ANIMATION MANAGEMENT ---
    const resetAllAnimations = () => {
        const animatedElements = mainContentArea.querySelectorAll('*');
        
        animatedElements.forEach(element => {
            // Remove all animation classes
            element.classList.remove(
                'fade-in-text', 'fade-in-button', 'fade-in-element',
                'delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5', 'delay-6', 'delay-7'
            );
            
            // Reset inline styles
            element.style.opacity = '';
            element.style.transform = '';
            element.style.animation = '';
        });
    };

    const triggerPageAnimations = () => {
        // Reset semua animasi terlebih dahulu
        resetAllAnimations();
        
        // Tunggu sebentar untuk memastikan reset selesai
        setTimeout(() => {
            // TARGET ELEMENTS FOR EACH PAGE TYPE
            
            // Page 1 (Index) - Hero Section
            const heroTitle = mainContentArea.querySelector('h1');
            const heroDescription = mainContentArea.querySelector('.hero-text-overlay p');
            const heroButton = mainContentArea.querySelector('.hero-text-overlay .button');
            
            if (heroTitle) {
                heroTitle.classList.add('fade-in-text');
            }
            if (heroDescription) {
                heroDescription.classList.add('fade-in-text', 'delay-1');
            }
            if (heroButton) {
                heroButton.classList.add('fade-in-button', 'delay-2');
            }

            // Page 2 (Moments) - Gallery Section
            const momentsTitle = mainContentArea.querySelector('.section-title');
            const momentsDescription = mainContentArea.querySelector('.section-description');
            const galleryItems = mainContentArea.querySelectorAll('.gallery-item');
            const momentsPagination = mainContentArea.querySelector('.pagination-buttons');
            
            if (momentsTitle) {
                momentsTitle.classList.add('fade-in-text');
            }
            if (momentsDescription) {
                momentsDescription.classList.add('fade-in-text', 'delay-1');
            }
            galleryItems.forEach((item, index) => {
                const delayClass = `delay-${Math.min(index + 2, 7)}`;
                item.classList.add('fade-in-element', delayClass);
            });
            if (momentsPagination) {
                momentsPagination.classList.add('fade-in-button', 'delay-7');
            }

            // Page 3 (Laughter) - Laughter Section
            const laughterTitle = mainContentArea.querySelector('.laughter-section .section-title');
            const laughterDescription = mainContentArea.querySelector('.laughter-section .section-description');
            const laughterItems = mainContentArea.querySelectorAll('.laughter-item');
            const quoteSection = mainContentArea.querySelector('.quote-section');
            const laughterPagination = mainContentArea.querySelector('.laughter-section .pagination-buttons');
            
            if (laughterTitle) {
                laughterTitle.classList.add('fade-in-text');
            }
            if (laughterDescription) {
                laughterDescription.classList.add('fade-in-text', 'delay-1');
            }
            laughterItems.forEach((item, index) => {
                const delayClass = `delay-${Math.min(index + 2, 5)}`;
                item.classList.add('fade-in-element', delayClass);
            });
            if (quoteSection) {
                quoteSection.classList.add('fade-in-element', 'delay-6');
            }
            if (laughterPagination) {
                laughterPagination.classList.add('fade-in-button', 'delay-7');
            }

            // Page 4 (Strength) - Strength Section
            const strengthTitle = mainContentArea.querySelector('.strength-section .section-title');
            const strengthDescription = mainContentArea.querySelector('.strength-section .section-description');
            const imageColumn = mainContentArea.querySelector('.image-column');
            const textColumn = mainContentArea.querySelector('.text-column');
            const strengthPagination = mainContentArea.querySelector('.strength-section .pagination-buttons');
            
            if (strengthTitle) {
                strengthTitle.classList.add('fade-in-text');
            }
            if (strengthDescription) {
                strengthDescription.classList.add('fade-in-text', 'delay-1');
            }
            if (imageColumn) {
                imageColumn.classList.add('fade-in-element', 'delay-2');
            }
            if (textColumn) {
                textColumn.classList.add('fade-in-element', 'delay-3');
            }
            if (strengthPagination) {
                strengthPagination.classList.add('fade-in-button', 'delay-4');
            }

            // Page 5 (Future) - Future Section
            const futureTitle = mainContentArea.querySelector('.future-section .section-title');
            const futureDescription = mainContentArea.querySelector('.future-section .section-description');
            const futureImageContainer = mainContentArea.querySelector('.future-image-container');
            const futureTextBlock = mainContentArea.querySelector('.future-text-block');
            const endMessage = mainContentArea.querySelector('.end-message');
            const heartAnimation = mainContentArea.querySelector('.heart-animation');
            const futurePagination = mainContentArea.querySelector('.future-section .pagination-buttons');
            
            if (futureTitle) {
                futureTitle.classList.add('fade-in-text');
            }
            if (futureDescription) {
                futureDescription.classList.add('fade-in-text', 'delay-1');
            }
            if (futureImageContainer) {
                futureImageContainer.classList.add('fade-in-element', 'delay-2');
            }
            if (futureTextBlock) {
                futureTextBlock.classList.add('fade-in-element', 'delay-3');
            }
            if (endMessage) {
                endMessage.classList.add('fade-in-element', 'delay-4');
            }
            if (heartAnimation) {
                heartAnimation.classList.add('fade-in-element', 'delay-5');
            }
            if (futurePagination) {
                futurePagination.classList.add('fade-in-button', 'delay-6');
            }

            console.log('Animasi halaman telah diinisialisasi');
        }, 100);
    };

    // --- PAGE NAVIGATION ---
    const loadNewContent = async (url, pushState = true) => {
        try {
            // Start page transition
            document.body.classList.remove('page-transition-out');
            document.body.classList.add('page-transition-in');

            // Wait for transition
            await new Promise(resolve => setTimeout(resolve, transitionDuration));

            // Fetch new content
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.getElementById('content');

            if (newContent) {
                // Replace content
                mainContentArea.innerHTML = newContent.innerHTML;

                // Update browser history
                if (pushState) {
                    history.pushState({ path: url }, '', url);
                }

                // Update active navigation
                setActiveNavLink(url);

                // Complete transition
                document.body.classList.remove('page-transition-in');
                document.body.classList.add('page-transition-out');

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Initialize animations for new content
                triggerPageAnimations();

                // Re-initialize audio if needed
                const newAudio = document.getElementById('background-music');
                if (newAudio && backgroundMusic) {
                    newAudio.currentTime = backgroundMusic.currentTime;
                    newAudio.volume = backgroundMusic.volume;
                    if (!backgroundMusic.paused) {
                        newAudio.play().catch(e => console.log('Audio sync error:', e));
                    }
                }

                console.log(`Halaman ${url} berhasil dimuat`);
            } else {
                throw new Error('Content element not found');
            }

        } catch (error) {
            console.error('Error loading page:', error);
            // Fallback to normal navigation
            window.location.href = url;
        }
    };

    // --- EVENT HANDLERS ---
    const handleNavigation = (e) => {
        const link = e.currentTarget;
        const targetUrl = link.getAttribute('href');
        
        // Skip external links and anchors
        if (!targetUrl || targetUrl.startsWith('http') || targetUrl.startsWith('#') || targetUrl.startsWith('mailto:')) {
            return;
        }
        
        e.preventDefault();

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const targetPage = targetUrl.split('/').pop();

        // If same page, just scroll to top
        if (currentPage === targetPage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Load new page
        loadNewContent(targetUrl);
    };

    // --- NAVIGATION SETUP ---
    const setupNavigation = () => {
        // Handle all navigation links (including dynamically added ones)
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && (
                link.classList.contains('nav-link') || 
                link.classList.contains('button') ||
                link.closest('.pagination-buttons')
            )) {
                handleNavigation(e);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const path = e.state?.path || window.location.pathname || 'index.html';
            loadNewContent(path, false);
        });
    };

    // --- ACTIVE NAVIGATION ---
    const setActiveNavLink = (currentUrl = window.location.pathname) => {
        const currentPage = currentUrl.split('/').pop() || 'index.html';
        
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            
            if (linkPage === currentPage || 
                (currentPage === 'index.html' && linkPage === 'index.html') ||
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // --- INITIALIZATION ---
    const initialize = () => {
        console.log('Initializing Love Story Website...');
        
        // Setup audio
        initializeAudio();
        
        // Setup navigation
        setupNavigation();
        
        // Set initial active nav
        setActiveNavLink();
        
        // Initial page transition state
        document.body.classList.remove('page-transition-in');
        document.body.classList.add('page-transition-out');
        
        // Trigger initial animations
        setTimeout(() => {
            triggerPageAnimations();
        }, 200);
        
        console.log('Website initialized successfully!');
    };

    // Start the application
    initialize();
});