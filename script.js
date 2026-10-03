// --- CONFIGURATION ---
const birthdayConfig = {
    name: "Love",
    nickname: "Bacchi",
    birthday: "29 Nov",
    creator: "Sharib",
    
    // Replace these paths with your actual photo paths in the assets folder
    photo1: "assets/WhatsApp Image 2026-10-02 at 9.28.25 PM.jpg", 
    photo2: "assets/WhatsApp Image 2026-10-02 at 9.28.26 PM.jpg",
    photo3: "assets/WhatsApp Image 2026-10-02 at 9.28.26 PM (1).jpg",
    
    // Love letter content (HTML allowed for line breaks)
    letter: `
        Dear Bacchi,<br><br>
        Happy Birthday to the most special girl in my life. ❤️<br><br>
        I don't think I say it enough, but I really appreciate how supportive you are.<br><br>
        You've been there for me, and that means more to me than I can explain.<br><br>
        I hope your birthday brings you the same happiness that you bring into my life.<br><br>
        I hope you keep smiling, keep being the amazing person you are, and keep chasing everything you want.<br><br>
        And whenever things get difficult, I hope you remember that I'll always be cheering for you too.<br><br>
        Happy Birthday, Bacchi. ❤️<br><br>
        I love you.
    `,
    
    wishes: [
        "You deserve happiness.",
        "You deserve peace.",
        "You deserve beautiful memories.",
        "You deserve people who always support you.",
        "And I hope you always have a reason to smile.",
        "Thank you for always supporting me, Bacchi. ❤️",
        "I hope I can always be there to support you too."
    ],
    
    reasons: [
        "Because you support me. 🤍",
        "Because you make difficult days feel easier.",
        "Because your presence itself makes me happy.",
        "Because you are my Bacchi. 🥹❤️",
        "Because I can be myself around you.",
        "And honestly...<br>I could keep writing forever."
    ]
};

// --- NO BUTTON LOGIC ---
const noMessages = [
    "Bacchi... are you sure? 🥺",
    "Really? 😭",
    "After everything I do for you? 🥲❤️",
    "Okay... now you're hurting my feelings 😭",
    "Please? 🥺",
    "Think again, Bacchi...",
    "I know that wasn't your real answer 😭❤️",
    "Just press YES already 😂",
    "Okay okay... I surrender 🥺❤️"
];

let noCount = 0;
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const noText = document.getElementById('no-text');

btnNo.addEventListener('click', () => {
    if (noCount < noMessages.length) {
        noText.innerText = noMessages[noCount];
        noText.classList.remove('hidden');
        
        // Make YES bigger, NO smaller
        const currentYesSize = parseFloat(window.getComputedStyle(btnYes).fontSize);
        const currentYesPad = parseFloat(window.getComputedStyle(btnYes).padding);
        
        btnYes.style.fontSize = `${currentYesSize + 4}px`;
        btnYes.style.padding = `${currentYesPad + 4}px ${currentYesPad * 2 + 8}px`;
        
        btnNo.style.transform = `scale(${1 - (noCount * 0.1)})`;
        
        noCount++;
        
        // Add tiny broken heart randomly
        createFloatingIcon('💔');
    }
});

// --- SCREEN NAVIGATION ---
let currentScreen = 1;
const totalScreens = 11;

function showScreen(screenNumber) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const nextScreen = document.getElementById(`s${screenNumber}-${getScreenName(screenNumber)}`);
    if(nextScreen) {
        nextScreen.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            nextScreen.classList.add('active');
            triggerScreenLogic(screenNumber);
        }, 50);
    }
}

function getScreenName(num) {
    const names = {
        1: 'opening', 2: 'celebration', 3: 'photo-reveal', 4: 'birthday-reveal',
        5: 'cake', 6: 'wishes', 7: 'scrapbook', 8: 'special', 9: 'letter', 
        10: 'message', 11: 'final'
    };
    return names[num];
}

// --- YES BUTTON LOGIC ---
btnYes.addEventListener('click', () => {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d6336c', '#ffb3c6', '#ffffff']
    });
    
    setTimeout(() => {
        showScreen(2);
        setTimeout(() => showScreen(3), 4000);
    }, 1000);
});

// --- SCREEN LOGIC HANDLERS ---
function triggerScreenLogic(num) {
    if (num === 3) {
        // Photo Reveal
        setTimeout(() => {
            document.querySelector('.cinematic-reveal').classList.add('active');
        }, 500);
        setTimeout(() => showScreen(4), 5000);
    }
    else if (num === 4) {
        setTimeout(() => showScreen(5), 5000);
    }
    else if (num === 5) {
        // Cake Logic
        setTimeout(() => startCountdown(), 4000);
    }
    else if (num === 6) {
        showListStaggered(birthdayConfig.wishes, 'wishes-list', 'wish-item', () => {
            setTimeout(() => showScreen(7), 3000);
        });
    }
    else if (num === 7) {
        // Scrapbook
        const polaroids = document.querySelectorAll('.polaroid');
        polaroids.forEach((p, index) => {
            setTimeout(() => {
                p.classList.add('focus');
                setTimeout(() => p.classList.remove('focus'), 1500);
            }, index * 2000 + 1000);
        });
        setTimeout(() => showScreen(8), 7000);
    }
    else if (num === 8) {
        showListStaggered(birthdayConfig.reasons, 'reasons-container', 'reason-item', () => {
            setTimeout(() => showScreen(9), 3000);
        });
    }
}

// --- CAKE COUNTDOWN ---
function startCountdown() {
    const countdownEl = document.getElementById('countdown');
    const prompt = document.getElementById('wish-prompt');
    let count = 3;
    
    prompt.classList.add('hidden');
    countdownEl.classList.remove('hidden');
    
    const interval = setInterval(() => {
        count--;
        if(count > 0) {
            countdownEl.innerText = count;
            // Retrigger animation
            countdownEl.style.animation = 'none';
            countdownEl.offsetHeight; /* trigger reflow */
            countdownEl.style.animation = null; 
        } else {
            clearInterval(interval);
            countdownEl.classList.add('hidden');
            blowCandles();
        }
    }, 1200);
}

function blowCandles() {
    document.getElementById('flame').classList.add('out');
    document.getElementById('smoke').classList.add('active');
    
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#d6336c', '#ffb3c6', '#ffffff']
    });
    
    document.getElementById('post-wish-text').classList.remove('hidden');
    
    setTimeout(() => {
        showScreen(6);
    }, 5000);
}

// --- UTILITIES ---
function showListStaggered(items, containerId, className, callback) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    items.forEach((text, index) => {
        const el = document.createElement('div');
        el.className = className;
        el.innerHTML = text;
        container.appendChild(el);
        
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 1500 + 1000);
    });
    
    if(callback) {
        setTimeout(callback, items.length * 1500 + 2000);
    }
}

function createFloatingIcon(icon) {
    const el = document.createElement('div');
    el.innerText = icon;
    el.style.position = 'absolute';
    el.style.left = Math.random() * 80 + 10 + '%';
    el.style.top = Math.random() * 80 + 10 + '%';
    el.style.fontSize = '24px';
    el.style.animation = 'floatUp 2s ease-out forwards';
    el.style.opacity = '0.7';
    document.body.appendChild(el);
    
    setTimeout(() => el.remove(), 2000);
}

// Add background floating hearts
function createBackgroundHearts() {
    const container = document.getElementById('particles-1');
    const container2 = document.getElementById('particles-final');
    
    for(let i=0; i<15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerText = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        container.appendChild(heart);
        
        const heart2 = heart.cloneNode(true);
        container2.appendChild(heart2);
    }
}

// --- ENVELOPE LOGIC ---
const envelope = document.getElementById('envelope');
envelope.addEventListener('click', () => {
    if(!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        createFloatingIcon('❤️');
        createFloatingIcon('✨');
        
        setTimeout(() => {
            showScreen(10);
        }, 8000); // Read time
    }
});

// --- MESSAGE LOGIC ---
const btnSend = document.getElementById('btn-send');
const textMsg = document.getElementById('user-message');
const sendResponse = document.getElementById('send-response');

btnSend.addEventListener('click', () => {
    const msg = textMsg.value.trim();
    if(msg !== '') {
        // Saves it locally on her phone just in case
        localStorage.setItem('bacchi_message', msg);
        
        // --- HOW YOU RECEIVE IT ---
        // To actually receive it on WhatsApp, put your phone number below!
        // Include your country code without the '+' (For example: "919876543210" for India)
        const myWhatsAppNumber = ""; 
        
        if (myWhatsAppNumber !== "") {
            const encodedMsg = encodeURIComponent(msg);
            // This opens her WhatsApp and types the message for her to send to you
            window.open(`https://wa.me/${myWhatsAppNumber}?text=${encodedMsg}`, '_blank');
        }
        
        textMsg.parentElement.classList.add('hidden');
        sendResponse.classList.remove('hidden');
        
        setTimeout(() => {
            showScreen(11);
        }, 3000);
    }
});

// --- MUSIC TOGGLE ---
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if(isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
    } else {
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// --- REPLAY ---
document.getElementById('btn-replay').addEventListener('click', () => {
    // Reset state
    noCount = 0;
    btnYes.style = '';
    btnNo.style = '';
    noText.classList.add('hidden');
    envelope.classList.remove('open');
    textMsg.parentElement.classList.remove('hidden');
    sendResponse.classList.add('hidden');
    textMsg.value = '';
    
    document.getElementById('flame').classList.remove('out');
    document.getElementById('smoke').classList.remove('active');
    document.getElementById('post-wish-text').classList.add('hidden');
    document.getElementById('wish-prompt').classList.remove('hidden');
    
    showScreen(1);
});

// --- SPARKLES LOGIC ---
function createSparkles() {
    const container = document.getElementById('sparkles');
    if (!container) return;
    
    for(let i = 0; i < 40; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.animationDelay = (Math.random() * 4) + 's';
        sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(sparkle);
    }
}

// --- INITIALIZE ---
function init() {
    // Populate config data
    document.getElementById('reveal-photo').src = birthdayConfig.photo1;
    document.getElementById('sb-photo1').src = birthdayConfig.photo1;
    document.getElementById('sb-photo2').src = birthdayConfig.photo2;
    document.getElementById('sb-photo3').src = birthdayConfig.photo3;
    document.getElementById('letter-text').innerHTML = birthdayConfig.letter;
    
    createBackgroundHearts();
    createSparkles();
}

window.onload = init;
