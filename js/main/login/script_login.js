const API_URL = 'http://localhost:3004';

const formLogin = document.querySelector('#formLogin');

// Elementos de feedback nas páginas de formersssss

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

if (window.location.pathname.includes('/login/login.html') && formLogin) {

    formLogin.addEventListener('submit', async function(event) {
        event.preventDefault();

    
        const emailInput = document.querySelector('#emailLogin').value;
        const passwordInput = document.querySelector('#senhaLogin').value;
        const confirmPassword = document.querySelector('#confirmaSenhaLogin').value;

        
        if (passwordInput !== confirmPassword) {
            exibirFeedback(feedbackLogin, 'A senha e a confirmação de senha não são iguais.', 'error');
            return;
        }
        
        feedbackLogin.style.display = 'none';

        try {

            const response = await fetch(`${API_URL}/api/login-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput, password: passwordInput })
            });

            const data = await response.json();

            if (response.ok) {
                // Sucesso: Armazena o token e redireciona imediatamente pra pagina principal
                exibirFeedback(feedbackLogin, data.mensagem + ' Acessando a página principal...', 'success');
                localStorage.setItem('userToken', data.token);
                
                // Redirecionamento quase imediato, pq ngm mmerece esperar pra prr pra isso
                setTimeout(() => {
                    window.location.href = '../../principal_page/principal.html'; 
                }, 500); // 0.5 segundo
            } else {
                // Falha no Login (ex: Credenciais inválidas)
                exibirFeedback(feedbackLogin, 'Falha no Login: ' + data.mensagem, 'error');
            }
        } catch (error) {
            // Erro de Conexão
            exibirFeedback(feedbackLogin, 'Erro de conexão com o servidor. Verifique se o servidor está rodando.', 'error');
        }
    });
}

