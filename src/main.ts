import './style.css';
import { profileInfo, skillsData, projectsData, labsData, toolsMarquee, socialLinks } from './data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Función auxiliar para texto en spans
function splitTextIntoSpans(text: string): string {
  return text.split('').map(char => {
    if (char === ' ') return ' '; // Permite el salto de línea natural en móviles
    return `<span class="char-anim">${char}</span>`;
  }).join('');
}

function generateHeroHTML(): string {
  return `
    <header class="gsap-hero-section">
      <span class="hero-greeting gsap-hero-element">SysAdmin & NetDevOps</span>
      <h1 class="gsap-split-text">${splitTextIntoSpans(profileInfo.name)}</h1>
      <h2 class="headline gsap-hero-element">${profileInfo.headline}</h2>
      <p class="about-text gsap-hero-element">${profileInfo.about}</p>
      <div class="hero-actions gsap-hero-element">
        <div class="education">
          <span>🎓</span> ${profileInfo.education}
        </div>
      </div>
      <div class="collaboration-box gsap-hero-element">
        <p>${profileInfo.collaboration}</p>
      </div>
    </header>

    <!-- Floating Square Contact Button -->
    <button class="fixed-contact-btn hablemos-btn interactive-element gsap-reveal" aria-label="Contactar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    </button>
  `;
}

function generateLabsHTML(): string {
  const labsCards = labsData.map(lab => `
    <div class="card-wrapper gsap-reveal">
      <div class="card interactive-card">
        <div class="status-indicator">
          <div class="status-dot"></div> Online
        </div>
        <h3 class="project-title">${lab.title}</h3>
        <p class="project-desc">${lab.description}</p>
      </div>
    </div>
  `).join('');

  return `
    <section id="laboratorios">
      <h2 class="section-title gsap-reveal">Infraestructura Crítica</h2>
      <div class="bento-grid labs-grid">
        ${labsCards}
      </div>
    </section>
  `;
}

function generateSkillsHTML(): string {
  const skillsCards = skillsData.map(skill => `
    <div class="card-wrapper gsap-reveal">
      <div class="card interactive-card">
        <div class="skill-header">
          <span class="skill-icon">${skill.icon}</span>
          <h3 class="skill-title">${skill.category}</h3>
        </div>
        <ul class="skill-list">
          ${skill.items.map(item => `
            <li class="skill-item">
              <span class="skill-name">${item.name}</span>
              <span class="skill-detail">${item.detail}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  const marqueeItems = toolsMarquee.map(tool => `<div class="marquee-item">${tool}</div>`).join('');
  const marqueeDouble = marqueeItems + marqueeItems; 

  return `
    <section id="habilidades">
      <h2 class="section-title gsap-reveal">Stack Tecnológico</h2>
      
      <div class="marquee-container gsap-reveal">
        <div class="marquee-content">
          ${marqueeDouble}
        </div>
        <div class="marquee-content" aria-hidden="true">
          ${marqueeDouble}
        </div>
      </div>

      <div class="bento-grid" style="margin-top: var(--spacing-lg);">
        ${skillsCards}
      </div>
    </section>
  `;
}

function generateProjectsHTML(): string {
  const projectsCards = projectsData.map(project => `
    <div class="card-wrapper gsap-reveal">
      <div class="card interactive-card">
        <div class="status-indicator">
          <div class="status-dot"></div> Online
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="tech-stack">
          ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section id="proyectos">
      <h2 class="section-title gsap-reveal">Desarrollo e IoT</h2>
      <div class="bento-grid projects-grid">
        ${projectsCards}
      </div>
    </section>
  `;
}

function getIconSVG(name: string): string {
  if (name === 'LinkedIn') return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>';
  if (name === 'GitHub') return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>';
  if (name === 'Email') return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>';
  return '🔗';
}

function generateCTAHTML(): string {
  const linksHTML = socialLinks.map(link => {
    const isMail = link.url.startsWith('mailto:');
    const targetAttrs = isMail ? '' : 'target="_blank" rel="noopener noreferrer"';
    return `
    <a href="${link.url}" ${targetAttrs} class="social-link interactive-element magnetic-btn">
      <span style="display:flex; align-items:center; justify-content:center;">${getIconSVG(link.name)}</span>
      ${link.name}
    </a>
  `;
  }).join('');

  return `
    <section id="contacto" class="cta-section gsap-reveal">
      <h2 class="cta-title">¿Iniciamos un proyecto?</h2>
      <p class="headline" style="margin-bottom: 0;">Arquitectura de red, automatización o despliegues IoT.</p>
      <div class="social-links">
        ${linksHTML}
      </div>
    </section>
  `;
}

function generateFooterHTML(): string {
  return `
    <footer class="gsap-reveal" style="text-align: center; margin-top: var(--spacing-xl); padding-bottom: var(--spacing-md); color: var(--text-secondary); font-family: var(--font-mono); font-size: 0.9rem;">
      <p>Diseñado para alto rendimiento • GSAP + Lenis</p>
      <p style="margin-top: 0.5rem;">© ${new Date().getFullYear()} ${profileInfo.name}</p>
    </footer>
  `;
}

function initApp() {
  const appElement = document.getElementById('app');
  if (!appElement) return;

  appElement.innerHTML = `
    <div class="container">
      ${generateHeroHTML()}
      ${generateLabsHTML()}
      ${generateProjectsHTML()}
      ${generateSkillsHTML()}
      ${generateCTAHTML()}
      ${generateFooterHTML()}
    </div>
    <div id="toast" class="toast-notification">¡Gmail copiado!</div>
  `;

  // Start Preloader Sequence
  runPreloader();
}

function runPreloader() {
  const tl = gsap.timeline({
    onComplete: () => {
      document.getElementById('preloader')!.style.display = 'none';
      initCore();
    }
  });

  tl.to('.loader-progress', { width: '100%', duration: 1.5, ease: 'power2.inOut' })
    .to('.loader-text', { opacity: 0, duration: 0.3 }, "-=0.2")
    .to('#preloader', { yPercent: -100, duration: 0.8, ease: 'power4.inOut' });
}

function initCore() {
  initSmoothScrolling();
  initAnimations();
  initCustomCursor();
  initTiltEffect();
  initMarquee();
  initMagneticButtons();
  initContactLogic();
}

function initContactLogic() {
  const hablemosBtn = document.querySelector('.hablemos-btn');
  const toast = document.getElementById('toast');

  if (toast) {
    gsap.set(toast, { xPercent: -50, y: 100, autoAlpha: 0 });
  }

  const copyTextToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleCopy = (e: Event) => {
    e.preventDefault();
    copyTextToClipboard('xragnard@gmail.com').then(() => {
      if (toast) {
        gsap.killTweensOf(toast);
        gsap.to(toast, {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "back.out(1.5)"
        });

        gsap.to(toast, {
          y: 100,
          autoAlpha: 0,
          duration: 0.5,
          delay: 3,
          ease: "power2.in"
        });
      }
    });
  };

  if (hablemosBtn) hablemosBtn.addEventListener('click', handleCopy);
}

function initSmoothScrolling() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  lenis.on('scroll', ScrollTrigger.update);
  
  // Scroll Progress Bar Update
  lenis.on('scroll', (e: any) => {
    const progress = e.progress * 100;
    gsap.set('.scroll-progress', { width: progress + "%" });
  });

  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
}

function initAnimations() {
  // 1. Tipografía (Hero)
  gsap.to('.char-anim', {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    duration: 1,
    stagger: 0.015,
    ease: 'power3.out',
  });

  // Hero Elementos
  gsap.fromTo('.gsap-hero-element', 
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.4 }
  );

  // 2. Bento Grid Revelado
  const revealElements = document.querySelectorAll('.gsap-reveal');
  
  revealElements.forEach((el) => {
    gsap.set(el, { autoAlpha: 0, y: 80, scale: 0.98 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });
  });

  // Parallax sutil en tarjetas
  gsap.utils.toArray('.card-wrapper').forEach((card: any) => {
    gsap.to(card, {
      yPercent: -4,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

function initMarquee() {
  const marquees = document.querySelectorAll('.marquee-content');
  marquees.forEach((content) => {
    gsap.to(content, { xPercent: -100, repeat: -1, duration: 25, ease: "linear" });
  });
}

function initCustomCursor() {
  if (window.innerWidth <= 768) return;

  const cursor = document.querySelector('.custom-cursor') as HTMLElement;
  const follower = document.querySelector('.custom-cursor-follower') as HTMLElement;
  
  if (!cursor || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.05, ease: "none" });
  });

  gsap.ticker.add(() => {
    followerX += (mouseX - followerX) * 0.2;
    followerY += (mouseY - followerY) * 0.2;
    gsap.set(follower, { x: followerX, y: followerY });
  });

  const interactives = document.querySelectorAll('.interactive-card, a, button, .interactive-element');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hover-active'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hover-active'));
  });
}

function initTiltEffect() {
  if (window.innerWidth <= 768) return;

  const cards = document.querySelectorAll('.interactive-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6; 
      const rotateY = ((x - centerX) / centerX) * 6;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1500,
        ease: 'power3.out',
        duration: 0.6
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, ease: 'elastic.out(1, 0.4)', duration: 1.5 });
    });
  });
}

function initMagneticButtons() {
  if (window.innerWidth <= 768) return;

  const magneticEls = document.querySelectorAll('.magnetic-btn');
  
  magneticEls.forEach((el) => {
    const element = el as HTMLElement;
    
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Mueve el botón sutilmente hacia el mouse
      gsap.to(element, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.4,
        ease: "power2.out"
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });
}

// Bootstrap
document.addEventListener('DOMContentLoaded', initApp);
