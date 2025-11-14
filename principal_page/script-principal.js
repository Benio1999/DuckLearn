const API_URL = 'http://localhost:3004';
const sidebar = document.getElementById('sidebar');
const btnCollapse = document.getElementById('btn-collapse');
const nomeUsuarioElement = document.getElementById('nomeUsuario');

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
    
    // Se existe o elemento com id 'nomeUsuario', atualizar o texto
    if (nomeUsuarioElement) {
        if (userName) {
            nomeUsuarioElement.textContent = `Bem-vindo, ${userName}! O que iremos aprender hoje?`;
        } else {
            nomeUsuarioElement.textContent = 'Bem-vindo! Faça login para continuar.';
        }
    }
}

// Chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', exibirNomeUsuario);

// Atualizar nome de usuário quando houver mudanças no localStorage
window.addEventListener('storage', exibirNomeUsuario);
