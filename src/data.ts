export interface Skill {
  category: string;
  items: { name: string; detail: string }[];
  icon: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
}

export interface Lab {
  title: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const profileInfo = {
  name: "Uriel Aron Torres Salazar",
  headline: "Administración de Redes y Comunicaciones | Especialista en Automatización, IoT y Desarrollo Web.",
  about: "Especialista en formación en Administración de Redes y Comunicaciones por Tecsup. Mi enfoque se centra en la convergencia entre la infraestructura física y la programabilidad (NetDevOps). Experto en el despliegue de soluciones escalables que integran seguridad perimetral, automatización de procesos mediante Python y desarrollo de ecosistemas IoT.",
  education: "Tecsup (Administración de Redes y Comunicaciones)",
  collaboration: "Alto desempeño en trabajo en equipo, elaborando reportes técnicos de alta precisión y colaborando en proyectos conjuntos de laboratorio. Miembro activo de equipos técnicos que documentan y solucionan incidentes bajo metodologías ágiles."
};

export const socialLinks: SocialLink[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/nyxthorn", icon: "in" },
  { name: "GitHub", url: "https://github.com/xllnyxthornllx", icon: "gh" }
];

export const skillsData: Skill[] = [
  {
    category: "Networking",
    items: [
      { name: "Cisco", detail: "Routing & Switching, despliegues de red empresariales" },
      { name: "Fortinet", detail: "Firewalls & configuración SD-WAN, seguridad perimetral" }
    ],
    icon: "📡"
  },
  {
    category: "Automatización",
    items: [
      { name: "Python", detail: "Automatización de contraseñas, escaneos de red (Netmiko, RESTCONF)" },
      { name: "Bash Scripting", detail: "Administración y orquestación en sistemas Linux" }
    ],
    icon: "⚡"
  },
  {
    category: "IoT & Desarrollo",
    items: [
      { name: "IoT", detail: "ESP32, Arduino, protocolos MQTT, flujos en Node-RED" },
      { name: "Web", detail: "TypeScript, consumo de REST APIs, Arquitecturas SPA" }
    ],
    icon: "🤖"
  },
  {
    category: "Herramientas Pro",
    items: [
      { name: "Entornos", detail: "Linux (Ubuntu Server/Pro), VMware, WSL2" },
      { name: "Operaciones", detail: "Git, Docker, conexiones seguras (SSH), editores (Nano)" }
    ],
    icon: "⚙️"
  }
];

export const labsData: Lab[] = [
  {
    title: "Integración SD-WAN Multi-sitio",
    description: "Implementación de Fortigate SD-WAN con políticas de seguridad avanzadas y optimización de tráfico en arquitecturas distribuidas."
  },
  {
    title: "Automatización de Redes con Python",
    description: "Creación de scripts para auditoría masiva y cambios de configuración en entornos Cisco mediante Netmiko y APIs RESTCONF."
  },
  {
    title: "Gestión de Servidores Linux",
    description: "Administración de entornos Ubuntu Server y Pro, despliegue de contenedores Docker y orquestación de servicios web integrados."
  },
  {
    title: "Virtualización Avanzada",
    description: "Flujos de trabajo eficientes utilizando VMware, WSL2 y topologías de red virtualizadas de alta fidelidad."
  }
];

export const projectsData: Project[] = [
  {
    title: "PetFeeder-IoT",
    description: "Sistema de alimentación automatizada utilizando microcontroladores ESP32, integración de sensores y dashboards para monitoreo en tiempo real.",
    technologies: ["ESP32", "MQTT", "Node-RED", "Sensores"]
  },
  {
    title: "Despliegue Multi-sitio SD-WAN",
    description: "Diseño e integración de red segura usando políticas de firewall en Fortigate y servicios web en Ubuntu Server.",
    technologies: ["Fortigate", "Ubuntu Server", "SD-WAN", "Networking"]
  },
  {
    title: "Automatización de Infraestructura",
    description: "Desarrollo de scripts en Python para cambios de contraseñas masivas, escaneo de red y consumo de APIs RESTCONF en equipos Cisco.",
    technologies: ["Python", "RESTCONF", "Netmiko", "Cisco"]
  }
];

export const toolsMarquee = [
  "Cisco", "Fortinet", "Python", "Bash", "ESP32", "MQTT", "Node-RED", "TypeScript", "Ubuntu Server", "Docker", "VMware", "Git", "RESTCONF"
];
