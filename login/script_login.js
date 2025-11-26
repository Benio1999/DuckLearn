const API_URL = 'http://localhost:3004';

const formLogin = document.querySelector('#formLogin');

const voltar = document.querySelector('.btn-voltar')

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
        // ESSENCIAL: Garante que o elemento seja visível
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


    formLogin.addEventListener('submit', async function (event) {
        event.preventDefault();


        if (feedbackLogin) {
            feedbackLogin.style.display = 'none';
        }

        const emailInput = document.querySelector('#emailLogin').value.trim();
        const passwordInput = document.querySelector('#senhaLogin').value;

        // Adicionando validação simples de campos vazios
        if (!emailInput || !passwordInput) {
            exibirFeedback(feedbackLogin, 'Por favor, preencha todos os campos.', 'error');
            return;
        }

        // Se passar nas validações, remove o feedback anterior e prossegue
        // Já feito acima, mas mantendo a robustez

        try {

            const response = await fetch(`${API_URL}/api/login-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput, password: passwordInput })
            });

            const data = await response.json();

            if (response.ok) {
                // Sucesso: Armazena o token E o nome do usuário no localStorage
                exibirFeedback(feedbackLogin, data.mensagem + ' Acessando a página principal...', 'success');
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userName', data.name);
                // Armazenar o ID do usuário somente se existir (evita gravar "undefined")
                if (data && data._id) {
                    localStorage.setItem('userId', data._id);
                }

                //limpa o formulário após o sucesso
                formLogin.reset();

                // Redirecionamento quase imediato, pq ngm merece esperar pra prr pra isso
                setTimeout(() => {
                    window.location.href = '../../principal_page/principal.html';
                }, 500); // 0.5 segundo
            } else {
                // Falha no Login (ex: Credenciais inválidas)
                exibirFeedback(feedbackLogin, 'Falha no Login: ' + data.mensagem, 'error');
            }
        } catch (error) {
            // Erro de Conexão
            exibirFeedback(feedbackLogin, 'Erro de conexão.', 'error');
        }
    });

   if (voltar) {
    voltar.addEventListener('click', function() {
        window.location.href = '../index.html';
    });
}