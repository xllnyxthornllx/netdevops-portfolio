export interface Skill {
  category: string;
  items: { name: string; detail: string }[];
  icon: string;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  link?: string;
  demoUrl?: string;
  status: string;
  badgeType?: 'live' | 'production' | 'active' | 'iot';
}

export interface Lab {
  title: string;
  category: string;
  description: string;
  technologies: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const profileInfo = {
  name: "Uriel Aron Torres Salazar",
  role: "SysAdmin & NetDevOps Specialist",
  headline: "Administración de Redes & Comunicaciones | Especialista en NetDevOps, Cloud Infrastructure e IoT",
  about: "Especialista en formación en Administración de Redes y Comunicaciones por Tecsup. Mi enfoque une la infraestructura de red física y virtual con la programabilidad y desarrollo de software de alto impacto (NetDevOps). Con experiencia comprobada en la administración de servidores de alta disponibilidad (NYXCORE Homelab con 17 microservicios Docker y túneles Cloudflare Zero Trust), seguridad perimetral (Fortinet SD-WAN, Cisco, Aruba, AdGuard Home), automatización avanzada en Python (Netmiko, RESTCONF) y aplicaciones web modernas de alto rendimiento.",
  education: "Tecsup (Administración de Redes y Comunicaciones)",
  email: "torressalazarurielaron@gmail.com",
  status: "Disponible para proyectos & retos de infraestructura",
  collaboration: "Alto desempeño en trabajo en equipo multidisciplinario, diseño e implementación de topologías de red críticas, automatización idempotente de despliegues y resolución proactiva de incidentes bajo metodologías ágiles."
};

export const socialLinks: SocialLink[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/nyxthorn", icon: "in" },
  { name: "GitHub", url: "https://github.com/xllnyxthornllx", icon: "gh" },
  { name: "Email", url: "mailto:torressalazarurielaron@gmail.com", icon: "mail" },
  { name: "NYXCORE Cloud", url: "https://nyxcore.online", icon: "cloud" }
];

export const skillsData: Skill[] = [
  {
    category: "Networking & Seguridad",
    icon: "📡",
    items: [
      { name: "Cisco Enterprise", detail: "Routing, Switching, STP, OSPF, VLANs, Trunking y Hardening" },
      { name: "Fortinet FortiGate", detail: "Firewalls Next-Gen, túneles IPsec, SD-WAN y políticas perimetrales" },
      { name: "Aruba Networks", detail: "Mobility Controllers, despliegue WLAN y autenticación 802.1X / WPA3" },
      { name: "Zero Trust & VPN", detail: "Cloudflare Tunnels, WireGuard, Tailscale Mesh y AdGuard Home DNS sinkhole" }
    ]
  },
  {
    category: "Automatización & NetDevOps",
    icon: "⚡",
    items: [
      { name: "Python Network Eng.", detail: "Automatización masiva con Netmiko, Paramiko, RESTCONF y consumo de APIs" },
      { name: "Bash & Linux Scripting", detail: "Orquestación de servicios, cron jobs de respaldo y gestión de storage LVM" },
      { name: "Docker & Contenedores", detail: "Ecosistema de 17 contenedores, límites rotativos de logs y redes puente seguras" },
      { name: "CI / CD & Git", detail: "Control de versiones, pipelines de validación y automatización de despliegues" }
    ]
  },
  {
    category: "Sistemas & Cloud Homelab",
    icon: "🖥️",
    items: [
      { name: "Ubuntu Server & Pro", detail: "Kernel tuning (Linux 6.x/7.x), optimización ZRAM zstd en RAM y gestión UFW" },
      { name: "Virtualización", detail: "Topologías complejas en VMware Workstation / ESXi, WSL2 y emuladores" },
      { name: "Observabilidad & Monitoreo", detail: "Uptime Kuma, Dozzle, Portainer, Glances y telemetría de recursos en vivo" },
      { name: "Almacenamiento & Respaldo", detail: "Particionado GPT / SSD Kingston / LVM HDD 1.8 TB y backups automatizados" }
    ]
  },
  {
    category: "IoT & Automatización Industrial",
    icon: "🤖",
    items: [
      { name: "ESP32 & Microcontroladores", detail: "Lectura de sensores I2C/SPI, actuadores y transmisión telemétrica" },
      { name: "Protocolos MQTT", detail: "Broker Mosquitto sobre TCP y WebSockets con cifrado y autenticación" },
      { name: "Node-RED & SCADA", detail: "Flujos de control reactivo, automatización de riego y paneles en tiempo real" },
      { name: "PLC Industrial", detail: "Lógica de contactos Ladder en Allen-Bradley L24ER (Studio 5000 / LogixPro)" }
    ]
  },
  {
    category: "Desarrollo Web & Frontend",
    icon: "🚀",
    items: [
      { name: "TypeScript & React 18", detail: "Arquitecturas SPA, componentes modulares, hooks y tipado estricto" },
      { name: "Tailwind CSS & Vite", detail: "Diseño UI responsivo, utilidades de rendimiento y bundlers ultrarrápidos" },
      { name: "PWA & Offline Ready", detail: "Service Workers, IndexedDB, manifiestos móviles y cámaras QR offline" },
      { name: "Web Audio & DSP", detail: "Procesamiento de audio digital dual-deck, Web Audio API y animación GSAP" }
    ]
  }
];

export const labsData: Lab[] = [
  {
    title: "NYXCORE — Servidor Físico Doméstico & 17 Contenedores",
    category: "Cloud Homelab & Edge",
    description: "Servidor Ubuntu Server 26.04 con optimización de memoria ZRAM (zstd comprimido en RAM), 17 contenedores Docker activos, túnel Cloudflare Zero Trust bajo dominio nyxcore.online y VPN WireGuard/Tailscale.",
    technologies: ["Ubuntu Server 26.04", "Docker", "Cloudflare Zero Trust", "Tailscale", "ZRAM", "AdGuard"]
  },
  {
    title: "Integración SD-WAN Multi-Sitio & Firewall Perimetral",
    category: "Seguridad Perimetral",
    description: "Diseño e implementación de FortiGate SD-WAN con balanceo dinámico de enlaces, políticas estrictas de firewall perimetral, optimización de tráfico y túneles IPsec seguros en entornos multisede.",
    technologies: ["Fortinet", "FortiGate", "SD-WAN", "IPsec", "Firewall"]
  },
  {
    title: "Automatización de Redes con Python & RESTCONF",
    category: "NetDevOps",
    description: "Desarrollo de scripts de auditoría y configuración idempotente masiva para routers y switches Cisco. Automatización de rotación de contraseñas, telemetría y consultas programáticas con Netmiko y RESTCONF.",
    technologies: ["Python", "Netmiko", "RESTCONF", "Cisco IOS", "Automation"]
  },
  {
    title: "Controladores Inalámbricos Aruba & Seguridad WLAN",
    category: "Infraestructura Inalámbrica",
    description: "Configuración integral de Aruba Mobility Controllers, políticas de autenticación empresarial 802.1X / WPA3, segmentación de tráfico por VLANs y optimización de cobertura de radiofrecuencia (RF).",
    technologies: ["Aruba", "Mobility Controller", "802.1X", "WPA3", "VLANs"]
  },
  {
    title: "Supervisión Industrial & PLC Allen-Bradley",
    category: "Automatización Industrial",
    description: "Diseño y simulación de rutinas ladder para supervisión de procesos automatizados con controladores Allen-Bradley L24ER (Studio 5000 / LogixPro) con interbloqueos de seguridad.",
    technologies: ["Allen-Bradley", "Rockwell L24ER", "Studio 5000", "LogixPro", "Ladder"]
  },
  {
    title: "Topologías Virtualizadas de Alta Fidelidad",
    category: "Virtualización",
    description: "Construcción y orquestación de laboratorios complejos de redes de computadoras mediante VMware Workstation/ESXi y WSL2, simulando entornos de producción corporativos con conmutación redundante.",
    technologies: ["VMware", "WSL2", "Linux Enterprise", "Packet Tracer", "GNS3"]
  }
];

export const projectsData: Project[] = [
  {
    title: "Cupora — Plataforma Interurbana & Aforo en Tiempo Real",
    category: "Full-Stack PWA / React",
    description: "Plataforma web PWA para reserva de butacas, venta en ventanilla y despacho de minivanes interurbanas en Perú. Incluye constructor interactivo de carrocerías con alineación magnética, escáner de boletos QR 100% offline con cámara, checkout con Yape/Plin y bus de sincronización reactiva BroadcastChannel.",
    technologies: ["React 18", "TypeScript", "Tailwind CSS", "PWA", "BroadcastChannel", "QR Engine"],
    link: "https://github.com/xllnyxthornllx/Cupora",
    demoUrl: "https://github.com/xllnyxthornllx/Cupora",
    status: "Producción",
    badgeType: "production"
  },
  {
    title: "NYXCORE — Homelab & Cluster Zero Trust",
    category: "Infraestructura & Cloud",
    description: "Servidor doméstico de alta resiliencia bajo dominio propio (nyxcore.online). Alberga 17 microservicios Docker, ZRAM en RAM para cuadruplicar la capacidad efectiva sin desgaste de SSD, túneles Cloudflare Zero Trust sin puertos expuestos a internet y DNS sinkhole perimetral AdGuard Home con DoH/DoT.",
    technologies: ["Ubuntu Server 26.04", "Docker", "Cloudflare Zero Trust", "Tailscale", "ZRAM", "AdGuard Home"],
    link: "https://nyxcore.online",
    demoUrl: "https://nyxcore.online",
    status: "Online (17 Contenedores)",
    badgeType: "live"
  },
  {
    title: "NYXCORE Autonomous AI DJ 8.0 & Web Audio DSP",
    category: "Web Audio DSP & AI",
    description: "Sistema de streaming y mezcla autónoma con arquitectura Web Audio DSP dual-deck. Incorpora análisis armónico en tiempo real (Rueda de Camelot + BPM), 7 técnicas de transición profesional (Bass Swap, High-Pass Sweep, Vinyl Brake), visualizador 3D reactivo a 60 FPS y locuciones neuronales con IA DJ Elvira.",
    technologies: ["Web Audio API", "DSP Dual-Deck", "TypeScript", "Docker", "Neural TTS", "Camelot Wheel"],
    link: "https://iot.nyxcore.online/dj/",
    demoUrl: "https://iot.nyxcore.online/dj/",
    status: "Live DSP",
    badgeType: "live"
  },
  {
    title: "PetFeeder-IoT & Invernadero Inteligente (SCADA)",
    category: "IoT & Telemetría",
    description: "Sistema de dispensación automatizada y telemetría ambiental para agricultura/invernaderos con microcontroladores ESP32, broker MQTT Mosquitto sobre TCP y WebSockets, motor de automatización reactiva en Node-RED y visualización en tiempo real.",
    technologies: ["ESP32", "MQTT / Mosquitto", "Node-RED", "Sensores I2C", "WebSockets"],
    link: "https://github.com/xllnyxthornllx/Aethermqtt-web",
    demoUrl: "https://github.com/xllnyxthornllx/Aethermqtt-web",
    status: "Online",
    badgeType: "iot"
  },
  {
    title: "Automatización de Infraestructura & NetDevOps Pipeline",
    category: "NetDevOps & Python",
    description: "Suite programable en Python para auditoría masiva de configuraciones de red, cambio seguro de contraseñas de switches y routers Cisco mediante Netmiko, telemetría y aprovisionamiento dinámico con APIs RESTCONF y pipelines de validación CI.",
    technologies: ["Python", "RESTCONF", "Netmiko", "Cisco IOS", "Fortinet", "CI/CD"],
    link: "https://github.com/xllnyxthornllx/topologia_lab7-CI",
    demoUrl: "https://github.com/xllnyxthornllx/topologia_lab7-CI",
    status: "Activo",
    badgeType: "active"
  }
];

export const toolsMarquee = [
  "Cisco Enterprise",
  "Fortinet SD-WAN",
  "Python NetDevOps",
  "Docker Containers",
  "Cloudflare Zero Trust",
  "Tailscale WireGuard",
  "Ubuntu Server 26.04",
  "TypeScript",
  "React 18",
  "ESP32 IoT",
  "MQTT Mosquitto",
  "Node-RED SCADA",
  "Netmiko Automation",
  "RESTCONF APIs",
  "Aruba Wireless",
  "Allen-Bradley PLC",
  "ZRAM Kernel Tuning",
  "AdGuard Home DNS",
  "Git & GitHub CI"
];
