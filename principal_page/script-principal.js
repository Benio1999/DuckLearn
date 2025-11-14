const API_URL = 'http://localhost:3004';
const sidebar = document.getElementById('sidebar');
const btnCollapse = document.getElementById('btn-collapse');
const nomeUsuarioElement = document.getElementById('nomeUsuario');
const userNameSidebar = document.getElementById('userNameSidebar');
const userInitial = document.getElementById('userInitial');

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
    
    // Atualizar header principal com saudação
    if (nomeUsuarioElement) {
        if (userName) {
            nomeUsuarioElement.textContent = `Bem-vindo, ${userName}! O que iremos aprender hoje?`;
        } else {
            nomeUsuarioElement.textContent = 'Bem-vindo! Faça login para continuar.';
        }
    }
    
    // Atualizar nome na sidebar
    if (userNameSidebar) {
        if (userName) {
            userNameSidebar.textContent = userName;
        } else {
            userNameSidebar.textContent = 'Usuário';
        }
    }
    
    // Atualizar inicial do nome na sidebar
    if (userInitial && userName) {
        const inicial = userName.charAt(0).toUpperCase();
        userInitial.textContent = inicial;
    }
}

// Chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', exibirNomeUsuario);

// Atualizar nome de usuário quando houver mudanças no localStorage
window.addEventListener('storage', exibirNomeUsuario);
