/* ==========================================
   MENU MOBILE / HAMBURGER
   ========================================== */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

/* ==========================================
   EFEITO DE DIGITAÇÃO (TYPING EFFECT)
   ========================================== */
const textArray = ["Transformando ideias em soluções digitais"];
const typingDelay = 100;
const erasingDelay = 60;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

const typedTextSpan = document.querySelector(".typing-text");
const cursorSpan = document.querySelector(".cursor");

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    // Se quiser que apague e escreva novamente.
    // Para um portfólio fica elegante apenas escrever uma vez ou algumas frases.
    // Vamos fazer apagar e escrever a mesma frase em loop, ou podemos focar.
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        // Passa pra próxima frase se houver mais
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() { // Ao carregar
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});


/* ==========================================
   SCROLL REVEAL (Animações de entrada)
   ========================================== */
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100; // Distância antes de revelar

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Dispara logo no começo também

/* ==========================================
   ANIMAÇÃO DAS BARRAS DE PROGRESSO
   ========================================== */
const skillsSection = document.getElementById("habilidades");
const progressBars = document.querySelectorAll(".progress-bar");
let animated = false;

window.addEventListener("scroll", () => {
    // Se ainda não animou e chegamos na seção de habilidades
    if(!animated) {
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if (sectionPos < screenPos) {
            progressBars.forEach(bar => {
                const targetWidth = bar.getAttribute("data-progress");
                bar.style.width = targetWidth;
            });
            animated = true;
        }
    }
});

/* ==========================================
   LINKS ATIVOS NO MENU DURANTE O SCROLL
   ========================================== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active-link');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active-link');
            });
        }
    });

    // Mudar background do header ao fazer scroll
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

/* ==========================================
   FORMULÁRIO DE CONTATO (WHATSAPP)
   ========================================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const msg = document.getElementById('message').value;
        
        const telefone = "5531996306262";
        const texto = "Olá João Victor! Meu nome é " + nome + " (" + email + "). " + msg;
        const textoCodificado = encodeURIComponent(texto);
        
        const url = "https://wa.me/" + telefone + "?text=" + textoCodificado;
        
        window.open(url, '_blank');
        
        alert('Mensagem enviada com sucesso! Muito obrigado pelo contato, logo darei um retorno.');
        this.reset();
    });
}
