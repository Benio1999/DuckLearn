

const API_URL = 'http://localhost:3004';

document.addEventListener('DOMContentLoaded', function() {

    const photoUpload = document.getElementById('photo-upload');
    const currentPhoto = document.getElementById('current-photo');

    // Perfil
    const profileForm = document.getElementById('profile-form');
    const feedbackProfile = document.getElementById('profile-feedback');

    const userNameInput = document.getElementById('username');
    const userEmailInput = document.getElementById('useremail');

    // Senha
    const passwordForm = document.getElementById('password-form');
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    const feedbackPassword = document.getElementById('password-feedback');

    
    const logoutButton = document.querySelector('.logout-button');
    const returnButton = document.querySelector('.return-button');

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
        photoUpload.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    currentPhoto.src = e.target.result;
                    localStorage.setItem('userPhoto', e.target.result);
                };
                reader.readAsDataURL(e.target.files[0]);
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
                // Usar a mesma chave que o login salva: 'userId' (i minúsculo)
                const userId = localStorage.getItem('userId');
                // Proteger contra valores inválidos (strings 'undefined' ou 'null')
                if (!userId || userId === 'undefined' || userId === 'null') {
                    exibirFeedback(feedbackProfile, 'Erro: ID do usuário não encontrado. Faça login novamente.', 'error');
                    return;
                }
                
                const response = await fetch(`${API_URL}/api/users/${userId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email })
                });
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('userName', name);
                    if (email) localStorage.setItem('userEmail', email);
                    exibirFeedback(feedbackProfile, 'Perfil atualizado com sucesso!', 'success');
                } else {
                    exibirFeedback(feedbackProfile, data.mensagem || 'Erro ao atualizar perfil.', 'error');
                }
            } catch (error) {
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
                const userId = localStorage.getItem('userId');
                // Proteger contra valores inválidos (strings 'undefined' ou 'null')
                if (!userId || userId === 'undefined' || userId === 'null') {
                    exibirFeedback(feedbackPassword, 'Erro: ID do usuário não encontrado. Faça login novamente.', 'error');
                    return;
                }
                
                const response = await fetch(`${API_URL}/api/users/${userId}/password`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ newPassword: senhaNova })
                });
                const data = await response.json();
                if (response.ok) {
                    exibirFeedback(feedbackPassword, 'Senha atualizada com sucesso!', 'success');
                    passwordForm.reset();
                } else {
                    exibirFeedback(feedbackPassword, data.mensagem || 'Erro ao atualizar senha.', 'error');
                }
            } catch (error) {
                exibirFeedback(feedbackPassword, 'Erro de conexão.', 'error');
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
                window.location.href = '../principal_page/principal.html';
            }
        });
    }
    //RETORNAR Á PAGINA PRINCIPAL
        if (returnButton){
        returnButton.addEventListener('click', function() {
            window.location.href = '../principal_page/principal.html';
        });
    }
});