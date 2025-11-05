
const inscrever = document.querySelector('.btn-signup');
const login = document.querySelector('.btn-login');
const inscrever_se = document.querySelector('.btn-modal')
const modal = document.querySelector('.modal')



inscrever.addEventListener(('click'), function() {
    window.location.href ='../registro/inscrição.html';
});

inscrever_se.addEventListener(('click'), () =>{
    modal.style.display = 'flex';
    
})


login.addEventListener(('click'), function() {
    window.location.href ='../login/login.html'
})