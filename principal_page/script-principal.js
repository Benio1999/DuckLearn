const API_URL = 'http://localhost:3004';
const sidebar = document.getElementById('sidebar');
const btnCollapse = document.getElementById('btn-collapse');
const username = document.querySelector('content'); // ou '.titulo'

// Abre e fecha o menu lateral

// Função para buscar o usuário
async function carregarUsuario() {
    try {
        const resposta = await fetch(`${API_URL}/user/1`); // muda o ID conforme o usuário logado
        const user = await resposta.json();

        const h4 = document.createElement('h4');
        h4.textContent = `Bem-vindo mais uma vez, ${user.name} O que iremos aprender hoje?`;
        username.appendChild(h4);

    } catch (erro) {
        console.error('Erro ao carregar usuário:', erro);
    }
}

carregarUsuario();

btnCollapse.addEventListener('click', e => {
    e.preventDefault();
    sidebar.classList.toggle('collapsed');
});
