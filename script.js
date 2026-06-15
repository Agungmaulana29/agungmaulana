// --- DATABASE SOAL ---
const questions = [
    { q: "1. Apa tujuan utama dari Komputasi Pervasif?", options: ["Membuat komputer sebesar mungkin", "Mengintegrasikan komputasi ke lingkungan sekitar pengguna", "Hanya fokus pada keamanan jaringan"], answer: 1 },
    { q: "2. Sensor yang mendeteksi cahaya pada smartphone adalah?", options: ["Accelerometer", "Ambient Light Sensor", "Gyroscope"], answer: 1 },
    { q: "3. Web API apa yang digunakan untuk mendeteksi user pindah tab?", options: ["Idle Detection API", "Page Visibility API", "DOM Content Loaded API"], answer: 1 },
    { q: "4. Komputasi pervasif sering juga disebut sebagai?", options: ["Cloud Computing", "Ubiquitous Computing", "Quantum Computing"], answer: 1 },
    { q: "5. Apa yang menjadi fokus utama dalam desain Context-Aware Application?", options: ["Animasi UI yang rumit", "Merespons keadaan/konteks dari pengguna", "Menggunakan database SQL terbesar"], answer: 1 }
];

// --- VARIABEL STATE UJIAN ---
let examActive = false;
let timeLeft = 300; // 5 menit
let timerInterval;

// --- VARIABEL LOG & PERVASIF ---
let tabSwitchCount = 0;
let afkTotalSeconds = 0;
let isAFK = false;
let afkTimer; 
let afkCounterInterval;

// Ambil elemen audio
const alertSound = document.getElementById("alert-sound");
const afkSound = document.getElementById("afk-sound");

// 1. FUNGSI MEMULAI UJIAN
function startExam() {
    const name = document.getElementById("student-name").value;
    if (!name) return alert("Silakan masukkan Nama / NIM Anda!");

    document.getElementById("start-page").classList.add("hidden");
    document.getElementById("exam-page").classList.remove("hidden");
    
    renderQuestions();
    examActive = true;
    startTimer();
    resetIdleDetector(); 
}

// 2. RENDER SOAL KE HTML
function renderQuestions() {
    const container = document.getElementById("question-container");
    questions.forEach((item, index) => {
        let optionsHtml = '';
        item.options.forEach((opt, optIndex) => {
            optionsHtml += `
                <label>
                    <input type="radio" name="q${index}" value="${optIndex}"> ${opt}
                </label>
            `;
        });
        container.innerHTML += `
            <div class="question-block">
                <p>${item.q}</p>
                ${optionsHtml}
            </div>
        `;
    });
}

// 3. TIMER UJIAN UTAMA
function startTimer() {
    timerInterval = setInterval(() => {
        if (!isAFK && examActive) { 
            timeLeft--;
            let m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
            let s = (timeLeft % 60).toString().padStart(2, '0');
            document.getElementById("time-display").innerText = `${m}:${s}`;
            
            if (timeLeft <= 0) finishExam();
        }
    }, 1000);
}

// ==========================================
// FITUR PERVASIF 1: TAB VISIBILITY MONITOR
// ==========================================
document.addEventListener("visibilitychange", () => {
    if (examActive && document.hidden) {
        tabSwitchCount++;
        updateLiveTracker();
        
        // Mainkan suara peringatan
        alertSound.currentTime = 0;
        alertSound.play().catch(e => console.log("Audio play di-block browser"));
        
        alert("🚨 PERINGATAN SISTEM: Anda terdeteksi berpindah tab/aplikasi! Pelanggaran ini telah dicatat.");
    }
});

// ==========================================
// FITUR PERVASIF 2: USER INACTIVITY (IDLE)
// ==========================================
function resetIdleDetector() {
    if (!examActive) return;

    if (isAFK) {
        isAFK = false;
        clearInterval(afkCounterInterval); 
        document.getElementById("afk-banner").classList.add("hidden");
        afkSound.pause(); // Matikan suara jika user kembali
    }

    clearTimeout(afkTimer);
    
    // Set 15 detik = AFK
    afkTimer = setTimeout(() => {
        isAFK = true;
        document.getElementById("afk-banner").classList.remove("hidden");
        
        // Mainkan suara AFK looping
        afkSound.currentTime = 0;
        afkSound.loop = true;
        afkSound.play().catch(e => console.log("Audio play di-block browser"));
        
        afkCounterInterval = setInterval(() => {
            afkTotalSeconds++;
        }, 1000);
    }, 15000); 
}

// Deteksi Kehadiran (Presence)
window.addEventListener("mousemove", resetIdleDetector);
window.addEventListener("keypress", resetIdleDetector);
window.addEventListener("scroll", resetIdleDetector);
window.addEventListener("click", resetIdleDetector);

// Fungsi Update Indikator Pelanggaran Live
function updateLiveTracker() {
    document.getElementById("live-violations").innerText = tabSwitchCount;
}
// ==========================================

// 4. SELESAI UJIAN & HITUNG SKOR
function finishExam() {
    examActive = false;
    clearInterval(timerInterval);
    clearTimeout(afkTimer);
    clearInterval(afkCounterInterval);
    
    // Matikan semua audio
    afkSound.pause();
    alertSound.pause();

    let score = 0;
    questions.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === item.answer) {
            score += 20; 
        }
    });

    document.getElementById("exam-page").classList.add("hidden");
    document.getElementById("result-page").classList.remove("hidden");
    document.getElementById("final-score").innerText = `Skor Anda: ${score}`;

    const logContainer = document.getElementById("behavior-log");
    logContainer.innerHTML = `
        <li>👁️ Perpindahan Tab Keluar: <strong style="color:#ff4757;">${tabSwitchCount} Kali</strong></li>
        <li>🚶 Waktu Meninggalkan Laptop (AFK): <strong style="color:#ffb142;">${afkTotalSeconds} Detik</strong></li>
    `;

    if (tabSwitchCount >= 3) {
        logContainer.innerHTML += `<li style="color:#ff4757; font-weight:bold; margin-top:15px; text-align:center;">❌ STATUS: DISKUALIFIKASI KARENA TERLALU SERING PINDAH TAB ❌</li>`;
    } else if (score >= 80 && tabSwitchCount === 0 && afkTotalSeconds < 10) {
        logContainer.innerHTML += `<li style="color:#2ecc71; font-weight:bold; margin-top:15px; text-align:center;">✅ STATUS: LULUS BERSIH (INTEGRITAS TINGGI) ✅</li>`;
    }
}