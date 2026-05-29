document.addEventListener('DOMContentLoaded', () => {
    
    // CLAVE DE ACCESO PARA EL MODO ADMIN
    const ADMIN_PASSWORD = "1234";

    // ==========================================
    // 📊 1. BASE DE DATOS DE INVITADOS ORIGINALES
    // ==========================================
    const INITIAL_GUEST_DATABASE = [
        { name: "Kory Cacho", passes: 13, table: "Mesa 12 Y 13" },
        { name: "Andres Rodas", passes: 4, table: "Mesa 11" },
        { name: "Angel Abundio Correa", passes: 1, table: "Mesa 11" },
        { name: "Briseño Gallardo Marjhori", passes: 1, table: "Mesa 4" },
        { name: "Alva Montoya Jheremy", passes: 1, table: "Mesa 4" },
        { name: "Katherine Chalan Briones", passes: 1, table: "Mesa 4" },
        { name: "Wilman Cotrina", passes: 3, table: "Mesa 18" },
        { name: "Ever Garcia Machuca", passes: 3, table: "Mesa 18" },
        { name: "Hector Saldaña Diaz", passes: 3, table: "Mesa 14" },
        { name: "Rodrigo Saldaña Abanto", passes: 1, table: "Mesa 14" },
        { name: "Luis Fernando Saldaña Diaz", passes: 4, table: "Mesa 16" },
        { name: "Carlos Armas Asenjo", passes: 4, table: "Mesa 16" },
        { name: "Jesus Zamora Diaz", passes: 3, table: "Mesa 15" },
        { name: "Juan Mera Silva", passes: 3, table: "Mesa 14" },
        { name: "Pepe Saldaña Delgado", passes: 4, table: "Mesa 15" },
        { name: "Cesar Cotrina", passes: 3, table: "Mesa 17" },
        { name: "Fredy Azañero", passes: 4, table: "Mesa 17" },
        { name: "Fanny Paredes", passes: 1, table: "Mesa 8" },
        { name: "Edith Mendoza", passes: 2, table: "Mesa 8" },
        { name: "David Ruiz", passes: 3, table: "Mesa 8" },
        { name: "Jambo Chingay Nicool", passes: 1, table: "Mesa de Compañeros (Mesa 19)" },
        { name: "Tingal de la Cruz Joselin", passes: 1, table: "Mesa de Compañeros (Mesa 19)" },
        { name: "Valencia Castaneda Yvette", passes: 1, table: "Mesa de Compañeros (Mesa 19)" },
        { name: "Chilon Ocas Daniel", passes: 1, table: "Mesa de Compañeros (Mesa 20)" },
        { name: "Angaspil Ortiz Gabriela", passes: 1, table: "Mesa de Compañeros (Mesa 20)" },
        { name: "Vergara Sanchez Mar", passes: 1, table: "Mesa de Compañeros (Mesa 19)" },
        { name: "Cotrina Diaz Cesar", passes: 1, table: "Mesa de Compañeros (Mesa 20)" },
        { name: "Cordova Vera Claudio", passes: 1, table: "Mesa de Compañeros (Mesa 20)" },
        { name: "Cerquin Castrejon Keysi", passes: 1, table: "Mesa de Compañeros (Mesa 19)" },
        { name: "Mendoza Sanchez Paco", passes: 1, table: "Mesa de Compañeros (Mesa 19)" },
        { name: "Alcantara Chacon Dayer", passes: 1, table: "Mesa de Compañeros (Mesa 20)" },
        { name: "Llanos Saavedra Jean Franco", passes: 1, table: "Mesa de Compañeros (Mesa 20)" },
        { name: "Cercado Cruzado Gloria", passes: 1, table: "Mesa de Compañeros (Mesa 19)" },
        { name: "Yopla Miranda Jenny", passes: 1, table: "Mesa de Compañeros (Mesa 20)" },
        { name: "Ishpilco Ernandez Piero", passes: 1, table: "Mesa de Compañeros (Mesa 20)" },
        { name: "Garcia Banda Gaudy", passes: 1, table: "Mesa de Compañeros (Mesa 19)" },
        { name: "Carlos Chalan Llanos", passes: 1, table: "Mesa 2" },
        { name: "Jorge Chalan", passes: 6, table: "Mesa 1" },
        { name: "Jaime Chalan", passes: 5, table: "Mesa 1" },
        { name: "Abelino Llanos", passes: 2, table: "Mesa 5" },
        { name: "Kenny Llanos Rimarachin", passes: 4, table: "Mesa 7" },
        { name: "José Fernando Llanos Rimarachin", passes: 4, table: "Mesa 5" },
        { name: "Jonathan Llanos Rimarachin", passes: 2, table: "Mesa 5" },
        { name: "Baciano Llanos Murga", passes: 1, table: "Mesa 6" },
        { name: "Diana Llanos Teran", passes: 2, table: "Mesa 6" },
        { name: "William Llanos Teran", passes: 4, table: "Mesa 6" },
        { name: "Luis Alberto Chumpitas Teran", passes: 3, table: "Mesa 10" },
        { name: "Isabel Llanos Murga", passes: 2, table: "Mesa 7" },
        { name: "Ronal Chilon", passes: 3, table: "Mesa 8" },
        { name: "Wilman Lopez Llanos", passes: 4, table: "Mesa 10" },
        { name: "Jorge Luis Villarreal", passes: 5, table: "Mesa 11" },
        { name: "Cristobal Gutierrez", passes: 2, table: "Mesa 7" },
        { name: "Segundo Quiroz", passes: 2, table: "Mesa 2" },
        { name: "Rosario Quiliche", passes: 2, table: "Mesa 2" },
        { name: "Gladys Linares Alaya", passes: 2, table: "Mesa 2" },
        { name: "Alex Fernando Quiliche Rudas", passes: 1, table: "Mesa 3" },
        { name: "Hanz Chavez Marin", passes: 1, table: "Mesa 3" },
        { name: "Segundo Chalan Valencia", passes: 1, table: "Mesa 1" },
        { name: "Cesar Chalan Llanos", passes: 1, table: "Mesa 1" },
        { name: "Luis Chuquitucto", passes: 5, table: "Mesa 9" },
        { name: "Grupo LOS MÍSTICOS", passes: 6, table: "Mesa 21" }
    ];

    // Cargar estados previos de confirmación o inicializar base de datos limpia
    let GUEST_DATABASE = JSON.parse(localStorage.getItem('wedding_guests_status'));
    if (!GUEST_DATABASE) {
        GUEST_DATABASE = INITIAL_GUEST_DATABASE.map(guest => ({ ...guest, status: 'pending' }));
        localStorage.setItem('wedding_guests_status', JSON.stringify(GUEST_DATABASE));
    }

    // ==========================================
    // 🧠 2. ALGORITMO DE COMPARACIÓN INTELIGENTE
    // ==========================================
    const NICKNAMES = {
        "lucho": "luis", "pepe": "jose", "kory": "kori", "nico": "nicool", "mafer": "maria fernanda", "marjhori": "marsholl"
    };

    const normalizeText = (text) => {
        let clean = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, "").trim();
        let words = clean.split(/\s+/);
        return words.map(word => NICKNAMES[word] || word).filter(w => w !== "");
    };

    const calculateLevenshtein = (s1, s2) => {
        if (s1 === s2) return 1.0;
        const track = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
        for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
        for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

        for (let j = 1; j <= s2.length; j += 1) {
            for (let i = 1; i <= s1.length; i += 1) {
                const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(track[j][i - 1] + 1, track[j - 1][i] + 1, track[j - 1][i - 1] + indicator);
            }
        }
        return (Math.max(s1.length, s2.length) - track[s2.length][s1.length]) / Math.max(s1.length, s2.length);
    };

    const findGuestMatch = (inputName) => {
        const inputWords = normalizeText(inputName);
        if (inputWords.length === 0) return null;
        const inputFirstName = inputWords[0];
        let bestMatch = null; let highestScore = 0;

        for (const guest of GUEST_DATABASE) {
            const guestWords = normalizeText(guest.name);
            if (guestWords.length === 0) continue;
            
            if (calculateLevenshtein(inputFirstName, guestWords[0]) < 0.70) continue;

            const s1Str = inputWords.join(" "); const s2Str = guestWords.join(" ");
            let score = calculateLevenshtein(s1Str, s2Str);
            if (s2Str.includes(s1Str) || s1Str.includes(s2Str)) score = Math.max(score, 0.85);

            if (score > highestScore) { highestScore = score; bestMatch = guest; }
        }
        return highestScore >= 0.65 ? { guest: bestMatch, score: highestScore } : null;
    };

    // ==========================================
    // 📋 3. GESTOR DE FORMULARIO DE CONFIRMACIÓN
    // ==========================================
    const rsvpForm = document.getElementById('rsvpForm');
    const nameInput = document.getElementById('guestName');
    const attendanceSelect = document.getElementById('attendance');
    const resultBox = document.getElementById('verificationResult');

    if (rsvpForm && resultBox) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isFormValid = true;
            const rawName = nameInput.value.trim();
            const attendanceValue = attendanceSelect.value;

            if (rawName === "") { nameInput.parentElement.classList.add('invalid'); isFormValid = false; }
            if (attendanceValue === "") { attendanceSelect.parentElement.classList.add('invalid'); isFormValid = false; }
            if (!isFormValid) return;

            const btnConfirm = rsvpForm.querySelector('.btn-confirm');
            if(btnConfirm) { btnConfirm.disabled = true; btnConfirm.innerText = 'Procesando...'; }

            resultBox.style.display = "none";
            resultBox.innerHTML = "";

            setTimeout(() => {
                const matchData = findGuestMatch(rawName);

                if (matchData) {
                    const guest = GUEST_DATABASE.find(g => g.name === matchData.guest.name);
                    
                    if (attendanceValue === "no") {
                        guest.status = 'no'; 
                        localStorage.setItem('wedding_guests_status', JSON.stringify(GUEST_DATABASE));

                        resultBox.className = "result-card success";
                        resultBox.style.display = "block";
                        resultBox.innerHTML = `
                            <div class="result-icon">😔</div>
                            <h3>Confirmación Recibida</h3>
                            <p>Lamentamos mucho que no puedas acompañarnos, <strong>${guest.name}</strong>. ¡Agradecemos tu respuesta!</p>
                        `;
                    } else {
                        guest.status = 'yes'; 
                        localStorage.setItem('wedding_guests_status', JSON.stringify(GUEST_DATABASE));

                        resultBox.className = "result-card success";
                        resultBox.style.display = "block";
                        const obsText = matchData.score < 0.92 ? `<p style="color:#777; font-size:0.85rem; margin-bottom:10px;">Encontrado como: "<em>${guest.name}</em>"</p>` : '';
                        
                        resultBox.innerHTML = `
                            <div id="ticketCard" class="ticket-card" style="margin-top: 15px;">
                                <div class="ticket-header">
                                    <span class="ticket-badge">Pase Digital Oficial</span>
                                    <h2 class="ticket-main-title">Bautizo & Cumpleaños</h2>
                                </div>
                                <div class="ticket-body">
                                    <p class="ticket-label">Invitado Confirmado</p>
                                    <h3 class="ticket-guest-name" style="font-family:'Playfair Display',serif; font-size:1.4rem; color:#b89742; font-style:italic; margin-bottom:15px;">${guest.name}</h3>
                                    ${obsText}
                                    <div class="ticket-meta-grid">
                                        <div><span class="meta-label">Mesa Asignada</span><strong style="color:#b89742; font-size:1.15rem;">${guest.table}</strong></div>
                                        <div><span class="meta-label">Total Pases</span><strong>${guest.passes} Personas</strong></div>
                                    </div>
                                    <div class="qr-wrapper" style="display:flex; justify-content:center; margin-top:20px;">
                                        <div id="ticketQrcode" style="padding:10px; background:#fff; border-radius:8px;"></div>
                                    </div>
                                </div>
                                <div class="ticket-footer">
                                    <p>📅 Sábado, 13 de Junio - 10:00 AM</p>
                                    <p>📍 Local de Eventos Castope - Tartar</p>
                                </div>
                            </div>
                            <button type="button" id="btnDownloadTicket" class="btn-download">💾 Descargar Pase</button>
                        `;

                        // Esperamos un instante a que el DOM se asiente
                        setTimeout(() => {
                            const qrContainer = document.getElementById('ticketQrcode');
                            
                            if (qrContainer) {
                                // 1. Limpieza absoluta de residuos previos
                                qrContainer.innerHTML = ""; 
                                
                                // 2. Formateo de texto limpio con saltos de línea para el lector de la puerta
                                const textoQR = `✨ INVITACIÓN OFICIAL ✨\n` +
                                                `Anfitriona: KIARA JIMENA\n` +
                                                `Invitado: ${guest.name}\n` +
                                                `Ubicación: ${guest.table}\n` +
                                                `Pases: ${guest.passes} Persona(s)`;
                                
                                try {
                                    // Generación nativa con la librería
                                    new QRCode("ticketQrcode", {
                                        text: textoQR,
                                        width: 140,
                                        height: 140,
                                        colorDark: "#1a1a1a",
                                        colorLight: "#ffffff",
                                        correctLevel: QRCode.CorrectLevel.M // Nivel medio para mejorar la lectura rápida en el sol
                                    });
                                    
                                    console.log("¡Código QR para recepción generado con éxito!");
                                } catch (error) {
                                    console.error("Error al renderizar QR nativo, aplicando Plan B:", error);
                                    
                                    // Plan B de contingencia por API con el mismo formato limpio
                                    const qrTextEncoded = encodeURIComponent(textoQR);
                                    qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${qrTextEncoded}" alt="QR" style="display:block; width:140px; height:140px;">`;
                                }
                            } else {
                                console.error("El contenedor #ticketQrcode no se encuentra disponible.");
                            }
                        }, 250);

                        document.getElementById('btnDownloadTicket').addEventListener('click', () => {
                            html2canvas(document.getElementById('ticketCard'), { scale: 2, useCORS: true }).then(canvas => {
                                const link = document.createElement('a');
                                link.href = canvas.toDataURL('image/png');
                                link.download = `Pase_${guest.name.replace(/\s+/g, '_')}.png`;
                                link.click();
                            });
                        });
                    }
                } else {
                    resultBox.className = "result-card error";
                    resultBox.style.display = "block";
                    resultBox.innerHTML = `<div class="result-icon">❌</div><h3>No encontrado</h3><p>No encontramos ninguna coincidencia. Revisa la escritura.</p>`;
                }

                if(btnConfirm) { btnConfirm.disabled = false; btnConfirm.innerText = 'Enviar Confirmación'; }
                resultBox.scrollIntoView({ behavior: 'smooth' });
            }, 400);
        });
    }

    // ==========================================
    // 🔒 4. LÓGICA VISTA DE ADMINISTRADOR CON LOGIN FORM
    // ==========================================
    const CREDENTIALS = {
        email: "admineventokiara@gmail.com",
        password: "Bautizokiara152406"
    };

    const btnToggleAdmin = document.getElementById('btnToggleAdmin');
    const btnCloseAdmin = document.getElementById('btnCloseAdmin');
    const btnCancelLogin = document.getElementById('btnCancelLogin');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const loginAdminForm = document.getElementById('loginAdminForm');
    const mainViewContainer = document.getElementById('mainViewContainer');
    const adminViewContainer = document.getElementById('adminViewContainer');
    const adminGuestTableBody = document.getElementById('adminGuestTableBody');

    const renderAdminData = () => {
        adminGuestTableBody.innerHTML = "";
        let countYes = 0; let countNo = 0; let countPending = 0; let totalPasses = 0;

        GUEST_DATABASE.forEach(guest => {
            let statusCircle = "";
            let statusText = "PENDIENTE";

            if (guest.status === 'yes') {
                statusCircle = `<span style="display:inline-block; width:14px; height:14px; background:#2ecc71; border-radius:50%; margin-right:10px; box-shadow: 0 0 6px #2ecc71; border: 1px solid #27ae60;"></span>`;
                statusText = "SÍ ASISTIRÁ";
                countYes++;
                totalPasses += guest.passes;
            } else if (guest.status === 'no') {
                statusCircle = `<span style="display:inline-block; width:14px; height:14px; background:#e74c3c; border-radius:50%; margin-right:10px; box-shadow: 0 0 6px #e74c3c; border: 1px solid #c0392b;"></span>`;
                statusText = "NO ASISTIRÁ";
                countNo++;
            } else {
                statusCircle = `<span style="display:inline-block; width:14px; height:14px; background:#ffffff; border:2px solid #cbd5e1; border-radius:50%; margin-right:10px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);"></span>`;
                statusText = "PENDIENTE";
                countPending++;
            }

            const tr = document.createElement('tr');
            tr.style.borderBottom = "1px solid #e2e8f0";
            tr.innerHTML = `
                <td style="padding:12px; display:flex; align-items:center; font-size:0.8rem; font-weight:600; color:#555;">${statusCircle} ${statusText}</td>
                <td style="padding:12px; font-weight:600; color:#333;">${guest.name}</td>
                <td style="padding:12px; color:#555;">${guest.table}</td>
                <td style="padding:12px; font-weight:600; color:#b89742;">${guest.passes}</td>
            `;
            adminGuestTableBody.appendChild(tr);
        });

        document.getElementById('statYes').innerText = countYes;
        document.getElementById('statNo').innerText = countNo;
        document.getElementById('statPending').innerText = countPending;
        document.getElementById('statPasses').innerText = totalPasses;
    };

    // Control de ventanas del Login
    if (btnToggleAdmin) {
        btnToggleAdmin.addEventListener('click', () => {
            adminLoginModal.style.display = "flex"; // Abre la ventana modal de login
        });
    }

    if (btnCancelLogin) {
        btnCancelLogin.addEventListener('click', () => {
            adminLoginModal.style.display = "none";
            loginAdminForm.reset();
        });
    }

    if (loginAdminForm) {
        loginAdminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputEmail = document.getElementById('adminEmail').value.trim();
            const inputPassword = document.getElementById('adminPassword').value;

            if (inputEmail === CREDENTIALS.email && inputPassword === CREDENTIALS.password) {
                adminLoginModal.style.display = "none";
                mainViewContainer.style.display = "none";
                adminViewContainer.style.display = "block";
                loginAdminForm.reset();
                renderAdminData();
            } else {
                alert("❌ Correo o contraseña incorrectos. Inténtalo de nuevo.");
            }
        });
    }

    if (btnCloseAdmin) {
        btnCloseAdmin.addEventListener('click', () => {
            adminViewContainer.style.display = "none";
            mainViewContainer.style.display = "flex";
        });
    }

   // ==========================================
    // ⏰ 5. EFECTOS VISUALES Y CUENTA REGRESIVA
    // ==========================================
    const bg = document.getElementById('animatedBg');
    if (bg) {
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div'); p.classList.add('particle');
            p.style.width = p.style.height = `${Math.random() * 15 + 6}px`;
            p.style.left = `${Math.random() * 100}%`; p.style.animationDelay = `${Math.random() * 5}s`;
            bg.appendChild(p);
        }
    }

    // 🔥 CORRECCIÓN CRÍTICA: Forzar visibilidad de las secciones con fade-in-up
    const animatedElements = document.querySelectorAll('.fade-in-up');
    const contentSection = document.querySelector('.content-section');
    
    const checkScroll = () => {
        animatedElements.forEach(el => {
            // Hacemos que aparezcan inmediatamente si están en pantalla
            el.classList.add('visible');
        });
    };

    // Ejecutar inmediatamente al cargar para que no se quede en blanco
    setTimeout(checkScroll, 100);

    // Escuchar el scroll por si acaso en ambos contenedores
    if (contentSection) {
        contentSection.addEventListener('scroll', checkScroll);
    }
    window.addEventListener('scroll', checkScroll);

    // Cuenta regresiva estable
    const eventDate = new Date(2026, 5, 13, 10, 0, 0).getTime();
    setInterval(() => {
        const diff = eventDate - new Date().getTime();
        if (diff > 0) {
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) daysEl.innerText = Math.floor(diff / (1000*60*60*24));
            if (hoursEl) hoursEl.innerText = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
            if (minutesEl) minutesEl.innerText = Math.floor((diff % (1000*60*60)) / (1000*60));
            if (secondsEl) secondsEl.innerText = Math.floor((diff % (1000*60)) / 1000);
        }
    }, 1000);
});

// ==========================================
    // 🔍 6. SISTEMA DE VALIDACIÓN EN PUERTA (RECEPTOR QR)
    // ==========================================
    const urlParams = new URLSearchParams(window.location.search);
    const invitadoAValidar = urlParams.get('validar');

    if (invitadoAValidar) {
        // Buscamos al invitado en la base de datos usando el algoritmo inteligente de comparación
        const matchValidacion = findGuestMatch(invitadoAValidar);

        // Creamos una capa flotante (Modal de validación) para el encargado de la puerta
        const modalValidacion = document.createElement('div');
        modalValidacion.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:20000; display:flex; justify-content:center; align-items:center; backdrop-filter:blur(8px); font-family:'Montserrat',sans-serif; padding:20px; box-sizing:border-box;";
        
        let contenidoModal = "";

        if (matchValidacion) {
            const g = matchValidacion.guest;
            
            // Evaluamos el estado real del invitado en el LocalStorage
            let estadoColor = "#cbd5e1"; // Pendiente
            let estadoTexto = "⏳ Invitación sin confirmar";
            
            if (g.status === 'yes') {
                estadoColor = "#2ecc71"; // Confirmado Sí
                estadoTexto = "✅ ACCESO PERMITIDO";
            } else if (g.status === 'no') {
                estadoColor = "#e74c3c"; // Confirmado No
                estadoTexto = "❌ CONFIRMÓ QUE NO ASISTIRÍA";
            }

            contenidoModal = `
                <div style="background:white; border-radius:16px; padding:30px; text-align:center; max-width:450px; width:100%; box-shadow:0 15px 35px rgba(0,0,0,0.3); border-top: 8px solid ${estadoColor};">
                    <div style="font-size:3.5rem; margin-bottom:10px;">🎫</div>
                    <h2 style="font-family:'Playfair Display',serif; color:#1a1a1a; margin:0 0 10px 0; font-size:1.8rem;">Control de Entrada</h2>
                    
                    <div style="background:${estadoColor}20; color:${estadoColor}; font-weight:bold; padding:8px 15px; border-radius:30px; display:inline-block; margin-bottom:20px; font-size:0.9rem; border: 1px solid ${estadoColor}40;">
                        ${estadoTexto}
                    </div>

                    <p style="margin:0; color:#666; font-size:0.85rem; font-weight:600; text-transform:uppercase; letter-spacing:1px;">Invitado</p>
                    <h3 style="margin:5px 0 15px 0; color:#1a1a1a; font-size:1.4rem; font-weight:600;">${g.name}</h3>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; background:#f8f9fa; padding:15px; border-radius:10px; margin-bottom:25px; text-align:left;">
                        <div>
                            <span style="display:block; color:#777; font-size:0.75rem; font-weight:600;">MESA ASIGNADA</span>
                            <strong style="color:#b89742; font-size:1.1rem;">${g.table}</strong>
                        </div>
                        <div>
                            <span style="display:block; color:#777; font-size:0.75rem; font-weight:600;">N° DE PASES</span>
                            <strong style="color:#1a1a1a; font-size:1.1rem;">${g.passes} Persona(s)</strong>
                        </div>
                    </div>

                    <button id="btnCerrarValidador" style="background:#1a1a1a; color:white; border:none; width:100%; padding:12px; border-radius:8px; font-weight:600; cursor:pointer; font-size:1rem; transition:background 0.2s;">
                        Listo, Continuar
                    </button>
                </div>
            `;
        } else {
            // Si modificaron el QR o el nombre no existe
            contenidoModal = `
                <div style="background:white; border-radius:16px; padding:30px; text-align:center; max-width:450px; width:100%; box-shadow:0 15px 35px rgba(0,0,0,0.3); border-top: 8px solid #e74c3c;">
                    <div style="font-size:3.5rem; margin-bottom:10px;">⚠️</div>
                    <h2 style="font-family:'Playfair Display',serif; color:#e74c3c; margin:0 0 10px 0;">Error de Lectura</h2>
                    <p style="color:#555; margin-bottom:20px;">El código QR escaneado contiene un invitado que no figura en la lista oficial del evento.</p>
                    <button id="btnCerrarValidador" style="background:#e74c3c; color:white; border:none; width:100%; padding:12px; border-radius:8px; font-weight:600; cursor:pointer;">
                        Cerrar Alerta
                    </button>
                </div>
            `;
        }

        modalValidacion.innerHTML = contenidoModal;
        document.body.appendChild(modalValidacion);

        // Acción para remover la alerta y limpiar la URL limpia sin recargar
        document.getElementById('btnCerrarValidador').addEventListener('click', () => {
            modalValidacion.remove();
            window.history.replaceState({}, document.title, window.location.pathname);
        });
    }

// ========================================================
// 🔥 CONFIGURACIÓN E IMPORTACIONES DE FIREBASE
// ========================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyASm2GfC5IzEOucWy1vm9roYIMO5SNJyYQ",
    authDomain: "bautizo-kiara.firebaseapp.com",
    projectId: "bautizo-kiara",
    storageBucket: "bautizo-kiara.firebasestorage.app",
    messagingSenderId: "538295578367",
    appId: "1:538295578367:web:913884817710beb1b026ca"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DEL DOM ---
    const rsvpForm = document.getElementById('rsvpForm');
    const nameInput = document.getElementById('guestName');
    const attendanceSelect = document.getElementById('attendance');
    const resultBox = document.getElementById('verificationResult');

    const btnToggleAdmin = document.getElementById('btnToggleAdmin');
    const btnCloseAdmin = document.getElementById('btnCloseAdmin');
    const btnCancelLogin = document.getElementById('btnCancelLogin');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const loginAdminForm = document.getElementById('loginAdminForm');
    
    const mainViewContainer = document.getElementById('mainViewContainer');
    const adminViewContainer = document.getElementById('adminViewContainer');
    const adminGuestTableBody = document.getElementById('adminGuestTableBody');

    // ==========================================
    // 🧠 ALGORITMO DE COMPARACIÓN INTELIGENTE
    // ==========================================
    const NICKNAMES = {
        "lucho": "luis", "pepe": "jose", "kory": "kori", "nico": "nicool", "mafer": "maria fernanda", "marjhori": "marsholl"
    };

    const normalizeText = (text) => {
        let clean = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, "").trim();
        let words = clean.split(/\s+/);
        return words.map(word => NICKNAMES[word] || word).filter(w => w !== "");
    };

    const calculateLevenshtein = (s1, s2) => {
        if (s1 === s2) return 1.0;
        const track = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
        for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
        for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

        for (let j = 1; j <= s2.length; j += 1) {
            for (let i = 1; i <= s1.length; i += 1) {
                const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(track[j][i - 1] + 1, track[j - 1][i] + 1, track[j - 1][i - 1] + indicator);
            }
        }
        return (Math.max(s1.length, s2.length) - track[s2.length][s1.length]) / Math.max(s1.length, s2.length);
    };

    const findGuestMatch = (inputName, firebaseGuestsList) => {
        const inputWords = normalizeText(inputName);
        if (inputWords.length === 0) return null;
        const inputFirstName = inputWords[0];
        let bestMatch = null; 
        let highestScore = 0;

        for (const guest of firebaseGuestsList) {
            const guestWords = normalizeText(guest.nombre);
            if (guestWords.length === 0) continue;
            
            if (calculateLevenshtein(inputFirstName, guestWords[0]) < 0.65) continue;

            const s1Str = inputWords.join(" "); 
            const s2Str = guestWords.join(" ");
            let score = calculateLevenshtein(s1Str, s2Str);
            if (s2Str.includes(s1Str) || s1Str.includes(s2Str)) score = Math.max(score, 0.85);

            if (score > highestScore) { 
                highestScore = score; 
                bestMatch = guest; 
            }
        }
        return highestScore >= 0.60 ? { guest: bestMatch, score: highestScore } : null;
    };

    // ==========================================
    // 📋 ENVIAR CONFIRMACIÓN A FIRESTORE
    // ==========================================
    if (rsvpForm && resultBox) {
        rsvpForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            let isFormValid = true;
            const rawName = nameInput.value.trim();
            const attendanceValue = attendanceSelect.value;

            nameInput.parentElement.classList.remove('invalid');
            attendanceSelect.parentElement.classList.remove('invalid');

            if (rawName === "") { nameInput.parentElement.classList.add('invalid'); isFormValid = false; }
            if (attendanceValue === "") { attendanceSelect.parentElement.classList.add('invalid'); isFormValid = false; }
            if (!isFormValid) return;

            const btnConfirm = rsvpForm.querySelector('.btn-confirm');
            if(btnConfirm) { btnConfirm.disabled = true; btnConfirm.innerText = 'Procesando...'; }

            resultBox.style.display = "none";
            resultBox.innerHTML = "";

            try {
                // 1. Descargar la lista de la colección "asistencias"
                const querySnapshot = await getDocs(collection(db, "asistencias"));
                const currentGuestsList = [];
                querySnapshot.forEach((doc) => {
                    currentGuestsList.push({ id: doc.id, ...doc.data() });
                });

                // 2. Buscar coincidencia con Levenshtein
                const matchData = findGuestMatch(rawName, currentGuestsList);

                if (matchData) {
                    const guest = matchData.guest;
                    const nuevoEstado = attendanceValue === "yes" ? "confirmado" : "no asistirá";

                    // 3. Modificar directamente en la nube usando el ID del documento encontrado
                    const guestRef = doc(db, "asistencias", guest.id);
                    await updateDoc(guestRef, { estado: nuevoEstado });

                    resultBox.className = "result-card success";
                    resultBox.style.display = "block";

                    if (attendanceValue === "no") {
                        resultBox.innerHTML = `
                            <div class="result-icon">😔</div>
                            <h3>Confirmación Recibida</h3>
                            <p>Lamentamos mucho que no puedas acompañarnos, <strong>${guest.nombre}</strong>. ¡Agradecemos tu respuesta!</p>
                        `;
                    } else {
                        resultBox.innerHTML = `
                            <div id="ticketCard" class="ticket-card" style="margin-top: 15px;">
                                <div class="ticket-header">
                                    <span class="ticket-badge">Pase Digital Oficial</span>
                                    <h2 class="ticket-main-title">Bautizo & Cumpleaños</h2>
                                </div>
                                <div class="ticket-body">
                                    <p class="ticket-label">Invitado Confirmado</p>
                                    <h3 class="ticket-guest-name" style="font-family:'Playfair Display',serif; font-size:1.4rem; color:#b89742; font-style:italic; margin-bottom:15px;">${guest.nombre}</h3>
                                    <div class="ticket-meta-grid">
                                        <div><span class="meta-label">Mesa Asignada</span><strong style="color:#b89742; font-size:1.15rem;">Mesa ${guest.mesa || '—'}</strong></div>
                                        <div><span class="meta-label">Total Pases</span><strong>${guest.pases || 1} Persona(s)</strong></div>
                                    </div>
                                    <div class="qr-wrapper" style="display:flex; justify-content:center; margin-top:20px;">
                                        <div id="ticketQrcode" style="padding:10px; background:#fff; border-radius:8px;"></div>
                                    </div>
                                </div>
                                <div class="ticket-footer">
                                    <p>📅 Sábado, 13 de Junio - 10:00 AM</p>
                                    <p>📍 Local de Eventos Castope - Tartar</p>
                                </div>
                            </div>
                            <button type="button" id="btnDownloadTicket" class="btn-download">💾 Descargar Pase</button>
                        `;

                        // Generar QR
                        setTimeout(() => {
                            const qrContainer = document.getElementById('ticketQrcode');
                            if (qrContainer) {
                                qrContainer.innerHTML = ""; 
                                const textoQR = `✨ INVITACIÓN KIARA ✨\nInvitado: ${guest.nombre}\nMesa: ${guest.mesa || 'Por asignar'}\nPases: ${guest.pases || 1}`;
                                try {
                                    new QRCode("ticketQrcode", { text: textoQR, width: 140, height: 140 });
                                } catch (e) {
                                    qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(textoQR)}" style="width:140px; height:140px;">`;
                                }
                            }
                        }, 250);
                    }
                } else {
                    resultBox.className = "result-card error";
                    resultBox.style.display = "block";
                    resultBox.innerHTML = `<div class="result-icon">❌</div><h3>No encontrado</h3><p>No encontramos ninguna coincidencia. Por favor, revisa cómo escribiste tu nombre.</p>`;
                }
            } catch (err) {
                console.error(err);
                alert("Error de conexión al guardar.");
            } finally {
                if(btnConfirm) { btnConfirm.disabled = false; btnConfirm.innerText = 'Enviar Confirmación'; }
                resultBox.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ==========================================
    // 🔒 PANEL ADMINISTRATIVO (CON CONTRASEÑA DE TU ARCHIVO)
    // ==========================================
    if (btnToggleAdmin) btnToggleAdmin.addEventListener('click', () => { adminLoginModal.style.display = "flex"; });
    if (btnCancelLogin) btnCancelLogin.addEventListener('click', () => { adminLoginModal.style.display = "none"; loginAdminForm.reset(); });

    if (loginAdminForm) {
        loginAdminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputEmail = document.getElementById('adminEmail').value.trim();
            const inputPassword = document.getElementById('adminPassword').value;

            // Usa la contraseña real de tu archivo original
            if (inputEmail === "admineventokiara@gmail.com" && inputPassword === "Bautizokiara152406") {
                adminLoginModal.style.display = "none";
                mainViewContainer.style.display = "none";
                adminViewContainer.style.display = "block";
                loginAdminForm.reset();
                activarEscuchaPanelAdmin(); // Cargar Dashboard en tiempo real
            } else {
                alert("❌ Credenciales incorrectas.");
            }
        });
    }

    if (btnCloseAdmin) {
        btnCloseAdmin.addEventListener('click', () => {
            adminViewContainer.style.display = "none";
            mainViewContainer.style.display = "block";
        });
    }

    // ==========================================
    // 📊 ESCUCHADOR EN VIVO PARA EL DASHBOARD
    // ==========================================
    function activarEscuchaPanelAdmin() {
        onSnapshot(collection(db, "asistencias"), (snapshot) => {
            let countYes = 0; let countNo = 0; let countPending = 0; let totalPasses = 0;
            adminGuestTableBody.innerHTML = ""; 

            snapshot.forEach((guestDoc) => {
                const guest = guestDoc.data();
                const pasesItem = parseInt(guest.pases) || 0;
                let statusCircle = ""; let statusText = "PENDIENTE";

                if (guest.estado === 'confirmado') {
                    statusCircle = `<span style="display:inline-block; width:14px; height:14px; background:#2ecc71; border-radius:50%; margin-right:10px;"></span>`;
                    statusText = "SÍ ASISTIRÁ";
                    countYes++; totalPasses += pasesItem;
                } else if (guest.estado === 'no asistirá') {
                    statusCircle = `<span style="display:inline-block; width:14px; height:14px; background:#e74c3c; border-radius:50%; margin-right:10px;"></span>`;
                    statusText = "NO ASISTIRÁ";
                    countNo++;
                } else {
                    statusCircle = `<span style="display:inline-block; width:14px; height:14px; background:#cbd5e1; border-radius:50%; margin-right:10px;"></span>`;
                    statusText = "PENDIENTE";
                    countPending++;
                }

                const tr = document.createElement('tr');
                tr.style.borderBottom = "1px solid #e2e8f0";
                tr.innerHTML = `
                    <td style="padding:12px; display:flex; align-items:center; font-size:0.8rem; font-weight:600; color:#555;">${statusCircle} ${statusText}</td>
                    <td style="padding:12px; font-weight:600;">${guest.nombre}</td>
                    <td style="padding:12px;">Mesa ${guest.mesa || '—'}</td>
                    <td style="padding:12px; font-weight:600; color:#b89742;">${pasesItem}</td>
                `;
                adminGuestTableBody.appendChild(tr);
            });

            document.getElementById('statYes').innerText = countYes;
            document.getElementById('statNo').innerText = countNo;
            document.getElementById('statPending').innerText = countPending;
            document.getElementById('statPasses').innerText = totalPasses;
        });
    }

    // Descarga de tickets interactiva
    document.body.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'btnDownloadTicket') {
            const guestName = document.querySelector('.ticket-guest-name').innerText;
            html2canvas(document.getElementById('ticketCard'), { scale: 2, useCORS: true }).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = `Pase_${guestName.replace(/\s+/g, '_')}.png`;
                link.click();
            });
        }
    });

    // Contador regresivo
    const eventDate = new Date(2026, 5, 13, 10, 0, 0).getTime();
    setInterval(() => {
        const diff = eventDate - new Date().getTime();
        if (diff > 0) {
            document.getElementById('days').innerText = String(Math.floor(diff / (1000*60*60*24))).padStart(2, '0');
            document.getElementById('hours').innerText = String(Math.floor((diff % (1000*60*60*24)) / (1000*60*60))).padStart(2, '0');
            document.getElementById('minutes').innerText = String(Math.floor((diff % (1000*60*60)) / (1000*60))).padStart(2, '0');
            document.getElementById('seconds').innerText = String(Math.floor((diff % (1000*60)) / 1000)).padStart(2, '0');
        }
    }, 1000);
});
// ========================================================
// 📋 GESTOR DE FORMULARIO DE CONFIRMACIÓN (ACTUALIZADO)
// ========================================================
const rsvpForm = document.getElementById('rsvpForm');
const nameInput = document.getElementById('guestName');
const attendanceSelect = document.getElementById('attendance');
const resultBox = document.getElementById('verificationResult');

if (rsvpForm && resultBox) {
    rsvpForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        // Validaciones iniciales de inputs...
        
        const btnConfirm = rsvpForm.querySelector('.btn-confirm');
        if(btnConfirm) { btnConfirm.disabled = true; btnConfirm.innerText = 'Procesando...'; }

        try {
            const matchData = await findGuestMatch(nameInput.value.trim());

            if (matchData) {
                const attendanceValue = attendanceSelect.value;
                
                // Actualizamos el estado directamente en Firebase usando su ID de documento
                const guestRef = doc(db, "invitados", matchData.id);
                await updateDoc(guestRef, { status: attendanceValue });

                if (attendanceValue === "no") {
                    // Renderizar tarjeta de "Lamentamos que no asistas"...
                } else {
                    // Renderizar tu "Pase Digital Oficial" con QR e html2canvas...
                }
            } else {
                // Renderizar tarjeta de "No encontrado"...
            }
        } catch (error) {
            console.error("Error al confirmar:", error);
        } finally {
            if(btnConfirm) { btnConfirm.disabled = false; btnConfirm.innerText = 'Enviar Confirmación'; }
        }
    });
}

// ========================================================
// 🔒 PANEL DE ADMINISTRADOR CON FIREBASE AUTHENTICATION
// ========================================================
const loginAdminForm = document.getElementById('loginAdminForm');

if (loginAdminForm) {
    loginAdminForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputEmail = document.getElementById('adminEmail').value.trim();
        const inputPassword = document.getElementById('adminPassword').value;

        try {
            // Validación real contra Firebase Auth
            await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
            
            document.getElementById('adminLoginModal').style.display = "none";
            document.getElementById('mainViewContainer').style.display = "none";
            document.getElementById('adminViewContainer').style.display = "block";
            loginAdminForm.reset();
            
            // Llamamos a renderizar los datos del panel
            renderAdminData();
        } catch (error) {
            alert("❌ Correo o contraseña incorrectos. Acceso denegado.");
        }
    });
}

// FUNCIÓN PARA RENDERIZAR EL PANEL TRAENDO LOS DATOS DE FIRESTORE
const renderAdminData = async () => {
    const adminGuestTableBody = document.getElementById('adminGuestTableBody');
    adminGuestTableBody.innerHTML = "";
    
    let countYes = 0; let countNo = 0; let countPending = 0; let totalPasses = 0;

    const querySnapshot = await getDocs(collection(db, "invitados"));
    
    querySnapshot.forEach((doc) => {
        const guest = doc.data();
        // Mapeas el estado, sumas contadores y creas los elementos 'tr' exactamente 
        // como lo hacías en tu código original, pero leyendo el objeto 'guest' de Firestore.
    });

    // Actualizas los textos de los elementos de estadísticas (statYes, statNo, etc.)
};
