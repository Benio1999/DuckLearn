const API_URL = 'http://localhost:3004';
const sidebar = document.getElementById('sidebar');
const btnCollapse = document.getElementById('btn-collapse');
const username = document.querySelector('.content'); // ou '.titulo'
const usuarioDiv = document.querySelector('.usuario'); // Novo: pegar a div do usuário

// Abre e fecha o menu lateral
if (btnCollapse) {
    btnCollapse.addEventListener('click', (e) => {
        e.preventDefault();
        sidebar.classList.toggle('collapsed');
    });
}

// Função para exibir o nome do usuário logado
function exibirNomeUsuario() {
    // Pegar o nome armazenado no localStorage após o login
    const userName = localStorage.getItem('userName');
    
    // Se existe a div com classe 'usuario', atualizar o texto
    if (usuarioDiv && userName) {
        usuarioDiv.textContent = `Bem vindo ${userName}`;
    } else if (usuarioDiv) {
        usuarioDiv.textContent = 'Bem vindo Usuário';
    }
    
    // Também atualizar o .content se existir
    if (username && userName) {
        const h4 = document.createElement('h4');
        h4.textContent = `Bem-vindo, ${userName}! O que iremos aprender hoje?`;
        username.appendChild(h4);
    }
}

// Chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', exibirNomeUsuario);
