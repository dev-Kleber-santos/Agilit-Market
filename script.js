// --- Elementos Base ---
const hamburguer = document.getElementById('menu-hamburguer');
const navMenu = document.getElementById('nav-menu');
const contatoForm = document.getElementById('contato-form');
const feedback = document.getElementById('form-feedback');
const btnEnviar = document.getElementById('btn-enviar');

// --- Componentes do Site ---
function alterarModelo(tipo, elemento) {
    const imagem = document.getElementById('imagem-modelo');
    const titulo = document.getElementById('titulo-modelo');
    const descricao = document.getElementById('descricao-modelo');

    const modelos = {
        slim: {
            img: 'assets/slim.png', title: 'Modelo SLIM',
            desc: `<p>Ideal para condomínios com espaço reduzido. De 20 até 60 unidades. Com 1 gôndola e 1 geladeira expositora, oferece produtos essenciais em uma área de 2 a 3m².</p>
            <ul><li><strong>R$ 3.000</strong> - Totem / Sistema de Automação</li><li><strong>R$ 400</strong> - 1 Gôndola Amadeirada</li><li><strong>R$ 3.000 a R$ 6.000</strong> - 1 Geladeira Expositora</li></ul>
            <div class="valores-destaque"><p style="color: var(--primary-blue);"><strong>Investimento:</strong> R$ 11.900 a R$ 14.900</p></div>`
        },
        middle: {
            img: 'assets/middle.png', title: 'Modelo MIDDLE',
            desc: `<p>O modelo mais popular. De 60 até 120 unidades. Com 3 gôndolas e 2 expositores frios em uma área de 4 a 8m², oferece um mix completo de produtos.</p>
            <ul><li><strong>R$ 3.000</strong> - Totem / Sistema de Automação</li><li><strong>R$ 1.200</strong> - 3 Gôndolas Amadeiradas</li><li><strong>R$ 6.000 a R$ 12.000</strong> - 2 Geladeiras Expositoras</li></ul>
            <div class="valores-destaque"><p style="color: var(--primary-blue);"><strong>Investimento:</strong> R$ 18.200 a R$ 24.200</p></div>`
        },
        full: {
            img: 'assets/bannerefull.png', title: 'Modelo FULL',
            desc: `<p>A solução completa a partir de 120 unidades. Com 5 gôndolas e 3 expositores frios em mais de 15m², proporciona experiência similar a um mercado tradicional.</p>
            <ul><li><strong>R$ 3.000</strong> - Totem / Sistema de Automação</li><li><strong>R$ 2.400</strong> - 6 Gôndolas Amadeiradas</li><li><strong>R$ 9.000 a R$ 18.000</strong> - 3 Expositores Frios</li></ul>
            <div class="valores-destaque"><p style="color: var(--primary-blue);"><strong>Investimento:</strong> R$ 25.900 a R$ 34.900</p></div>`
        }
    };

    if (modelos[tipo]) {
        imagem.src = modelos[tipo].img;
        titulo.innerText = modelos[tipo].title;
        descricao.innerHTML = modelos[tipo].desc;
    }

    document.querySelectorAll('.modelo-card').forEach(card => card.classList.remove('ativo'));
    if (elemento) elemento.classList.add('ativo');
}

function alterarMapa(urlMapa, elemento) {
    document.getElementById('mapa-iframe').src = urlMapa;
    document.querySelectorAll('.unidade-item').forEach(item => item.classList.remove('unidade-ativa'));
    if (elemento) elemento.classList.add('unidade-ativa');
}

function toggleAccordion(id, elemento) {
    if (window.innerWidth <= 768) {
        document.getElementById(id).classList.toggle('aberto');
        elemento.classList.toggle('ativo');
    }
}

// --- Inicialização e Eventos ---
window.onload = () => {
    const cardFull = document.querySelector('.modelo-card.ativo');
    if (cardFull) alterarModelo('full', cardFull);
};

// Menu Mobile
if (hamburguer) {
    hamburguer.addEventListener('click', () => {
        hamburguer.classList.toggle('ativo');
        navMenu.classList.toggle('ativo');
    });
}

// Navegação Suave e Accordion via Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const idAlvo = this.getAttribute('href');
        if (idAlvo === '#') return;

        if (hamburguer) hamburguer.classList.remove('ativo');
        if (navMenu) navMenu.classList.remove('ativo');

        const elementoAlvo = document.querySelector(idAlvo);
        if (elementoAlvo) {
            elementoAlvo.scrollIntoView({ behavior: 'smooth', block: 'start' });

            if (window.innerWidth <= 768) {
                const idSecao = idAlvo.replace('#', '');
                const conteudo = document.getElementById('conteudo-' + idSecao);
                const titulo = document.querySelector(`#${idSecao} .titulo-mobile-accordion`);
                if (conteudo && titulo) {
                    conteudo.classList.add('aberto');
                    titulo.classList.add('ativo');
                }
            }
        }
    });
});

// --- Formulário AJAX ---
if (contatoForm) {
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        btnEnviar.innerText = "ENVIANDO...";
        btnEnviar.style.opacity = "0.7";
        btnEnviar.disabled = true;

        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                feedback.style.display = 'block';
                contatoForm.reset();
                setTimeout(() => {
                    window.location.href = "#inicio";
                    feedback.style.display = 'none';
                    btnEnviar.innerText = "ENVIAR AGORA";
                    btnEnviar.style.opacity = "1";
                    btnEnviar.disabled = false;
                }, 3000);
            } else {
                alert("Ops! Ocorreu um erro. Tente novamente.");
                btnEnviar.innerText = "ENVIAR AGORA";
                btnEnviar.disabled = false;
            }
        })
        .catch(() => {
            alert("Erro de conexão. Verifique sua internet.");
            btnEnviar.innerText = "ENVIAR AGORA";
            btnEnviar.disabled = false;
        });
    });
}