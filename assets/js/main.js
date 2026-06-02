/**
 * ANDARA Architects — Main JavaScript
 */

(function() {
    'use strict';

    const translations = {
        en: { text: 'Building with intention.', htmlLang: 'en' },
        es: { text: 'Construyendo con intención.', htmlLang: 'es' },
        zh: { text: '意圖而建。', htmlLang: 'zh-Hant' }
    };

    const taglineEl = document.getElementById('tagline');
    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlEl = document.documentElement;
    let currentLang = 'en';

    function setLang(lang) {
        if (!translations[lang] || lang === currentLang) return;

        const t = translations[lang];

        taglineEl.style.transition = 'opacity 0.25s ease';
        taglineEl.style.opacity = '0';

        setTimeout(() => {
            taglineEl.textContent = t.text;
            taglineEl.classList.toggle('chinese', lang === 'zh');
            htmlEl.setAttribute('lang', t.htmlLang);
            taglineEl.style.opacity = '1';
        }, 250);

        langButtons.forEach(btn => {
            const isActive = btn.dataset.lang === lang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });

        currentLang = lang;

        try { localStorage.setItem('andara-lang', lang); } catch (e) {}
    }

    function init() {
        let storedLang = null;
        try { storedLang = localStorage.getItem('andara-lang'); } catch (e) {}

        if (!storedLang) {
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang.startsWith('es')) storedLang = 'es';
            else if (browserLang.startsWith('zh')) storedLang = 'zh';
        }

        if (storedLang && storedLang !== 'en' && translations[storedLang]) {
            setLang(storedLang);
        }

        window.setLang = setLang;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    langButtons.forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLang(btn.dataset.lang);
            }
        });
    });
})();
