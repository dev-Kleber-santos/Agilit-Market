// --------------------------------------------------
// 1. FUNÇÃO DOS MODELOS DE MERCADO
// --------------------------------------------------
function alterarModelo(tipo, elemento) {
    const imagem = document.getElementById('imagem-modelo');
    const titulo = document.getElementById('titulo-modelo');
    const descricao = document.getElementById('descricao-modelo');

    if (tipo === 'slim') {
        imagem.src = 'assets/slim.png';
        titulo.innerText = 'Modelo SLIM';
        descricao.innerHTML = `
        <p>Ideal para condomínios com espaço reduzido. De 20 até 60 unidades com design compacto e vertical que otimiza cada centímetro. Com 1 gôndola e 1 geladeira expositora, oferece produtos essenciais em uma área de 2 a 3m². Perfeito para prédios menores ou áreas comuns limitadas.</p>
        <ul>
            <li><strong>R$ 3.000</strong> - Totem / Sistema de Automação</li>
            <li><strong>R$ 400</strong> - 1 Gôndola Amadeirada Preta</li>
            <li><strong>R$ 1.000</strong> - Câmeras</li>
            <li><strong>R$ 1.000</strong> - Diversos</li>
            <li><strong>R$ 500</strong> - Parte Gráfica</li>
            <li><strong>R$ 3.000</strong> - Primeira Compra de Mercadorias</li>
            <li><strong>R$ 3.000 a R$ 6.000</strong> - 1 Geladeira Expositora (Seminova ou Nova)</li>
        </ul>
        <div class="valores-destaque">
            <p style="color: var(--primary-blue);"><strong>Investimento:</strong> R$ 11.900 a R$ 14.900</p>
            <p style="color: var(--primary-blue);"><strong>Média de Faturamento:</strong> R$ 3.000 a R$ 10.000/mês</p>
        </div>
    `;
    } else if (tipo === 'middle') {
        imagem.src = 'assets/middle.png';
        titulo.innerText = 'Modelo MIDDLE';
        descricao.innerHTML = `
        <p>O modelo mais popular. De 60 até 120 unidades, equilibrando variedade e espaço. Com 3 gôndolas, 1 geladeira expositora e 1 freezer expositor em uma área de 4 a 8m², oferece um mix completo de produtos, incluindo refrigerados, bebidas e itens de conveniência. Ideal para condomínios de médio porte.</p>
        <ul>
            <li><strong>R$ 3.000</strong> - Totem / Sistema de Automação</li>
            <li><strong>R$ 1.200</strong> - 3 Gôndolas Amadeiradas Pretas</li>
            <li><strong>R$ 1.500</strong> - Câmeras</li>
            <li><strong>R$ 1.000</strong> - Diversos</li>
            <li><strong>R$ 500</strong> - Parte Gráfica</li>
            <li><strong>R$ 5.000</strong> - Primeira Compra de Mercadorias</li>
            <li><strong>R$ 6.000 a R$ 12.000</strong> - 2 Geladeiras Expositoras (Seminovas ou Novas)</li>
        </ul>
        <div class="valores-destaque">
            <p style="color: var(--primary-blue);"><strong>Investimento:</strong> R$ 18.200 a R$ 24.200</p>
            <p style="color: var(--primary-blue);"><strong>Média de Faturamento:</strong> R$ 10.000 a R$ 20.000/mês</p>
        </div>
    `;
    } else if (tipo === 'full') {
        imagem.src = 'assets/bannerefull.png';
        titulo.innerText = 'Modelo FULL';
        descricao.innerHTML = `
        <p>A solução completa para grandes condomínios. Pode ser container ou físico, a partir de 120 unidades. Com 5 gôndolas, 2 geladeiras expositoras, 2 freezers e 1 móvel totem em mais de 15m², oferece ampla variedade de produtos e seções especializadas. Proporciona experiência similar a um mercado tradicional.</p>
        <ul>
            <li><strong>R$ 3.000</strong> - Totem / Sistema de Automação</li>
            <li><strong>R$ 2.400</strong> - 6 Gôndolas Amadeiradas Pretas (inclui móvel do totem)</li>
            <li><strong>R$ 2.000</strong> - Câmeras</li>
            <li><strong>R$ 1.000</strong> - Diversos</li>
            <li><strong>R$ 500</strong> - Parte Gráfica</li>
            <li><strong>R$ 8.000</strong> - Primeira Compra de Mercadorias</li>
            <li><strong>R$ 9.000 a R$ 18.000</strong> - 3 Expositores Frios (2 Geladeiras + 1 Freezer) (Seminovos ou Novos)</li>
        </ul>
        <div class="valores-destaque">
            <p style="color: var(--primary-blue);"><strong>Investimento:</strong> R$ 25.900 a R$ 34.900</p>
            <p style="color: var(--primary-blue);"><strong>Média de Faturamento:</strong> A partir de R$ 20.000/mês</p>
        </div>
    `;
    }

    const cards = document.querySelectorAll('.modelo-card');
    cards.forEach(card => card.classList.remove('ativo'));
    if (elemento) {
        elemento.classList.add('ativo');
    }
}

// --------------------------------------------------
// 2. FUNÇÃO DO MAPA DE UNIDADES
// --------------------------------------------------
function alterarMapa(urlMapa, elemento) {
    document.getElementById('mapa-iframe').src = urlMapa;

    const itens = document.querySelectorAll('.unidade-item');
    itens.forEach(item => item.classList.remove('unidade-ativa'));

    if (elemento) {
        elemento.classList.add('unidade-ativa');
    }
}

// --------------------------------------------------
// 3. INICIALIZAÇÃO AO CARREGAR A PÁGINA
// --------------------------------------------------
window.onload = function () {
    const cardFull = document.querySelector('.modelo-card.ativo');
    if (cardFull) alterarModelo('full', cardFull);
};