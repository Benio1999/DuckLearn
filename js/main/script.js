const API_URL = 'http://localhost:3004/server.js'; // URL que é a base do server

// Usados na página principal (index.html) para funfar direito tem q pegar as class ne :p
const inscrever = document.querySelector('.btn-signup');
const login = document.querySelector('.btn-login');
const inscrever_se = document.querySelector('.btn-modal');

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



// -essa desgraça aqui serve pra cuidar da pagina pra q n aconteça aqueles erro chato

if (window.location.pathname.includes('/registro/inscrição.html') && formInscricao) {

    formInscricao.addEventListener('submit', async function(event) {
        event.preventDefault();

        // USANDO IDS ROBUSTOS para capturar os campos de inputers
        const emailInput = document.querySelector('#emailInscricao').value;
        const passwordInput = document.querySelector('#senhaInscricao').value;
        const confirmEmail = document.querySelector('#confirmaEmailInscricao').value;
        const confirmPassword = document.querySelector('#confirmaSenhaInscricao').value;

        // validação pra ver se deu certin
        if (emailInput !== confirmEmail) {
            exibirFeedback(feedbackInscricao, 'Os emails digitados não são iguais.', 'error');
            return;
        }
        if (passwordInput !== confirmPassword) {
            exibirFeedback(feedbackInscricao, 'As senhas digitadas não são iguais.', 'error');
            return;
        }
        // Limpa o feedback anterior
        feedbackInscricao.style.display = 'none';

        try {
            // Requisição para o servidor (pede pro server pra ele posta as information :3 )
            const response = await fetch(`${API_URL}/api/register-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput, password: passwordInput })
            });

            const data = await response.json();

            if (response.ok) {
                // Sucesso: Exibe a mensagem e mostra o modal faz funcionar grazadeus
                exibirFeedback(feedbackInscricao, data.mensagem + ' Redirecionando para o Login...', 'success');
                if (modal) {
                    modal.style.display = 'flex';
                }

                // Redirecionamento, manda da page de inscrição pro login dps d 2 segundin
                setTimeout(() => {
                    window.location.href = '../../login/login.html';
                }, 2000); 
            } else {
                // Erro do Servidor (ex: Email já existe)
                exibirFeedback(feedbackInscricao, 'Erro ao inscrever: ' + data.mensagem, 'error');
            }
        } catch (error) {
            // Erro de Conexão
            exibirFeedback(feedbackInscricao, 'Erro de conexão com o servidor. Verifique se o servidor está rodando.', 'error');
        }
    });
}


// login

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