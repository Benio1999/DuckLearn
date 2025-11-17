<<<<<<< Updated upstream


const API_URL = 'http://localhost:3004';

document.addEventListener('DOMContentLoaded', function() {

    const photoUpload = document.getElementById('photo-upload');
    const currentPhoto = document.getElementById('current-photo');

    // Perfil
    const profileForm = document.getElementById('profile-form');
    const feedbackProfile = document.getElementById('profile-feedback');

    const userNameInput = document.getElementById('username');
    const userEmailInput = document.getElementById('user-email'); // optional

    // Senha
    const passwordForm = document.getElementById('password-form');
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    const feedbackPassword = document.getElementById('password-feedback');

    const logoutButton = document.querySelector('.logout-button');

    //FEEDBACK
    function exibirFeedback(elemento, mensagem, tipo) {
        if (!elemento) return;
        elemento.textContent = mensagem;
        elemento.style.display = 'block';
        elemento.classList.remove('success', 'error');
        if (tipo === 'success') elemento.classList.add('success');
        if (tipo === 'error') elemento.classList.add('error');
        setTimeout(() => { elemento.style.display = 'none'; }, 5000);
    }

    // CARREGA DADOS LOCAIS DO USUÁRIO
    function carregarDadosUsuario() {
        const name = localStorage.getItem('userName');
        const photo = localStorage.getItem('userPhoto');
        const email = localStorage.getItem('userEmail');

        if (userNameInput && name) userNameInput.value = name;
        if (userEmailInput && email) {
            userEmailInput.value = email;
            userEmailInput.disabled = true;
        }

        if (currentPhoto) {
            if (photo) currentPhoto.src = photo;
            else currentPhoto.src = 'avatar.jpg';
        }
    }
    carregarDadosUsuario();

    // UPLOAD DE FOTO 
    if (photoUpload && currentPhoto) {
        photoUpload.addEventListener('change', function(event) {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    currentPhoto.src = e.target.result;
                    localStorage.setItem('userPhoto', e.target.result);
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        });
    }

    // FORMULÁRIO DE PERFIL 
    if (profileForm) {
        profileForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (feedbackProfile) feedbackProfile.style.display = 'none';

            const name = userNameInput ? userNameInput.value.trim() : '';
            const email = userEmailInput ? userEmailInput.value.trim() : '';

            if (!name) {
                exibirFeedback(feedbackProfile, 'O nome não pode estar vazio.', 'error');
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/update-profile`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: localStorage.getItem('userId'), name, email })
                });
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('userName', name);
                    if (email) localStorage.setItem('userEmail', email);
                    exibirFeedback(feedbackProfile, 'Perfil atualizado com sucesso!', 'success');
                } else {
                    exibirFeedback(feedbackProfile, data.mensagem || 'Erro ao atualizar perfil.', 'error');
                }
            } catch (err) {
                console.error(err);
                exibirFeedback(feedbackProfile, 'Erro de conexão com o servidor.', 'error');
            }
        });
    }

    // FORMULÁRIO DE SENHA
    if (passwordForm) {
        passwordForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (feedbackPassword) feedbackPassword.style.display = 'none';

            const senhaNova = newPassword ? newPassword.value : '';
            const senhaConfirmacao = confirmPassword ? confirmPassword.value : '';

            if (senhaNova.length < 8) {
                exibirFeedback(feedbackPassword, 'A senha deve ter no mínimo 8 caracteres.', 'error');
                return;
            }
            if (senhaNova !== senhaConfirmacao) {
                exibirFeedback(feedbackPassword, 'As senhas não conferem.', 'error');
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/update-password`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: localStorage.getItem('userId'), newPassword: senhaNova })
                });
                const data = await response.json();
                if (response.ok) {
                    exibirFeedback(feedbackPassword, 'Senha atualizada com sucesso!', 'success');
                    passwordForm.reset();
                } else {
                    exibirFeedback(feedbackPassword, data.mensagem || 'Erro ao atualizar senha.', 'error');
                }
            } catch (err) {
                console.error(err);
                exibirFeedback(feedbackPassword, 'Erro de conexão com o servidor.', 'error');
            }
        });
    }

    // LOGOUT
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            if (confirm('Tem certeza de que deseja sair da sua conta?')) {
                localStorage.removeItem('userName');
                localStorage.removeItem('userPhoto');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userId');
                window.location.href = '../login/login.html';
            }
        });
    }
=======
document.addEventListener('DOMContentLoaded', function() {
    // 1. Variáveis de Elementos
    const photoUpload = document.getElementById('photo-upload');
    const currentPhoto = document.getElementById('current-photo');
    
    // Elementos de Perfil e Feedback
    const profileForm = document.getElementById('profile-form');
    const feedbackProfile = document.getElementById('profile-feedback'); 
    
    // Elementos de Senha e Feedback
    const passwordForm = document.getElementById('password-form');
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    const feedbackPassword = document.getElementById('password-feedback'); 

    const logoutButton = document.querySelector('.logout-button');

    // --- FUNÇÃO DE FEEDBACK CENTRALIZADA ---
    /**
     * Exibe uma mensagem de feedback na tela.
     * @param {HTMLElement} elemento O elemento DIV onde a mensagem será exibida.
     * @param {string} mensagem O texto da mensagem.
     * @param {string} tipo 'success' ou 'error'.
     */
    function exibirFeedback(elemento, mensagem, tipo) {
        if (elemento) {
            // Limpa e esconde antes de reexibir
            elemento.style.display = 'none';
            elemento.textContent = ''; 

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
            
            // Esconde a mensagem após 5 segundos para não poluir a tela
            setTimeout(() => {
                elemento.style.display = 'none';
            }, 5000);
        }
    }
    // ------------------------------------


    // --- 1. Pré-visualização da Foto de Perfil ---
    photoUpload.addEventListener('change', function(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                currentPhoto.src = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    });


    // --- 2. Validação e Submissão do Formulário de Senha ---
    passwordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        feedbackPassword.style.display = 'none'; // Limpa o feedback anterior

        const senhaNova = newPassword.value;
        const senhaConfirmacao = confirmPassword.value;

        if (senhaNova !== senhaConfirmacao) {
            exibirFeedback(feedbackPassword, 'Erro: A Nova Senha e a Confirmação não são idênticas!', 'error');
            newPassword.style.borderColor = 'red';
            confirmPassword.style.borderColor = 'red';
            return;
        }
        
        // Simulação de Sucesso
        newPassword.style.borderColor = ''; 
        confirmPassword.style.borderColor = '';

        // *** AQUI ENTRARIA A CHAMADA 'fetch' REAL PARA O BACKEND ***
        console.log('Tentativa de alteração de senha...');
        
        exibirFeedback(feedbackPassword, 'Senha alterada com sucesso!', 'success');
        passwordForm.reset(); 
    });

    // --- 3. Submissão do Formulário de Perfil ---
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        feedbackProfile.style.display = 'none'; // Limpa o feedback anterior

        const username = document.getElementById('username').value;
        // const photoFile = document.getElementById('photo-upload').files[0];

        if (!username.trim()) {
            exibirFeedback(feedbackProfile, 'O Nome de Usuário não pode estar vazio.', 'error');
            return;
        }

        // *** AQUI ENTRARIA A CHAMADA 'fetch' REAL PARA O BACKEND ***
        console.log('Tentativa de salvar perfil...');
        
        exibirFeedback(feedbackProfile, 'Dados de Perfil salvos com sucesso!', 'success');
    });


    // --- 4. Funcionalidade de Logout ---
    logoutButton.addEventListener('click', function() {
        if (confirm('Tem certeza de que deseja sair da sua conta?')) {
            // *** AQUI ENTRARIA A CHAMADA 'fetch' PARA LIMPAR A SESSÃO ***
            console.log('Realizando Logout...');
            
            // Redireciona o usuário para a página de login/inicial
            window.location.href = 'login.html'; 
        }
    });
>>>>>>> Stashed changes

});