document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const loadingScreen = document.getElementById('loading-screen');
    const carList = document.querySelector('.car-list');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    // --- 1. Loading Animation ---
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 1500); // 1.5 seconds

    // --- 2. Light/Dark Theme Toggle (with localStorage) ---
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        body.className = storedTheme;
        updateThemeIcon(storedTheme);
    } else {
        // Default to light theme if no preference is stored
        body.className = 'light-theme';
    }

    function updateThemeIcon(theme) {
        if (theme === 'dark-theme') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark theme
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light theme
        }
    }
    
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-theme');
        if (isDark) {
            body.className = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
            updateThemeIcon('light-theme');
        } else {
            body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
            updateThemeIcon('dark-theme');
        }
    });
    
    // Initial icon update
    updateThemeIcon(body.className);

    // --- 3. JavaScript-Driven Car Slider ---
    const scrollAmount = 350; // Scroll by roughly one card width

    prevArrow.addEventListener('click', () => {
        carList.scrollLeft -= scrollAmount;
    });

    nextArrow.addEventListener('click', () => {
        carList.scrollLeft += scrollAmount;
    });

    // --- 4. Scroll Reveal Animations ---
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    scrollRevealElements.forEach(el => observer.observe(el));
    
    // --- 5. Smooth Scrolling for CTA/Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});


// --- 6. Interactive Login/Signup Tab Switching ---
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginContent = document.getElementById('login-content');
    const signupContent = document.getElementById('signup-content');

    function switchForm(activeTab, inactiveTab, activeContent, inactiveContent) {
        activeTab.classList.add('active');
        inactiveTab.classList.remove('active');
        
        activeContent.classList.add('active');
        inactiveContent.classList.remove('active');
    }

    loginTab.addEventListener('click', () => {
        switchForm(loginTab, signupTab, loginContent, signupContent);
    });

    signupTab.addEventListener('click', () => {
        switchForm(signupTab, loginTab, signupContent, loginContent);
    });

    // We need to trigger the placeholder-shown logic on load for existing values (optional)
    document.querySelectorAll('.input-group input').forEach(input => {
        input.addEventListener('input', () => {
            // Placeholder shown logic is handled purely by CSS, so this listener is not strictly needed, 
            // but can be used later for validation/real-time feedback.
        });
    });