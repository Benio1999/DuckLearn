const API_URL = 'http://localhost:3004';

// Elemento do botão de inscrição
const inscrever_se = document.querySelector('.btn-modal');

// Elementos da página de inscrição
const formInscricao = document.querySelector('#formInscricao');
const feedbackInscricao = document.querySelector('#inscricao-feedback');

const voltar = document.querySelector('.btn-voltar');

/**
 * Exibe uma mensagem de feedback na tela com cores de sucesso ou erro.
 * @param {HTMLElement} elemento - O elemento DIV onde a mensagem será exibida.
 * @param {string} mensagem - O texto da mensagem a ser exibida.
 * @param {string} tipo - Tipo de feedback: 'success' para sucesso ou 'error' para erro.
 */
function exibirFeedback(elemento, mensagem, tipo) {
    if (elemento) {
        elemento.textContent = mensagem;
        // Garante que o elemento seja visível
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

if (voltar) {
    voltar.addEventListener('click', function() {
        window.location.href = '../index.html';
    });
}



// ========== EVENT LISTENER DO FORMULÁRIO DE INSCRIÇÃO ==========

formInscricao.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Limpa o feedback anterior
    if (feedbackInscricao) {
        feedbackInscricao.style.display = 'none';
    }

    // ===== CAPTURA DOS CAMPOS DO FORMULÁRIO =====
    // Utilizando IDs robustos para capturar os campos de entrada

    const nomeUsuarioInput = document.querySelector('#nomeUsuario').value.trim();
    const emailInput = document.querySelector('#emailInscricao').value.trim();
    const passwordInput = document.querySelector('#senhaInscricao').value; // Sem trim() para preservar espaços
    const confirmEmail = document.querySelector('#confirmaEmailInscricao').value.trim();
    const confirmPassword = document.querySelector('#confirmaSenhaInscricao').value; // Sem trim() para preservar espaços

    console.log(nomeUsuarioInput); // Debug

    // ===== VALIDAÇÃO 1: CAMPOS VAZIOS =====
    if (!nomeUsuarioInput || !emailInput || !passwordInput || !confirmEmail || !confirmPassword) {
        exibirFeedback(feedbackInscricao, 'Por favor, preencha todos os campos.', 'error');
        return; // Impede o envio do formulário vazio
    }

    // ===== VALIDAÇÃO 2: EMAILS CONFEREM =====
    if (emailInput !== confirmEmail) {
        exibirFeedback(feedbackInscricao, 'Os emails digitados não conferem. Verifique!', 'error');
        return;
    }

    // ===== VALIDAÇÃO 3: SENHAS CONFEREM =====
    if (passwordInput !== confirmPassword) {
        exibirFeedback(feedbackInscricao, 'As senhas digitadas não conferem. Verifique!', 'error');
        return;
    }

    // ===== VALIDAÇÃO 4: SENHA MÍNIMA (8 CARACTERES) =====
    if (passwordInput.length < 8) {
        exibirFeedback(feedbackInscricao, 'A senha deve ter no mínimo 8 caracteres.', 'error');
        return;
    }

    // ===== REQUISIÇÃO PARA O SERVIDOR =====
    try {
        console.log('Enviando dados para registro...'); // Debug

        // Requisição POST para registrar o usuário no banco de dados
        const response = await fetch(`${API_URL}/api/register-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: nomeUsuarioInput, 
                email: emailInput, 
                password: passwordInput 
            })
        });

        const data = await response.json();
        console.log('Resposta do servidor:', data); // Debug

        // ===== VERIFICAÇÃO DE SUCESSO =====
        if (response.ok) {
            // Sucesso: Exibe mensagem e redireciona para o login
            exibirFeedback(feedbackInscricao, data.mensagem + ' Redirecionando para o Login...', 'success');

            // Armazenar dados no localStorage para uso posterior
            localStorage.setItem('userName', nomeUsuarioInput);
            localStorage.setItem('userEmail', emailInput);

            // Limpa o formulário após mostrar o feedback de sucesso
            formInscricao.reset();

            // Redirecionamento para a página de login após 2 segundos
            setTimeout(() => {
                window.location.href = '../../login/login.html';
            }, 2000);
        } else {
            // ===== ERRO DO SERVIDOR =====
            // Ex: Email já cadastrado, validações do servidor, etc.
            exibirFeedback(feedbackInscricao, 'Erro ao inscrever: ' + (data.mensagem || 'Tente novamente.'), 'error');
        }
    } catch (error) {
        // ===== ERRO DE CONEXÃO =====
        console.error('Erro na conexão:', error); // Debug
        exibirFeedback(feedbackInscricao, 'Erro de conexão com o servidor. Verifique sua internet.', 'error');
    }
});


