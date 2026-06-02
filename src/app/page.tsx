'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const translations = {
  en: { text: 'Building with intention.', htmlLang: 'en' },
  es: { text: 'Construyendo con intención.', htmlLang: 'es' },
  zh: { text: '意圖而建。', htmlLang: 'zh-Hant' },
};

type LangKey = keyof typeof translations;

export default function Home() {
  const [lang, setLang] = useState<LangKey>('en');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('andara-lang') as LangKey | null;
    if (stored && translations[stored]) {
      setLang(stored);
    } else {
      const browserLang = navigator.language;
      if (browserLang.startsWith('es')) setLang('es');
      else if (browserLang.startsWith('zh')) setLang('zh');
    }
  }, []);

  const handleLangChange = (newLang: LangKey) => {
    if (newLang === lang) return;
    setIsVisible(false);
    setTimeout(() => {
      setLang(newLang);
      setIsVisible(true);
      localStorage.setItem('andara-lang', newLang);
      document.documentElement.lang = translations[newLang].htmlLang;
    }, 250);
  };

  const t = translations[lang];
  const isChinese = lang === 'zh';

  return (
    <>
      <nav className="lang-selector" aria-label="Language selector">
        {(Object.keys(translations) as LangKey[]).map((l) => (
          <button
            key={l}
            className={`lang-btn ${lang === l ? 'active' : ''}`}
            onClick={() => handleLangChange(l)}
            aria-label={l === 'en' ? 'English' : l === 'es' ? 'Español' : '繁體中文'}
            aria-pressed={lang === l}
          >
            {l === 'en' ? 'EN' : l === 'es' ? 'ES' : 'CH'}
          </button>
        ))}
      </nav>

      <main className="content">
        <div className="logo-container">
          <Image
            src="/logo-andara.png"
            alt="ANDARA Architects"
            width={300}
            height={300}
            priority
          />
        </div>

        <div className="tagline-wrapper">
          <h1
            className={`tagline ${isChinese ? 'chinese' : ''}`}
            style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.25s ease' }}
          >
            {t.text}
          </h1>
        </div>

        <div className="divider" aria-hidden="true" />

        <div className="cities">
          Lima <span className="dot" aria-hidden="true">&#9679;</span>{' '}
          New York <span className="dot" aria-hidden="true">&#9679;</span>{' '}
          Hong Kong
        </div>

        <div className="email-section">
          <a href="mailto:hello@andaraarchitects.com" className="email-link">
            hello@andaraarchitects.com
          </a>
        </div>
      </main>

      <footer className="footer">
        <p className="footer-text">&copy; 2026 ANDARA Architects. All rights reserved.</p>
      </footer>
    </>
  );
}
