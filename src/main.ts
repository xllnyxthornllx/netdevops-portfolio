import './style.css';
import { profileInfo, skillsData, projectsData, labsData, toolsMarquee, socialLinks } from './data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Función auxiliar para texto en spans
function splitTextIntoSpans(text: string): string {
  return text.split('').map(char => {
    if (char === ' ') return ' ';
    return `<span class="char-anim">${char}</span>`;
  }).join('');
}

function getIconSVG(name: string): string {
  if (name === 'LinkedIn') {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>';
  }
  if (name === 'GitHub') {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>';
  }
  if (name === 'Email') {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';
  }
  if (name === 'NYXCORE Cloud') {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>';
  }
  return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>';
}

function generateHeroHTML(): string {
  return `
    <header class="gsap-hero-section">
      <div class="hero-top-badges gsap-hero-element">
        <span class="hero-greeting">${profileInfo.role}</span>
        <span class="status-indicator availability-pill">
          <span class="status-dot"></span> ${profileInfo.status}
        </span>
      </div>

      <h1 class="gsap-split-text">${splitTextIntoSpans(profileInfo.name)}</h1>
      <h2 class="headline gsap-hero-element">${profileInfo.headline}</h2>
      
      <p class="about-text gsap-hero-element">${profileInfo.about}</p>

      <div class="hero-email-bar gsap-hero-element">
        <div class="email-chip copy-email-btn interactive-element" title="Clic para copiar correo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span class="email-text">${profileInfo.email}</span>
          <span class="copy-tag">COPIAR</span>
        </div>
        <a href="mailto:${profileInfo.email}" class="direct-mail-link interactive-element" title="Abrir en cliente de correo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Escribir
        </a>
      </div>

      <div class="hero-actions gsap-hero-element">
        <div class="education">
          <span>🎓</span> ${profileInfo.education}
        </div>
        <a href="https://github.com/xllnyxthornllx" target="_blank" rel="noopener noreferrer" class="hero-btn interactive-element">
          ${getIconSVG('GitHub')} GitHub
        </a>
        <a href="https://www.linkedin.com/in/nyxthorn" target="_blank" rel="noopener noreferrer" class="hero-btn interactive-element">
          ${getIconSVG('LinkedIn')} LinkedIn
        </a>
        <a href="https://nyxcore.online" target="_blank" rel="noopener noreferrer" class="hero-btn interactive-element">
          ${getIconSVG('NYXCORE Cloud')} NYXCORE Homelab
        </a>
      </div>

      <div class="collaboration-box gsap-hero-element">
        <p>${profileInfo.collaboration}</p>
      </div>
    </header>

    <!-- Floating Contact Button -->
    <button class="fixed-contact-btn hablemos-btn interactive-element gsap-reveal" aria-label="Copiar Correo de Contacto" title="Copiar correo: ${profileInfo.email}">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    </button>
  `;
}

function generateProjectsHTML(): string {
  const projectsCards = projectsData.map(project => {
    const badgeClass = project.badgeType ? `status-${project.badgeType}` : '';
    const linkHTML = project.link ? `
      <div class="project-actions">
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-action-btn interactive-element">
          <span>Explorar Proyecto</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    ` : '';

    return `
    <div class="card-wrapper gsap-reveal">
      <div class="card interactive-card">
        <div class="project-header-row">
          <div class="status-indicator ${badgeClass}">
            <div class="status-dot"></div> ${project.status}
          </div>
          <span class="category-badge">${project.category}</span>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="tech-stack">
          ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
        ${linkHTML}
      </div>
    </div>
  `;
  }).join('');

  return `
    <section id="proyectos">
      <div class="section-header-box gsap-reveal">
        <span class="section-tag">Desarrollo, IoT & Homelab</span>
        <h2 class="section-title">Proyectos Principales</h2>
        <p class="section-subtitle">Soluciones de punta a punta: plataformas en producción, servicios cloud autoalojados y ecosistemas IoT interactivos.</p>
      </div>
      <div class="bento-grid projects-grid">
        ${projectsCards}
      </div>
    </section>
  `;
}

function generateLabsHTML(): string {
  const labsCards = labsData.map(lab => `
    <div class="card-wrapper gsap-reveal">
      <div class="card interactive-card">
        <div class="project-header-row">
          <div class="status-indicator status-live">
            <div class="status-dot"></div> Activo / Validado
          </div>
          <span class="category-badge">${lab.category}</span>
        </div>
        <h3 class="project-title">${lab.title}</h3>
        <p class="project-desc">${lab.description}</p>
        <div class="tech-stack">
          ${lab.technologies.map(tech => `<span class="tech-badge tech-badge-sm">${tech}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section id="laboratorios">
      <div class="section-header-box gsap-reveal">
        <span class="section-tag">Redes, Virtualización & SCADA</span>
        <h2 class="section-title">Infraestructura Crítica & Laboratorios</h2>
        <p class="section-subtitle">Diseño de topologías de alta resiliencia, firewalls perimetrales, controladores inalámbricos y automatización industrial.</p>
      </div>
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
      <div class="section-header-box gsap-reveal">
        <span class="section-tag">Competencias Técnicas</span>
        <h2 class="section-title">Stack Tecnológico & Ecosistema</h2>
      </div>
      
      <div class="marquee-container gsap-reveal">
        <div class="marquee-content">
          ${marqueeDouble}
        </div>
        <div class="marquee-content" aria-hidden="true">
          ${marqueeDouble}
        </div>
      </div>

      <div class="bento-grid skills-grid" style="margin-top: var(--spacing-lg);">
        ${skillsCards}
      </div>
    </section>
  `;
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
      <span class="section-tag">Contacto Directo</span>
      <h2 class="cta-title">¿Iniciamos un proyecto?</h2>
      <p class="headline" style="margin-bottom: 0;">Arquitectura de red escalable, automatización NetDevOps o despliegues IoT.</p>
      
      <div class="cta-email-box copy-email-btn interactive-element" title="Clic para copiar correo">
        <span class="cta-email-label">CORREO DE CONTACTO OFICIAL:</span>
        <div class="cta-email-val">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>${profileInfo.email}</span>
          <span class="copy-badge">COPIAR</span>
        </div>
      </div>

      <div class="social-links">
        ${linksHTML}
      </div>
    </section>
  `;
}

function generateFooterHTML(): string {
  return `
    <footer class="gsap-reveal" style="text-align: center; margin-top: var(--spacing-xl); padding-bottom: var(--spacing-md); color: var(--text-secondary); font-family: var(--font-mono); font-size: 0.9rem;">
      <p>~ $ echo "Diseñado, desarrollado y administrado por ${profileInfo.name}"</p>
      <p style="margin-top: 0.5rem; opacity: 0.7;">Vanilla TypeScript • GSAP 3 & Lenis • Despliegue CI/CD Vercel</p>
    </footer>
  `;
}

function initApp() {
  const appElement = document.getElementById('app');
  if (!appElement) return;

  appElement.innerHTML = `
    <div class="container">
      ${generateHeroHTML()}
      ${generateProjectsHTML()}
      ${generateLabsHTML()}
      ${generateSkillsHTML()}
      ${generateCTAHTML()}
      ${generateFooterHTML()}
    </div>
    <div id="toast" class="toast-notification">¡Correo copiado al portapapeles!</div>
  `;

  runPreloader();
}

function runPreloader() {
  const tl = gsap.timeline({
    onComplete: () => {
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.style.display = 'none';
      initCore();
    }
  });

  tl.to('.loader-progress', { width: '100%', duration: 1.2, ease: 'power2.inOut' })
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
  const toast = document.getElementById('toast');
  const targetEmail = profileInfo.email;

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
      console.error('Error al copiar correo:', err);
    }
  };

  const handleCopy = (e: Event) => {
    e.preventDefault();
    copyTextToClipboard(targetEmail).then(() => {
      if (toast) {
        toast.textContent = `¡Correo copiado: ${targetEmail}!`;
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
          delay: 3.5,
          ease: "power2.in"
        });
      }
    });
  };

  const copyElements = document.querySelectorAll('.copy-email-btn, .hablemos-btn');
  copyElements.forEach(el => el.addEventListener('click', handleCopy));
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
  
  lenis.on('scroll', (e: any) => {
    const progress = e.progress * 100;
    gsap.set('.scroll-progress', { width: progress + "%" });
  });

  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
}

function initAnimations() {
  gsap.to('.char-anim', {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    duration: 0.8,
    stagger: 0.015,
    ease: 'power3.out',
  });

  gsap.fromTo('.gsap-hero-element', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.0, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
  );

  const revealElements = document.querySelectorAll('.gsap-reveal');
  revealElements.forEach((el) => {
    gsap.set(el, { autoAlpha: 0, y: 60, scale: 0.99 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      onEnter: () => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });
  });

  gsap.utils.toArray('.card-wrapper').forEach((card: any) => {
    gsap.to(card, {
      yPercent: -3,
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
    gsap.to(content, { xPercent: -100, repeat: -1, duration: 30, ease: "linear" });
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
      
      const rotateX = ((y - centerY) / centerY) * -5; 
      const rotateY = ((x - centerX) / centerX) * 5;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1200,
        ease: 'power3.out',
        duration: 0.5
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, ease: 'elastic.out(1, 0.4)', duration: 1.2 });
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

      gsap.to(element, {
        x: x * 0.35,
        y: y * 0.35,
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
