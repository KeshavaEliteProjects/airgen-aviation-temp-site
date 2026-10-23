import React, { useState, useEffect, useRef } from 'react';
import { AIRGEN_CONFIG } from '../utils/config';

export default function Navbar({ onOpenPage, onEnquire }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Tone calculation
    let tq = 0;
    const computeTone = () => {
      const els = document.elementsFromPoint(window.innerWidth / 2, nav.getBoundingClientRect().bottom + 6);
      let detectedTone = 'light';
      for (const e of els) {
        if (
          nav.contains(e) ||
          e.closest('.tint, .tk, .fab, .mentor, .gauge, .sp, .cue, .mm, .bp, .gate, .pg')
        )
          continue;
        let n = e;
        let found = false;
        while (n && n !== document.documentElement) {
          const dt = n.dataset && n.dataset.tone;
          if (dt) {
            detectedTone = dt;
            found = true;
            break;
          }
          const bg = window.getComputedStyle(n).backgroundColor;
          const match = bg.match(/rgba?\(([^)]+)\)/);
          if (match) {
            const v = match[1].split(',').map(parseFloat);
            const a = v.length > 3 ? v[3] : 1;
            if (a > 0.5) {
              detectedTone = 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2] < 110 ? 'dark' : 'light';
              found = true;
              break;
            }
          }
          n = n.parentElement;
        }
        if (found) break;
      }
      if (nav.dataset.tone !== detectedTone) {
        nav.dataset.tone = detectedTone;
      }
    };

    const requestToneCheck = () => {
      if (tq) return;
      tq = requestAnimationFrame(() => {
        tq = 0;
        computeTone();
      });
    };

    const handleScroll = () => {
      requestToneCheck();
      nav.classList.toggle('solid', window.scrollY > window.innerHeight * 0.7);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    // Section spy
    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            links.forEach(a => {
              a.classList.toggle('on', a.getAttribute('href') === '#' + entry.target.id);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    ['journey', 'ask', 'career', 'about'].forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    // Close on outside click or Escape
    const handleClickOutside = e => {
      if (!nav.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      io.disconnect();
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (tq) cancelAnimationFrame(tq);
    };
  }, []);

  const toggleDropdown = name => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const closeAllMenus = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleEnquireClick = (e, topic) => {
    e.preventDefault();
    closeAllMenus();
    onEnquire(topic);
  };

  const handlePageClick = (e, pageKey) => {
    e.preventDefault();
    closeAllMenus();
    onOpenPage(pageKey);
  };

  const demoHref = AIRGEN_CONFIG.demoUrl || '#demo';
  const demoTarget = AIRGEN_CONFIG.demoUrl ? '_blank' : undefined;
  const demoRel = AIRGEN_CONFIG.demoUrl ? 'noopener' : undefined;

  return (
    <nav
      ref={navRef}
      className={`nb ${mobileMenuOpen ? 'open' : ''}`}
      aria-label="Main"
    >
      <a
        className="logo"
        href="#top"
        aria-label="Airgen Aviation home"
        onClick={closeAllMenus}
      >
        <img className="lg-l" src="/assets/logo-dark.png" alt="Airgen Aviation" />
        <img className="lg-d" src="/assets/logo.png" alt="" />
      </a>

      <div className="nl2">
        {/* About us */}
        <div className={`dd ${openDropdown === 'about' ? 'open' : ''}`}>
          <button
            className="ddb"
            aria-expanded={openDropdown === 'about'}
            aria-haspopup="true"
            onClick={() => toggleDropdown('about')}
          >
            About us
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <div className="ddm">
            <div>
              <a href="#why" onClick={closeAllMenus}>
                Why AirGen
              </a>
              <button
                type="button"
                data-page="ask"
                onClick={e => handlePageClick(e, 'ask')}
              >
                The ASK framework
              </button>
              <button
                type="button"
                data-page="team"
                onClick={e => handlePageClick(e, 'team')}
              >
                Our team
              </button>
              <button
                type="button"
                data-page="news"
                onClick={e => handlePageClick(e, 'news')}
              >
                Latest news
              </button>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className={`dd ${openDropdown === 'courses' ? 'open' : ''}`}>
          <button
            className="ddb"
            aria-expanded={openDropdown === 'courses'}
            aria-haspopup="true"
            onClick={() => toggleDropdown('courses')}
          >
            Courses
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <div className="ddm">
            <div>
              <button
                type="button"
                data-page="dgca"
                onClick={e => handlePageClick(e, 'dgca')}
              >
                DGCA ground class
              </button>
              <button
                type="button"
                data-page="atpl"
                onClick={e => handlePageClick(e, 'atpl')}
              >
                ATPL ground class
              </button>
              <button
                type="button"
                data-page="typerating"
                onClick={e => handlePageClick(e, 'typerating')}
              >
                Type rating
              </button>
              <button
                type="button"
                data-page="licence"
                onClick={e => handlePageClick(e, 'licence')}
              >
                Licence
              </button>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className={`dd ${openDropdown === 'services' ? 'open' : ''}`}>
          <button
            className="ddb"
            aria-expanded={openDropdown === 'services'}
            aria-haspopup="true"
            onClick={() => toggleDropdown('services')}
          >
            Services
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <div className="ddm">
            <div>
              <button
                type="button"
                data-page="nios"
                onClick={e => handlePageClick(e, 'nios')}
              >
                NIOS
              </button>
              <button
                type="button"
                data-page="visa"
                onClick={e => handlePageClick(e, 'visa')}
              >
                VISA
              </button>
              <button
                type="button"
                data-page="complementary"
                onClick={e => handlePageClick(e, 'complementary')}
              >
                Complementary
              </button>
              <button
                type="button"
                data-page="conversion"
                onClick={e => handlePageClick(e, 'conversion')}
              >
                Conversion
              </button>
              <button
                type="button"
                data-page="medicals"
                onClick={e => handlePageClick(e, 'medicals')}
              >
                Medicals
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="nr">
        <a
          className="ncta"
          href={demoHref}
          target={demoTarget}
          rel={demoRel}
          data-cta="demo"
          onClick={closeAllMenus}
        >
          Enquiry
        </a>
        <button
          className="nbtn"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(prev => !prev)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
