// Dados de exemplo para o ranking
const rankingData = [
    { posicao: 1, nome: 'Lucas Martins', ano: '2º ano', pontos: 1245, nivel: 12, materia: 'matematica' },
    { posicao: 2, nome: 'Marina Silva', ano: '9º ano', pontos: 1102, nivel: 11, materia: 'portugues' },
    { posicao: 3, nome: 'Pedro Henriques', ano: '3º ano', pontos: 985, nivel: 10, materia: 'historia' },
    { posicao: 4, nome: 'João Santos', ano: '1º ano', pontos: 856, nivel: 9, materia: 'ciencias' },
    { posicao: 5, nome: 'Ana Costa', ano: '2º ano', pontos: 742, nivel: 8, materia: 'biologia' },
    { posicao: 6, nome: 'Rafael Oliveira', ano: '9º ano', pontos: 598, nivel: 7, materia: 'matematica' },
    { posicao: 7, nome: 'Carla Pereira', ano: '1º ano', pontos: 512, nivel: 6, materia: 'portugues' },
    { posicao: 8, nome: 'Felipe Gomes', ano: '3º ano', pontos: 421, nivel: 5, materia: 'historia' },
    { posicao: 9, nome: 'Sofia Mendes', ano: '2º ano', pontos: 387, nivel: 4, materia: 'ciencias' },
    { posicao: 10, nome: 'Bruno Alves', ano: '9º ano', pontos: 256, nivel: 3, materia: 'biologia' }
];

// Função para obter inicial do nome
function getInitial(nome) {
    return nome.charAt(0).toUpperCase();
}

// Função para renderizar o ranking
function renderRanking(data) {
    const rankingList = document.querySelector('.ranking-list');
    rankingList.innerHTML = '';

    data.forEach((user) => {
        const rankingItem = document.createElement('div');
        rankingItem.className = 'ranking-item';

        // Adiciona classe especial para top 3
        if (user.posicao === 1) rankingItem.classList.add('top-1');
        else if (user.posicao === 2) rankingItem.classList.add('top-2');
        else if (user.posicao === 3) rankingItem.classList.add('top-3');

        // Determina medalha ou posição
        let posicaoHTML = '';
        if (user.posicao === 1) {
            posicaoHTML = '<span class="medal gold">🥇</span>';
        } else if (user.posicao === 2) {
            posicaoHTML = '<span class="medal silver">🥈</span>';
        } else if (user.posicao === 3) {
            posicaoHTML = '<span class="medal bronze">🥉</span>';
        } else {
            posicaoHTML = `<span class="position">${user.posicao}º</span>`;
        }

        rankingItem.innerHTML = `
            <div class="rank-position">
                ${posicaoHTML}
            </div>
            <div class="user-info">
                <div class="user-avatar">${getInitial(user.nome)}</div>
                <div class="user-details">
                    <h3>${user.nome}</h3>
                    <p>${user.ano} - ${user.pontos} pontos</p>
                </div>
            </div>
            <div class="user-stats">
                <span class="points">${user.pontos} pts</span>
                <span class="level">Nível ${user.nivel}</span>
            </div>
        `;

        rankingList.appendChild(rankingItem);
    });
}

// Função para filtrar ranking
function filterRanking() {
    const materia = document.getElementById('filterMateria').value;
    const periodo = document.getElementById('filterPeriodo').value;

    let filtered = [...rankingData];

    // Filtrar por matéria
    if (materia !== 'todos') {
        filtered = filtered.filter(user => user.materia === materia);
    }

    // Filtrar por período (simulado - em produção viria do backend)
    if (periodo !== 'geral') {
        // Apenas simulação - poderia aplicar lógica de data aqui
        console.log(`Filtrando por período: ${periodo}`);
    }

    // Ordenar por pontos
    filtered.sort((a, b) => b.pontos - a.pontos);

    // Atualizar posições
    filtered.forEach((user, index) => {
        user.posicao = index + 1;
    });

    renderRanking(filtered);
}

// Event listeners
document.getElementById('filterMateria').addEventListener('change', filterRanking);
document.getElementById('filterPeriodo').addEventListener('change', filterRanking);

// Renderizar ranking inicial
document.addEventListener('DOMContentLoaded', () => {
    renderRanking(rankingData);
});
