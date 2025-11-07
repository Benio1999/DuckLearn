const API_URL = 'http://localhost:3004/server.js';

const inscrever = document.querySelector('.btn-signup');
const login = document.querySelector('.btn-login');
const formInscricao = document.querySelector('.form-container');
const formLogin = document.querySelector('.form-container2');

const inscrever_se = document.querySelector('.btn-modal');
const modal = document.querySelector('.modal');



inscrever.addEventListener('click', function() {
        window.location.href = '../registro/inscrição.html'; 
    });

    login.addEventListener('click', function() {
        window.location.href = '../login/login.html';
    });

inscrever_se.addEventListener(('click'), () =>{
    modal.style.display = 'flex';
    
});




//inscrição


//essa coisa linda (escrota) aqui faz o controle da pagina
if (window.location.pathname.includes('/registro/inscrição.html') && formInscricao) {
    
    
    formInscricao.addEventListener('submit', async function(event) {
        
        event.preventDefault(); //esse aqui não deixa enviar o formulário padrão :0

        // Capturando os pokémon (dados) do formulário
        const emailInput = formInscricao.querySelector('.email').value;
        const passwordInput = formInscricao.querySelector('.senha').value;
        
        try {
            // faz a comunication com o serverzin
            const response = await fetch(`${API_URL}/api/register-user`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput, password: passwordInput })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.mensagem); 
                formInscricao.style.display = 'none';
                if (modal) {
                    modal.style.display = 'flex'; // Exibe o modal
                }
//essa função aqui redireciona o site de inscrição para o login apos 3 segundinhos :)
                setTimeout(() => {
                    window.location.href = '../../login/login.html'; 
                }, 3000); 

            } else {
            
                alert('Erro ao inscrever: ' + data.mensagem);
            }
        } catch (error) {
            alert('Erro de conexão com o servidor. Verifique se o servidor está rodando na porta 3004.');
        }
    });
}




//login

if (window.location.pathname.includes('/login/login.html') && formLogin) {
    
    formLogin.addEventListener('submit', async function(event) {
        event.preventDefault(); 

        const emailInput = formLogin.querySelector('input[type="email"]').value;
        const passwordInput = formLogin.querySelector('input[type="password"]:nth-of-type(1)').value;

        try {
            const response = await fetch(`${API_URL}/api/login-user`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput, password: passwordInput })
            });

            const data = await response.json();

            if (response.ok) {

                alert(data.mensagem); 
                localStorage.setItem('userToken', data.token);
                window.location.href = '../../principal_page/principal.html'; 

            } else {
                alert('Falha no Login: ' + data.mensagem);
            }
        } catch (error) {
            alert('Erro de conexão com o servidor. Verifique se o servidor está rodando na porta 3004.');
        }
    });
}