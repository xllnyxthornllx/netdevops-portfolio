export interface TopologyDiagram {
  id: string;
  title: string;
  subtitle: string;
  svg: string;
  specs: { label: string; value: string }[];
  description: string;
}

export const topologiesMap: Record<string, TopologyDiagram> = {
  'cisco-enterprise': {
    id: 'cisco-enterprise',
    title: 'Topología de Red Enterprise & Seguridad Perimetral',
    subtitle: 'Arquitectura Corporativa Cisco Catalyst 9300L/9200L + Fortinet FortiGate',
    description: 'Diseño de red de campus multi-capa con segmentación VLAN 802.1Q, enrutamiento inter-VLAN dinámico OSPF, firewall perimetral Fortinet con inspección NAT y Wi-Fi corporativo UniFi WPA3 Enterprise.',
    specs: [
      { label: 'Core / Distribución', value: 'Cisco Catalyst 9300L (OSPF Area 0, Inter-VLAN SVI)' },
      { label: 'Acceso / Conmutación', value: 'Cisco Catalyst 9200L (Port-Security, 802.1Q Trunking)' },
      { label: 'Perímetro / Gateway', value: 'Fortinet FortiGate (SD-WAN, NAT/PAT, SSL Inspection)' },
      { label: 'VLANs Segmentadas', value: 'VLAN 10 (Admin), VLAN 20 (Datos), VLAN 30 (Voz IP), VLAN 99 (CCTV)' },
      { label: 'WLAN Corporativa', value: 'UniFi Wireless Controller + WPA3 Enterprise 802.1X' }
    ],
    svg: `
      <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" class="topology-svg">
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#070c14" />
            <stop offset="100%" stop-color="#0d1522" />
          </linearGradient>
          <linearGradient id="accentCyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#00f0ff" />
            <stop offset="100%" stop-color="#0080ff" />
          </linearGradient>
          <linearGradient id="accentGreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#00ff9d" />
            <stop offset="100%" stop-color="#00b368" />
          </linearGradient>
          <linearGradient id="accentOrange" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffb703" />
            <stop offset="100%" stop-color="#fb8500" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="url(#bgGrad)" rx="16" />

        <!-- Grid Lines Background -->
        <g stroke="rgba(255,255,255,0.03)" stroke-width="1">
          <line x1="0" y1="120" x2="800" y2="120" />
          <line x1="0" y1="240" x2="800" y2="240" />
          <line x1="0" y1="360" x2="800" y2="360" />
          <line x1="200" y1="0" x2="200" y2="480" />
          <line x1="400" y1="0" x2="400" y2="480" />
          <line x1="600" y1="0" x2="600" y2="480" />
        </g>

        <!-- Connecting Links with animated dash -->
        <g stroke="rgba(0, 240, 255, 0.4)" stroke-width="2" stroke-dasharray="6,4">
          <!-- WAN to FortiGate -->
          <line x1="400" y1="50" x2="400" y2="110" />
          <!-- FortiGate to Core Switch -->
          <line x1="400" y1="170" x2="400" y2="230" />
          <!-- Core Switch to Access 1 -->
          <line x1="340" y1="270" x2="200" y2="340" />
          <!-- Core Switch to Access 2 -->
          <line x1="460" y1="270" x2="600" y2="340" />
          <!-- Access to endpoints -->
          <line x1="200" y1="390" x2="140" y2="430" />
          <line x1="200" y1="390" x2="260" y2="430" />
          <line x1="600" y1="390" x2="540" y2="430" />
          <line x1="600" y1="390" x2="660" y2="430" />
        </g>

        <!-- WAN Cloud -->
        <g transform="translate(400, 45)">
          <ellipse cx="0" cy="0" rx="65" ry="22" fill="#111927" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
          <text x="0" y="5" text-anchor="middle" fill="#8b949e" font-family="monospace" font-size="12" font-weight="bold">🌐 INTERNET / WAN</text>
        </g>

        <!-- Node: FortiGate Next-Gen Firewall -->
        <g transform="translate(400, 140)">
          <rect x="-110" y="-25" width="220" height="50" rx="8" fill="#1b2433" stroke="#ffb703" stroke-width="2" filter="url(#glow)" />
          <text x="0" y="-3" text-anchor="middle" fill="#fff" font-family="monospace" font-size="13" font-weight="bold">🛡️ Fortinet FortiGate</text>
          <text x="0" y="14" text-anchor="middle" fill="#ffb703" font-family="monospace" font-size="10">SD-WAN • NAT/PAT • SSL Insp.</text>
        </g>

        <!-- Node: Cisco Core Switch Catalyst 9300L -->
        <g transform="translate(400, 260)">
          <rect x="-130" y="-28" width="260" height="56" rx="8" fill="#112233" stroke="#00f0ff" stroke-width="2" filter="url(#glow)" />
          <text x="0" y="-4" text-anchor="middle" fill="#fff" font-family="monospace" font-size="14" font-weight="bold">⚡ Cisco Catalyst 9300L (Core)</text>
          <text x="0" y="14" text-anchor="middle" fill="#00f0ff" font-family="monospace" font-size="10">OSPF Area 0 • Inter-VLAN Routing • 10G SFP+</text>
        </g>

        <!-- Node: Access Switch 1 -->
        <g transform="translate(200, 365)">
          <rect x="-90" y="-22" width="180" height="44" rx="6" fill="#131c2b" stroke="#00ff9d" stroke-width="1.5" />
          <text x="0" y="-2" text-anchor="middle" fill="#fff" font-family="monospace" font-size="12" font-weight="bold">Cisco Catalyst 9200L-A</text>
          <text x="0" y="13" text-anchor="middle" fill="#00ff9d" font-family="monospace" font-size="9">VLAN 10 (Admin) / VLAN 20 (Datos)</text>
        </g>

        <!-- Node: Access Switch 2 -->
        <g transform="translate(600, 365)">
          <rect x="-90" y="-22" width="180" height="44" rx="6" fill="#131c2b" stroke="#00ff9d" stroke-width="1.5" />
          <text x="0" y="-2" text-anchor="middle" fill="#fff" font-family="monospace" font-size="12" font-weight="bold">Cisco Catalyst 9200L-B</text>
          <text x="0" y="13" text-anchor="middle" fill="#00ff9d" font-family="monospace" font-size="9">VLAN 30 (VoIP) / VLAN 99 (CCTV)</text>
        </g>

        <!-- Endpoints & WLAN -->
        <g transform="translate(140, 440)">
          <circle cx="0" cy="0" r="14" fill="#09131f" stroke="#8b949e" stroke-width="1.5" />
          <text x="0" y="4" text-anchor="middle" font-size="11">💻</text>
          <text x="0" y="22" text-anchor="middle" fill="#8b949e" font-family="monospace" font-size="8">Host PC</text>
        </g>

        <g transform="translate(260, 440)">
          <circle cx="0" cy="0" r="14" fill="#09131f" stroke="#00f0ff" stroke-width="1.5" />
          <text x="0" y="4" text-anchor="middle" font-size="11">📡</text>
          <text x="0" y="22" text-anchor="middle" fill="#00f0ff" font-family="monospace" font-size="8">UniFi AP (WPA3)</text>
        </g>

        <g transform="translate(540, 440)">
          <circle cx="0" cy="0" r="14" fill="#09131f" stroke="#8b949e" stroke-width="1.5" />
          <text x="0" y="4" text-anchor="middle" font-size="11">📞</text>
          <text x="0" y="22" text-anchor="middle" fill="#8b949e" font-family="monospace" font-size="8">IP Phone</text>
        </g>

        <g transform="translate(660, 440)">
          <circle cx="0" cy="0" r="14" fill="#09131f" stroke="#ffb703" stroke-width="1.5" />
          <text x="0" y="4" text-anchor="middle" font-size="11">📹</text>
          <text x="0" y="22" text-anchor="middle" fill="#ffb703" font-family="monospace" font-size="8">CCTV PoE</text>
        </g>
      </svg>
    `
  },
  'homelab-cluster': {
    id: 'homelab-cluster',
    title: 'Arquitectura Homelab & Edge Cluster Privado (Caso de Estudio)',
    subtitle: 'Ubuntu Server 26.04 con ZRAM zstd, Docker Engine, Cloudflare Zero Trust & WireGuard',
    description: 'Ecosistema de servidor doméstico blindado para investigación y ejecución de 17 microservicios contenerizados. Sin puertos abiertos hacia internet gracias a túneles cifrados Anycast y red de malla Tailscale.',
    specs: [
      { label: 'Sistema Operativo', value: 'Ubuntu Server 26.04 LTS (Kernel Linux optimizado)' },
      { label: 'Memoria & ZRAM', value: '1.9 GB ZRAM comprimido con zstd en RAM (Prio 100, vm.swappiness=100)' },
      { label: 'Aseguramiento Edge', value: 'Cloudflare Zero Trust Tunnels (Cero puertos entrantes públicos)' },
      { label: 'Red Privada Mesh', value: 'WireGuard P2P cifrado mediante Tailscale' },
      { label: 'DNS Perimetral', value: 'AdGuard Home (DoH/DoT upstream cifrado con Quad9/Cloudflare)' },
      { label: 'Contenerización', value: '17 microservicios Docker (Límite de logs 10m x 3, redes aisladas)' }
    ],
    svg: `
      <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" class="topology-svg">
        <defs>
          <linearGradient id="bgGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#050811" />
            <stop offset="100%" stop-color="#0a1220" />
          </linearGradient>
          <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#b73bfe" />
            <stop offset="100%" stop-color="#7928ca" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#bgGrad2)" rx="16" />

        <!-- Outer Boundary: Physical Host -->
        <rect x="30" y="30" width="740" height="420" rx="14" fill="rgba(255,255,255,0.015)" stroke="rgba(0, 240, 255, 0.2)" stroke-width="1.5" stroke-dasharray="4,4" />
        <text x="50" y="55" fill="#00f0ff" font-family="monospace" font-size="12" font-weight="bold">🖥️ SERVIDOR HOST FÍSICO (Ubuntu Server 26.04 LTS)</text>

        <!-- Kernel & Memory Optimization Layer -->
        <g transform="translate(60, 80)">
          <rect width="680" height="55" rx="8" fill="#0c1626" stroke="#00ff9d" stroke-width="1.2" />
          <text x="20" y="24" fill="#00ff9d" font-family="monospace" font-size="12" font-weight="bold">⚡ ZRAM Memory Optimization Layer</text>
          <text x="20" y="42" fill="#8b949e" font-family="monospace" font-size="10">1.9 GB zstd comprimido en RAM (Prio 100) • vm.swappiness = 100 • Protección total de escrituras SSD</text>
        </g>

        <!-- Docker Engine Block -->
        <g transform="translate(60, 155)">
          <rect width="450" height="270" rx="10" fill="#0e1b2e" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
          <text x="20" y="26" fill="#fff" font-family="monospace" font-size="13" font-weight="bold">🐳 Docker Containerized Ecosystem (17 Containers)</text>
          
          <!-- Microservice Containers -->
          <g transform="translate(20, 45)">
            <!-- C1 -->
            <rect x="0" y="0" width="125" height="45" rx="6" fill="#142640" stroke="#00f0ff" stroke-width="1" />
            <text x="10" y="20" fill="#fff" font-family="monospace" font-size="11" font-weight="bold">AdGuard Home</text>
            <text x="10" y="35" fill="#00f0ff" font-family="monospace" font-size="9">DoH / DNS Sinkhole</text>

            <!-- C2 -->
            <rect x="140" y="0" width="125" height="45" rx="6" fill="#142640" stroke="#ffb703" stroke-width="1" />
            <text x="10" y="20" fill="#fff" font-family="monospace" font-size="11" font-weight="bold">Mosquitto MQTT</text>
            <text x="10" y="35" fill="#ffb703" font-family="monospace" font-size="9">TCP 1883 & WSS</text>

            <!-- C3 -->
            <rect x="280" y="0" width="125" height="45" rx="6" fill="#142640" stroke="#b73bfe" stroke-width="1" />
            <text x="10" y="20" fill="#fff" font-family="monospace" font-size="11" font-weight="bold">Node-RED</text>
            <text x="10" y="35" fill="#b73bfe" font-family="monospace" font-size="9">SCADA & Automation</text>

            <!-- Row 2 -->
            <rect x="0" y="55" width="125" height="45" rx="6" fill="#142640" stroke="#8b949e" stroke-width="1" />
            <text x="10" y="20" fill="#fff" font-family="monospace" font-size="11" font-weight="bold">Uptime Kuma</text>
            <text x="10" y="35" fill="#8b949e" font-family="monospace" font-size="9">SLA & Observability</text>

            <rect x="140" y="55" width="125" height="45" rx="6" fill="#142640" stroke="#8b949e" stroke-width="1" />
            <text x="10" y="20" fill="#fff" font-family="monospace" font-size="11" font-weight="bold">Vaultwarden</text>
            <text x="10" y="35" fill="#8b949e" font-family="monospace" font-size="9">Password Vault</text>

            <rect x="280" y="55" width="125" height="45" rx="6" fill="#142640" stroke="#8b949e" stroke-width="1" />
            <text x="10" y="20" fill="#fff" font-family="monospace" font-size="11" font-weight="bold">Portainer</text>
            <text x="10" y="35" fill="#8b949e" font-family="monospace" font-size="9">Stack Manager</text>

            <!-- Row 3 -->
            <rect x="0" y="110" width="125" height="45" rx="6" fill="#142640" stroke="#8b949e" stroke-width="1" />
            <text x="10" y="20" fill="#fff" font-family="monospace" font-size="11" font-weight="bold">Dozzle Logs</text>
            <text x="10" y="35" fill="#8b949e" font-family="monospace" font-size="9">Rotating Logs (10m)</text>

            <rect x="140" y="110" width="125" height="45" rx="6" fill="#142640" stroke="#8b949e" stroke-width="1" />
            <text x="10" y="20" fill="#fff" font-family="monospace" font-size="11" font-weight="bold">Glances</text>
            <text x="10" y="35" fill="#8b949e" font-family="monospace" font-size="9">Hardware Metrics</text>

            <rect x="280" y="110" width="125" height="45" rx="6" fill="#142640" stroke="#00ff9d" stroke-width="1" />
            <text x="10" y="20" fill="#fff" font-family="monospace" font-size="11" font-weight="bold">+9 Servicios</text>
            <text x="10" y="35" fill="#00ff9d" font-family="monospace" font-size="9">Internal Network</text>
          </g>
        </g>

        <!-- Secure Ingress / Zero Trust Sidecar -->
        <g transform="translate(530, 155)">
          <rect width="210" height="270" rx="10" fill="#101726" stroke="#00f0ff" stroke-width="1.5" />
          <text x="20" y="26" fill="#00f0ff" font-family="monospace" font-size="12" font-weight="bold">🛡️ Zero Trust Ingress</text>

          <g transform="translate(15, 45)">
            <rect width="180" height="70" rx="8" fill="#152238" stroke="#ffb703" stroke-width="1" />
            <text x="12" y="22" fill="#fff" font-family="monospace" font-size="11" font-weight="bold">Cloudflare Tunnel</text>
            <text x="12" y="38" fill="#ffb703" font-family="monospace" font-size="9">Outgoing TLS 1.3 Tunnel</text>
            <text x="12" y="52" fill="#8b949e" font-family="monospace" font-size="8">🔒 0 Puertos Abiertos</text>
          </g>

          <g transform="translate(15, 130)">
            <rect width="180" height="70" rx="8" fill="#152238" stroke="#00ff9d" stroke-width="1" />
            <text x="12" y="22" fill="#fff" font-family="monospace" font-size="11" font-weight="bold">Tailscale WireGuard</text>
            <text x="12" y="38" fill="#00ff9d" font-family="monospace" font-size="9">Mesh P2P VPN Cifrada</text>
            <text x="12" y="52" fill="#8b949e" font-family="monospace" font-size="8">Acceso Remoto Seguro</text>
          </g>

          <g transform="translate(15, 215)">
            <text x="10" y="18" fill="#8b949e" font-family="monospace" font-size="9">Audit & Storage: LVM 1.8 TB</text>
            <text x="10" y="34" fill="#8b949e" font-family="monospace" font-size="9">Backups diarios cifrados</text>
          </g>
        </g>
      </svg>
    `
  },
  'aida-iot': {
    id: 'aida-iot',
    title: 'Plataforma IoT & Firmware FreeRTOS Dual-Core',
    subtitle: 'Microcontrolador ESP32 (Core 0 / Core 1) + Mosquitto Broker + Node-RED',
    description: 'Arquitectura de telemetría resiliente de cero congelamientos. Aislamiento estricto de hilos mediante FreeRTOS para que la comunicación de red nunca interfiera con la adquisición analógica de sensores.',
    specs: [
      { label: 'Firmware ESP32', value: 'FreeRTOS Dual-Core C/C++ en PlatformIO' },
      { label: 'Core 0 (Network Stack)', value: 'Pila Wi-Fi + Cliente MQTT Mosquitto + Reintentos sin bloqueo' },
      { label: 'Core 1 (Sensor Loop)', value: 'Muestreo de sensores DHT22 / GPS a intervalos constantes' },
      { label: 'Comunicación Inter-Hilo', value: 'Colas seguras de FreeRTOS (xQueueHandle) y Mutexes' },
      { label: 'Broker MQTT', value: 'Eclipse Mosquitto (TCP 1883 & WebSockets 9001 con ACLs)' },
      { label: 'Motor de Automatización', value: 'Node-RED para orquestación de flujos y persistencia en MariaDB' }
    ],
    svg: `
      <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" class="topology-svg">
        <defs>
          <linearGradient id="bgGrad3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#080f1a" />
            <stop offset="100%" stop-color="#121e30" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#bgGrad3)" rx="16" />

        <!-- ESP32 Hardware Boundary -->
        <rect x="40" y="40" width="340" height="400" rx="14" fill="#0d1828" stroke="#ffb703" stroke-width="2" />
        <text x="60" y="70" fill="#ffb703" font-family="monospace" font-size="13" font-weight="bold">🤖 ESP32 Hardware (FreeRTOS SoC)</text>

        <!-- Core 0 Block -->
        <g transform="translate(65, 95)">
          <rect width="290" height="110" rx="8" fill="#13233a" stroke="#00f0ff" stroke-width="1.5" />
          <text x="15" y="24" fill="#00f0ff" font-family="monospace" font-size="12" font-weight="bold">Core 0: Network & MQTT Stack</text>
          <text x="15" y="44" fill="#fff" font-family="monospace" font-size="10">Pila WiFi 802.11 b/g/n</text>
          <text x="15" y="62" fill="#8b949e" font-family="monospace" font-size="9">• Tarea MQTT: Publicación telemétrica QoS 1</text>
          <text x="15" y="80" fill="#8b949e" font-family="monospace" font-size="9">• Reconexión automática asíncrona</text>
          <text x="15" y="98" fill="#8b949e" font-family="monospace" font-size="9">• Suscripción a comandos remotos</text>
        </g>

        <!-- xQueue Inter-Core Bridge -->
        <g transform="translate(130, 220)">
          <rect width="160" height="36" rx="6" fill="#1b2e4b" stroke="#00ff9d" stroke-width="1.5" />
          <text x="80" y="22" text-anchor="middle" fill="#00ff9d" font-family="monospace" font-size="11" font-weight="bold">⚡ xQueueHandle Bus</text>
        </g>

        <!-- Core 1 Block -->
        <g transform="translate(65, 275)">
          <rect width="290" height="110" rx="8" fill="#13233a" stroke="#b73bfe" stroke-width="1.5" />
          <text x="15" y="24" fill="#b73bfe" font-family="monospace" font-size="12" font-weight="bold">Core 1: Sensores & Actuadores</text>
          <text x="15" y="44" fill="#fff" font-family="monospace" font-size="10">Muestreo en tiempo real</text>
          <text x="15" y="62" fill="#8b949e" font-family="monospace" font-size="9">• Sensor DHT22 (Temperatura / Humedad)</text>
          <text x="15" y="80" fill="#8b949e" font-family="monospace" font-size="9">• Módulo GPS NMEA vía UART Hardware</text>
          <text x="15" y="98" fill="#8b949e" font-family="monospace" font-size="9">• Cero congelamientos por latencia de red</text>
        </g>

        <!-- Link from ESP32 to Broker -->
        <line x1="380" y1="150" x2="450" y2="150" stroke="#00f0ff" stroke-width="2.5" stroke-dasharray="6,4" />
        <text x="415" y="140" text-anchor="middle" fill="#00f0ff" font-family="monospace" font-size="9">WiFi / MQTT</text>

        <!-- Cloud Ingestion Layer -->
        <g transform="translate(450, 40)">
          <rect width="310" height="400" rx="14" fill="#0d1828" stroke="#00f0ff" stroke-width="2" />
          <text x="20" y="30" fill="#00f0ff" font-family="monospace" font-size="13" font-weight="bold">☁️ Cloud Ingestion & Edge Server</text>

          <!-- Mosquitto Broker -->
          <g transform="translate(20, 55)">
            <rect width="270" height="90" rx="8" fill="#13233a" stroke="#ffb703" stroke-width="1.5" />
            <text x="15" y="24" fill="#ffb703" font-family="monospace" font-size="12" font-weight="bold">Broker Mosquitto MQTT</text>
            <text x="15" y="45" fill="#8b949e" font-family="monospace" font-size="9">Puerto TCP 1883 • WebSockets 9001</text>
            <text x="15" y="63" fill="#8b949e" font-family="monospace" font-size="9">Autenticación por usuario & Listas ACL</text>
            <text x="15" y="80" fill="#00ff9d" font-family="monospace" font-size="9">Zero Trust Tunnel / Cloudflare Anycast</text>
          </g>

          <!-- Node-RED Engine -->
          <g transform="translate(20, 165)">
            <rect width="270" height="90" rx="8" fill="#13233a" stroke="#b73bfe" stroke-width="1.5" />
            <text x="15" y="24" fill="#b73bfe" font-family="monospace" font-size="12" font-weight="bold">Node-RED Event Engine</text>
            <text x="15" y="45" fill="#8b949e" font-family="monospace" font-size="9">Filtrado reactivo y reglas de alerta</text>
            <text x="15" y="63" fill="#8b949e" font-family="monospace" font-size="9">APIs REST meteorológicas en vivo</text>
            <text x="15" y="80" fill="#8b949e" font-family="monospace" font-size="9">Control automático de electroválvulas</text>
          </g>

          <!-- MariaDB / Dashboard -->
          <g transform="translate(20, 275)">
            <rect width="270" height="90" rx="8" fill="#13233a" stroke="#00ff9d" stroke-width="1.5" />
            <text x="15" y="24" fill="#00ff9d" font-family="monospace" font-size="12" font-weight="bold">Almacenamiento & Telemetría</text>
            <text x="15" y="45" fill="#8b949e" font-family="monospace" font-size="9">MariaDB con series temporales</text>
            <text x="15" y="63" fill="#8b949e" font-family="monospace" font-size="9">Paneles SCADA WebSockets en vivo</text>
            <text x="15" y="80" fill="#8b949e" font-family="monospace" font-size="9">Historial de registros y reportes</text>
          </g>
        </g>
      </svg>
    `
  }
};
