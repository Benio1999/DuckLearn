const API_URL = 'http://localhost:3004';
const sidebar = document.getElementById('sidebar');
const btnCollapse = document.getElementById('btn-collapse');
const nomeUsuarioElement = document.getElementById('nomeUsuario');
const userNameSidebar = document.getElementById('userNameSidebar');
const userInitial = document.getElementById('userInitial');
const sidebarHeader = document.querySelector('.sidebar-header');

function isMobile() {
    return window.innerWidth <= 768;
}

function createOverlay() {
    if (!document.getElementById('sidebar-overlay')) {
        const ov = document.createElement('div');
        ov.id = 'sidebar-overlay';
        ov.className = 'sidebar-overlay';
        ov.addEventListener('click', () => {
            sidebar.classList.remove('active');
            removeOverlay();
        });
        document.body.appendChild(ov);
    }
}

function removeOverlay() {
    const ov = document.getElementById('sidebar-overlay');
    if (ov) ov.remove();
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

// Fechar overlay e sidebar ao redimensionar para desktop
window.addEventListener('resize', () => {
    if (!isMobile()) {
        sidebar.classList.remove('active');
        removeOverlay();
    }
});

function exibirPerfil() {
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    let userPhoto = null;
    if (userId && userId !== 'undefined' && userId !== 'null') {
        userPhoto = localStorage.getItem(`userPhoto_${userId}`) || null;
    } else {
        userPhoto = localStorage.getItem('userPhoto') || null; // fallback
    }

    // atualizar saudação no conteúdo principal
    if (nomeUsuarioElement) {
        nomeUsuarioElement.textContent = userName ? `Bem-vindo(a), ${userName}! O que iremos aprender hoje?` : 'Bem-vindo! Faça login para continuar.';
    }

    // atualizar sidebar
    if (userNameSidebar) userNameSidebar.textContent = userName || 'Usuário';
    if (userInitial) {
        if (userPhoto) {
            // usar a foto como background do quadrado
            userInitial.style.backgroundImage = `url(${userPhoto})`;
            userInitial.style.backgroundSize = 'cover';
            userInitial.style.backgroundPosition = 'center';
            userInitial.textContent = '';
        } else {
            // remover background se houver
            userInitial.style.backgroundImage = '';
            userInitial.textContent = userName ? userName.charAt(0).toUpperCase() : 'U';
        }
    }

    // adicionar clique no header da sidebar (apenas uma vez)
    if (sidebarHeader && !sidebarHeader.dataset.clickBound) {
        sidebarHeader.addEventListener('click', () => { window.location.href = '../config/config.html'; });
        sidebarHeader.dataset.clickBound = '1';
    }
}

// Chamar ao carregar e quando o localStorage mudar
document.addEventListener('DOMContentLoaded', exibirPerfil);
window.addEventListener('storage', exibirPerfil);
