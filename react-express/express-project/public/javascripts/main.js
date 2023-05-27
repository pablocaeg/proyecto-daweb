// resize header to size of browser window
var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    document.querySelector(".header").style.height = window.innerHeight/1.80 + "px";    
})
function sendIncidencia(e) {
    let name = $('#incidencia').val()
    let mail = $('#mail').val()
    let message = $('#message').val()

    console.log(name)

    fetch('incidencias/register', {
        method:'post',                    
        redirect : 'follow',
        headers : new Headers({'Content-Type':'application/json'}),
        body: JSON.stringify({'name': incidencia, 'mail':mail, 'message':message })})
        .then(resultado => {return resultado.text()})
        .then( resultado => {
                $('#result_incidencia').text(resultado)
            }
            )
}

window.onload = function () {

    let btn_incidencia = document.querySelector('#btn-incidencia')
    btn_incidencia.addEventListener('click', sendIncidencia)

}