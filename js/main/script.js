const API_URL = 'http://localhost:3004'; // URL que é a base do server

// Usados na página principal (index.html) para funfar direito tem q pegar as class ne :p
const inscrever = document.querySelector('.btn-signup');
const login = document.querySelector('.btn-login');

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



