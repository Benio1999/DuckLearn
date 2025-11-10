const API_URL = 'http://localhost:3004';


const inscrever_se = document.querySelector('.btn-modal');


// as coisas da pagina de inscrição
const formInscricao = document.querySelector('#formInscricao');

const feedbackInscricao = document.querySelector('#inscricao-feedback');

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




    formInscricao.addEventListener('submit', async function (event) {
        event.preventDefault();


        if (feedbackInscricao) {
            feedbackInscricao.style.display = 'none';
        }

        // USANDO IDS ROBUSTOS para capturar os campos de inputers

        const nomeUsuarioInput = document.querySelector('#nomeUsuario').value.trim();
        const emailInput = document.querySelector('#emailInscricao').value.trim();
        const passwordInput = document.querySelector('#senhaInscricao').value;
        const confirmEmail = document.querySelector('#confirmaEmailInscricao').value.trim();
        const confirmPassword = document.querySelector('#confirmaSenhaInscricao').value;

        console.log(nomeUsuarioInput)

        if (!nomeUsuarioInput || !emailInput || !passwordInput || !confirmEmail || !confirmPassword) {
            exibirFeedback(feedbackInscricao, 'Por favor, preencha todos os campos.', 'error');
            return; // isso empede o envio do formulário vazio
        }

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
        // Já feito no início, mas o retorno acima garante que só o feedback de erro apareça.

        try {
            // Requisição para o servidor (pede pro server pra ele posta as information :3 )
            const response = await fetch(`${API_URL}/api/register-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: nomeUsuarioInput, email: emailInput, password: passwordInput })
            });

            const data = await response.json();

            if (response.ok) {
                // Sucesso: Exibe a mensagem e mostra o modal faz funcionar grazadeus
                exibirFeedback(feedbackInscricao, data.mensagem + ' Redirecionando para o Login...', 'success');

                // Limpa o formulário APÓS mostrar o feedback de sucesso
                formInscricao.reset();

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
            exibirFeedback(feedbackInscricao, 'Erro de conexão.', 'error');
        }
    });
