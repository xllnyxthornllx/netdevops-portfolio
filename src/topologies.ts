export interface TopologyNode {
  id: string;
  name: string;
  role: string;
  ip: string;
  ports: string;
  status: string;
  description: string;
}

export interface TopologyDiagram {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  svg: string;
  specs: { label: string; value: string }[];
  cliConfig: {
    title: string;
    language: string;
    code: string;
  };
  nodes: TopologyNode[];
}

export const topologiesMap: Record<string, TopologyDiagram> = {
  'cisco-enterprise': {
    id: 'cisco-enterprise',
    title: 'Topología de Red Enterprise & Seguridad Perimetral',
    subtitle: 'Arquitectura Corporativa Cisco Catalyst 9300L/9200L + Fortinet FortiGate SD-WAN',
    badge: 'VALIDADO EN LABORATORIO FÍSICO',
    description: 'Diseño de red corporativa multi-capa con segmentación VLAN 802.1Q, enrutamiento inter-VLAN dinámico OSPF Area 0 en Switch Core L3, firewall perimetral Fortinet con inspección NAT y SD-WAN, y red inalámbrica UniFi con autenticación empresarial WPA3 / 802.1X.',
    specs: [
      { label: 'Switch Core L3', value: 'Cisco Catalyst 9300L (OSPF Area 0, Inter-VLAN SVIs, 10G SFP+ uplinks)' },
      { label: 'Switches de Acceso L2', value: 'Cisco Catalyst 9200L (Port-Security, 802.1Q Trunking, Rapid-PVST+)' },
      { label: 'Firewall Perimetral', value: 'Fortinet FortiGate Next-Gen (SD-WAN, NAT/PAT, SSL Inspection)' },
      { label: 'VLAN 10 — Administración', value: '10.10.10.0/24 (Gateway: 10.10.10.1, ACLs de acceso restringido)' },
      { label: 'VLAN 20 — Datos & Oficinas', value: '10.10.20.0/24 (Gateway: 10.10.20.1, DHCP Snooping activo)' },
      { label: 'VLAN 30 — Telefonía VoIP', value: '10.10.30.0/24 (Gateway: 10.10.30.1, Priorización QoS CoS 5)' },
      { label: 'VLAN 99 — Videovigilancia CCTV', value: '10.10.99.0/24 (Gateway: 10.10.99.1, Aislamiento PoE 802.3at)' },
      { label: 'WLAN Corporativa', value: 'UniFi Controller + APs Wi-Fi 6 (WPA3 Enterprise / Radius 802.1X)' }
    ],
    cliConfig: {
      title: 'Cisco Catalyst 9300L — Configuración OSPF & SVIs Inter-VLAN',
      language: 'cisco',
      code: `! ========================================================
! CISCO CATALYST 9300L - CORE SWITCH CONFIGURATION
! ========================================================
hostname Core-Cat9300L
ip routing
spanning-tree mode rapid-pvst
spanning-tree vlan 1-99 priority 4096

! --- SEGMENTACIÓN DE VLANS ---
vlan 10
 name ADMIN_MGMT
vlan 20
 name DATA_CORP
vlan 30
 name VOIP_TELEPHONY
vlan 99
 name CCTV_SURVEILLANCE

! --- INTERFACES SVI (GATEWAYS INTER-VLAN) ---
interface Vlan10
 description Gateway Admin
 ip address 10.10.10.1 255.255.255.0
 no shutdown

interface Vlan20
 description Gateway Datos
 ip address 10.10.20.1 255.255.255.0
 ip helper-address 10.10.10.254
 no shutdown

interface Vlan30
 description Gateway VoIP
 ip address 10.10.30.1 255.255.255.0
 no shutdown

interface Vlan99
 description Gateway CCTV
 ip address 10.10.99.1 255.255.255.0
 no shutdown

! --- ENLACE TRONCAL HACIA FORTIGATE FIREWALL ---
interface TenGigabitEthernet1/1/1
 description UPLINK-HACIA-FORTIGATE
 no switchport
 ip address 172.16.0.2 255.255.255.252
 ip ospf 1 area 0
 no shutdown

! --- ENRUTAMIENTO DINÁMICO OSPF ---
router ospf 1
 router-id 1.1.1.1
 passive-interface default
 no passive-interface TenGigabitEthernet1/1/1
 network 10.10.10.0 0.0.0.255 area 0
 network 10.10.20.0 0.0.0.255 area 0
 network 10.10.30.0 0.0.0.255 area 0
 network 10.10.99.0 0.0.0.255 area 0
 network 172.16.0.0 0.0.0.3 area 0`
    },
    nodes: [
      {
        id: 'node-fortigate',
        name: 'Fortinet FortiGate (Perímetro)',
        role: 'Gateway de Seguridad & SD-WAN',
        ip: 'WAN: 200.48.16.12 | LAN: 172.16.0.1/30',
        ports: 'WAN1 (Fibra), WAN2 (Respaldo), Port 1 (Core L3)',
        status: 'ACTIVO • 0 Amenazas Detectadas',
        description: 'Inspección profunda de paquetes (DPI), traducción de direcciones NAT/PAT perimetral, políticas de acceso hacia DMZ y balanceo dinámico de dos enlaces de salida con SD-WAN.'
      },
      {
        id: 'node-core',
        name: 'Cisco Catalyst 9300L (Core Switch)',
        role: 'Enrutamiento L3 Inter-VLAN & OSPF',
        ip: 'Router-ID: 1.1.1.1 | SVIs: 10.10.0.0/16',
        ports: 'Te1/1/1 (10G Uplink), Gi1/0/1-4 (Troncales LACP)',
        status: 'ACTIVO • OSPF Area 0 Full State',
        description: 'Nodo central de distribución. Procesa conmutación por hardware a velocidad de cable, inter-VLAN routing entre VLANs 10, 20, 30 y 99, y priorización de tráfico multimedia.'
      },
      {
        id: 'node-acc1',
        name: 'Cisco Catalyst 9200L (Acceso A)',
        role: 'Conmutación L2 & Port Security',
        ip: '10.10.10.2 (VLAN 10 Mgmt)',
        ports: 'Gi1/0/1-24 (Acceso), Gi1/0/49-50 (Uplink)',
        status: 'ACTIVO • RSTP Root Designated',
        description: 'Switches de borde con Port-Security activa (máximo 2 MACs por puerto con violación shutdown), DHCP Snooping y trunking 802.1Q con protección BPDU Guard.'
      },
      {
        id: 'node-wlan',
        name: 'UniFi Wireless Enterprise AP',
        role: 'Red Inalámbrica Corporativa Wi-Fi 6',
        ip: '10.10.20.50 (VLAN 20)',
        ports: 'PoE+ 802.3at (Gigabit)',
        status: 'ACTIVO • 802.1X / WPA3 Enterprise',
        description: 'Punto de acceso inalámbrico corporativo con SSIDs independientes segmentados por VLAN: SSID Corporativo (WPA3-Enterprise con Radius) y SSID Invitados (con portal cautivo y aislamiento de clientes).'
      }
    ],
    svg: `
      <svg viewBox="0 0 920 540" xmlns="http://www.w3.org/2000/svg" class="topology-svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#040711" />
            <stop offset="100%" stop-color="#09111f" />
          </linearGradient>
          <linearGradient id="coreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#002d4d" />
            <stop offset="100%" stop-color="#001426" />
          </linearGradient>
          <linearGradient id="fgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3d1e00" />
            <stop offset="100%" stop-color="#1f0f00" />
          </linearGradient>
          <linearGradient id="accGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#003d24" />
            <stop offset="100%" stop-color="#001a10" />
          </linearGradient>
          <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="url(#bgGrad)" rx="16" />

        <!-- Grid Matrix -->
        <g stroke="rgba(255,255,255,0.03)" stroke-width="1">
          <line x1="0" y1="90" x2="920" y2="90" />
          <line x1="0" y1="210" x2="920" y2="210" />
          <line x1="0" y1="360" x2="920" y2="360" />
          <line x1="230" y1="0" x2="230" y2="540" />
          <line x1="460" y1="0" x2="460" y2="540" />
          <line x1="690" y1="0" x2="690" y2="540" />
        </g>

        <!-- Dynamic Animated Link Streams -->
        <g stroke-width="2.5" fill="none">
          <!-- WAN to FortiGate -->
          <line x1="460" y1="55" x2="460" y2="115" stroke="#ffb703" stroke-dasharray="6,4" class="packet-stream" />
          <!-- FortiGate to Core Switch -->
          <line x1="460" y1="185" x2="460" y2="245" stroke="#00f0ff" stroke-dasharray="6,4" class="packet-stream" />
          
          <!-- Core Switch to Access Switch 1 -->
          <path d="M 390 280 L 230 360" stroke="#00ff9d" stroke-dasharray="6,4" class="packet-stream" />
          <!-- Core Switch to Access Switch 2 -->
          <path d="M 530 280 L 690 360" stroke="#00ff9d" stroke-dasharray="6,4" class="packet-stream" />
          
          <!-- Access 1 to Endpoints -->
          <line x1="230" y1="415" x2="140" y2="475" stroke="rgba(0, 240, 255, 0.5)" stroke-dasharray="4,4" />
          <line x1="230" y1="415" x2="310" y2="475" stroke="rgba(0, 255, 157, 0.5)" stroke-dasharray="4,4" />
          
          <!-- Access 2 to Endpoints -->
          <line x1="690" y1="415" x2="610" y2="475" stroke="rgba(255, 183, 3, 0.5)" stroke-dasharray="4,4" />
          <line x1="690" y1="415" x2="780" y2="475" stroke="rgba(183, 59, 254, 0.5)" stroke-dasharray="4,4" />
        </g>

        <!-- WAN INTERNET CLOUD -->
        <g transform="translate(460, 45)">
          <rect x="-85" y="-20" width="170" height="40" rx="20" fill="#0d1726" stroke="#8b949e" stroke-width="1.5" />
          <text x="0" y="5" text-anchor="middle" fill="#f0f6fc" font-family="'Fira Code', monospace" font-size="12" font-weight="700">🌐 WAN INTERNET</text>
          <text x="0" y="28" text-anchor="middle" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">Dual ISP SD-WAN (Fiber / Backup)</text>
        </g>

        <!-- NODE 1: FORTINET FORTIGATE -->
        <g transform="translate(460, 150)" class="topo-clickable-node" data-node="node-fortigate" style="cursor: pointer;">
          <rect x="-135" y="-32" width="270" height="64" rx="10" fill="url(#fgGrad)" stroke="#ffb703" stroke-width="2" filter="url(#glowCyan)" />
          <rect x="-125" y="-22" width="16" height="16" rx="4" fill="#ffb703" />
          <text x="-117" y="-10" text-anchor="middle" fill="#000" font-family="monospace" font-size="10" font-weight="900">FG</text>
          <text x="-95" y="-9" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="700">Fortinet FortiGate 60F</text>
          <text x="-95" y="10" fill="#ffb703" font-family="'Fira Code', monospace" font-size="9.5">SD-WAN • NAT/PAT • SSL Inspection</text>
          <text x="95" y="-9" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="9" font-weight="bold">🟢 172.16.0.1</text>
        </g>

        <!-- NODE 2: CISCO CORE SWITCH 9300L -->
        <g transform="translate(460, 280)" class="topo-clickable-node" data-node="node-core" style="cursor: pointer;">
          <rect x="-165" y="-35" width="330" height="70" rx="12" fill="url(#coreGrad)" stroke="#00f0ff" stroke-width="2.5" filter="url(#glowCyan)" />
          <rect x="-152" y="-23" width="20" height="20" rx="4" fill="#00f0ff" />
          <text x="-142" y="-9" text-anchor="middle" fill="#000" font-family="monospace" font-size="11" font-weight="900">L3</text>
          <text x="-120" y="-8" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="700">Cisco Catalyst 9300L (Core / Dist)</text>
          <text x="-120" y="12" fill="#00f0ff" font-family="'Fira Code', monospace" font-size="10.5">OSPF Area 0 • Inter-VLAN SVI • 10G SFP+</text>
          <text x="115" y="-8" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="9.5" font-weight="bold">🟢 1.1.1.1</text>
        </g>

        <!-- NODE 3: ACCESS SWITCH 1 (Catalyst 9200L-A) -->
        <g transform="translate(230, 390)" class="topo-clickable-node" data-node="node-acc1" style="cursor: pointer;">
          <rect x="-115" y="-28" width="230" height="56" rx="8" fill="url(#accGrad)" stroke="#00ff9d" stroke-width="1.8" />
          <text x="0" y="-8" text-anchor="middle" fill="#ffffff" font-family="'Inter', sans-serif" font-size="12.5" font-weight="700">Cisco Catalyst 9200L-A</text>
          <text x="0" y="10" text-anchor="middle" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="9.5">VLAN 10 (Admin) • VLAN 20 (Datos)</text>
        </g>

        <!-- NODE 4: ACCESS SWITCH 2 (Catalyst 9200L-B) -->
        <g transform="translate(690, 390)" class="topo-clickable-node" data-node="node-acc1" style="cursor: pointer;">
          <rect x="-115" y="-28" width="230" height="56" rx="8" fill="url(#accGrad)" stroke="#00ff9d" stroke-width="1.8" />
          <text x="0" y="-8" text-anchor="middle" fill="#ffffff" font-family="'Inter', sans-serif" font-size="12.5" font-weight="700">Cisco Catalyst 9200L-B</text>
          <text x="0" y="10" text-anchor="middle" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="9.5">VLAN 30 (VoIP) • VLAN 99 (CCTV)</text>
        </g>

        <!-- ENDPOINTS -->
        <!-- VLAN 10 Admin Host -->
        <g transform="translate(140, 490)">
          <rect x="-45" y="-18" width="90" height="36" rx="6" fill="#0f192b" stroke="#00f0ff" stroke-width="1" />
          <text x="0" y="-2" text-anchor="middle" fill="#fff" font-family="'Fira Code', monospace" font-size="10" font-weight="bold">💻 Admin PC</text>
          <text x="0" y="11" text-anchor="middle" fill="#00f0ff" font-family="'Fira Code', monospace" font-size="8.5">10.10.10.50</text>
        </g>

        <!-- VLAN 20 UniFi AP -->
        <g transform="translate(310, 490)" class="topo-clickable-node" data-node="node-wlan" style="cursor: pointer;">
          <rect x="-55" y="-18" width="110" height="36" rx="6" fill="#0f192b" stroke="#00ff9d" stroke-width="1.2" />
          <text x="0" y="-2" text-anchor="middle" fill="#fff" font-family="'Fira Code', monospace" font-size="10" font-weight="bold">📡 UniFi AP Wi-Fi 6</text>
          <text x="0" y="11" text-anchor="middle" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="8.5">WPA3 Enterprise</text>
        </g>

        <!-- VLAN 30 IP Phone -->
        <g transform="translate(610, 490)">
          <rect x="-45" y="-18" width="90" height="36" rx="6" fill="#0f192b" stroke="#ffb703" stroke-width="1" />
          <text x="0" y="-2" text-anchor="middle" fill="#fff" font-family="'Fira Code', monospace" font-size="10" font-weight="bold">📞 VoIP Phone</text>
          <text x="0" y="11" text-anchor="middle" fill="#ffb703" font-family="'Fira Code', monospace" font-size="8.5">10.10.30.22</text>
        </g>

        <!-- VLAN 99 CCTV PoE -->
        <g transform="translate(780, 490)">
          <rect x="-50" y="-18" width="100" height="36" rx="6" fill="#0f192b" stroke="#b73bfe" stroke-width="1" />
          <text x="0" y="-2" text-anchor="middle" fill="#fff" font-family="'Fira Code', monospace" font-size="10" font-weight="bold">📹 CCTV PoE Cam</text>
          <text x="0" y="11" text-anchor="middle" fill="#b73bfe" font-family="'Fira Code', monospace" font-size="8.5">10.10.99.105</text>
        </g>
      </svg>
    `
  },

  'homelab-cluster': {
    id: 'homelab-cluster',
    title: 'Arquitectura Homelab & Edge Cluster Privado (Caso de Estudio NYXCORE)',
    subtitle: 'Ubuntu Server 26.04 con ZRAM zstd, Docker Engine, Cloudflare Zero Trust & WireGuard',
    badge: 'CASO DE ESTUDIO PRIVADO • PRODUCCIÓN',
    description: 'Ecosistema de infraestructura doméstica de alta disponibilidad diseñado como banco de pruebas y servicios esenciales autoalojados. Incorpora 17 microservicios contenerizados en Docker, optimización de kernel en RAM con ZRAM (zstd), red privada de malla WireGuard sobre Tailscale y cero puertos entrantes abiertos gracias a túneles cifrados salientes Cloudflare Anycast.',
    specs: [
      { label: 'Host Físico / OS', value: 'Ubuntu Server 26.04 LTS (Kernel Linux x86_64 optimizado)' },
      { label: 'Memoria & ZRAM', value: '1.9 GB ZRAM zstd comprimido en RAM (Prio 100, vm.swappiness=100)' },
      { label: 'Ingreso Seguro Edge', value: 'Cloudflare Zero Trust (Túneles Anycast salientes TLS 1.3, 0 puertos expuestos)' },
      { label: 'Red Privada Mesh', value: 'Tailscale WireGuard Mesh cifrado P2P (ACLs internas y MagicDNS)' },
      { label: 'DNS Sinkhole & DoH', value: 'AdGuard Home (Filtrado de telemetría y consultas cifradas DoH/DoT upstream)' },
      { label: 'Ecosistema Docker', value: '17 Microservicios en Docker Compose con límites rotativos de logs (10m x 3)' },
      { label: 'Persistencia & DBs', value: 'MariaDB 11, SQLite con motor FTS5 y almacenamiento persistente en SSD' },
      { label: 'Monitoreo & Observabilidad', value: 'Uptime Kuma (Alertas ping/HTTP) + Glances + Dozzle logs en tiempo real' }
    ],
    cliConfig: {
      title: 'Docker Compose Stack & Optimización ZRAM Kernel',
      language: 'yaml',
      code: `# ========================================================
# NYXCORE HOMELAB - DOCKER COMPOSE CORE STACK
# ========================================================
version: '3.8'

services:
  # DNS Sinkhole Cifrado
  adguard-home:
    image: adguard/adguardhome:latest
    container_name: adguard-core
    restart: unless-stopped
    ports:
      - "53:53/udp"
      - "3000:3000/tcp"
    volumes:
      - ./data/adguard/work:/opt/adguardhome/work
      - ./data/adguard/conf:/opt/adguardhome/conf
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Broker MQTT de Alta Concurrencia
  mosquitto:
    image: eclipse-mosquitto:latest
    container_name: mosquitto-broker
    restart: always
    ports:
      - "1883:1883"
      - "9001:9001"
    volumes:
      - ./mosquitto/config:/mosquitto/config
      - ./mosquitto/data:/mosquitto/data
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Gestor de Contraseñas Privado
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden-vault
    restart: unless-stopped
    environment:
      - WEBSOCKET_ENABLED=true
      - SIGNUPS_ALLOWED=false
    volumes:
      - ./data/vaultwarden:/data

  # Túnel Cloudflare Zero Trust (Anycast Saliente)
  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: cf-zero-trust-tunnel
    restart: always
    network_mode: host
    command: tunnel run --token \${CF_TUNNEL_SECRET_TOKEN}`
    },
    nodes: [
      {
        id: 'node-cf',
        name: 'Cloudflare Zero Trust Tunnel',
        role: 'Perímetro Anycast & Cifrado TLS 1.3',
        ip: 'Anycast Edge IP (Globally Distributed)',
        ports: 'Cero puertos entrantes (Túnel saliente)',
        status: 'PROTEGIDO • Zero Trust Network Access (ZTNA)',
        description: 'Canal de comunicación saliente cifrado por TLS 1.3 hacia los centros de datos de Cloudflare. Permite acceder a los microservicios del servidor sin abrir puertos ni exponer la IP pública doméstica.'
      },
      {
        id: 'node-zram',
        name: 'ZRAM Kernel Compression',
        role: 'Gestión Inteligente de Memoria RAM',
        ip: 'Dispositivo /dev/zram0 (RAM Block)',
        ports: 'vm.swappiness = 100',
        status: 'ACTIVO • Algoritmo zstd activo (1.9 GB)',
        description: 'Capa de virtualización de swap ultra-rápida en memoria RAM comprimida con zstd. Previene el desgaste por ciclos de escritura en SSD y elimina la degradación por falta de memoria.'
      },
      {
        id: 'node-adguard',
        name: 'AdGuard Home (DNS Sinkhole)',
        role: 'Filtrado de Tráfico DNS & Privacidad',
        ip: '192.168.1.5 (Port 53 UDP)',
        ports: '53/UDP, 3000/TCP, 853/DoT',
        status: 'ACTIVO • 0ms Cache Hit Rate 94%',
        description: 'Servidor DNS local de alto rendimiento que bloquea telemetría, publicidad y dominios maliciosos antes de que ingresen a la red. Realiza consultas upstream cifradas con DoH/DoT hacia Quad9 y Cloudflare.'
      },
      {
        id: 'node-tailscale',
        name: 'Tailscale WireGuard Mesh',
        role: 'Red Privada Virtual Punto a Punto',
        ip: '100.x.y.z (CGNAT IPv6/IPv4)',
        ports: 'UDP 41641 (Direct Peer-to-Peer)',
        status: 'CONECTADO • Cifrado ChaCha20-Poly1305',
        description: 'Red mallada cifrada punto a punto que interconecta de forma segura computadoras, dispositivos móviles y servidores sin intermediarios lentos ni necesidad de aperturas de NAT.'
      }
    ],
    svg: `
      <svg viewBox="0 0 920 540" xmlns="http://www.w3.org/2000/svg" class="topology-svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
        <defs>
          <linearGradient id="bgGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#04060d" />
            <stop offset="100%" stop-color="#080e1a" />
          </linearGradient>
          <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0d182b" />
            <stop offset="100%" stop-color="#080f1a" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#bgGrad2)" rx="16" />

        <!-- Host Machine Boundary -->
        <rect x="35" y="30" width="850" height="480" rx="16" fill="rgba(255,255,255,0.012)" stroke="rgba(0, 240, 255, 0.25)" stroke-width="1.8" stroke-dasharray="6,4" />
        <text x="60" y="58" fill="#00f0ff" font-family="'Fira Code', monospace" font-size="12" font-weight="700">🖥️ SERVIDOR FÍSICO NYXCORE — Ubuntu Server 26.04 LTS (x86_64 Kernel)</text>
        <text x="740" y="58" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="11" font-weight="bold">🟢 100% RESILIENTE</text>

        <!-- Kernel ZRAM Layer -->
        <g transform="translate(60, 75)" class="topo-clickable-node" data-node="node-zram" style="cursor: pointer;">
          <rect width="800" height="52" rx="10" fill="#081e19" stroke="#00ff9d" stroke-width="1.5" />
          <text x="22" y="24" fill="#00ff9d" font-family="'Inter', sans-serif" font-size="12.5" font-weight="bold">⚡ Capa de Optimización en Kernel: ZRAM (Algoritmo zstd comprimido en RAM)</text>
          <text x="22" y="41" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9.5">1.9 GB Swap en RAM con Prio 100 • vm.swappiness = 100 • Protección absoluta contra desgaste de disco SSD</text>
        </g>

        <!-- Ingress & Security Connectors -->
        <g stroke-width="2" fill="none">
          <line x1="190" y1="210" x2="190" y2="280" stroke="#ffb703" stroke-dasharray="5,4" class="packet-stream" />
          <line x1="730" y1="210" x2="730" y2="280" stroke="#00ff9d" stroke-dasharray="5,4" class="packet-stream" />
        </g>

        <!-- Node 1: Cloudflare Tunnel -->
        <g transform="translate(60, 150)" class="topo-clickable-node" data-node="node-cf" style="cursor: pointer;">
          <rect width="380" height="70" rx="10" fill="url(#boxGrad)" stroke="#ffb703" stroke-width="1.8" />
          <text x="20" y="28" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="bold">🛡️ Cloudflare Zero Trust Tunnel</text>
          <text x="20" y="48" fill="#ffb703" font-family="'Fira Code', monospace" font-size="10">Anycast Saliente TLS 1.3 • Cero Puertos Expuestos</text>
          <rect x="260" y="16" width="100" height="20" rx="4" fill="rgba(255, 183, 3, 0.15)" stroke="#ffb703" stroke-width="1" />
          <text x="310" y="30" text-anchor="middle" fill="#ffb703" font-family="'Fira Code', monospace" font-size="8.5" font-weight="bold">ZTNA INGRESS</text>
        </g>

        <!-- Node 2: Tailscale WireGuard -->
        <g transform="translate(480, 150)" class="topo-clickable-node" data-node="node-tailscale" style="cursor: pointer;">
          <rect width="380" height="70" rx="10" fill="url(#boxGrad)" stroke="#00ff9d" stroke-width="1.8" />
          <text x="20" y="28" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="bold">🔒 Tailscale WireGuard Mesh Network</text>
          <text x="20" y="48" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="10">P2P Encrypted Tunnel • ChaCha20-Poly1305</text>
          <rect x="270" y="16" width="90" height="20" rx="4" fill="rgba(0, 255, 157, 0.15)" stroke="#00ff9d" stroke-width="1" />
          <text x="315" y="30" text-anchor="middle" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="8.5" font-weight="bold">SECURE P2P</text>
        </g>

        <!-- DOCKER ENGINE ECOSYSTEM CONTAINER -->
        <g transform="translate(60, 245)">
          <rect width="800" height="240" rx="12" fill="#09121f" stroke="rgba(0, 240, 255, 0.4)" stroke-width="2" />
          <text x="25" y="28" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="bold">🐳 Ecosistema Contenerizado Docker Compose (17 Microservicios en Aislamiento)</text>
          
          <!-- Microservices Grid inside Docker -->
          <g transform="translate(25, 45)">
            <!-- Service 1: AdGuard Home -->
            <g transform="translate(0, 0)" class="topo-clickable-node" data-node="node-adguard" style="cursor: pointer;">
              <rect width="175" height="52" rx="8" fill="#0f1c30" stroke="#00f0ff" stroke-width="1.2" />
              <text x="12" y="22" fill="#fff" font-family="'Fira Code', monospace" font-size="11" font-weight="bold">AdGuard Home</text>
              <text x="12" y="38" fill="#00f0ff" font-family="'Fira Code', monospace" font-size="9">DNS Sinkhole & DoH</text>
            </g>

            <!-- Service 2: Mosquitto MQTT -->
            <g transform="translate(195, 0)">
              <rect width="175" height="52" rx="8" fill="#0f1c30" stroke="#ffb703" stroke-width="1.2" />
              <text x="12" y="22" fill="#fff" font-family="'Fira Code', monospace" font-size="11" font-weight="bold">Mosquitto MQTT</text>
              <text x="12" y="38" fill="#ffb703" font-family="'Fira Code', monospace" font-size="9">TCP 1883 & WSS 9001</text>
            </g>

            <!-- Service 3: Node-RED -->
            <g transform="translate(390, 0)">
              <rect width="175" height="52" rx="8" fill="#0f1c30" stroke="#b73bfe" stroke-width="1.2" />
              <text x="12" y="22" fill="#fff" font-family="'Fira Code', monospace" font-size="11" font-weight="bold">Node-RED Engine</text>
              <text x="12" y="38" fill="#b73bfe" font-family="'Fira Code', monospace" font-size="9">SCADA & IoT Pipelines</text>
            </g>

            <!-- Service 4: Vaultwarden -->
            <g transform="translate(585, 0)">
              <rect width="165" height="52" rx="8" fill="#0f1c30" stroke="#00ff9d" stroke-width="1.2" />
              <text x="12" y="22" fill="#fff" font-family="'Fira Code', monospace" font-size="11" font-weight="bold">Vaultwarden</text>
              <text x="12" y="38" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="9">Password Vault</text>
            </g>

            <!-- Row 2 Services -->
            <g transform="translate(0, 68)">
              <rect width="175" height="52" rx="8" fill="#0f1c30" stroke="#8b949e" stroke-width="1" />
              <text x="12" y="22" fill="#fff" font-family="'Fira Code', monospace" font-size="11" font-weight="bold">Uptime Kuma</text>
              <text x="12" y="38" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">SLA & Observabilidad</text>
            </g>

            <g transform="translate(195, 68)">
              <rect width="175" height="52" rx="8" fill="#0f1c30" stroke="#8b949e" stroke-width="1" />
              <text x="12" y="22" fill="#fff" font-family="'Fira Code', monospace" font-size="11" font-weight="bold">Portainer</text>
              <text x="12" y="38" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">Docker Orchestration</text>
            </g>

            <g transform="translate(390, 68)">
              <rect width="175" height="52" rx="8" fill="#0f1c30" stroke="#8b949e" stroke-width="1" />
              <text x="12" y="22" fill="#fff" font-family="'Fira Code', monospace" font-size="11" font-weight="bold">Dozzle Logs</text>
              <text x="12" y="38" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">Logs Rotativos (10m x 3)</text>
            </g>

            <g transform="translate(585, 68)">
              <rect width="165" height="52" rx="8" fill="#0f1c30" stroke="#00ff9d" stroke-width="1" />
              <text x="12" y="22" fill="#fff" font-family="'Fira Code', monospace" font-size="11" font-weight="bold">+10 Servicios</text>
              <text x="12" y="38" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="9">Internal Isolated Net</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  'aida-iot': {
    id: 'aida-iot',
    title: 'Arquitectura Telemétrica IoT & Firmware FreeRTOS Dual-Core',
    subtitle: 'Microcontrolador ESP32 SoC • Colas xQueue Inter-Hilo • Broker Mosquitto MQTT • Servidor Cloud',
    badge: 'PRODUCCIÓN • FIRMWARE ACTIVO',
    description: 'Ecosistema de ingeniería telemétrica de alta concurrencia que conecta nodos microcontroladores remotos ESP32 con un servidor cloud blindado. Implementa firmware FreeRTOS en C/C++ aislando la pila de red en el Core 0 y la lectura analógica de sensores en el Core 1, comunicándose mediante colas xQueue protegidas por mutex sin congelamientos.',
    specs: [
      { label: 'Microcontrolador SoC', value: 'Espressif ESP32 Dual-Core Xtensa LX6 @ 240 MHz' },
      { label: 'Core 0 (Network Stack)', value: 'Pila Wi-Fi 802.11 b/g/n + Cliente MQTT Mosquitto con reconexión asíncrona' },
      { label: 'Core 1 (Real-Time Loop)', value: 'Muestreo de sensores DHT22 / GPS a intervalos deterministas sin bloqueo' },
      { label: 'Comunicación Inter-Núcleo', value: 'FreeRTOS xQueueHandle (Buffer de memoria FIFO thread-safe)' },
      { label: 'Broker MQTT Central', value: 'Eclipse Mosquitto (Puertos TCP 1883 y WebSockets 9001 con autenticación)' },
      { label: 'Orquestación & Flujos', value: 'Node-RED para procesamiento de eventos en tiempo real y reglas de alerta' },
      { label: 'Persistencia Telemétrica', value: 'MariaDB 11 con particionamiento mensual de tablas telemétricas' },
      { label: 'Seguridad de Tráfico', value: 'Túnel cifrado Cloudflare Zero Trust hacia el broker MQTT' }
    ],
    cliConfig: {
      title: 'ESP32 FreeRTOS — Firmware C++ Multiprocesador Asíncrono',
      language: 'cpp',
      code: `// ========================================================
// ESP32 FREERTOS DUAL-CORE TELEMETRY FIRMWARE
// ========================================================
#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>

// Definición de estructura para cola inter-hilo
typedef struct {
  float temperature;
  float humidity;
  uint32_t timestamp;
} SensorPayload;

QueueHandle_t telemetryQueue;
WiFiClient espClient;
PubSubClient mqttClient(espClient);

// --- TAREA EN CORE 0: RED & MENSAJERÍA MQTT ---
void TaskNetwork(void *pvParameters) {
  mqttClient.setServer("mqtt.teckcloud.xyz", 1883);
  SensorPayload receivedData;
  
  for(;;) {
    if (!mqttClient.connected()) {
      // Reconexión asíncrona sin bloquear lectura de sensores
      if (mqttClient.connect("ESP32_Node_Core0", "auth_user", "auth_pass")) {
        mqttClient.subscribe("node/commands/#");
      }
    }
    mqttClient.loop();

    // Extraer datos de la cola thread-safe generados en Core 1
    if (xQueueReceive(telemetryQueue, &receivedData, (TickType_t)10) == pdPASS) {
      char payload[128];
      snprintf(payload, sizeof(payload), 
        "{\\"t\\":%.2f,\\"h\\":%.2f,\\"ts\\":%u}", 
        receivedData.temperature, receivedData.humidity, receivedData.timestamp);
      mqttClient.publish("telemetry/sensors", payload, 1);
    }
    vTaskDelay(pdMS_TO_TICKS(20));
  }
}

// --- TAREA EN CORE 1: ADQUISICIÓN DE SENSORES DETERMINISTA ---
void TaskSensors(void *pvParameters) {
  SensorPayload currentSample;
  for(;;) {
    // Lectura determinista a intervalos exactos
    currentSample.temperature = 24.50f;
    currentSample.humidity = 58.20f;
    currentSample.timestamp = millis();

    // Enviar a cola inter-hilo (timeout 0 = no bloqueante)
    xQueueSend(telemetryQueue, &currentSample, (TickType_t)0);
    vTaskDelay(pdMS_TO_TICKS(2000));
  }
}

void setup() {
  telemetryQueue = xQueueCreate(15, sizeof(SensorPayload));
  // Anclar Tarea de Red al Core 0
  xTaskCreatePinnedToCore(TaskNetwork, "NetTask", 8192, NULL, 2, NULL, 0);
  // Anclar Tarea de Sensores al Core 1
  xTaskCreatePinnedToCore(TaskSensors, "SensTask", 4096, NULL, 1, NULL, 1);
}`
    },
    nodes: [
      {
        id: 'node-core0',
        name: 'ESP32 Core 0 (Network Stack)',
        role: 'Pila Wi-Fi & Cliente MQTT',
        ip: '192.168.1.120 (DHCP Lease)',
        ports: 'TCP 1883 (MQTT), WSS 9001',
        status: 'EN LÍNEA • Tasa de Refresco 50Hz',
        description: 'Núcleo dedicado exclusivamente a mantener la conexión Wi-Fi, la máquina de estados de reconexión MQTT y el despacho de mensajes telemétricos hacia la nube.'
      },
      {
        id: 'node-core1',
        name: 'ESP32 Core 1 (Sensor Acquisition)',
        role: 'Muestreo en Tiempo Real Determinista',
        ip: 'Hardware Direct Registers (GPIO/I2C/SPI)',
        ports: 'GPIO 4 (DHT22), UART 2 (GPS NMEA)',
        status: 'ACTIVO • Cero Jitter / Cero Latencia',
        description: 'Núcleo aislado que ejecuta el ciclo de lectura de sensores físicos. Al no compartir tiempo de CPU con la pila de red, nunca sufre congelamientos ni pérdida de muestras.'
      },
      {
        id: 'node-xqueue',
        name: 'xQueue Inter-Core Bridge',
        role: 'Puente FIFO Thread-Safe de Memoria',
        ip: 'Internal SRAM Ring-Buffer',
        ports: 'Mutex & Semáforos Binarios',
        status: 'OPERATIVO • 0 Desbordamientos',
        description: 'Mecanismo de sincronización nativo de FreeRTOS que permite a ambos núcleos intercambiar estructuras de datos de telemetría sin condiciones de carrera (Race Conditions).'
      },
      {
        id: 'node-broker',
        name: 'Broker Mosquitto Cloud (VPS)',
        role: 'Distribución Telemétrica Pub/Sub',
        ip: 'teckcloud.xyz (Zero Trust Ingress)',
        ports: '1883 TCP, 9001 WSS',
        status: 'ACTIVO • Conexiones Concurrentes Seguras',
        description: 'Broker MQTT desplegado en servidor Linux VPS bajo túnel Cloudflare Zero Trust. Aplica listas de control de acceso (ACLs) y entrega telemetría instantánea hacia Node-RED y MariaDB.'
      }
    ],
    svg: `
      <svg viewBox="0 0 920 540" xmlns="http://www.w3.org/2000/svg" class="topology-svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
        <defs>
          <linearGradient id="bgGrad3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#04060e" />
            <stop offset="100%" stop-color="#091222" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#bgGrad3)" rx="16" />

        <!-- ESP32 Hardware Boundary -->
        <rect x="35" y="35" width="460" height="470" rx="16" fill="rgba(255, 183, 3, 0.02)" stroke="#ffb703" stroke-width="2" stroke-dasharray="6,4" />
        <text x="60" y="65" fill="#ffb703" font-family="'Fira Code', monospace" font-size="13" font-weight="700">🤖 ESP32 SoC HARDWARE (Arquitectura Dual-Core Xtensa LX6)</text>

        <!-- Dynamic Animated Link Streams -->
        <g stroke-width="2.5" fill="none">
          <!-- Sensor to Core 1 -->
          <line x1="265" y1="420" x2="265" y2="350" stroke="#00ff9d" stroke-dasharray="5,4" class="packet-stream" />
          <!-- Core 1 to xQueue -->
          <line x1="265" y1="260" x2="265" y2="230" stroke="#00f0ff" stroke-dasharray="5,4" class="packet-stream" />
          <!-- xQueue to Core 0 -->
          <line x1="265" y1="180" x2="265" y2="150" stroke="#00f0ff" stroke-dasharray="5,4" class="packet-stream" />
          <!-- Core 0 to Cloud Broker -->
          <path d="M 430 115 L 610 115" stroke="#ffb703" stroke-dasharray="6,4" class="packet-stream" />
          <!-- Cloud Broker to Node-RED -->
          <line x1="710" y1="160" x2="710" y2="230" stroke="#b73bfe" stroke-dasharray="5,4" class="packet-stream" />
          <!-- Node-RED to MariaDB -->
          <line x1="710" y1="320" x2="710" y2="390" stroke="#00ff9d" stroke-dasharray="5,4" class="packet-stream" />
        </g>

        <!-- CORE 0 BLOCK -->
        <g transform="translate(65, 80)" class="topo-clickable-node" data-node="node-core0" style="cursor: pointer;">
          <rect width="400" height="75" rx="10" fill="#0d1b2e" stroke="#00f0ff" stroke-width="2" />
          <text x="20" y="28" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13.5" font-weight="bold">Core 0: Pila de Red & Cliente MQTT</text>
          <text x="20" y="48" fill="#00f0ff" font-family="'Fira Code', monospace" font-size="10.5">Wi-Fi 802.11 b/g/n • MQTT QoS 1 • Reconexión Asíncrona</text>
          <text x="20" y="64" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">Cero llamadas bloqueantes al hardware de sensores</text>
        </g>

        <!-- XQUEUE BRIDGE -->
        <g transform="translate(135, 185)" class="topo-clickable-node" data-node="node-xqueue" style="cursor: pointer;">
          <rect width="260" height="46" rx="8" fill="#1b1708" stroke="#ffb703" stroke-width="1.8" />
          <text x="130" y="20" text-anchor="middle" fill="#ffb703" font-family="'Fira Code', monospace" font-size="11" font-weight="bold">⚡ xQueue Inter-Core Bridge</text>
          <text x="130" y="36" text-anchor="middle" fill="#8b949e" font-family="'Fira Code', monospace" font-size="8.5">Buffer FIFO Thread-Safe con Mutexes</text>
        </g>

        <!-- CORE 1 BLOCK -->
        <g transform="translate(65, 260)" class="topo-clickable-node" data-node="node-core1" style="cursor: pointer;">
          <rect width="400" height="75" rx="10" fill="#0d241c" stroke="#00ff9d" stroke-width="2" />
          <text x="20" y="28" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13.5" font-weight="bold">Core 1: Adquisición en Tiempo Real</text>
          <text x="20" y="48" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="10.5">Lectura Determinista de Sensores (DHT22 / GPS)</text>
          <text x="20" y="64" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">Aislamiento total: la latencia de red no frena las mediciones</text>
        </g>

        <!-- SENSORS HARNESS -->
        <g transform="translate(145, 375)">
          <rect width="240" height="45" rx="8" fill="#101726" stroke="#8b949e" stroke-width="1.2" />
          <text x="120" y="20" text-anchor="middle" fill="#f0f6fc" font-family="'Fira Code', monospace" font-size="10.5" font-weight="bold">🌡️ Sensores Físicos (DHT22 & GPS)</text>
          <text x="120" y="35" text-anchor="middle" fill="#8b949e" font-family="'Fira Code', monospace" font-size="8.5">Puertos GPIO 4 (1-Wire) y UART 2 Serial</text>
        </g>

        <!-- CLOUD BACKEND BOUNDARY -->
        <g transform="translate(560, 50)" class="topo-clickable-node" data-node="node-broker" style="cursor: pointer;">
          <rect width="300" height="110" rx="12" fill="#141a2b" stroke="#ffb703" stroke-width="2" />
          <text x="25" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="bold">☁️ Broker Mosquitto MQTT</text>
          <text x="25" y="55" fill="#ffb703" font-family="'Fira Code', monospace" font-size="10.5">teckcloud.xyz (Cloudflare Zero Trust)</text>
          <text x="25" y="75" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">Puertos: TCP 1883 & WSS 9001 (ACLs)</text>
          <text x="25" y="95" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="9" font-weight="bold">🟢 TELEMETRÍA EN TIEMPO REAL</text>
        </g>

        <!-- NODE-RED ENGINE -->
        <g transform="translate(560, 215)">
          <rect width="300" height="95" rx="12" fill="#181329" stroke="#b73bfe" stroke-width="2" />
          <text x="25" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="bold">⚙️ Node-RED Pipeline Engine</text>
          <text x="25" y="55" fill="#b73bfe" font-family="'Fira Code', monospace" font-size="10.5">Orquestación Reactiva de Eventos</text>
          <text x="25" y="75" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">Filtros de Umbrales, Alertas & Webhooks</text>
        </g>

        <!-- MARIADB STORAGE -->
        <g transform="translate(560, 370)">
          <rect width="300" height="95" rx="12" fill="#0c1e1c" stroke="#00ff9d" stroke-width="2" />
          <text x="25" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="bold">🗄️ Base de Datos MariaDB 11</text>
          <text x="25" y="55" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="10.5">Persistencia Histórica de Telemetría</text>
          <text x="25" y="75" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">Particionado Mensual de Índices de Tiempo</text>
        </g>
      </svg>
    `
  },

  'cupora': {
    id: 'cupora',
    title: 'Arquitectura Cupora — PWA Offline & Aforo en Tiempo Real',
    subtitle: 'Service Workers Cache-First • IndexedDB • BroadcastChannel API • Motor QR Offline',
    badge: 'PRODUCCIÓN PWA • OFFLINE FIRST',
    description: 'Plataforma PWA integral de reserva de asientos, control de aforo y despacho de minivanes interurbanas en rutas sin conectividad continua. Diseñada con arquitectura Offline-First para sincronización multi-rol en carretera mediante BroadcastChannel y Service Workers sin depender de servidores pesados.',
    specs: [
      { label: 'Estrategia de Caché', value: 'Cache-First (App Shell, activos estáticos y asientos precargados)' },
      { label: 'Persistencia Offline', value: 'IndexedDB local con capacidad para 5,000+ boletos emitidos sin red' },
      { label: 'Bus de Eventos Local', value: 'BroadcastChannel API (Sincronización multi-pestaña instantánea <2ms)' },
      { label: 'Escaneo de Boletos QR', value: 'Hardware Camera API + BarCodeDetector nativo funcionando 100% offline' },
      { label: 'Diseño de Carrocerías', value: 'Algoritmo de grilla magnética configurable para minivanes Renault / Sprinter' },
      { label: 'Confirmación de Pago', value: 'Módulo QR interactivo para billeteras electrónicas peruanas (Yape & Plin)' }
    ],
    cliConfig: {
      title: 'Service Worker & BroadcastChannel — Sincronización Offline',
      language: 'typescript',
      code: `// ========================================================
// CUPORA PWA - OFFLINE ASYNC DISPATCH BUS
// ========================================================
const CACHE_NAME = 'cupora-v2-production';
const STATIC_ASSETS = ['/', '/index.html', '/manifest.json', '/assets/app.js'];

// --- 1. INSTALACIÓN & CACHÉ OFFLINE ---
self.addEventListener('install', (e: any) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// --- 2. BUS DE SINCRONIZACIÓN REACTIVA (BROADCASTCHANNEL) ---
const syncChannel = new BroadcastChannel('cupora_seat_state');

syncChannel.onmessage = (event) => {
  const { type, seatId, status, vehiclePlate } = event.data;
  if (type === 'SEAT_RESERVED') {
    // Actualizar inmediatamente estado de aforo en todas las pestañas activas
    console.log(\`[Cupora Sync] Butaca \${seatId} ocupada en \${vehiclePlate}\`);
  }
};

// --- 3. ESTRATEGIA STALE-WHILE-REVALIDATE PARA VIAJES ---
self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request);
    })
  );
});`
    },
    nodes: [
      {
        id: 'node-sw',
        name: 'Service Worker & Cache Storage',
        role: 'Motor Offline-First PWA',
        ip: 'Client Browser Runtime',
        ports: 'CacheStorage API, Fetch Interceptor',
        status: 'ACTIVO • 100% Funcional sin Internet',
        description: 'Intercepta todas las solicitudes HTTP de la plataforma. Si el vehículo se encuentra en tramos de carretera sin cobertura móvil, la aplicación continúa emitiendo boletos sin interrupción.'
      },
      {
        id: 'node-bc',
        name: 'BroadcastChannel API Bus',
        role: 'Sincronización Multi-Rol Reactiva',
        ip: 'Internal Memory Inter-Tab Bus',
        ports: 'postMessage / EventListener',
        status: 'LATENCIA < 2ms',
        description: 'Permite que la pantalla del chofer, el cajero y el despachador de boletería compartan el estado de aforo del vehículo en tiempo real en el mismo dispositivo o red local.'
      },
      {
        id: 'node-qr',
        name: 'Offline QR Ticket Engine',
        role: 'Generación & Validación Criptográfica',
        ip: 'Canvas 2D / BarcodeDetector API',
        ports: 'Camera Stream (MediaDevices)',
        status: 'VALIDACIÓN INSTANTÁNEA',
        description: 'Genera códigos QR firmados con token local y procesa el escaneo en vivo mediante la cámara trasera del dispositivo para el abordaje rápido de pasajeros.'
      }
    ],
    svg: `
      <svg viewBox="0 0 920 540" xmlns="http://www.w3.org/2000/svg" class="topology-svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
        <defs>
          <linearGradient id="bgGradCupora" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#050914" />
            <stop offset="100%" stop-color="#0b162b" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#bgGradCupora)" rx="16" />

        <rect x="35" y="35" width="850" height="470" rx="16" fill="rgba(255,255,255,0.015)" stroke="#00f0ff" stroke-width="2" stroke-dasharray="6,4" />
        <text x="60" y="65" fill="#00f0ff" font-family="'Fira Code', monospace" font-size="13" font-weight="700">🚐 ARQUITECTURA CUPORA — Plataforma PWA Offline-First para Transporte</text>

        <!-- Animated Data Bus -->
        <g stroke-width="2.5" fill="none">
          <line x1="260" y1="180" x2="260" y2="250" stroke="#00f0ff" stroke-dasharray="6,4" class="packet-stream" />
          <line x1="460" y1="180" x2="460" y2="250" stroke="#ffb703" stroke-dasharray="6,4" class="packet-stream" />
          <line x1="660" y1="180" x2="660" y2="250" stroke="#00ff9d" stroke-dasharray="6,4" class="packet-stream" />
          <path d="M 260 330 L 660 330" stroke="#00f0ff" stroke-dasharray="5,4" class="packet-stream" />
        </g>

        <!-- LAYER 1: CLIENT RUNTIME / SERVICE WORKER -->
        <g transform="translate(60, 95)" class="topo-clickable-node" data-node="node-sw" style="cursor: pointer;">
          <rect width="800" height="85" rx="12" fill="#0d1b30" stroke="#00f0ff" stroke-width="2" />
          <text x="25" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="bold">⚡ Service Worker Core & Cache Storage (Estrategia Cache-First)</text>
          <text x="25" y="55" fill="#00f0ff" font-family="'Fira Code', monospace" font-size="11">App Shell Precargado • Interceptor de Red • Soporte Carretera Sin Cobertura</text>
          <text x="25" y="72" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9.5">Garantiza operación continua y venta de pasajes con o sin conexión celular</text>
        </g>

        <!-- LAYER 2: LOCAL STORAGE & EVENT BUS -->
        <!-- Block A: IndexedDB -->
        <g transform="translate(60, 250)">
          <rect width="250" height="110" rx="10" fill="#13233a" stroke="#00f0ff" stroke-width="1.8" />
          <text x="20" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="bold">🗄️ IndexedDB Storage</text>
          <text x="20" y="55" fill="#00f0ff" font-family="'Fira Code', monospace" font-size="10">Base de Datos Local</text>
          <text x="20" y="75" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">• Registro de Pasajes</text>
          <text x="20" y="92" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">• Carrocerías de Minivanes</text>
        </g>

        <!-- Block B: BroadcastChannel API -->
        <g transform="translate(335, 250)" class="topo-clickable-node" data-node="node-bc" style="cursor: pointer;">
          <rect width="250" height="110" rx="10" fill="#1b1c0d" stroke="#ffb703" stroke-width="1.8" />
          <text x="20" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="bold">📡 BroadcastChannel Bus</text>
          <text x="20" y="55" fill="#ffb703" font-family="'Fira Code', monospace" font-size="10">Eventos Multi-Pestaña</text>
          <text x="20" y="75" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">• Chofer &lt;--&gt; Boletería</text>
          <text x="20" y="92" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">• Latencia en memoria &lt; 2ms</text>
        </g>

        <!-- Block C: QR Engine -->
        <g transform="translate(610, 250)" class="topo-clickable-node" data-node="node-qr" style="cursor: pointer;">
          <rect width="250" height="110" rx="10" fill="#0c1f18" stroke="#00ff9d" stroke-width="1.8" />
          <text x="20" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="bold">📷 Motor Escáner QR</text>
          <text x="20" y="55" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="10">BarcodeDetector Offline</text>
          <text x="20" y="75" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">• Cámara en Vivo 60 FPS</text>
          <text x="20" y="92" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">• Validación de Token Boleto</text>
        </g>

        <!-- LAYER 3: CHECKOUT & PAYMENT INTEGRATION -->
        <g transform="translate(60, 395)">
          <rect width="800" height="85" rx="10" fill="#141926" stroke="#b73bfe" stroke-width="1.5" />
          <text x="25" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13.5" font-weight="bold">💳 Pasarela de Pago & Billeteras Digitales (Yape & Plin)</text>
          <text x="25" y="54" fill="#b73bfe" font-family="'Fira Code', monospace" font-size="10.5">Generación Dinámica de Código QR • Validación de Comprobante de Pago</text>
          <text x="25" y="72" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">Confirmación con doble validación de número de operación e impresión de comprobante digital</text>
        </g>
      </svg>
    `
  },

  'antigravity-hub': {
    id: 'antigravity-hub',
    title: 'Arquitectura Antigravity Hub — Terminal PTY & Gestor de Sesiones',
    subtitle: 'FastAPI Backend • WebSockets Duplex • pywinpty Pseudo-Terminales • SQLite FTS5',
    badge: 'HERRAMIENTA LOCAL • DESPLIEGUE NATIVO',
    description: 'Entorno interactivo local de alto rendimiento que emula pseudo-terminales interactivos en Windows utilizando pywinpty para ejecución ágil de herramientas de desarrollo. Incorpora persistencia indexada en SQLite con motor de búsqueda de texto completo FTS5 para recuperación instantánea de comandos y sesiones técnicas.',
    specs: [
      { label: 'Servicio Backend', value: 'FastAPI asíncrono sobre servidor Uvicorn de alto rendimiento' },
      { label: 'Emulación de Terminal', value: 'pywinpty (Pseudo-terminales nativos de Windows API sin emuladores lentos)' },
      { label: 'Transmisión de Datos', value: 'WebSockets Duplex Full-Stream para entrada y salida de caracteres en tiempo real' },
      { label: 'Búsqueda & Persistencia', value: 'SQLite con tablas virtuales FTS5 (Búsqueda textual instantánea en logs)' },
      { label: 'Control de Ventana', value: 'Redimensionamiento dinámico interactivo mediante señales PTY SIGWINCH' },
      { label: 'Seguridad Local', value: 'Acceso restringido a localhost (127.0.0.1) con tokens temporales de sesión' }
    ],
    cliConfig: {
      title: 'FastAPI & pywinpty — Servidor WebSocket de Terminal',
      language: 'python',
      code: `# ========================================================
# ANTIGRAVITY HUB - PTY WEBSOCKET SERVER
# ========================================================
import asyncio
from fastapi import FastAPI, WebSocket
from winpty import PtyProcess
import sqlite3

app = FastAPI(title="Antigravity Hub PTY")

@app.websocket("/ws/terminal")
async def terminal_websocket(websocket: WebSocket):
    await websocket.accept()
    
    # Spawnear proceso pseudo-terminal nativo en Windows
    pty = PtyProcess.spawn("powershell.exe", dimensions=(24, 80))
    loop = asyncio.get_event_loop()

    async def read_pty():
        while pty.isalive():
            data = await loop.run_in_executor(None, pty.read, 1024)
            if data:
                await websocket.send_text(data)

    async def write_pty():
        while pty.isalive():
            user_input = await websocket.receive_text()
            pty.write(user_input)

    await asyncio.gather(read_pty(), write_pty())`
    },
    nodes: [
      {
        id: 'node-pty',
        name: 'pywinpty Pseudo-Terminal Engine',
        role: 'Emulación de Consola en Windows',
        ip: 'IPC Local Process Handle',
        ports: 'ConPTY API (Windows 10/11)',
        status: 'ACTIVO • Latencia Cero',
        description: 'Mapea la API ConPTY de Windows a sockets bidireccionales, permitiendo renderizado exacto de secuencias de escape ANSI, colores 24-bit y comandos interactivos.'
      },
      {
        id: 'node-fts5',
        name: 'SQLite FTS5 Search Indexer',
        role: 'Búsqueda Instantánea de Historial',
        ip: 'Embedded SQLite Engine',
        ports: 'In-Process Storage',
        status: 'INDEXADO COMPLETO',
        description: 'Motor de búsqueda de texto completo que indexa cada comando, salida técnica y sesión de desarrollo para filtrado instantáneo en menos de 10ms.'
      }
    ],
    svg: `
      <svg viewBox="0 0 920 540" xmlns="http://www.w3.org/2000/svg" class="topology-svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
        <defs>
          <linearGradient id="bgGradHub" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#050711" />
            <stop offset="100%" stop-color="#0a1222" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#bgGradHub)" rx="16" />

        <rect x="35" y="35" width="850" height="470" rx="16" fill="rgba(255,255,255,0.015)" stroke="#b73bfe" stroke-width="2" stroke-dasharray="6,4" />
        <text x="60" y="65" fill="#b73bfe" font-family="'Fira Code', monospace" font-size="13" font-weight="700">⚡ ARQUITECTURA ANTIGRAVITY HUB — Terminal PTY & Gestor de Sesiones</text>

        <!-- Stream Lines -->
        <g stroke-width="2.5" fill="none">
          <line x1="260" y1="180" x2="260" y2="250" stroke="#b73bfe" stroke-dasharray="6,4" class="packet-stream" />
          <line x1="660" y1="180" x2="660" y2="250" stroke="#00f0ff" stroke-dasharray="6,4" class="packet-stream" />
          <path d="M 460 330 L 460 395" stroke="#00ff9d" stroke-dasharray="5,4" class="packet-stream" />
        </g>

        <!-- FRONTEND CLIENT -->
        <g transform="translate(60, 95)">
          <rect width="800" height="85" rx="12" fill="#0d1b30" stroke="#00f0ff" stroke-width="2" />
          <text x="25" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="bold">🖥️ Interfaz Web / WebView2 Desktop App (xterm.js Render)</text>
          <text x="25" y="55" fill="#00f0ff" font-family="'Fira Code', monospace" font-size="11">Emulador de Terminal VT100 / ANSI 24-bit • WebSocket Client en Tiempo Real</text>
          <text x="25" y="72" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9.5">Renderizado de alta tasa de cuadros mediante Canvas GPU para comandos técnicos</text>
        </g>

        <!-- BACKEND: FASTAPI -->
        <g transform="translate(60, 250)">
          <rect width="380" height="105" rx="10" fill="#1b122b" stroke="#b73bfe" stroke-width="1.8" />
          <text x="20" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="bold">⚡ FastAPI Server (Asíncrono)</text>
          <text x="20" y="55" fill="#b73bfe" font-family="'Fira Code', monospace" font-size="10">Uvicorn Event Loop • WebSockets Endpoint</text>
          <text x="20" y="75" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">• Canal bidireccional STDIN / STDOUT</text>
          <text x="20" y="92" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">• Gestión de múltiples pestañas activas</text>
        </g>

        <!-- ENGINE: PYWINPTY -->
        <g transform="translate(480, 250)" class="topo-clickable-node" data-node="node-pty" style="cursor: pointer;">
          <rect width="380" height="105" rx="10" fill="#0c1f26" stroke="#00f0ff" stroke-width="1.8" />
          <text x="20" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="bold">📟 pywinpty Pseudo-Terminal Engine</text>
          <text x="20" y="55" fill="#00f0ff" font-family="'Fira Code', monospace" font-size="10">ConPTY API de Windows 10 / 11</text>
          <text x="20" y="75" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">• Spawnea PowerShell, CMD o CLI agy</text>
          <text x="20" y="92" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">• Captura sin retraso señales de redimensión</text>
        </g>

        <!-- STORAGE: SQLITE FTS5 -->
        <g transform="translate(60, 395)" class="topo-clickable-node" data-node="node-fts5" style="cursor: pointer;">
          <rect width="800" height="85" rx="10" fill="#0c1e19" stroke="#00ff9d" stroke-width="1.8" />
          <text x="25" y="32" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13.5" font-weight="bold">🔍 Base de Datos SQLite con Tablas Virtuales FTS5 (Búsqueda Full-Text)</text>
          <text x="25" y="54" fill="#00ff9d" font-family="'Fira Code', monospace" font-size="10.5">Indexación Automática de Comandos, Salidas de Red y Trazas de Auditoría</text>
          <text x="25" y="72" fill="#8b949e" font-family="'Fira Code', monospace" font-size="9">Recuperación instantánea de cualquier sesión técnica en &lt; 10ms</text>
        </g>
      </svg>
    `
  }
};
