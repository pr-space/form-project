const btnHome = document.getElementsByClassName('btn-home')[0];

btnHome.addEventListener('click',takeMeHome)

function takeMeHome(){
    window.location.href = "/";

}