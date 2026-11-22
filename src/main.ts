import './style.css';
import {
  profileInfo,
  skillsData,
  projectsData,
  labsData,
  toolsMarquee,
  socialLinks,
  filterCategories,
  certificationsData,
  pythonSnippetCode
} from './data';
import { topologiesMap, TopologyDiagram } from './topologies';
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
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>';
  }
  if (name === 'GitHub') {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>';
  }
  if (name === 'Email') {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';
  }
  if (name === 'Descargar CV') {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
  }
  return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>';
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
        <div class="email-chip copy-email-btn interactive-element" title="Clic para copiar correo" data-email="${profileInfo.email}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span class="email-text">${profileInfo.email}</span>
          <span class="copy-tag">COPIAR</span>
        </div>
        <a href="mailto:${profileInfo.email}" class="direct-mail-link interactive-element" title="Abrir cliente de correo">
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
        <a href="/CV_Uriel_Torres_Salazar.pdf" download="CV_Uriel_Torres_Salazar.pdf" class="hero-btn hero-btn-accent interactive-element" title="Descargar Currículum Vitae en PDF">
          ${getIconSVG('Descargar CV')} <span>Descargar CV (PDF)</span>
        </a>
        <a href="https://github.com/xllnyxthornllx" target="_blank" rel="noopener noreferrer" class="hero-btn interactive-element">
          ${getIconSVG('GitHub')} GitHub
        </a>
        <a href="https://www.linkedin.com/in/nyxthorn" target="_blank" rel="noopener noreferrer" class="hero-btn interactive-element">
          ${getIconSVG('LinkedIn')} LinkedIn
        </a>
      </div>

      <!-- Mini Terminal Embebida ("Hacker Console") -->
      <div class="terminal-container gsap-hero-element" id="mini-terminal">
        <div class="terminal-bar">
          <div class="terminal-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="terminal-title">uriel@netdevops-edge:~ (zsh)</span>
          <span class="terminal-hint">Prueba: help, ping, cv, skills, projects</span>
        </div>
        <div class="terminal-output" id="terminal-output">
          <div class="term-line welcome-msg">
            <span class="text-cyan">NetDevOps Console 7.0 (x86_64)</span> — Bienvenido al entorno interactivo de Uriel Torres.
          </div>
          <div class="term-line">Escribe <span class="term-highlight">'help'</span> para listar los comandos disponibles o <span class="term-highlight">'cv'</span> para descargar el currículum.</div>
        </div>
        <div class="terminal-input-row">
          <span class="terminal-prompt">uriel@netdevops:~$</span>
          <input type="text" id="terminal-input" class="terminal-input" placeholder="escribe un comando..." autocomplete="off" spellcheck="false" />
        </div>
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
  const filterButtonsHTML = filterCategories.map((cat, idx) => `
    <button class="filter-tab ${idx === 0 ? 'active' : ''} interactive-element" data-filter="${cat.id}">
      ${cat.label}
    </button>
  `).join('');

  const projectsCards = projectsData.map(project => {
    const badgeClass = project.badgeType ? `status-${project.badgeType}` : '';

    // Action buttons
    let actionButtons = '';
    if (project.topologyId) {
      actionButtons += `
        <button class="project-action-btn view-topology-btn interactive-element" data-topology="${project.topologyId}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="6" r="3"></circle><circle cx="12" cy="18" r="3"></circle><line x1="6" y1="9" x2="12" y2="15"></line><line x1="18" y1="9" x2="12" y2="15"></line></svg>
          <span>Ver Topología / Arquitectura</span>
        </button>
      `;
    }
    if (project.link && !project.isPrivate) {
      actionButtons += `
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-action-btn interactive-element">
          <span>Explorar Proyecto</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      `;
    }

    const bulletsHTML = project.bulletPoints.map(bp => `<li>${bp}</li>`).join('');

    return `
    <div class="card-wrapper project-item gsap-reveal" data-category="${project.category}">
      <div class="card interactive-card">
        <div class="project-header-row">
          <div class="status-indicator ${badgeClass}">
            <div class="status-dot"></div> ${project.status}
          </div>
          <span class="category-badge">${project.categoryLabel}</span>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        
        <ul class="project-bullets">
          ${bulletsHTML}
        </ul>

        <div class="tech-stack">
          ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>

        <div class="project-actions">
          ${actionButtons}
        </div>
      </div>
    </div>
  `;
  }).join('');

  return `
    <section id="proyectos">
      <div class="section-header-box gsap-reveal">
        <span class="section-tag">Ingeniería & Despliegues</span>
        <h2 class="section-title">Proyectos Destacados</h2>
        <p class="section-subtitle">Arquitecturas corporativas de red, automatización idempotente, microcontroladores FreeRTOS y plataformas PWA de alto impacto.</p>
        
        <!-- Categorías de Filtrado -->
        <div class="filter-tabs-container">
          ${filterButtonsHTML}
        </div>
      </div>

      <div class="bento-grid projects-grid" id="projects-grid">
        ${projectsCards}
      </div>
    </section>
  `;
}

function generateNetDevOpsCodeHTML(): string {
  return `
    <section id="automatizacion-code" class="gsap-reveal">
      <div class="section-header-box">
        <span class="section-tag">Código en Producción</span>
        <h2 class="section-title">Automatización NetDevOps en Python</h2>
        <p class="section-subtitle">Orquestación idempotente para switches Cisco Catalyst y consumo de telemetría RESTCONF.</p>
      </div>

      <div class="code-editor-card">
        <div class="code-editor-header">
          <div class="terminal-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="code-filename">cisco_netdevops_automation.py</span>
          <button class="copy-code-btn interactive-element" id="copy-snippet-btn" title="Copiar código al portapapeles">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copiar Código
          </button>
        </div>
        <pre class="code-pre"><code class="language-python">${escapeHTML(pythonSnippetCode)}</code></pre>
      </div>
    </section>
  `;
}

function generateLabsHTML(): string {
  const labsCards = labsData.map(lab => {
    let actionBtn = '';
    if (lab.topologyId) {
      actionBtn = `
        <button class="lab-topology-btn view-topology-btn interactive-element" data-topology="${lab.topologyId}">
          <span>Ver Diagrama</span> ↗
        </button>
      `;
    }

    return `
    <div class="card-wrapper gsap-reveal">
      <div class="card interactive-card">
        <div class="project-header-row">
          <div class="status-indicator status-live">
            <div class="status-dot"></div> Validado en Lab
          </div>
          <span class="category-badge">${lab.category}</span>
        </div>
        <h3 class="project-title">${lab.title}</h3>
        <p class="project-desc">${lab.description}</p>
        <div class="tech-stack">
          ${lab.technologies.map(tech => `<span class="tech-badge tech-badge-sm">${tech}</span>`).join('')}
        </div>
        ${actionBtn}
      </div>
    </div>
  `;
  }).join('');

  return `
    <section id="laboratorios">
      <div class="section-header-box gsap-reveal">
        <span class="section-tag">Entornos Críticos</span>
        <h2 class="section-title">Infraestructura Crítica & Laboratorios</h2>
        <p class="section-subtitle">Topologías de alta disponibilidad, controladores SD-WAN y movilidad inalámbrica empresarial.</p>
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

  const certCards = certificationsData.map(cert => `
    <div class="cert-item">
      <div class="cert-icon">📜</div>
      <div class="cert-info">
        <span class="cert-title">${cert.title}</span>
        <span class="cert-issuer">${cert.issuer} ${cert.code ? `• ${cert.code}` : ''} (${cert.year})</span>
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

      <!-- Certificaciones & Formación -->
      <div class="certifications-box gsap-reveal">
        <h3 class="cert-heading">🎓 Certificaciones & Reconocimientos</h3>
        <div class="cert-grid">
          ${certCards}
        </div>
      </div>
    </section>
  `;
}

function generateCTAHTML(): string {
  const linksHTML = socialLinks.map(link => {
    const isMail = link.url.startsWith('mailto:');
    const isCV = link.url.endsWith('.pdf');
    const targetAttrs = (isMail || isCV) ? '' : 'target="_blank" rel="noopener noreferrer"';
    const downloadAttr = isCV ? 'download="CV_Uriel_Torres_Salazar.pdf"' : '';
    return `
    <a href="${link.url}" ${targetAttrs} ${downloadAttr} class="social-link interactive-element magnetic-btn">
      <span style="display:flex; align-items:center; justify-content:center;">${getIconSVG(link.name)}</span>
      ${link.name}
    </a>
  `;
  }).join('');

  return `
    <section id="contacto" class="cta-section gsap-reveal">
      <span class="section-tag">Contacto Profesional</span>
      <h2 class="cta-title">¿Conversamos sobre un nuevo proyecto?</h2>
      <p class="headline" style="margin-bottom: 0;">Arquitectura de red escalable, automatización NetDevOps, seguridad perimetral o firmware IoT.</p>
      
      <div class="cta-email-box copy-email-btn interactive-element" title="Clic para copiar correo" data-email="${profileInfo.email}">
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

function generateModalHTML(): string {
  return `
    <div id="topology-modal" class="topology-modal-overlay">
      <div class="topology-modal-container">
        <div class="topology-modal-header">
          <div class="modal-header-titles">
            <h3 id="modal-title" class="modal-title">Topología de Red</h3>
            <span id="modal-subtitle" class="modal-subtitle">Especificación Técnica</span>
          </div>
          <button id="modal-close-btn" class="modal-close-btn interactive-element" aria-label="Cerrar modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div class="topology-modal-body">
          <div id="modal-svg-container" class="modal-svg-box"></div>
          
          <div class="modal-details-box">
            <p id="modal-description" class="modal-description"></p>
            <h4 class="modal-specs-title">Componentes & Configuración</h4>
            <div id="modal-specs-grid" class="modal-specs-grid"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function escapeHTML(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function initApp() {
  const appElement = document.getElementById('app');
  if (!appElement) return;

  appElement.innerHTML = `
    <div class="container">
      ${generateHeroHTML()}
      ${generateProjectsHTML()}
      ${generateNetDevOpsCodeHTML()}
      ${generateLabsHTML()}
      ${generateSkillsHTML()}
      ${generateCTAHTML()}
      ${generateFooterHTML()}
    </div>
    ${generateModalHTML()}
    <div id="toast" class="toast-notification">¡Acción completada!</div>
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

  tl.to('.loader-progress', { width: '100%', duration: 1.1, ease: 'power2.inOut' })
    .to('.loader-text', { opacity: 0, duration: 0.25 }, "-=0.2")
    .to('#preloader', { yPercent: -100, duration: 0.7, ease: 'power4.inOut' });
}

function initCore() {
  initSmoothScrolling();
  initAnimations();
  initCustomCursor();
  initTiltEffect();
  initMarquee();
  initMagneticButtons();
  initContactLogic();
  initTerminal();
  initCategoryFilters();
  initTopologyModal();
  initCodeSnippetCopy();
}

function initContactLogic() {
  const toast = document.getElementById('toast');
  const targetEmail = profileInfo.email;

  const showToast = (message: string) => {
    if (!toast) return;
    toast.textContent = message;
    gsap.killTweensOf(toast);
    gsap.to(toast, {
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      ease: "back.out(1.5)"
    });

    gsap.to(toast, {
      y: 100,
      autoAlpha: 0,
      duration: 0.4,
      delay: 3.5,
      ease: "power2.in"
    });
  };

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
      showToast(`¡Correo copiado: ${text}!`);
    } catch (err) {
      console.error('Error al copiar correo:', err);
    }
  };

  const copyElements = document.querySelectorAll('.copy-email-btn, .hablemos-btn');
  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      copyTextToClipboard(targetEmail);
    });
  });
}

function initTerminal() {
  const termInput = document.getElementById('terminal-input') as HTMLInputElement;
  const termOutput = document.getElementById('terminal-output');
  const miniTerminal = document.getElementById('mini-terminal');

  if (!termInput || !termOutput || !miniTerminal) return;

  miniTerminal.addEventListener('click', () => {
    termInput.focus();
  });

  const appendLine = (html: string) => {
    const div = document.createElement('div');
    div.className = 'term-line';
    div.innerHTML = html;
    termOutput.appendChild(div);
    termOutput.scrollTop = termOutput.scrollHeight;
  };

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = termInput.value.trim();
      const cmd = rawCmd.toLowerCase();
      termInput.value = '';

      if (!cmd) return;

      // Echo command
      appendLine(`<span class="term-prompt">uriel@netdevops:~$</span> <span class="term-cmd">${rawCmd}</span>`);

      switch (cmd) {
        case 'help':
          appendLine(`
            <div class="term-help-block">
              <div><span class="text-cyan">about</span> — Ver perfil profesional y especialidad</div>
              <div><span class="text-cyan">skills</span> — Resumen de tecnologías de red y sistemas</div>
              <div><span class="text-cyan">projects</span> — Desplazar la vista a los proyectos</div>
              <div><span class="text-cyan">labs</span> — Explorar infraestructura crítica</div>
              <div><span class="text-cyan">cv</span> — Descargar el Currículum Vitae en PDF</div>
              <div><span class="text-cyan">ping</span> — Ejecutar prueba telemétrica ICMP simulada</div>
              <div><span class="text-cyan">contact</span> — Copiar correo de contacto oficial</div>
              <div><span class="text-cyan">clear</span> — Limpiar la consola</div>
            </div>
          `);
          break;

        case 'about':
          appendLine(`
            <div class="text-green">${profileInfo.name} | ${profileInfo.role}</div>
            <div class="text-gray">${profileInfo.headline}</div>
            <div class="text-gray" style="margin-top: 4px;">🎓 ${profileInfo.education}</div>
          `);
          break;

        case 'skills':
          appendLine(`
            <div>📡 <span class="text-cyan">Cisco:</span> Catalyst 9300L/9200L, VLANs 802.1Q, OSPF, STP</div>
            <div>🛡️ <span class="text-cyan">Seguridad:</span> Fortinet FortiGate SD-WAN, Cloudflare Zero Trust, UFW</div>
            <div>🖥️ <span class="text-cyan">Linux:</span> Ubuntu Server, ZRAM zstd en RAM, Docker, WireGuard</div>
            <div>⚡ <span class="text-cyan">NetDevOps:</span> Python (Netmiko, RESTCONF, FastAPI), Git, CI/CD</div>
            <div>🤖 <span class="text-cyan">IoT:</span> ESP32 Dual-Core (FreeRTOS), Mosquitto MQTT, Node-RED</div>
          `);
          break;

        case 'projects':
          appendLine(`<span class="text-green">Desplazando hacia la sección de proyectos...</span>`);
          document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
          break;

        case 'labs':
          appendLine(`<span class="text-green">Desplazando hacia infraestructura crítica...</span>`);
          document.getElementById('laboratorios')?.scrollIntoView({ behavior: 'smooth' });
          break;

        case 'cv':
          appendLine(`<span class="text-green">Iniciando descarga de CV_Uriel_Torres_Salazar.pdf...</span>`);
          const link = document.createElement('a');
          link.href = '/CV_Uriel_Torres_Salazar.pdf';
          link.download = 'CV_Uriel_Torres_Salazar.pdf';
          document.body.appendChild(link);
          link.click();
          link.remove();
          break;

        case 'ping':
          appendLine(`<span class="text-gray">PING cisco-core.tecsup.local (10.10.10.2): 56 data bytes</span>`);
          setTimeout(() => appendLine(`64 bytes from 10.10.10.2: icmp_seq=1 ttl=64 time=1.84 ms`), 150);
          setTimeout(() => appendLine(`64 bytes from 10.10.10.2: icmp_seq=2 ttl=64 time=1.62 ms`), 300);
          setTimeout(() => appendLine(`<span class="text-green">--- cisco-core.tecsup.local ping statistics: 0% packet loss, rtt min/avg/max = 1.62/1.73/1.84 ms</span>`), 450);
          break;

        case 'contact':
          navigator.clipboard?.writeText(profileInfo.email);
          appendLine(`<span class="text-cyan">Correo: ${profileInfo.email} (¡Copiado al portapapeles!)</span>`);
          break;

        case 'clear':
          termOutput.innerHTML = '';
          break;

        default:
          appendLine(`<span class="text-red">zsh: comando no reconocido: '${rawCmd}'. Escribe 'help' para ayuda.</span>`);
          break;
      }
    }
  });
}

function initCategoryFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectItems = document.querySelectorAll('.project-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const element = item as HTMLElement;

        if (filter === 'all' || itemCategory === filter) {
          element.style.display = 'block';
          gsap.fromTo(element, 
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
          );
        } else {
          element.style.display = 'none';
        }
      });

      ScrollTrigger.refresh();
    });
  });
}

function initTopologyModal() {
  const modal = document.getElementById('topology-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const titleEl = document.getElementById('modal-title');
  const subtitleEl = document.getElementById('modal-subtitle');
  const descEl = document.getElementById('modal-description');
  const svgContainer = document.getElementById('modal-svg-container');
  const specsGrid = document.getElementById('modal-specs-grid');

  if (!modal || !closeBtn || !titleEl || !subtitleEl || !descEl || !svgContainer || !specsGrid) return;

  const openModal = (topologyId: string) => {
    const data: TopologyDiagram = topologiesMap[topologyId];
    if (!data) return;

    titleEl.textContent = data.title;
    subtitleEl.textContent = data.subtitle;
    descEl.textContent = data.description;
    svgContainer.innerHTML = data.svg;

    specsGrid.innerHTML = data.specs.map(spec => `
      <div class="spec-card">
        <span class="spec-label">${spec.label}</span>
        <span class="spec-val">${spec.value}</span>
      </div>
    `).join('');

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    gsap.fromTo('.topology-modal-container', 
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  };

  const closeModal = () => {
    gsap.to('.topology-modal-container', {
      opacity: 0,
      scale: 0.94,
      y: 20,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  };

  document.querySelectorAll('.view-topology-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const topoId = (btn as HTMLElement).getAttribute('data-topology');
      if (topoId) openModal(topoId);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

function initCodeSnippetCopy() {
  const copyBtn = document.getElementById('copy-snippet-btn');
  const toast = document.getElementById('toast');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard?.writeText(pythonSnippetCode).then(() => {
      if (toast) {
        toast.textContent = "¡Código de automatización copiado!";
        gsap.killTweensOf(toast);
        gsap.to(toast, { y: 0, autoAlpha: 1, duration: 0.5, ease: "back.out(1.5)" });
        gsap.to(toast, { y: 100, autoAlpha: 0, duration: 0.4, delay: 3, ease: "power2.in" });
      }
    });
  });
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
    { y: 0, opacity: 1, duration: 1.0, stagger: 0.08, ease: 'power3.out', delay: 0.25 }
  );

  const revealElements = document.querySelectorAll('.gsap-reveal');
  revealElements.forEach((el) => {
    gsap.set(el, { autoAlpha: 0, y: 50, scale: 0.99 });

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
      yPercent: -2.5,
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
    gsap.to(content, { xPercent: -100, repeat: -1, duration: 32, ease: "linear" });
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
