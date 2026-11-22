export interface Skill {
  category: string;
  items: { name: string; detail: string }[];
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'netdevops' | 'cloud' | 'iot' | 'software';
  categoryLabel: string;
  description: string;
  bulletPoints: string[];
  technologies: string[];
  link?: string;
  topologyId?: string;
  status: string;
  badgeType: 'production' | 'live' | 'private' | 'active';
  isPrivate?: boolean;
}

export interface Lab {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  topologyId?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Certification {
  title: string;
  issuer: string;
  code?: string;
  year: string;
}

export const profileInfo = {
  name: "Uriel Aron Torres Salazar",
  role: "SysAdmin & NetDevOps Specialist",
  tagline: "Administrador de Redes, Infraestructura Cloud & Ciberseguridad",
  headline: "Especialidad en Cisco Enterprise, Firewalls Fortinet, Servidores Linux, Cloudflare Zero Trust & IoT FreeRTOS.",
  about: "Estudiante de últimos ciclos (VI Ciclo) de Administración de Redes y Comunicaciones en Tecsup (Mención en Virtualización y Seguridad Informática). Experiencia práctica comprobada en conmutación y enrutamiento con equipos Cisco Catalyst, políticas de ciberseguridad en firewalls Fortinet FortiGate, administración avanzada de servidores Linux Ubuntu y aseguramiento de aplicaciones perimetrales mediante Cloudflare Zero Trust. Diseñador de arquitecturas distribuidas de alta eficiencia que integran microcontroladores ESP32 con firmware FreeRTOS dual-core, telemetría MQTT y microservicios automatizados en Python y Docker.",
  education: "Tecsup (Campus Arequipa) · VI Ciclo (Mención en Virtualización y Seguridad Informática)",
  location: "Arequipa, Perú",
  phone: "+51 930 171 820",
  email: "torressalazarurielaron@gmail.com",
  status: "Disponible para proyectos & roles NetDevOps / Infraestructura",
  collaboration: "Alto desempeño en trabajo en equipo multidisciplinario, diseño e implementación de topologías de red críticas, automatización idempotente de despliegues y resolución proactiva de incidentes bajo metodologías ágiles."
};

export const certificationsData: Certification[] = [
  {
    title: "Python: Programación & Automatización de Redes",
    issuer: "Certificación Especializada",
    year: "2025"
  },
  {
    title: "Cisco CCNA: Enterprise Routing & Switching",
    issuer: "En preparación activa (Próxima certificación)",
    year: "2026"
  },
  {
    title: "Liderazgo y Gestión de Carrera",
    issuer: "Tecsup PCC",
    code: "Cert. AQP/PCC/25/1280",
    year: "2024"
  },
  {
    title: "Competencias Blandas I",
    issuer: "Tecsup PCC",
    code: "Cert. AQP/PCC/24/4202",
    year: "2024"
  }
];

export const socialLinks: SocialLink[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/nyxthorn", icon: "in" },
  { name: "GitHub", url: "https://github.com/xllnyxthornllx", icon: "gh" },
  { name: "Email", url: "mailto:torressalazarurielaron@gmail.com", icon: "mail" },
  { name: "Descargar CV", url: "/CV_Uriel_Torres_Salazar.pdf", icon: "cv" }
];

export const filterCategories = [
  { id: 'all', label: 'Todos los Proyectos' },
  { id: 'netdevops', label: 'NetDevOps & Cisco' },
  { id: 'cloud', label: 'Cloud & Servidores' },
  { id: 'iot', label: 'IoT & FreeRTOS' },
  { id: 'software', label: 'Software & PWA' }
];

export const projectsData: Project[] = [
  {
    id: "cupora",
    title: "Cupora — Plataforma PWA Interurbana & Aforo en Tiempo Real",
    category: "software",
    categoryLabel: "Software & PWA",
    description: "Plataforma integral PWA de circuito cerrado para reserva de butacas, control de aforo y despacho de minivanes interurbanas en Perú (Renault Master, Mercedes-Benz Sprinter, Toyota HiAce).",
    bulletPoints: [
      "Constructor interactivo de carrocerías vehiculares con alineación magnética y pasadizos realistas.",
      "Escáner de boletos QR con cámara funcionando 100% offline para tramos de carretera sin internet.",
      "Checkout móvil con códigos QR de Yape y Plin con confirmación de operación y cajón de boletos activos.",
      "Bus de sincronización reactiva BroadcastChannel API para actualización multi-rol en tiempo real sin backend pesado."
    ],
    technologies: ["React 18", "TypeScript", "Tailwind CSS", "PWA Offline", "BroadcastChannel", "QR Engine"],
    link: "https://github.com/xllnyxthornllx/Cupora",
    status: "Producción PWA",
    badgeType: "production"
  },
  {
    id: "aida-iot",
    title: "Plataforma IoT & Servidor Cloud AIDA+",
    category: "iot",
    categoryLabel: "IoT & Firmware FreeRTOS",
    description: "Ecosistema de infraestructura telemétrica de alta concurrencia que conecta nodos microcontroladores remotos con un servidor cloud blindado.",
    bulletPoints: [
      "Firmware Dual-Core sobre FreeRTOS: Core 0 dedicado a la pila de red MQTT y Core 1 a la adquisición de sensores (DHT22, GPS) mediante colas inter-hilo xQueue (cero congelamientos ante latencia).",
      "Broker Mosquitto MQTT con puertos 1883 TCP y 9001 WebSockets protegidos con autenticación y ACLs.",
      "Servidor Linux Ubuntu Server en VPS KVM con firewall UFW y túneles cifrados salientes Cloudflare Zero Trust.",
      "Orquestación de flujos reactivos en Node-RED y persistencia de telemetría en MariaDB."
    ],
    technologies: ["ESP32 FreeRTOS", "Mosquitto MQTT", "Node-RED", "Cloudflare Zero Trust", "Ubuntu Server", "MariaDB"],
    link: "https://github.com/xllnyxthornllx/Aethermqtt-web",
    topologyId: "aida-iot",
    status: "Activo / Desplegado",
    badgeType: "live"
  },
  {
    id: "cisco-enterprise",
    title: "Infraestructura de Redes Enterprise & Ciberseguridad Perimetral",
    category: "netdevops",
    categoryLabel: "NetDevOps & Cisco",
    description: "Diseño, conmutación y securización perimetral de campus corporativo con equipamiento Cisco Catalyst y firewalls Fortinet FortiGate de última generación.",
    bulletPoints: [
      "Configuración de switches Cisco Catalyst 9200L y 9300L con segmentación estricta por VLANs 802.1Q y enlaces troncales redundantes.",
      "Enrutamiento dinámico corporativo mediante OSPF multi-área con inter-VLAN routing de alta velocidad.",
      "Seguridad perimetral con Fortinet FortiGate: inspección de paquetes, traducción de direcciones NAT y filtrado de amenazas.",
      "Despliegue wireless empresarial gestionado por UniFi Wireless Controller con autenticación 802.1X / WPA3 Enterprise."
    ],
    technologies: ["Cisco Catalyst 9300L/9200L", "OSPF Multi-área", "VLANs 802.1Q", "Fortinet FortiGate", "WPA3 Enterprise", "UniFi"],
    topologyId: "cisco-enterprise",
    status: "Validado en Lab",
    badgeType: "live"
  },
  {
    id: "firetext-audit",
    title: "FireText — Auditoría de Red & Monitoreo Automatizado",
    category: "cloud",
    categoryLabel: "Cloud & Servidores",
    description: "Arquitectura backend modular orientada a la seguridad perimetral, escaneo preventivo de infraestructura y trazabilidad de eventos críticos.",
    bulletPoints: [
      "Servicio backend continuo en Python (FastAPI/Flask) ejecutado como daemon systemd para monitoreo de hosts y escaneo de puertos.",
      "Autorización multi-factor (2FA/OTP): acciones críticas requieren verificación mediante bot integrado en Discord con OTPs seguros.",
      "Soporte nativo para conectividad en redes IPv6-only mediante síntesis DNS64.",
      "Automatización de copias de seguridad periódicas cifradas hacia almacenamiento en la nube utilizando Rclone."
    ],
    technologies: ["Python FastAPI", "systemd Daemon", "Discord 2FA/OTP", "IPv6 / DNS64", "Rclone Cifrado", "JSONL"],
    status: "Servicio Daemon",
    badgeType: "live"
  },
  {
    id: "homelab-case-study",
    title: "Caso de Estudio: Homelab Privado & Edge Cluster Resiliente",
    category: "cloud",
    categoryLabel: "Cloud & Servidores",
    description: "Arquitectura de infraestructura doméstica de alta resiliencia diseñada como banco de pruebas para microservicios y servicios esenciales autoalojados.",
    bulletPoints: [
      "Servidor físico Ubuntu Server 26.04 con 17 microservicios contenerizados en Docker con límites rotativos de logs.",
      "Optimización de kernel con ZRAM (1.9 GB comprimido con zstd en RAM, vm.swappiness=100) previniendo desgaste de SSD.",
      "Acceso perimetral seguro mediante Cloudflare Zero Trust Tunnels (cero puertos expuestos hacia internet).",
      "Red de malla cifrada WireGuard sobre protocolo Tailscale y DNS sinkhole AdGuard Home con DoH/DoT upstream."
    ],
    technologies: ["Ubuntu Server 26.04", "Docker Compose (17 Contenedores)", "Cloudflare Zero Trust", "Tailscale WireGuard", "ZRAM Tuning", "AdGuard Home"],
    topologyId: "homelab-cluster",
    status: "🔒 Caso de Estudio Privado",
    badgeType: "private",
    isPrivate: true
  },
  {
    id: "netdevops-pipeline",
    title: "Automatización NetDevOps & Pipelines CI/CD",
    category: "netdevops",
    categoryLabel: "NetDevOps & Cisco",
    description: "Pipeline programable en Python para auditorías masivas de configuración de red, rotación segura de credenciales y cambios idempotentes.",
    bulletPoints: [
      "Scripts de automatización con Netmiko y Paramiko para orquestación sin intervención manual sobre equipamiento Cisco IOS.",
      "Consumo de APIs RESTCONF para telemetría estructurada en JSON y validación de tablas de enrutamiento.",
      "Validación continua de topologías de red en pipelines de GitHub Actions con simulaciones automatizadas.",
      "Despliegues controlados con rollback de seguridad ante fallas de enlace o políticas de acceso."
    ],
    technologies: ["Python", "Netmiko", "RESTCONF", "Cisco IOS", "GitHub Actions CI", "Bash"],
    link: "https://github.com/xllnyxthornllx/topologia_lab7-CI",
    status: "CI/CD Pipeline",
    badgeType: "active"
  }
];

export const labsData: Lab[] = [
  {
    title: "Integración SD-WAN Multi-Sitio & Firewall Perimetral",
    category: "Ciberseguridad Perimetral",
    description: "Diseño e implementación de FortiGate SD-WAN con balanceo dinámico de enlaces WAN, políticas de inspección SSL/TLS, reglas de filtrado perimetral y túneles IPsec seguros en topología multisede.",
    technologies: ["Fortinet", "FortiGate", "SD-WAN", "IPsec VPN", "NAT/PAT"],
    topologyId: "cisco-enterprise"
  },
  {
    title: "Controladores Inalámbricos Aruba & Seguridad WLAN",
    category: "Infraestructura Inalámbrica",
    description: "Configuración integral de Aruba Mobility Controllers, políticas de autenticación empresarial 802.1X / WPA3, segmentación de tráfico por VLANs y optimización de perfiles de radiofrecuencia (RF).",
    technologies: ["Aruba Networks", "Mobility Controller", "802.1X", "WPA3", "VLANs"]
  },
  {
    title: "Supervisión Industrial & PLC Allen-Bradley",
    category: "Automatización Industrial",
    description: "Diseño y simulación de rutinas ladder para supervisión de procesos industriales en controladores Allen-Bradley L24ER (Studio 5000 / LogixPro) con interbloqueos de seguridad e indicadores SCADA.",
    technologies: ["Allen-Bradley", "Rockwell L24ER", "Studio 5000", "LogixPro", "Ladder Logic"]
  },
  {
    title: "Laboratorios Virtualizados de Alta Fidelidad",
    category: "Virtualización",
    description: "Construcción y orquestación de escenarios corporativos redundantes en VMware Workstation / ESXi y WSL2, simulando infraestructuras híbridas con alta disponibilidad.",
    technologies: ["VMware ESXi", "WSL2", "Linux Ubuntu Server", "Packet Tracer", "GNS3"]
  }
];

export const skillsData: Skill[] = [
  {
    category: "Redes & Conectividad",
    icon: "📡",
    items: [
      { name: "Cisco Catalyst (9200L/9300L)", detail: "CCNA Routing & Switching, VLANs 802.1Q, Trunking, Spanning Tree (RSTP)" },
      { name: "Enrutamiento Dinámico", detail: "OSPF multi-área, inter-VLAN routing, ACLs estándar y extendidas, DHCP snooping" },
      { name: "Wireless Corporativo", detail: "UniFi Wireless Controller, Aruba Mobility Controllers, WPA2/WPA3 Enterprise" },
      { name: "Videovigilancia IP", detail: "Segmentación de cámaras IP, PoE 802.3af/at y aislamiento perimetral" }
    ]
  },
  {
    category: "Cloud, Servidores & Seguridad",
    icon: "🛡️",
    items: [
      { name: "Linux Server (Ubuntu 24.04/26.04)", detail: "Kernel tuning, gestión de storage LVM, administración systemd y ZRAM zstd" },
      { name: "Cloudflare Zero Trust", detail: "Túneles cifrados salientes, Anycast Edge, políticas de acceso sin abrir puertos" },
      { name: "Fortinet FortiGate", detail: "Firewalls Next-Gen, túneles IPsec, SD-WAN, NAT/PAT y políticas perimetrales" },
      { name: "Docker & Seguridad", detail: "Contenerización modular, límites rotativos de logs, firewall UFW y llaves SSH Ed25519" }
    ]
  },
  {
    category: "Automatización & NetDevOps",
    icon: "⚡",
    items: [
      { name: "Python Network Eng.", detail: "FastAPI, Flask, Netmiko, Paramiko, RESTCONF y consumo estructurado de APIs" },
      { name: "Scripting de Sistemas", detail: "Bash y PowerShell para orquestación de servidores, auditoría JSONL y tareas cron" },
      { name: "Control de Versiones & CI", detail: "Git / GitHub, workflows de automatización CI/CD y Rclone Automation" },
      { name: "Autorización 2FA / OTP", detail: "Integración de verificación en 2 pasos mediante bots de Discord para operaciones críticas" }
    ]
  },
  {
    category: "IoT, Hardware & Protocolos",
    icon: "🤖",
    items: [
      { name: "ESP32 Dual-Core (FreeRTOS)", detail: "Firmware C/C++ en PlatformIO, colas inter-hilo xQueue, tareas en Core 0 y Core 1" },
      { name: "Broker Mosquitto MQTT", detail: "Conexiones seguras TCP 1883 y WebSockets 9001, autenticación y listas ACLs" },
      { name: "Node-RED & SCADA", detail: "Orquestación de flujos reactivos, telemetría de sensores DHT22/GPS y control" },
      { name: "Bases de Datos Telemétricas", detail: "MariaDB, SQLite FTS5 y almacenamiento estructurado de logs de red" }
    ]
  },
  {
    category: "Desarrollo Frontend & Web",
    icon: "🚀",
    items: [
      { name: "TypeScript & React 18", detail: "Arquitecturas SPA modulares, hooks personalizados y tipado estricto" },
      { name: "Tailwind CSS & Vite", detail: "Interfaces web responsivas de alto rendimiento, compilación instantánea" },
      { name: "PWA & Offline Ready", detail: "Service Workers, IndexedDB, manifiestos móviles y cámaras QR offline" },
      { name: "Web Audio & DSP", detail: "Procesamiento digital de señales dual-deck y animaciones GSAP 3 con Lenis scroll" }
    ]
  }
];

export const toolsMarquee = [
  "Cisco Catalyst 9300L",
  "Fortinet FortiGate",
  "Python NetDevOps",
  "Cloudflare Zero Trust",
  "Docker Containers",
  "ESP32 FreeRTOS",
  "Mosquitto MQTT",
  "Tailscale WireGuard",
  "Ubuntu Server",
  "React 18 & TypeScript",
  "Node-RED SCADA",
  "Netmiko Automation",
  "RESTCONF APIs",
  "Aruba Wireless",
  "OSPF Routing",
  "ZRAM Kernel Tuning",
  "AdGuard Home DNS",
  "Allen-Bradley PLC",
  "Git & GitHub CI"
];

