

const API_URL = 'http://localhost:3004';
const sidebar = document.getElementById('sidebar');
const btnCollapse = document.getElementById('btn-collapse');
const username = document.querySelector('.content'); // Elemento de conteúdo principal
const usuarioDiv = document.querySelector('.usuario'); // Div do perfil do usuário


// MENU LATERAL RESPONSIVO 
/**
 * Abre e fecha o menu lateral (sidebar) para navegação em dispositivos móveis.
 */
if (btnCollapse) {
    btnCollapse.addEventListener('click', (e) => {
        e.preventDefault();
        sidebar.classList.toggle('collapsed');
    });
}

function exibirPerfil() {
    const userName = localStorage.getItem('userName');
    const userPhoto = localStorage.getItem('userPhoto');
    
    if (usuarioDiv) {
        if (userPhoto) {
            // Se tiver foto armazenada, exibir a foto de perfil
            usuarioDiv.innerHTML = `<img src="${userPhoto}" alt="${userName}" class="profile-photo-small" title="Clique para acessar configurações">`;
            usuarioDiv.style.cursor = 'pointer';
        } else if (userName) {
            // Se não tiver foto, exibir avatar com a inicial do nome
            const inicial = userName.charAt(0).toUpperCase();
            usuarioDiv.innerHTML = `<div class="profile-initial" title="Clique para acessar configurações">${inicial}</div>`;
            usuarioDiv.style.cursor = 'pointer';
        } else {
            // Se não houver dados, exibir um avatar padrão
            usuarioDiv.innerHTML = `<div class="profile-initial">?</div>`;
        }
        
        // Adicionar evento de clique para abrir as configurações
        usuarioDiv.addEventListener('click', function() {
            window.location.href = '../config/config.html';
        });
    }

    // Também exibir mensagem de boas-vindas no conteúdo
    if (username && userName) {
        const h4 = document.createElement('h4');
        h4.textContent = `Bem-vindo, ${userName}! O que iremos aprender hoje?`;
        username.appendChild(h4);
    }
}



document.addEventListener('DOMContentLoaded', exibirPerfil);
