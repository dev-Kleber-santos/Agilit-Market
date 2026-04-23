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
            img: 'assets/slim.png',
            title: 'Modelo SLIM',
            desc: `<p>Ideal para espaços compactos, oferecendo o essencial com agilidade. Equipado com <strong>1 geladeira expositora</strong> e <strong>1 gôndola</strong>, focado em bebidas geladas (água, refrigerantes, energéticos e cervejas) e um mix variado de snacks, chocolates, biscoitos, além de itens básicos de mercearia, higiene e limpeza.</p>
        <ul>
            <li><strong>Bebidas:</strong> Água, refri, sucos, energéticos e cervejas.</li>
            <li><strong>Snacks:</strong> Chocolates, balas, chicletes e biscoitos.</li>
            <li><strong>Essenciais:</strong> Itens de mercearia, higiene e limpeza.</li>
        </ul>
        <div class="valores-destaque">
            <p style="color: var(--primary-blue);"><strong>Estrutura:</strong> 1 Geladeira + 1 Gôndola</p>
        </div>`
        },
        middle: {
            img: 'assets/middle.png',
            title: 'Modelo MIDDLE',
            desc: `<p>Nosso modelo intermediário, oferecendo maior variedade e volume de estoque. Com <strong>2 geladeiras expositoras</strong> e <strong>3 gôndolas</strong>, permite um mix mais robusto de bebidas e uma seção de mercearia e limpeza muito mais completa para o dia a dia dos moradores.</p>
        <ul>
            <li><strong>Bebidas:</strong> Dobro de capacidade para gelados.</li>
            <li><strong>Mercearia:</strong> Mix ampliado de produtos secos e mantimentos.</li>
            <li><strong>Limpeza:</strong> Seção dedicada a produtos de higiene e cuidados com a casa.</li>
        </ul>
        <div class="valores-destaque">
            <p style="color: var(--primary-blue);"><strong>Estrutura:</strong> 2 Geladeiras + 3 Gôndolas</p>
        </div>`
        },
        full: {
            img: 'assets/bannerefull.png',
            title: 'Modelo FULL',
            desc: `<p>A experiência completa de um mercado autônomo. Pode ser montado em container ou espaço físico, contando com <strong>2 geladeiras, 2 freezers</strong> e <strong>5 gôndolas</strong>. Além da enorme variedade de produtos, inclui mesas e cadeiras, criando um ambiente de lounge para conveniência e convivência.</p>
        <ul>
            <li><strong>Completo:</strong> Seção de congelados (freezers) e resfriados.</li>
            <li><strong>Lounge:</strong> Espaço com mesas e cadeiras para maior conforto.</li>
            <li><strong>Variedade:</strong> O maior mix de produtos da categoria.</li>
        </ul>
        <div class="valores-destaque">
            <p style="color: var(--primary-blue);"><strong>Estrutura:</strong> Container/Físico + 2 Geladeiras + 2 Freezers + 5 Gôndolas</p>
        </div>`
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
    contatoForm.addEventListener('submit', function (e) {
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

// --- Função Simples do FAQ ---
function toggleFaq(elemento) {
    const faqItem = elemento.parentElement;

    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) item.classList.remove('ativo');
    });

    faqItem.classList.toggle('ativo');
}

// --- Lógica de Revelar ao Rolar ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .card-compacto, .modelo-card, .faq-item').forEach(el => {
    el.classList.add('revelar');
    observer.observe(el);
});