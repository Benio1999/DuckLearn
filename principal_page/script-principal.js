const API_URL = 'http://localhost:3004';
const sidebar = document.getElementById('sidebar');
const btnCollapse = document.getElementById('btn-collapse');
const nomeUsuarioElement = document.getElementById('nomeUsuario');
const userPhotoHeader = document.getElementById('userPhotoHeader');
const userNameSidebar = document.getElementById('userNameSidebar');
const userInitial = document.getElementById('userInitial');

// Função para verificar se é mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Abre e fecha o menu lateral
if (btnCollapse) {
    btnCollapse.addEventListener('click', (e) => {
        e.preventDefault();
        if (isMobile()) {
            sidebar.classList.toggle('active');
            if (sidebar.classList.contains('active')) createOverlay(); else removeOverlay();
        } else {
            sidebar.classList.toggle('collapsed');
        }
    });
}

// Fechar sidebar quando clicar fora dela em mobile
document.addEventListener('click', (e) => {
    if (isMobile() && sidebar.classList.contains('active')) {
        // Se clicou fora da sidebar e do botão, fecha
        if (!sidebar.contains(e.target) && !btnCollapse.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Função para exibir o nome do usuário logado
function exibirNomeUsuario() {
    // Pegar o nome e foto armazenados no localStorage após o login
    const userName = localStorage.getItem('userName');
    const userPhoto = localStorage.getItem('userPhoto');
    
    // Atualizar header principal com saudação e foto
    if (nomeUsuarioElement) {
        if (userName) {
            nomeUsuarioElement.textContent = `Bem-vindo, ${userName}! O que iremos aprender hoje?`;
        } else {
            nomeUsuarioElement.textContent = 'Bem-vindo! Faça login para continuar.';
        }
    }
    
    // Exibir foto no usuario-header se disponível
    if (userPhotoHeader) {
        if (userPhoto) {
            userPhotoHeader.src = userPhoto;
            userPhotoHeader.style.display = 'block';
        } else {
            userPhotoHeader.style.display = 'none';
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
    
    // Atualizar inicial do nome na sidebar com foto se disponível
    if (userInitial) {
        if (userPhoto) {
            // Se temos foto, usar como background-image
            userInitial.style.backgroundImage = `url('${userPhoto}')`;
            userInitial.style.backgroundSize = 'cover';
            userInitial.style.backgroundPosition = 'center';
            userInitial.textContent = ''; // limpar texto
        } else if (userName) {
            // Se temos nome mas sem foto, usar inicial
            const inicial = userName.charAt(0).toUpperCase();
            userInitial.textContent = inicial;
            userInitial.style.backgroundImage = 'none';
        }
    }
}

// Remover classes de mobile/desktop ao redimensionar
window.addEventListener('resize', () => {
    if (!isMobile()) {
        // Se redimensionou para desktop, remove a classe 'active'
        sidebar.classList.remove('active');
    }
});

// Chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', exibirNomeUsuario);

// Atualizar nome de usuário quando houver mudanças no localStorage
window.addEventListener('storage', exibirNomeUsuario);
