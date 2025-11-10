const API_URL = 'http://localhost:3004'; // URL que é a base do server

// Usados na página principal (index.html) para funfar direito tem q pegar as class ne :p
const inscrever = document.querySelector('.btn-signup');
const login = document.querySelector('.btn-login');
const modal = document.querySelector('.modal'); // Modal de Sucesso (após inscrição)

// as coisas da pagina de inscrição
const formInscricao = document.querySelector('#formInscricao');
const formLogin = document.querySelector('#formLogin');

// Elementos de feedback nas páginas de formersssss
const feedbackInscricao = document.querySelector('#inscricao-feedback');
const feedbackLogin = document.querySelector('#login-feedback');



/**
 * Exibe uma mensagem de feedback na tela (dentro do formulário).
 * @param {HTMLElement} elemento O elemento DIV onde a mensagem será exibida.
 * @param {string} mensagem O texto da mensagem.
 * @param {string} tipo 'success' ou 'error' (para mudar a cor via estilo inline).
 */

//essa coisa ati faz com que apareça um feedbackzin
function exibirFeedback(elemento, mensagem, tipo) {
    if (elemento) {
        elemento.textContent = mensagem;
        elemento.style.display = 'block';
        if (tipo === 'success') {
            elemento.style.backgroundColor = '#d4edda'; // Verde claro
            elemento.style.color = '#155724'; // Verde escuro
            elemento.style.border = '1px solid #c3e6cb';
        } else if (tipo === 'error') {
            elemento.style.backgroundColor = '#f8d7da'; // Vermelho claro
            elemento.style.color = '#721c24'; // Vermelho escuro
            elemento.style.border = '1px solid #f5c6cb';
        }
    }
}

//inscrição

//Isso ati serve pra poder passar d uma page pra outra quando clica no botão

if (inscrever) {
    inscrever.addEventListener('click', function() {
        window.location.href = '../registro/inscrição.html';
    });
}

if (login) {
    login.addEventListener('click', function() {
        window.location.href = '../login/login.html';
    });
}



