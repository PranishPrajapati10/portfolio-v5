/**
 * ZERIF / CLEAN AGENCY THEME
 * Main Interaction Engine with Interactive Datacenter NOC Console
 * Authenticated reference from pranishprajapati.com.np
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initTerminal();
  initContactForm();
  initEmailCopy();
  initChatBubble();
});

/* ==========================================================================
   HEADER SCROLL & MOBILE TOGGLE
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }
}

/* ==========================================================================
   INTERACTIVE NOC & DATACENTER TERMINAL CONSOLE
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalScreen = document.getElementById('terminal-screen');
  const clearBtn = document.getElementById('clear-term-btn');
  const cmdChips = document.querySelectorAll('.cmd-chip');

  if (!terminalInput || !terminalHistory) return;

  const terminalCommands = {
    help: () => `
<div class="output-bold">Available NOC Console Commands:</div>
  <span class="output-accent">status</span>        - Inspect live NOC telemetry, uptime, and DC environment
  <span class="output-accent">datacenter</span>    - Review Silver Lining DC operations & hardware maintenance
  <span class="output-accent">experience</span>    - Detail roles at Silver Lining Data Center (Technician & Intern)
  <span class="output-accent">skills</span>        - List technical competencies (NOC, Networking, Web, Linux)
  <span class="output-accent">ping [host]</span>   - Run simulated ICMP echo probe (e.g. ping 8.8.8.8)
  <span class="output-accent">whoami</span>        - Print identity and career objective
  <span class="output-accent">contact</span>       - Retrieve professional direct channels
  <span class="output-accent">clear</span>         - Flush terminal screen buffer
`,

    status: () => `
<div class="output-accent">[SILVER LINING DATA CENTER - NOC STATUS MONITOR]</div>
Facility:     Kamalpokhari, Kathmandu, Nepal
Core Uptime:  99.98% SLA
Active PDU:   Dual Feeds (A/B) - Nominal
Ambient Temp: 20.4°C / Controlled Cold Aisle
Open Tickets: 0 Critical, 0 Severe
NOC Shift:    Active Operations & Escalation Ready
Core Router:  Juniper/Cisco Gateway · 10G SFP+ Uplink [OK]
`,

    datacenter: () => `
<div class="output-accent">[SILVER LINING DATA CENTER - DC OPERATIONS]</div>
Facility:      Kamalpokhari, Kathmandu, Nepal
Role:          Datacenter Technician (Active APR 2026 - Present)
Hardware:      Rackmount Servers, Core/Access Switches, SAN Arrays, Dual PDUs
Monitoring:    24/7 Server Performance, Cold Aisle Thermal, Link Saturation
Escalation:    Tier-1 & Tier-2 Troubleshooting, SLA Reporting, Client Handover
`,

    experience: () => `
<div class="output-accent">[SILVER LINING DATA CENTER - PROFESSIONAL EXPERIENCE]</div>
1. Datacenter Technician (APR 2026 - PRESENT)
   - 24/7 proactive monitoring of server, hardware, and network metrics
   - Independent troubleshooting and timely escalation to senior engineers
   - Direct client communications & SLA-backed status updates
   - Detailed shift handover logs, incident post-mortems, and resolution reports

2. Datacenter Technician Intern (JAN 2026 - APR 2026)
   - Supervised monitoring of hardware telemetry & alert queues
   - Immersed in NOC operational workflows, escalation matrices & rack cabling
`,

    skills: () => `
<div class="output-accent">[TECHNICAL CAPABILITIES MATRIX]</div>
- Datacenter: 24/7 NOC Monitoring, Server Hardware, Racking, Fiber/Cat6 Cabling, PDUs
- Networking: VLANs, 802.1Q, Router-on-a-stick, Dynamic/Static Routing, Wireshark, Subnetting
- Operations: Incident Escalation, SLA Management, Shift Reporting, Client Support
- Web/Backend: PHP, MySQL, Stripe Payment API, JavaScript, HTML5/CSS3
- Education:  Bachelor of Information Management (BIM) @ Tribhuvan University
`,

    whoami: () => `
<div class="output-bold">Pranish Prajapati</div>
Datacenter Technician & NOC Operations Specialist
Silver Lining Data Center · Kathmandu Valley, Nepal
Scholar: Bachelor of Information Management (BIM), Tribhuvan University
Focus: High-availability datacenter operations, incident response, and network engineering.
`,

    contact: () => `
<div class="output-accent">[OFFICIAL CONTACT CHANNELS]</div>
Email:    pranishprajapati721@gmail.com
LinkedIn: https://www.linkedin.com/in/pranish-prajapati-461649366/
GitHub:   https://github.com/PranishPrajapati10
Location: Kathmandu Valley / Bhaktapur, Nepal
`
  };

  function executeCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Echo input line
    const echoRow = document.createElement('div');
    echoRow.className = 'term-line';
    echoRow.innerHTML = `<span class="prompt-user">pranish@sldc-noc:~$</span> <span style="color: #fff;">${escapeHtml(trimmed)}</span>`;
    terminalHistory.appendChild(echoRow);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    if (mainCmd === 'clear') {
      terminalHistory.innerHTML = '';
      terminalInput.value = '';
      return;
    }

    if (mainCmd === 'ping') {
      simulatePing(args || '8.8.8.8');
      terminalInput.value = '';
      return;
    }

    const outputRow = document.createElement('div');
    outputRow.className = 'term-line';

    if (terminalCommands[mainCmd]) {
      outputRow.innerHTML = terminalCommands[mainCmd]();
    } else {
      outputRow.innerHTML = `<span style="color: #ef4444;">Command not found: '${escapeHtml(trimmed)}'. Type <span class="term-cmd-highlight">'help'</span> for a list of valid commands.</span>`;
    }

    terminalHistory.appendChild(outputRow);
    terminalInput.value = '';
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  function simulatePing(target) {
    const pingContainer = document.createElement('div');
    pingContainer.className = 'term-line';
    pingContainer.innerHTML = `PING ${escapeHtml(target)} (${escapeHtml(target)}) 56(84) bytes of data.<br>`;
    terminalHistory.appendChild(pingContainer);

    let count = 0;
    const maxPings = 4;
    const interval = setInterval(() => {
      count++;
      const timeMs = (Math.random() * 4 + 1.8).toFixed(2);
      const pingLine = document.createElement('div');
      pingLine.className = 'term-line';
      pingLine.innerHTML = `64 bytes from ${escapeHtml(target)}: icmp_seq=${count} ttl=118 time=${timeMs} ms`;
      terminalHistory.appendChild(pingLine);
      terminalScreen.scrollTop = terminalScreen.scrollHeight;

      if (count >= maxPings) {
        clearInterval(interval);
        const summary = document.createElement('div');
        summary.className = 'term-line output-accent';
        summary.innerHTML = `--- ${escapeHtml(target)} ping statistics ---<br>4 packets transmitted, 4 received, 0% packet loss, time 3004ms<br>rtt min/avg/max = 1.94/2.88/4.31 ms`;
        terminalHistory.appendChild(summary);
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
      }
    }, 450);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      terminalHistory.innerHTML = '';
      terminalInput.value = '';
    });
  }

  cmdChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });
}

/* ==========================================================================
   CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    showToast(`Thank you, ${name}! Your message has been sent.`);
    form.reset();
  });
}

/* ==========================================================================
   EMAIL COPY ACTION
   ========================================================================== */
function initEmailCopy() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const email = 'pranishprajapati721@gmail.com';

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email + ' 📬');
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  });
}

/* ==========================================================================
   FLOATING CHAT BUBBLE WIDGET
   ========================================================================== */
function initChatBubble() {
  const bubble = document.getElementById('floating-chat');
  if (!bubble) return;

  bubble.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(msg) {
  let toast = document.getElementById('toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
